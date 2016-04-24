
var SharePop = {

    dom: {
        $output: $('#output'),
        $todos: $('#todos'),
        $todoList: $('#todoList'),
        $newTodo: $('#newTodo'),
        $todoContent: $('#todoContent'),
        $todoForm: $('#todoForm'),
        $addTodoButton: $('#addTodoButton'),
        $markAllCompletedButton: $('#markAllCompletedButton'),
    },

    data: {
        todos: [],
    },

    methods: {

        setup: function () {
            $('body').on('dblclick', SharePop.methods.clearAllCompletedEventHandler)
            SharePop.dom.$todos.on('click', '.todo', SharePop.methods.toggleCompletedEventHandler);
            SharePop.dom.$addTodoButton.on('click', SharePop.methods.newTodoEventHandler);
            SharePop.dom.$todoForm.on('submit', SharePop.methods.newTodoEventHandler);
            SharePop.dom.$markAllCompletedButton.on('click', SharePop.methods.markAllCompletedEventHandler);

            var savedList = window.localStorage.getItem('sharepop');
            savedList = JSON.parse(savedList);
            SharePop.data.todos = savedList.todos || [];

            SharePop.methods.assembleList(SharePop.data.todos);

            SharePop.dom.$todoContent.focus();
        },

        clearAllCompletedEventHandler: function (ev) {
            var confirm = window.confirm('Are you sure you want to clear ALL your list? This CANNOT be undone.');

            if (confirm) {
                SharePop.methods.clearAllCompleted();
            }
        },

        clearAllCompleted: function () {
            SharePop.data.todos = [];
            SharePop.methods.assembleList(SharePop.data.todos);
        },

        markAllCompletedEventHandler: function (ev) {
            ev.preventDefault();
            SharePop.data.todos.forEach(function (todo) {
                todo.completed = 1;
            });
            SharePop.methods.assembleList(SharePop.data.todos);
        },

        toggleCompletedEventHandler: function () {
            var id = $(this).data('id');
            var todo = SharePop.data.todos.filter(function (t) {
                return t.id == id;
            });
            if (todo.length == 1) {
                SharePop.methods.toggleCompleted(todo[0])
            }
        },

        toggleCompleted: function (todo) {
            if (todo.completed == 1) {
                todo.completed = 0;
            } else {
                todo.completed = 1;
            }
            SharePop.methods.assembleList(SharePop.data.todos);
        },

        newTodoEventHandler: function (ev) {
            ev.preventDefault();
            var next = SharePop.data.todos.length + 1;
            var val = SharePop.dom.$todoContent.val()
            if (val != '') {
                var newTodo = {
                    id: next,
                    content: val,
                    completed: 0
                };
                SharePop.methods.newTodo(newTodo);
            } else {
                SharePop.dom.$todoContent.val('').focus()
            }
        },

        newTodo: function (data) {
            SharePop.data.todos.unshift(data)
            SharePop.methods.assembleList(SharePop.data.todos)
            SharePop.dom.$todoContent.val('').focus()
        },

        assembleList: function (todos) {
            var markup = '';
            if (todos.length > 0) {
                todos.forEach(function (todo) {
                    var completed = todo.completed == 1 ? ' completed' : '';
                    markup += '<li class="todo'+ completed +'" data-id="'+ todo.id +'">';
                    markup += '<div>'+ todo.content;
                    markup += '<span class="todo-checkmark"><i class="fa fa-fw fa-check-circle"></i></span>';
                    markup += '</div></li>';
                });
            }
            SharePop.dom.$todoList.html(markup);
            SharePop.methods.saveList(todos)
        },

        saveList: function (todos) {
            var obj = { todos: todos };
            obj = JSON.stringify(obj);
            window.localStorage.setItem('sharepop', obj);
        }
    },
};

SharePop.methods.setup();

