const containers = document.querySelectorAll('.input-container');

containers.forEach(container => {
  container.addEventListener('click', () => {
    container.children[1].focus();
  });
});