(function () {
    "use strict";

    var button = document.getElementById("resume-button");
    if (!button) return;

    var holdDuration = 5000;
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
        var remaining = Math.max(1, Math.ceil((holdDuration - elapsed) / 1000));

        button.style.setProperty("--hold-progress", (progress * 100) + "%");
        button.textContent = progress === 1 ? "Opening generator..." : "Hold " + remaining + "s";

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
        reset();
        activated = false;
        button.classList.add("is-holding");
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
}());
