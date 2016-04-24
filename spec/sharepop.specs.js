

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

    it('should return a 4 char string', function () {
        var uid = SharePop.methods.uid();
        expect(uid).to.be.a('string');
        expect(uid).to.have.length(4);
    });
});