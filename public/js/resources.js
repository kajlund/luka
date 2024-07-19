const cleanFilter = { category: '', tags: [], name: '' };
let filter = { ...cleanFilter };

const keyName = 'luka.resourceFilter';

function setLocation() {
  localStorage.setItem(keyName, JSON.stringify(filter));
  // console.log(filter);
  window.location.search = `?category=${filter.category}&tags=${filter.tags}&name=${filter.name}`;
}

// Try to get from localStorage
let filterStr = localStorage.getItem(keyName, '');
if (filterStr) {
  const temp = JSON.parse(filterStr);
  if (temp) {
    filter = { ...filter, ...temp }
  }
}

// Resources list page with no search? load filters
if (window.location.pathname === '/resources' && !window.location.search) {
  const currFilter = `?category=${filter.category}&tags=${filter.tags}&name=${filter.name}`;
  if (currFilter !== window.location.search) {
    window.location.search = currFilter;
  }
}

const txtCategory = document.querySelector('#txtCategory');
txtCategory.addEventListener('change', (event) => {
  if (event.target.value !== filter.category) {
    filter.category = event.target.value.trim();
    setLocation();
  }
});

const elName = document.querySelector('#searchName');
elName.addEventListener('change', (event) => {
  const newValue = event.target.value.trim();
  if ((newValue !== filter.name && newValue.length >= 2) || (!newValue && filter.name)) {
    filter.name = event.target.value.trim();
    setLocation();
  }
});

const selTags = document.querySelector('#selTags');
selTags.addEventListener('change', event => {
  // console.log(Array.from(selTags.selectedOptions).map(x => x.value));
  filter.tags = Array.from(selTags.selectedOptions).map(x => x.value.trim());
  setLocation();
});

const btnClearFilter = document.querySelector('#btnClearFilter');
btnClearFilter.addEventListener('click', event => {
  filter = { ...cleanFilter };
  setLocation();
});
