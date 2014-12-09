var bookListTemplate;
var editBookTemplate;
var newBookTemplate;

//Compile all templates on document ready

(function() {
	var bookListTemplateSource = $("#book-list-template").html();
	bookListTemplate = Handlebars.compile(bookListTemplateSource);

	var editBookTemplateSource = $("#edit-book-template").html();
	editBookTemplate = Handlebars.compile(editBookTemplateSource);

	var newBookTemplateSource = $("#new-book-template").html();
	newBookTemplate = Handlebars.compile(newBookTemplateSource);
})();

//Set up books collection

var Books = Backbone.Collection.extend({
	url: "http://daretodiscover.net/books"
});

var books = new Books();

//Set up book model

var Book = Backbone.Model.extend({
	urlRoot: "http://daretodiscover.net/books"
});

//Set up book list view

var BookList = Backbone.View.extend({
	el: "#container",

	render: function() {
		var that = this;
		books.fetch({
			success: function() {
				var html = bookListTemplate({
					allBooks: books.models
				});

				//$("#container").html(html);
				that.$el.html(html);
			}
		});
	}
});

//Set up edit book view

var EditBook = Backbone.View.extend({
	el: "#container",

	render: function(id) {
		var that = this;
		var book = new Book({
			id: id
		});

		book.fetch({
			success: function() {
				var html = editBookTemplate({
					bookInfo: book
				});

				//$("#container").html(html);
				that.$el.html(html);
			}
		});
	}
});

//Set up routes

var Router = Backbone.Router.extend({
	routes: {
		"":"index",
		"edit/:id":"edit_book",
		"new":"new_book"
	}
});

var router = new Router();

//Define each route action

//Index route
router.on("route:index", function() {
	var booklist = new BookList();
	booklist.render();
});

//Edit book route
router.on("route:edit_book", function(id) {
	var editbook = new EditBook();
	editbook.render(id);
});

//Show new book form
router.on("route:new_book", function() {
	var html = newBookTemplate();

	$("#container").html(html);
});

//Start the history

Backbone.history.start();