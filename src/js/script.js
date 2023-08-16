/* global Handlebars, utils, dataSource, ...book */ // eslint-disable-line no-unused-vars
{
  ('use strict');
  class BooksList {
    constructor() {
      this.favoriteBooks = [];
      this.filters = [];
      this.booksList = document.querySelector('.books-list');
      this.data = dataSource.books;
      this.initActions();
      this.renderBooks();
    }

    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }
    }

    renderBooks() {
      const bookTemplate = Handlebars.compile(
        document.getElementById('template-book').innerHTML
      );
    
      for (const book of this.data) {
        const ratingBgc = this.determineRatingBgc(book.rating);
        const ratingWidth = (book.rating / 10) * 100;
    
        const bookData = Object.assign({}, book, {
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth
        });
    
        const bookHTML = bookTemplate(bookData);
        console.log(bookHTML);
    
        const bookElement = utils.createDOMFromHTML(bookHTML);
        this.booksList.appendChild(bookElement);
      }
    }

    isBookInFavorites(bookId) {
      return this.favoriteBooks.includes(bookId);
    }

    filterBooks() {
      const books = this.booksList.querySelectorAll('.book__image');

      for (const book of this.data) {
        let shouldBeHidden = false;

        for (const filter of this.filters) {
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

    initActions() {
      document.querySelector('.filters').addEventListener('click', (event) => {
        const clickedElement = event.target;

        if (
          clickedElement.tagName === 'INPUT' &&
          clickedElement.type === 'checkbox' &&
          clickedElement.name === 'filter'
        ) {
          if (clickedElement.checked) {
            this.filters.push(clickedElement.value);
          } else {
            const index = this.filters.indexOf(clickedElement.value);
            if (index !== -1) {
              this.filters.splice(index, 1);
            }
          }

          this.filterBooks();
          console.log(this.filters);
        }
      });

      this.booksList.addEventListener('dblclick', (event) => {
        const clickedElement = event.target;
        const isBookImage =
          clickedElement.offsetParent.classList.contains('book__image');

        if (isBookImage) {
          event.preventDefault();

          const bookId = clickedElement.offsetParent.getAttribute('data-id');

          const isFavorite = this.isBookInFavorites(bookId);

          if (!isFavorite) {
            clickedElement.offsetParent.classList.add('favorite');
            this.favoriteBooks.push(bookId);
          } else {
            clickedElement.offsetParent.classList.remove('favorite');

            const index = this.favoriteBooks.indexOf(bookId);
            if (index !== -1) {
              this.favoriteBooks.splice(index, 1);
            }
          }
        }
      });
    }
  }

  const app = new BooksList();
  console.log(app);
}
