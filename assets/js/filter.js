document.addEventListener("DOMContentLoaded", function() {
    // Get reference to the filter dropdown
    var filterDropdown = document.getElementById("filterDropdown");

    // Get reference to the sidebar
    var sidebar = document.getElementById("sidebar");

    // Get the offset position where the sidebar should switch to fixed position
    var offset = 500;
    

    // Add event listener for change event
    filterDropdown.addEventListener("change", function() {
        // Get the selected filter value
        var selectedFilter = filterDropdown.value;

        // Get all project articles
        var projects = document.querySelectorAll("#main .posts article");

        // Loop through each project article
        projects.forEach(function(project) {
            // Get the value of the data-categories attribute, or an empty string if it's not present
            var projectCategories = project.getAttribute("data-category") || "";

            // Split the comma-separated list of categories
            var categories = projectCategories.split(',');

            // Check if the selected filter matches any of the categories
            var showProject = selectedFilter === "all" || categories.includes(selectedFilter);

            // Show or hide the project based on the filtering condition
            project.style.display = showProject ? "block" : "none";
        });
    });
});

