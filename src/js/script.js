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
  const booksList = document.querySelector('.books-list');

  booksList.addEventListener('dblclick', function (event) {
    const clickedElement = event.target;
    const isBookImage = clickedElement.offsetParent.classList.contains('book__image');

    if (isBookImage) {
      event.preventDefault();

      // Sprawdź, czy kliknięty element ma klasę 'favorite'
      const isFavorite = clickedElement.offsetParent.classList.contains('favorite');
      // Pobierz identyfikator książki z atrybutu data-id klikniętego elementu
      const bookId = clickedElement.offsetParent.getAttribute('data-id');

      // Dodaj lub usuń klasę 'favorite' w zależności od tego, czy książka jest oznaczona jako ulubiona
      if (!isFavorite) {
        clickedElement.offsetParent.classList.add('favorite');
        // Dodaj identyfikator książki do tablicy favoriteBooks
        favoriteBooks.push(bookId);
      } else {
        clickedElement.offsetParent.classList.remove('favorite');
        // Usuń identyfikator książki z tablicy favoriteBooks
        const index = favoriteBooks.indexOf(bookId);
        if (index !== -1) {
          favoriteBooks.splice(index, 1);
        }
      }
    }
  });

}

renderBooks();

// Wywołaj funkcję initActions, aby dodać nasłuchiwanie na dwuklik na elementach .book__image
initActions();