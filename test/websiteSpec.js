describe('As a test test', function() {

    // Enables chai should syntax
    //
    // rather than assert.equals(valueOne, valueTwo)
    //
    // valueOne.should.equal(valueTwo);
    chai.should();

    // before('Runs before ANY tests have run', function(){

    // });

    // beforeEach('Runes before each individual test has run',function() {

    // });

    describe('When I test', function() {

        it('should complete test, checking that true is equal to true', function() {
            expect(true).to.be.true;
        });

    });

    // afterEach('Runs after each individual test has run', function() {

    // });

    // after('Runs after ALL tests have run', function() {

    // });

});
