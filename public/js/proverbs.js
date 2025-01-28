const defaultFilter = { lang: 'Any', category: 'Any', tags: [], author: 'Any' };
let filter = { ...defaultFilter };

const keyName = 'luka.provebslist';

// Initialize filter object
// Try to read from localStorage and if found overwrite default filter values
let filterStr = localStorage.getItem(keyName, '');
if (filterStr) {
  const flt = JSON.parse(filterStr);
  if (flt) {
    filter = { ...filter, ...flt }
  }
}

// Get handles to controls
const selLanguage = document.querySelector('#selLanguage');
const selCategory = document.querySelector('#selCategory');
const btnFilterClear = document.querySelector('#btnFilterClear');
const txtAuthor = document.querySelector('#txtAuthor');

// Set initial values of controls according to filter object
if (selLanguage && filter.lang) selLanguage.value = filter.lang;
if (selCategory && filter.category) selCategory.value = filter.category;
if (txtAuthor && filter.author) txtAuthor.value = filter.author;

// Store filter after change and navigate according to settings
function setLocation() {
  localStorage.setItem(keyName, JSON.stringify(filter));
  window.location.search = `?lang=${filter.lang}&category=${filter.category}&tags=${filter.tags}&author=${filter.author}`;
}

// Add event handlers for filter changes

// Get changes to language selection
selLanguage.addEventListener('change', (event) => {
  const newValue = event.target.value.trim();
  if (newValue && (newValue !== filter.lang)) {
    filter.lang = newValue;
    setLocation();
  }
});

// Get changes to category selection
selCategory.addEventListener('change', (event) => {
  const newValue = event.target.value.trim();
  if (newValue && (newValue !== filter.category)) {
    filter.category = newValue;
    setLocation();
  }
});

// Changes to author
txtAuthor.addEventListener('change', (event) => {
  const newValue = event.target.value.trim();
  if (newValue && (newValue !== filter.author)) {
    filter.author = newValue;
    setLocation();
  }
})

// Click button Clear
btnFilterClear.addEventListener('click', (event) => {
  filter = { ...defaultFilter };
  setLocation();
});

// Proverbs list page with no search? load filters
if (window.location.pathname === '/proverbs' && !window.location.search) {
  const currFilter = `?lang=${filter.lang}&category=${filter.category}&tags=${filter.tags}&author=${filter.author}`;
  if (currFilter !== window.location.search) {
    window.location.search = currFilter;
  }
}
