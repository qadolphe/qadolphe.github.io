(function () {
    "use strict";

    var button = document.getElementById("resume-button");
    if (!button) return;

    var holdDuration = 5000;
    var revealDelay = 2000;
    var mobileQuery = window.matchMedia("(max-width: 767px)");
    var isDevelopment = ["localhost", "127.0.0.1", "::1"].indexOf(window.location.hostname) !== -1;
    var holdStart = null;
    var frameId = null;
    var activated = false;
    var originalLabel = button.textContent.trim();

    function reset() {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = null;
        holdStart = null;
        button.style.removeProperty("--hold-progress");
        button.textContent = originalLabel;
        button.classList.remove("is-holding");
    }

    function update(timestamp) {
        if (holdStart === null) holdStart = timestamp;
        var elapsed = timestamp - holdStart;
        var progress = Math.min(elapsed / holdDuration, 1);

        if (elapsed >= revealDelay) {
            var displayedSecond = Math.min(5, Math.floor(elapsed / 1000) + 1);
            button.classList.add("is-holding");
            button.style.setProperty("--hold-progress", (progress * 100) + "%");
            button.textContent = progress === 1 ? "Opening generator..." : "Hold " + displayedSecond + "s";
        }

        if (progress >= 1) {
            activated = true;
            reset();
            window.location.href = "resume-builder.html";
            return;
        }

        frameId = requestAnimationFrame(update);
    }

    function start(event) {
        if (event.button !== undefined && event.button !== 0) return;
        if (mobileQuery.matches && !isDevelopment) return;
        reset();
        activated = false;
        frameId = requestAnimationFrame(update);
    }

    button.addEventListener("pointerdown", start);
    button.addEventListener("pointerup", reset);
    button.addEventListener("pointercancel", reset);
    button.addEventListener("pointerleave", reset);
    button.addEventListener("dragstart", function (event) {
        event.preventDefault();
        reset();
    });
    button.addEventListener("contextmenu", function (event) {
        if (button.classList.contains("is-holding")) event.preventDefault();
    });
    button.addEventListener("click", function (event) {
        if (activated) {
            event.preventDefault();
            activated = false;
        }
    });
    mobileQuery.addEventListener("change", function (event) {
        if (event.matches && !isDevelopment) reset();
    });
}());
