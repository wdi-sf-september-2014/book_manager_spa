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

router.on("route:index", function() {
	var html = bookListTemplate();

	$("#container").html(html);
});

router.on("route:edit_book", function(id) {
	var html = editBookTemplate();

	$("#container").html(html);
});

router.on("route:new_book", function() {
	var html = newBookTemplate();

	$("#container").html(html);
});

//Start the history

Backbone.history.start();