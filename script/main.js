
var app = {

    /**
    * DOM
    */
    $output: $('#output'),
    $todos: $('#todos'),
    $todoList: $('#todoList'),

    /**
    * Data
    */
    todos: [
        { id: 1, title: 'Test 1' },
        { id: 2, title: 'Test 2' },
        { id: 3, title: 'Test 3' },
        { id: 4, title: 'Test 4' },
        { id: 5, title: 'Test 5' },
    ],

    assembleList: function (todos) {
        var markup = '';
        if (todos.length > 0) {
            todos.forEach(function (todo) {
                markup += '<li data-id="'+ todo.id +'">'+ todo.title +'</li>';
            });
        }
        this.$todoList.html(markup);
    }
};
