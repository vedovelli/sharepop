
var SharePop = {

    dom: {
        $output: $('#output'),
        $todos: $('#todos'),
        $todoList: $('#todoList'),
    },

    data: {
        todos: [
            { id: 1, title: 'Test 1' },
            { id: 2, title: 'Test 2' },
            { id: 3, title: 'Test 3' },
            { id: 4, title: 'Test 4' },
            { id: 5, title: 'Test 5' },
        ],
    },

    methods: {

        setup: function () {
            SharePop.dom.$todos.on('click', '.todo', function () {
                window.console.log(this)
            });
        },

        assembleList: function (todos) {
            var markup = '';
            if (todos.length > 0) {
                todos.forEach(function (todo) {
                    markup += '<li class="todo" data-id="'+ todo.id +'">'+ todo.title +'</li>';
                });
            }
            SharePop.dom.$todoList.html(markup);
        }
    },
};

SharePop.methods.setup();
SharePop.methods.assembleList(SharePop.data.todos);
