document.addEventListener("DOMContentLoaded", function() {
    // Get reference to the filter dropdown
    var filterDropdown = document.getElementById("filterDropdown");

    // Check if filter option is stored in localStorage
    var storedFilter = localStorage.getItem("selectedFilter");

    // Set the selected option in the filter dropdown
    if (storedFilter) {
        filterDropdown.value = storedFilter;
    }

    // Add event listener for change event
    filterDropdown.addEventListener("change", function() {
        // Get the selected filter value
        var selectedFilter = filterDropdown.value;

        // Store the selected filter option in localStorage
        localStorage.setItem("selectedFilter", selectedFilter);

        // Filter the articles based on the selected filter
        filterArticles(selectedFilter);
    });

    // Function to filter articles based on the selected filter
    function filterArticles(selectedFilter) {
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
    }

    // Initially filter articles based on the selected filter
    filterArticles(filterDropdown.value);
});
