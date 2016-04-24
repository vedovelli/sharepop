

describe('task manager', function () {

    it('should add 2 todos to the list', function () {
        var i = 0,
            stored = SharePop.methods.getSavedList();

        while (i < 2) {
            SharePop.methods.newTodo({
                id: SharePop.methods.uid(),
                content: 'Any content',
                finished: 0
            });
            i++;
        }

        expect(SharePop.data.todos.length).to.equal(stored.length + 2);
    });

    it('should mark 2 items above as finished', function () {
        var i = 0;
        while (i < 2) {
            var todo = SharePop.data.todos[i];
            SharePop.methods.toggleFinished(todo);
            i++;
        }
        expect(SharePop.data.todos[0].finished).to.equal(1);
        expect(SharePop.data.todos[1].finished).to.equal(1);
    });

    it('should mark 2 items above as unfinished', function () {
        var i = 0;
        while (i < 2) {
            var todo = SharePop.data.todos[i];
            SharePop.methods.toggleFinished(todo);
            i++;
        }
        expect(SharePop.data.todos[0].finished).to.equal(0);
        expect(SharePop.data.todos[1].finished).to.equal(0);
    });

    it('should mark all items as finished', function () {
        SharePop.methods.markAllFinished();
        var finished = SharePop.data.todos.filter(function (todo) {
            return todo.finished == 0;
        });
        expect(finished.length).to.equal(0);
    });

    it('should remove all finished items', function () {
        SharePop.methods.clearAllFinished(SharePop.data.todos);
        var finished = SharePop.data.todos.filter(function (todo) {
            return todo.finished == 1;
        });
        expect(finished.length).to.equal(0);
    });

    it('UID should return a 4 char string', function () {
        var uid = SharePop.methods.uid();
        expect(uid).to.be.a('string');
        expect(uid).to.have.length(4);
    });
});