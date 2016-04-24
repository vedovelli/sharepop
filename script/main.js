
/**
* Additional information about this app:
* 1. Data is being persisted in localStorage
* 2. Writing ES5 was painful =)
*/

var SharePop = {

    dom: {
        prefs: $('#cog a'),
        prefsPane: $('#preferences'),
        todos: $('#todos'),
        todoList: $('#todoList'),
        todoContent: $('#todoContent'),
        todoForm: $('#todoForm'),
        addTodoButton: $('#addTodoButton'),
        markAllFinishedButton: $('#markAllFinishedButton'),
        clearAllFinishedButton: $('#clearAllFinishedButton'),
    },

    data: {
        todos: [],
    },

    methods: {

        setup: function () {
            /**
            * Event listeners
            */
            var d = SharePop.dom,
                m = SharePop.methods;

            d.prefs.on('click', m.togglePreferencesEventHandler);
            d.todos.on('click', '.todo', m.toggleFinishedEventHandler);
            d.addTodoButton.on('click', m.newTodoEventHandler);
            d.todoForm.on('submit', m.newTodoEventHandler);
            d.markAllFinishedButton.on('click', m.markAllFinishedEventHandler);
            d.clearAllFinishedButton.on('click', m.clearAllFinishedEventHandler);

            /**
            * localStorage data retrieval
            */
            var savedList = window.localStorage.getItem('sharepop');
            savedList = JSON.parse(savedList);
            SharePop.data.todos = savedList != null ? savedList.todos : [];

            /**
            * Everytime the list changes this method gets executed
            */
            SharePop.methods.assembleList(SharePop.data.todos);

            SharePop.dom.todoContent.focus();
        },

        togglePreferencesEventHandler: function (ev) {
            ev.preventDefault();
            SharePop.dom.prefsPane.toggleClass('visible');
        },

        hidePreferencesPane: function () {
            SharePop.dom.prefsPane.removeClass('visible');
        },

        clearAllFinishedEventHandler: function (ev) {
            var confirm = window.confirm('Are you sure you want to clear all finished items?');

            if (confirm) {
                SharePop.methods.clearAllFinished(SharePop.data.todos);
                SharePop.methods.hidePreferencesPane();
            }
        },

        clearAllFinished: function (todos) {
            /**
            * Because .splice() makes a mess with the indexes
            * this function gets called recursively, removing
            * finished todos one by one.
            */
            todos.forEach(function (todo, index) {
                if (todo.finished == 1) {
                    todos.splice(index, 1);
                    SharePop.methods.assembleList(SharePop.data.todos);
                    SharePop.methods.clearAllFinished(todos);
                }
            });
        },

        markAllFinishedEventHandler: function (ev) {
            ev.preventDefault();
            SharePop.data.todos.forEach(function (todo) {
                todo.finished = 1;
            });
            SharePop.methods.assembleList(SharePop.data.todos);
        },

        toggleFinishedEventHandler: function () {
            var id = $(this).data('id');
            var todo = SharePop.data.todos.filter(function (t) {
                return t.id == id;
            });
            if (todo.length == 1) {
                SharePop.methods.toggleFinished(todo[0])
            }
        },

        toggleFinished: function (todo) {
            if (todo.finished == 1) {
                todo.finished = 0;
            } else {
                todo.finished = 1;
            }
            SharePop.methods.assembleList(SharePop.data.todos);
        },

        newTodoEventHandler: function (ev) {
            ev.preventDefault();

            var uid = SharePop.methods.uid(),
                val = SharePop.dom.todoContent.val();

            if (val != '') {
                var newTodo = {
                    id: uid,
                    content: val,
                    finished: 0
                };
                SharePop.methods.newTodo(newTodo);
            } else {
                SharePop.dom.todoContent.val('').focus()
            }
        },

        newTodo: function (data) {
            SharePop.data.todos.unshift(data)
            SharePop.methods.assembleList(SharePop.data.todos)
            SharePop.dom.todoContent.val('').focus()
        },

        assembleList: function (todos) {
            var markup = '';
            if (todos.length > 0) {
                todos.forEach(function (todo) {
                    var finished = todo.finished == 1 ? ' finished' : '';
                    markup += '<li class="todo'+ finished +'" data-id="'+ todo.id +'">';
                    markup += '<div>'+ todo.content;
                    markup += '<span class="todo-checkmark"><i class="fa fa-fw fa-check-circle"></i></span>';
                    markup += '</div></li>';
                });
            }
            SharePop.dom.todoList.html(markup);
            SharePop.methods.saveList(todos)
        },

        saveList: function (todos) {
            var obj = { todos: todos };
            obj = JSON.stringify(obj);
            window.localStorage.setItem('sharepop', obj);
        },

        uid: function () {
            return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
        }
    },
};

SharePop.methods.setup();

