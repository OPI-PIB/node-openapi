module.exports = {
	forceExit: true,
	verbose: true,
	collectCoverage: false,
	moduleFileExtensions: ["ts", "js"],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				tsconfig: "./tests/tsconfig.spec.json",
			},
		],
	},
	testMatch: ["./**/*.spec.ts"],
};
