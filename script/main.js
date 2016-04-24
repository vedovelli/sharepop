
/**
* Additional information about this app:
* 1. Data is being persisted in localStorage
* 2. Writing ES5 was painful =)
*/

var SharePop = {

    dom: {
        prefs: $('#cog a'),
        prefsPane: $('#preferences'),
        mainContainer: $('#mainContainer'),
        todos: $('#todos'),
        todoList: $('#todoList'),
        todoContent: $('#todoContent'),
        todoForm: $('#todoForm'),
        addTodoButton: $('#addTodoButton'),
        markAllFinishedButton: $('#markAllFinishedButton'),
        clearAllFinishedButton: $('#clearAllFinishedButton'),
        themeSwitcher: $('.themeSwitcher'),
    },

    data: {
        todos: [],
        currentTheme: 'sleek'
    },

    methods: {

        setup: function () {
            /**
            * Event listeners
            */
            var d = SharePop.dom,
                m = SharePop.methods;

            d.themeSwitcher.on('change', m.switchTheme);
            d.prefs.on('click', m.togglePreferencesEventHandler);
            d.todos.on('click', '.todo-sleek, .todo-full', m.toggleFinishedEventHandler);
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

        switchTheme: function (ev) {
            var container = SharePop.dom.mainContainer;
            container.removeClass('sleek');
            container.removeClass('full');
            container.addClass(ev.currentTarget.value);

            SharePop.data.currentTheme = ev.currentTarget.value;
            SharePop.methods.assembleList(SharePop.data.todos);
            SharePop.methods.hidePreferencesPane();
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
            ev.preventDefault();
            var confirm = window.confirm('Are you sure you want to clear all finished items?');

            if (confirm) {
                SharePop.methods.clearAllFinished(SharePop.data.todos);
                SharePop.methods.hidePreferencesPane();
            }
            SharePop.methods.notify('All finished are now cleared');
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
            SharePop.methods.notify('All todos are now finished');
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
                SharePop.methods.notify('You added ' + todo.content + ' back to the list', 'warning');
            } else {
                todo.finished = 1;
                SharePop.methods.notify('Todo ' + todo.content + ' is now finished');
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
            SharePop.data.todos.unshift(data);
            SharePop.methods.assembleList(SharePop.data.todos);
            SharePop.dom.todoContent.val('').focus();
            SharePop.methods.notify('Todo succesfully added');
        },

        assembleList: function (todos) {
            var markup = '';
            if (todos.length > 0) {
                todos.forEach(function (todo, index) {
                    var finished = todo.finished == 1 ? ' finished' : '';
                    var evenOddEl = '';

                    if (SharePop.data.currentTheme == 'full') {
                        if (index % 2 == 1) {
                            evenOddEl = 'even';
                        } else {
                            evenOddEl = 'odd';
                        }
                        markup += '<li>';
                        markup += '<ul class="ul-full">';
                        if (evenOddEl == 'even') {
                            markup += '<li class="even">&nbsp;</li>';
                        }
                        markup += '<li class="todo-full'+ finished +' '+ evenOddEl +'" data-id="'+ todo.id +'">';
                        markup += '<div class="todoContent">'+ todo.content;
                        markup += '<span class="todo-checkmark"><i class="fa fa-fw fa-check-circle"></i></span>';
                        markup += '</div>';
                        markup += '</li>';
                        if (evenOddEl == 'odd') {
                            markup += '<li class="odd">&nbsp;</li>';
                        }
                        markup += '</ul>';
                        markup += '</li>';
                    }

                    if (SharePop.data.currentTheme == 'sleek') {
                        markup += '<li class="todo-sleek'+ finished +'" data-id="'+ todo.id +'">';
                        markup += '<div class="todoContent">'+ todo.content;
                        markup += '<span class="todo-checkmark"><i class="fa fa-fw fa-check-circle"></i></span>';
                        markup += '</div>';
                        markup += '</li>';
                    }

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
        },

        notify: function (message, type) {
            var obj = { message: message, location: 'tl' };
            switch (type) {
                case 'error':
                    $.growl.error(obj);
                    break;
                case 'warning':
                    $.growl.warning(obj);
                    break;
                default:
                    $.growl.notice(obj);
                    break;
            }
        }
    },
};

SharePop.methods.setup();

