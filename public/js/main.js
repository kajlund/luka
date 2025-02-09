// helper for selecting elements
const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if(!element) throw new Error(`Something went wrong! Make sure that ${selector} exists/is typed correctly.`);

  return element;
};


const dmKeyName = 'luka.darkMode';
const themeToggleBtn = selectElement('#theme-toggle-btn');

const darkMode = localStorage.getItem(dmKeyName, '');
if (darkMode) {
  document.body.classList.add('dark-theme');
}

function removeElementWithFadeOut(el) {
    el.style.transition = "opacity 1s ease";
    el.style.opacity = 0;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, 1000);
}

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
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem(dmKeyName, 'Y');
  } else {
    localStorage.removeItem(dmKeyName);
  }
});

const messages = document.querySelectorAll('.alert-message');
// console.log(messages);
messages.forEach((element) => {
  let id = setTimeout(function () {
    element.style.opacity = '0';
    element.remove();
  }, 3000);

  element.addEventListener('mouseover', () => {
    console.log(element);
    clearTimeout(id);
  });
  
});

const closeBtns = document.querySelectorAll('.btn-close');
closeBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const msgElm = e.target.closest('.alert-message');
    msgElm.remove();
  });
});
