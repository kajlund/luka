let resourceFilter = { category: '', tags: [] };
// Try to get from localstorage
let resourceFilterStr = sessionStorage.getItem('resourceFilter', '{"category": "", "tags": []}');
if (resourceFilterStr) {
  resourceFilter = JSON.parse(resourceFilterStr);
}

// Resources list page? load filters
if (window.location.pathname === '/resources') {
  const newSearch = `?category=${resourceFilter.category}&tags=${resourceFilter.tags}`;
  if (newSearch !== window.location.search) {
    window.location.search = newSearch;
  }
}

const elmCategoryFilter = document.querySelector('#categoryFilter');
elmCategoryFilter.addEventListener('sl-change', (event) => {
  if (event.target.value !== resourceFilter.category) {
    resourceFilter.category = event.target.value;
    sessionStorage.setItem("resourceFilter", JSON.stringify(resourceFilter));
    window.location.search = `?category=${resourceFilter.category}&tags=${resourceFilter.tags}`;
  }
});

const elmTagFilter = document.querySelector('#tagFilter');
elmTagFilter.addEventListener('sl-change', event => {
  if (event.target.value.join(' ') !== resourceFilter.tags.join(' ')) {
    resourceFilter.tags = event.target.value;
    sessionStorage.setItem("resourceFilter", JSON.stringify(resourceFilter));
    window.location.search = `?category=${resourceFilter.category}&tags=${resourceFilter.tags}`;
  }
});

