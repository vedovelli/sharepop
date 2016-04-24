

describe('task manager', function () {

    it('should return a 4 char string', function () {
        var uid = SharePop.methods.uid();
        expect(uid).to.be.a('string');
        expect(uid).to.have.length(4);
    });
});