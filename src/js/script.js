{
  ('use strict');
  const favoriteBooks = [];
  const filters = [];
  const booksList = document.querySelector('.books-list');

  function determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
      return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }
  }

  function renderBooks() {
    const bookTemplate = Handlebars.compile(
      document.getElementById('template-book').innerHTML
    );

    for (const book of dataSource.books) {
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = (book.rating / 10) * 100;
      const bookHTML = bookTemplate({ book, ratingBgc, ratingWidth });
      const bookElement = utils.createDOMFromHTML(bookHTML);

      booksList.appendChild(bookElement);
    }
  }

  function isBookInFavorites(bookId) {
    return favoriteBooks.includes(bookId);
  }

  function filterBooks() {
    const books = booksList.querySelectorAll('.book__image');

    for (const book of dataSource.books) {
      let shouldBeHidden = false;

      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookElement = books[book.id - 1];

      if (shouldBeHidden) {
        bookElement.classList.add('hidden');
      } else {
        bookElement.classList.remove('hidden');
      }
    }
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

          filterBooks();
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
    filterBooks();
  }

  initActions();
}
