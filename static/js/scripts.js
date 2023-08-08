const menuButtons = document.querySelectorAll('.menu-button');

menuButtons.forEach((button) => {
  const menuOptions = button.nextElementSibling;

  button.addEventListener('click', () => {
    menuOptions.style.display = menuOptions.style.display === 'none' ? 'block' : 'none';
  });
});
