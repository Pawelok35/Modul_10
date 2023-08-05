('use strict');

// Pusta tablica na ulubione książki
const favoriteBooks = [];

function renderBooks() {
  const booksList = document.querySelector('.books-list');
  const bookTemplate = Handlebars.compile(document.getElementById('template-book').innerHTML);

  for (const book of dataSource.books) {
    const bookHTML = bookTemplate(book);
    const bookElement = utils.createDOMFromHTML(bookHTML);

    booksList.appendChild(bookElement);
  }
}

// Funkcja inicjująca nasłuchiwanie na dwuklik na elementach .book__image
function initActions() {
  const bookImages = document.querySelectorAll('.book__image');

  // Przejdź przez każdy element .book__image i dodaj nasłuchiwacz dla dwukliku (dblclick)
  for (const bookImage of bookImages) {
    bookImage.addEventListener('dblclick', function (event) {
      event.preventDefault();

      // Dodaj klasę 'favorite' do klikniętego elementu
      bookImage.classList.toggle('favorite');

      // Pobierz identyfikator książki z atrybutu data-id klikniętego elementu
      const bookId = bookImage.getAttribute('data-id');

      // Sprawdź, czy identyfikator książki znajduje się już w tablicy favoriteBooks
      const isFavorite = favoriteBooks.includes(bookId);

      // Jeśli książka nie jest jeszcze w tablicy favoriteBooks, dodaj ją
      if (!isFavorite) {
        favoriteBooks.push(bookId);
      } else {
        // W przeciwnym razie usuń ją z tablicy
        const index = favoriteBooks.indexOf(bookId);
        if (index !== -1) {
          favoriteBooks.splice(index, 1);
        }
      }
    });
  }
}

// Wywołaj funkcję renderBooks, aby wyrenderować książki na stronie
renderBooks();

// Wywołaj funkcję initActions, aby dodać nasłuchiwanie na dwuklik na elementach .book__image
initActions();