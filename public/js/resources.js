let resourceFilter = { category: '', tags: [] };
// Try to get from localStorage
let resourceFilterStr = sessionStorage.getItem('resourceFilter', '');
if (resourceFilterStr) {
  resourceFilter = JSON.parse(resourceFilterStr);
}

// Resources list page with no search? load filters
if (window.location.pathname === '/resources' && !window.location.search) {
  const newSearch = `?category=${resourceFilter.category}&tags=${resourceFilter.tags}`;
  if (newSearch !== window.location.search) {
    window.location.search = newSearch;
  }
}

const txtCategory = document.querySelector('#txtCategory');
txtCategory.addEventListener('change', (event) => {
  if (event.target.value !== resourceFilter.category) {
    resourceFilter.category = event.target.value;
    sessionStorage.setItem("resourceFilter", JSON.stringify(resourceFilter));
    window.location.search = `?category=${resourceFilter.category}&tags=${resourceFilter.tags}`;
  }
});

const selTags = document.querySelector('#selTags');
selTags.addEventListener('change', event => {
  // console.log(Array.from(selTags.selectedOptions).map(x => x.value));
  resourceFilter.tags = Array.from(selTags.selectedOptions).map(x => x.value);
  window.location.search = `?category=${resourceFilter.category}&tags=${resourceFilter.tags}`;
});

const btnClearFilter = document.querySelector('#btnClearFilter');
btnClearFilter.addEventListener('click', event => {
  resourceFilter.category = '';
  resourceFilter.tags = [];
  sessionStorage.setItem("resourceFilter", JSON.stringify(resourceFilter));
  // console.log(resourceFilter);
  window.location.search = '';
});
