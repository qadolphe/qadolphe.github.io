(function () {
    "use strict";

    var data = window.RESUME_DATA;
    if (!data) return;

    var controlsRoot = document.getElementById("selection-controls");
    var previewRoot = document.getElementById("resume-preview");
    var countRoot = document.getElementById("selection-count");
    var coverageRoot = document.getElementById("keyword-coverage");
    var targetTitleInput = document.getElementById("target-title");
    var keywordInput = document.getElementById("target-keywords");
    var fontInputs = {
        name: document.getElementById("font-name"),
        section: document.getElementById("font-section"),
        content: document.getElementById("font-content")
    };
    var toast = document.getElementById("toast");
    var toastTimer = null;

    var selected = new Set();
    var includeSkills = true;

    var sectionDefinitions = [
        { key: "education", label: "Education", itemLabel: "schools" },
        { key: "experience", label: "Roles", itemLabel: "roles" },
        { key: "projects", label: "Projects", itemLabel: "projects" }
    ];

    function escapeHtml(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function latexEscape(value) {
        return String(value || "")
            .replace(/\\/g, "\\textbackslash{}")
            .replace(/([&%$#_{}])/g, "\\$1")
            .replace(/~/g, "\\textasciitilde{}")
            .replace(/\^/g, "\\textasciicircum{}")
            .replace(/[–—]/g, "--")
            .replace(/’/g, "'");
    }

    function resetSelections() {
        selected.clear();
        sectionDefinitions.forEach(function (section) {
            data[section.key].forEach(function (item) {
                if (item.defaultSelected) selected.add(item.id);
            });
        });
        includeSkills = true;
        Object.keys(fontInputs).forEach(function (key) {
            fontInputs[key].value = fontInputs[key].defaultValue;
        });
        applyTypography();
    }

    function getTypography() {
        var values = {};
        Object.keys(fontInputs).forEach(function (key) {
            var input = fontInputs[key];
            var value = Number(input.value) || Number(input.defaultValue);
            values[key] = Math.min(Number(input.max), Math.max(Number(input.min), value));
        });
        return values;
    }

    function applyTypography() {
        var values = getTypography();
        Object.keys(values).forEach(function (key) {
            previewRoot.style.setProperty("--resume-" + key + "-size", values[key] + "pt");
        });
    }

    function itemTitle(sectionKey, item) {
        if (sectionKey === "education") return item.institution;
        if (sectionKey === "experience") return item.title;
        return item.name;
    }

    function itemMeta(sectionKey, item) {
        if (sectionKey === "education") return item.degree + " · " + item.date;
        if (sectionKey === "experience") return item.organization + " · " + item.date;
        if (sectionKey === "projects") return item.technologies.join(" · ");
        return [item.organization, item.date].filter(Boolean).join(" · ");
    }

    function createSelectionCard(sectionKey, item) {
        var label = document.createElement("label");
        label.className = "selection-card";

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = item.id;
        checkbox.checked = selected.has(item.id);
        checkbox.setAttribute("data-section", sectionKey);

        var content = document.createElement("span");
        var title = document.createElement("span");
        title.className = "selection-title";
        title.textContent = itemTitle(sectionKey, item);

        if (item.defaultSelected) {
            var defaultTag = document.createElement("span");
            defaultTag.className = "default-tag";
            defaultTag.textContent = "CURRENT";
            title.appendChild(defaultTag);
        }

        var meta = document.createElement("span");
        meta.className = "selection-meta";
        meta.textContent = itemMeta(sectionKey, item);

        content.appendChild(title);
        content.appendChild(meta);
        label.appendChild(checkbox);
        label.appendChild(content);
        return label;
    }

    function renderControls() {
        controlsRoot.innerHTML = "";

        sectionDefinitions.forEach(function (definition) {
            var section = document.createElement("section");
            section.className = "selection-section";
            section.setAttribute("data-selection-section", definition.key);

            var heading = document.createElement("div");
            heading.className = "control-heading";
            heading.innerHTML = '<div><p class="step-label">Choose ' + escapeHtml(definition.itemLabel) +
                '</p><h2>' + escapeHtml(definition.label) + '</h2></div>';

            var actions = document.createElement("div");
            actions.className = "group-actions";
            actions.innerHTML = '<button type="button" class="text-button" data-action="all" aria-label="Select all ' +
                escapeHtml(definition.itemLabel) + '">All</button>' +
                '<button type="button" class="text-button" data-action="none" aria-label="Clear all ' +
                escapeHtml(definition.itemLabel) + '">None</button>';
            heading.appendChild(actions);

            var list = document.createElement("div");
            list.className = "selection-list";
            data[definition.key].forEach(function (item) {
                list.appendChild(createSelectionCard(definition.key, item));
            });

            section.appendChild(heading);
            section.appendChild(list);
            controlsRoot.appendChild(section);
        });

        var skillsSection = document.createElement("section");
        skillsSection.className = "selection-section";
        skillsSection.innerHTML = '<div class="control-heading"><div><p class="step-label">Standard section</p>' +
            '<h2>Skills</h2></div></div>';

        var skillsLabel = document.createElement("label");
        skillsLabel.className = "selection-card";
        skillsLabel.innerHTML = '<input type="checkbox" id="include-skills" ' + (includeSkills ? "checked" : "") + '>' +
            '<span><span class="selection-title">Core technical skills <span class="default-tag">CURRENT</span></span>' +
            '<span class="selection-meta">' + escapeHtml(data.skills.join(" · ")) + '</span></span>';
        skillsSection.appendChild(skillsLabel);
        controlsRoot.appendChild(skillsSection);
    }

    function selectedItems(key) {
        return data[key].filter(function (item) { return selected.has(item.id); });
    }

    function compactUrl(value) {
        return String(value || "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    }

    function sectionHtml(title, content) {
        if (!content) return "";
        return '<section class="resume-section"><h2>' + escapeHtml(title) + '</h2>' + content + '</section>';
    }

    function educationHtml(items) {
        return items.map(function (item) {
            var details = item.details ? '<span class="resume-degree-details"> | ' + escapeHtml(item.details) + '</span>' : "";
            return '<div class="resume-entry">' +
                '<div class="resume-company-line"><span>' + escapeHtml(item.institution) + '</span></div>' +
                '<div class="resume-entry-heading resume-degree-line"><span><span class="resume-degree-name">' +
                escapeHtml(item.degree) + '</span>' + details + '</span><span>' +
                escapeHtml(item.date) + '</span></div></div>';
        }).join("");
    }

    function bulletListHtml(bullets) {
        return "<ul>" + bullets.map(function (bullet) {
            return "<li>" + escapeHtml(bullet) + "</li>";
        }).join("") + "</ul>";
    }

    function experienceHtml(items) {
        return items.map(function (item) {
            var location = item.location ? '<span>' + escapeHtml(item.location) + '</span>' : "";
            return '<div class="resume-entry resume-role">' +
                '<div class="resume-company-line"><span>' + escapeHtml(item.organization) + '</span>' + location + '</div>' +
                '<div class="resume-entry-heading"><span>' + escapeHtml(item.title) + '</span><span>' +
                escapeHtml(item.date) + '</span></div>' + bulletListHtml(item.bullets) + '</div>';
        }).join("");
    }

    function projectsHtml(items) {
        return items.map(function (item) {
            var tech = item.technologies.length ? ' <span class="resume-project-tech">| ' + escapeHtml(item.technologies.join(", ")) + '</span>' : "";
            return '<div class="resume-entry"><div class="resume-entry-heading"><span>' + escapeHtml(item.name) + tech +
                '</span></div>' + bulletListHtml(item.bullets) + '</div>';
        }).join("");
    }

    function skillsHtml() {
        return data.skillGroups.map(function (group) {
            return '<p class="resume-skills-line"><strong>' + escapeHtml(group.label) + ':</strong> ' +
                escapeHtml(group.items.join(", ")) + '</p>';
        }).join("");
    }

    function buildPreviewHtml() {
        var profile = data.profile;
        var targetTitle = targetTitleInput.value.trim();
        var contact = [profile.location, profile.email, compactUrl(profile.website), compactUrl(profile.github)]
            .filter(Boolean).join(" | ");
        var html = '<header class="resume-header"><h1>' + escapeHtml(profile.name) + '</h1>' +
            '<p class="resume-contact">' + escapeHtml(contact) + '</p>' +
            (targetTitle ? '<p class="resume-target">Target Role: ' + escapeHtml(targetTitle) + '</p>' : "") + '</header>';

        html += sectionHtml("Education", educationHtml(selectedItems("education")));
        html += sectionHtml("Professional Experience", experienceHtml(selectedItems("experience")));
        var selectedProjects = selectedItems("projects");
        html += sectionHtml("Projects", projectsHtml(selectedProjects));
        if (includeSkills) {
            html += sectionHtml("Skills", skillsHtml());
        }
        return html;
    }

    function buildPlainText() {
        var profile = data.profile;
        var lines = [profile.name.toUpperCase()];
        var targetTitle = targetTitleInput.value.trim();
        if (targetTitle) lines.push("TARGET ROLE: " + targetTitle);
        lines.push([profile.location, profile.email, profile.website, profile.github].filter(Boolean).join(" | "));

        var education = selectedItems("education");
        if (education.length) {
            lines.push("", "EDUCATION");
            education.forEach(function (item) {
                lines.push(item.institution, item.degree, [item.details, item.date].filter(Boolean).join(" | "));
            });
        }

        var experience = selectedItems("experience");
        if (experience.length) {
            lines.push("", "PROFESSIONAL EXPERIENCE");
            experience.forEach(function (item) {
                lines.push(item.organization + (item.location ? " | " + item.location : ""));
                lines.push(item.title + " | Dates: " + item.date);
                item.bullets.forEach(function (bullet) { lines.push("- " + bullet); });
            });
        }

        var projects = selectedItems("projects");
        if (projects.length) {
            lines.push("", "PROJECTS");
            projects.forEach(function (item) {
                lines.push(item.name + " | Technologies: " + item.technologies.join(", "));
                item.bullets.forEach(function (bullet) { lines.push("- " + bullet); });
            });
        }

        if (includeSkills) {
            lines.push("", "SKILLS");
            data.skillGroups.forEach(function (group) {
                lines.push(group.label + ": " + group.items.join(", "));
            });
        }

        return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
    }

    function latexSection(title, content, spacing) {
        if (!content.length) return "";
        var gap = typeof spacing === "number" ? spacing : 3;
        return "\\ressection{" + title + "}\n" +
            content.join("\n\\par\\vspace{" + gap + "pt}\n") + "\\par\n";
    }

    function latexBullets(bullets) {
        return "\\begin{itemize}\n" + bullets.map(function (bullet) {
            return "  \\item " + latexEscape(bullet);
        }).join("\n") + "\n\\end{itemize}";
    }

    function buildLatex() {
        var profile = data.profile;
        var targetTitle = targetTitleInput.value.trim();
        var bodyLeading = (typography.content * 1.24).toFixed(2);
        var sectionLeading = (typography.section * 1.09).toFixed(2);
        var nameLeading = (typography.name * 1.08).toFixed(2);
        var education = selectedItems("education").map(function (item) {
            return "\\textbf{" + latexEscape(item.institution) + "}\\\\\n" +
                "\\textit{" + latexEscape(item.degree) + "}" +
                (item.details ? " \\textbar{} " + latexEscape(item.details) : "") +
                " \\hfill " + latexEscape(item.date);
        });
        var experience = selectedItems("experience").map(function (item) {
            return "\\textbf{" + latexEscape(item.organization) + "}" +
                (item.location ? " \\hfill " + latexEscape(item.location) : "") + "\\\\\n" +
                "\\textit{" + latexEscape(item.title) + "} \\hfill " + latexEscape(item.date) + "\n" +
                latexBullets(item.bullets);
        });
        var projects = selectedItems("projects").map(function (item) {
            return "\\textbf{" + latexEscape(item.name) + "} \\textbar{} " +
                latexEscape(item.technologies.join(", ")) + "\n" + latexBullets(item.bullets);
        });

        var parts = [
            "\\documentclass[10pt,letterpaper]{article}",
            "\\usepackage[margin=0.52in]{geometry}",
            "\\usepackage[T1]{fontenc}",
            "\\usepackage[utf8]{inputenc}",
            "\\usepackage{newtxtext}",
            "\\usepackage[hidelinks]{hyperref}",
            "\\usepackage{enumitem}",
            "\\input{glyphtounicode}",
            "\\pdfgentounicode=1",
            "\\setlength{\\parindent}{0pt}",
            "\\setlength{\\parskip}{0pt}",
            "\\linespread{1.03}",
            "\\setlist[itemize]{leftmargin=*,topsep=1pt,itemsep=0pt,parsep=0pt,partopsep=0pt}",
            "\\newcommand{\\ressection}[1]{\\par\\addvspace{7pt}{\\fontsize{" + typography.section + "}{" + sectionLeading + "}\\selectfont\\textbf{#1}}\\par\\nobreak\\vspace{1.5pt}\\hrule\\nobreak\\vspace{3pt}}",
            "\\pagestyle{empty}",
            "\\begin{document}",
            "\\raggedright",
            "\\fontsize{" + typography.content + "}{" + bodyLeading + "}\\selectfont",
            "{\\centering",
            "{\\fontsize{" + typography.name + "}{" + nameLeading + "}\\selectfont \\textbf{" + latexEscape(profile.name) + "}}\\par",
            "\\vspace{1pt}",
            latexEscape(profile.location) + " \\textbar{} " +
                "\\href{mailto:" + profile.email + "}{" + latexEscape(profile.email) + "} \\textbar{} " +
                "\\href{" + profile.website + "}{" + latexEscape(compactUrl(profile.website)) + "} \\textbar{} " +
                "\\href{" + profile.github + "}{" + latexEscape(compactUrl(profile.github)) + "}\\par",
            targetTitle ? "\\vspace{1pt}\\textbf{Target Role: " + latexEscape(targetTitle) + "}\\par" : "",
            "}",
            latexSection("EDUCATION", education),
            latexSection("PROFESSIONAL EXPERIENCE", experience),
            latexSection("PROJECTS", projects),
            includeSkills ? latexSection("SKILLS", data.skillGroups.map(function (group) {
                return "\\textbf{" + latexEscape(group.label) + ":} " + latexEscape(group.items.join(", "));
            }), 0.5) : "",
            "\\end{document}"
        ];

        return parts.filter(Boolean).join("\n\n") + "\n";
    }

    function pdfSafe(value) {
        return String(value || "")
            .replace(/[–—]/g, "-")
            .replace(/[‘’]/g, "'")
            .replace(/[“”]/g, '"');
    }

    function buildPdf() {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            throw new Error("PDF library unavailable");
        }

        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "letter",
            compress: true,
            putOnlyUsedFonts: true
        });
        var profile = data.profile;
        var pageWidth = doc.internal.pageSize.getWidth();
        var pageHeight = doc.internal.pageSize.getHeight();
        var marginX = 37.44;
        var marginTop = 36;
        var marginBottom = 36;
        var contentWidth = pageWidth - (marginX * 2);
        var bodySize = typography.content;
        var bodyLeading = bodySize * 1.24;
        var y = marginTop;

        doc.setProperties({
            title: "Quentin Adolphe Resume",
            author: "Quentin Adolphe",
            subject: targetTitleInput.value.trim() || "Resume"
        });

        function setFont(style, size) {
            doc.setFont("times", style || "normal");
            doc.setFontSize(size || bodySize);
        }

        function ensureSpace(height) {
            if (y + height <= pageHeight - marginBottom) return;
            doc.addPage();
            y = marginTop;
        }

        function wrappedLines(text, width, style, size) {
            setFont(style, size);
            return doc.splitTextToSize(pdfSafe(text), width);
        }

        function drawWrapped(text, x, width, style, size, leading) {
            var fontSize = size || bodySize;
            var lineHeight = leading || (fontSize * 1.24);
            var lines = wrappedLines(text, width, style, fontSize);
            ensureSpace(lines.length * lineHeight);
            setFont(style, fontSize);
            lines.forEach(function (line) {
                doc.text(line, x, y + fontSize);
                y += lineHeight;
            });
        }

        function drawSection(title) {
            var size = typography.section;
            var leading = size * 1.09;
            y += 6;
            ensureSpace(leading + 5);
            setFont("bold", size);
            doc.text(pdfSafe(title.toUpperCase()), marginX, y + size);
            y += leading;
            doc.setDrawColor(51);
            doc.setLineWidth(0.75);
            doc.line(marginX, y + 1.5, pageWidth - marginX, y + 1.5);
            y += 4;
        }

        function drawHeadingRow(left, right, style) {
            var rightText = pdfSafe(right || "");
            setFont("normal", bodySize);
            var rightWidth = rightText ? doc.getTextWidth(rightText) : 0;
            var gap = rightText ? 12 : 0;
            var leftWidth = contentWidth - rightWidth - gap;
            var lines = wrappedLines(left, leftWidth, style || "normal", bodySize);
            ensureSpace(lines.length * bodyLeading);
            lines.forEach(function (line, index) {
                setFont(style || "normal", bodySize);
                doc.text(line, marginX, y + bodySize);
                if (index === 0 && rightText) {
                    setFont("normal", bodySize);
                    doc.text(rightText, pageWidth - marginX, y + bodySize, { align: "right" });
                }
                y += bodyLeading;
            });
        }

        function drawCompany(organization, location) {
            ensureSpace(bodyLeading);
            setFont("bold", bodySize);
            doc.text(pdfSafe(organization), marginX, y + bodySize);
            if (location) {
                doc.text(pdfSafe(location), pageWidth - marginX, y + bodySize, { align: "right" });
            }
            y += bodyLeading;
        }

        function drawBullets(bullets) {
            bullets.forEach(function (bullet) {
                var indent = 9;
                var lines = wrappedLines(bullet, contentWidth - indent, "normal", bodySize);
                ensureSpace(lines.length * bodyLeading);
                lines.forEach(function (line, index) {
                    setFont("normal", bodySize);
                    if (index === 0) doc.text("-", marginX, y + bodySize);
                    doc.text(line, marginX + indent, y + bodySize);
                    y += bodyLeading;
                });
            });
        }

        function drawLabeledLine(label, value, separator) {
            var labelText = pdfSafe(label + (separator || ""));
            var valueText = pdfSafe(value);
            setFont("bold", bodySize);
            var labelWidth = doc.getTextWidth(labelText);
            var valueLines = wrappedLines(valueText, contentWidth - labelWidth, "normal", bodySize);
            ensureSpace(valueLines.length * bodyLeading);
            valueLines.forEach(function (line, index) {
                if (index === 0) {
                    setFont("bold", bodySize);
                    doc.text(labelText, marginX, y + bodySize);
                }
                setFont("normal", bodySize);
                doc.text(line, marginX + labelWidth, y + bodySize);
                y += bodyLeading;
            });
        }

        setFont("bold", typography.name);
        doc.text(pdfSafe(profile.name), pageWidth / 2, y + typography.name, { align: "center" });
        y += typography.name * 1.08;
        var contact = [profile.location, profile.email, compactUrl(profile.website), compactUrl(profile.github)]
            .filter(Boolean).join(" | ");
        setFont("normal", bodySize);
        doc.text(pdfSafe(contact), pageWidth / 2, y + bodySize, { align: "center" });
        y += bodyLeading;
        if (targetTitleInput.value.trim()) {
            setFont("bold", bodySize);
            doc.text("Target Role: " + pdfSafe(targetTitleInput.value.trim()), pageWidth / 2, y + bodySize, { align: "center" });
            y += bodyLeading;
        }

        var education = selectedItems("education");
        if (education.length) {
            drawSection("Education");
            education.forEach(function (item) {
                y += 2;
                drawCompany(item.institution, "");
                drawHeadingRow(item.degree + (item.details ? " | " + item.details : ""), item.date, "italic");
            });
        }

        var experience = selectedItems("experience");
        if (experience.length) {
            drawSection("Professional Experience");
            experience.forEach(function (item) {
                y += 2;
                drawCompany(item.organization, item.location);
                drawHeadingRow(item.title, item.date, "italic");
                drawBullets(item.bullets);
            });
        }

        var projects = selectedItems("projects");
        if (projects.length) {
            drawSection("Projects");
            projects.forEach(function (item) {
                y += 2;
                drawLabeledLine(item.name, " | " + item.technologies.join(", "));
                drawBullets(item.bullets);
            });
        }

        if (includeSkills) {
            drawSection("Skills");
            data.skillGroups.forEach(function (group) {
                drawLabeledLine(group.label, group.items.join(", "), ": ");
            });
        }

        return doc;
    }

    function updateCoverage() {
        var keywords = keywordInput.value.split(/[,\n;]/).map(function (keyword) {
            return keyword.trim();
        }).filter(Boolean);

        if (!keywords.length) {
            coverageRoot.innerHTML = "";
            return;
        }

        var haystack = buildPlainText().toLowerCase();
        var covered = keywords.filter(function (keyword) { return haystack.indexOf(keyword.toLowerCase()) !== -1; });
        var missing = keywords.filter(function (keyword) { return haystack.indexOf(keyword.toLowerCase()) === -1; });
        var percent = Math.round((covered.length / keywords.length) * 100);
        coverageRoot.innerHTML = '<div class="coverage-score">Keyword coverage: ' + percent + '% (' + covered.length + '/' + keywords.length + ')</div>' +
            (missing.length ? '<div class="coverage-missing">Not represented: ' + escapeHtml(missing.slice(0, 8).join(", ")) +
                (missing.length > 8 ? "…" : "") + '</div>' : "");
    }

    function updateAll() {
        previewRoot.innerHTML = buildPreviewHtml();
        syncTypographyControls();
        var total = selected.size + (includeSkills ? 1 : 0);
        countRoot.textContent = total + (total === 1 ? " item selected" : " items selected");
        updateCoverage();
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("is-visible");
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 4200);
    }

    function download(content, filename, type) {
        var blob = content instanceof Blob ? content : new Blob([content], { type: type });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 500);
    }

    controlsRoot.addEventListener("change", function (event) {
        if (event.target.id === "include-skills") {
            includeSkills = event.target.checked;
        } else if (event.target.matches('input[type="checkbox"][value]')) {
            if (event.target.checked) selected.add(event.target.value);
            else selected.delete(event.target.value);
        }
        updateAll();
    });

    controlsRoot.addEventListener("click", function (event) {
        var action = event.target.closest("[data-action]");
        if (!action) return;
        var section = action.closest("[data-selection-section]");
        var key = section.getAttribute("data-selection-section");
        var shouldSelect = action.getAttribute("data-action") === "all";
        data[key].forEach(function (item) {
            if (shouldSelect) selected.add(item.id);
            else selected.delete(item.id);
        });
        renderControls();
        updateAll();
    });

    targetTitleInput.addEventListener("input", updateAll);
    keywordInput.addEventListener("input", updateCoverage);
    Object.keys(fontInputs).forEach(function (key) {
        fontInputs[key].addEventListener("input", function () {
            typography[key] = Number(fontInputs[key].value);
            syncTypographyControls();
        });
    });

    document.getElementById("reset-defaults").addEventListener("click", function () {
        resetSelections();
        targetTitleInput.value = "";
        keywordInput.value = "";
        renderControls();
        updateAll();
        showToast("Restored the items from the current resume.");
    });

    document.getElementById("download-tex").addEventListener("click", function () {
        download(buildLatex(), "Quentin_Adolphe.tex", "application/x-tex;charset=utf-8");
        showToast("LaTeX source downloaded. Compile it with pdfLaTeX or upload it to Overleaf.");
    });

    document.getElementById("download-pdf").addEventListener("click", function () {
        try {
            download(buildPdf().output("blob"), "Quentin_Adolphe.pdf", "application/pdf");
            showToast("PDF downloaded by your browser.");
        } catch (error) {
            showToast("PDF download could not start. Check your connection and try again.");
        }
    });

    document.getElementById("download-text").addEventListener("click", function () {
        download(buildPlainText(), "Quentin_Adolphe.txt", "text/plain;charset=utf-8");
        showToast("Plain-text parser check downloaded.");
    });

    window.ResumeGeneratorUtils = {
        buildPlainText: buildPlainText,
        buildLatex: buildLatex,
        buildPdf: buildPdf,
        getTypography: function () { return Object.assign({}, typography); },
        getSelectedIds: function () { return Array.from(selected); }
    };

    resetSelections();
    renderControls();
    updateAll();
}());
