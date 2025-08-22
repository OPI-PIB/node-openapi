module.exports = function (hbs) {
	hbs.registerHelper("isNullable", function (item) {
		return item.schema?.nullable;
	});
};
