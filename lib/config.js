require('dotenv').config();

module.exports = {
	development: {
		url: process.env.DATABASE_URL,
		dialect: 'postgres'
	},
	test: {
		url: 'postgres://postgres:postgres@0.0.0.0:5432/notes_api_test',
		dialect: 'postgres'
	}
};