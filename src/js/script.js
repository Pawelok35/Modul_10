{
  ('use strict');
  
  function renderBooks() {
    const booksList = document.querySelector('.books-list');
    const bookTemplate = Handlebars.compile(document.getElementById('template-book').innerHTML);
  
    for (const book of dataSource.books) {
      // Wygeneruj kod HTML na podstawie szablonu oraz danych o konkretnej książce
      const bookHTML = bookTemplate(book);
  
      // Utwórz element DOM z kodu HTML przy użyciu utils.createDOMFromHTML()
      const bookElement = utils.createDOMFromHTML(bookHTML);
  
      // Dołącz wygenerowany element DOM jako nowe dziecko DOM do listy .books-list
      booksList.appendChild(bookElement);
    }
  }
  renderBooks();
}