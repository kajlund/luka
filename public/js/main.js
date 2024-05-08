// helper for selecting elements
const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if(!element) throw new Error(`Something went wrong! Make sure that ${selector} exists/is typed correctly.`);

  return element;
};

// Add/Remove nav styles on scroll
window.addEventListener('scroll', () => {
  const navbarElement = selectElement('#header');
  if(window.scrollY >= 15) {
    navbarElement.classList.add('activated');
  } else {
    navbarElement.classList.remove('activated');
  }
});

// Menu toggle
const menuToggleIcon = selectElement('#menu-toggle-icon');
menuToggleIcon.addEventListener('click', () => {
  menuToggleIcon.classList.toggle('activated');
  const mobileMenu = selectElement('#menu');
  mobileMenu.classList.toggle('activated');
});

// Theme toggle
const themeToggleBtn = selectElement('#theme-toggle-btn');
themeToggleBtn.addEventListener('click', () => {
  console.log('click')
  document.body.classList.toggle('light-theme');
});

