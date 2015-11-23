var makeSum = require('./custom');

describe('check function "makeSum"', function () {
	it('1 should return digit', function () {
		expect(makeSum(4, 9)).toEqual(13);
	});

	it('2 should return number', function () {
		expect(makeSum('4', '9')).toEqual(13);
	});

	it('3 should return Error', function () {
		expect(function() { makeSum('4');}).toThrowError(TypeError, 'A or B is not exists');
	});

	it('4 should return Error', function () {
		expect(function() { makeSum('temp text', 'lerem ipsum');}).toThrowError(TypeError, 'A or B is not a number');
	});
});

