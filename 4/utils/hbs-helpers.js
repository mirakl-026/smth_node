module.exports = {
    ifeq(a, b, options) {
        // console.log(a, b)
        if (a === null || b === null)
            return options.inverse(this);

        if (a.toString() === b) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
}