var makeSum = function(a, b) {
	if (a && b) {
		try {
			a = parseInt(a, 10);
			b = parseInt(b, 10);
		} catch (e) {
			throw new TypeError('A or B is not a number');
		}

		if (isNaN(a) || isNaN(b)) {
			throw new TypeError('A or B is not a number');
		}

		return a + b;
	} else {
		throw new TypeError('A or B is not exists');
	}
};

module.exports = makeSum;
