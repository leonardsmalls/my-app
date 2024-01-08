const menuNavigation = () => {
    const linkButton = document.querySelectorAll('button.goToPage');

    linkButton.forEach((button) => {
      button.addEventListener('click', () => {
        const link = button.dataset.href;
        pageChangeFade();
        setTimeout(() => {
            window.location.href = link
        }, 125);
      });
    });
  };

const pageChangeFade = () => {
    const bodyMainContent = document.querySelector('body > main section.content');
    
    if (bodyMainContent.classList.contains('fade-in')) {
        bodyMainContent.classList.remove('fade-in');
        bodyMainContent.classList.add('fade-out');
    } else if (bodyMainContent.classList.contains('fade-out')) {
        bodyMainContent.classList.remove('fade-out');
        bodyMainContent.classList.add('fade-in');
    } else {
        bodyMainContent.classList.add('fade-in');
    }
}

export { menuNavigation, pageChangeFade }