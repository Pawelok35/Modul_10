{
  ('use strict');
  const favoriteBooks = [];
  const filters = [];
  const booksList = document.querySelector('.books-list');

  function renderBooks() {
    const bookTemplate = Handlebars.compile(
      document.getElementById('template-book').innerHTML
    );

    for (const book of dataSource.books) {
      const bookHTML = bookTemplate(book);
      const bookElement = utils.createDOMFromHTML(bookHTML);

      booksList.appendChild(bookElement);
    }
  }

  function isBookInFavorites(bookId) {
    return favoriteBooks.includes(bookId);
  }

  function initActions() {
    document
      .querySelector('.filters')
      .addEventListener('click', function (event) {
        const clickedElement = event.target;

        if (
          clickedElement.tagName === 'INPUT' &&
          clickedElement.type === 'checkbox' &&
          clickedElement.name === 'filter'
        ) {
          if (clickedElement.checked) {
            filters.push(clickedElement.value);
          } else {
            const index = filters.indexOf(clickedElement.value);
            if (index !== -1) {
              filters.splice(index, 1);
            }
          }

          console.log(filters);
        }
      });

    booksList.addEventListener('dblclick', function (event) {
      const clickedElement = event.target;
      const isBookImage =
        clickedElement.offsetParent.classList.contains('book__image');

      if (isBookImage) {
        event.preventDefault();

        const bookId = clickedElement.offsetParent.getAttribute('data-id');
        const isFavorite = isBookInFavorites(bookId);

        if (!isFavorite) {
          clickedElement.offsetParent.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else {
          clickedElement.offsetParent.classList.remove('favorite');
          const index = favoriteBooks.indexOf(bookId);
          if (index !== -1) {
            favoriteBooks.splice(index, 1);
          }
        }
      }
    });

    renderBooks();
  }

  initActions();
}
