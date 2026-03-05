(function() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    var icon = btn.querySelector("i");

    function getEffectiveTheme() {
        var stored = localStorage.getItem("theme");
        if (stored) return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function updateIcon(theme) {
        if (!icon) return;
        icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
        btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }

    updateIcon(getEffectiveTheme());

    btn.addEventListener("click", function() {
        var current = getEffectiveTheme();
        var next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        updateIcon(next);
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function() {
        if (!localStorage.getItem("theme")) {
            updateIcon(getEffectiveTheme());
        }
    });
})();
