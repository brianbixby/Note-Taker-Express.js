"use strict";

const compression = require('compression');
const express = require('express');
const debug = require('debug')('noteTaker:server');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const notes = require('./db/db.json');

app.use(compression());
app.use(cors());

app.use(express.static(`${__dirname}/public`));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/index.html'), err => {
		if (err) {
			res.status(500).send(err)
		}
	})
)

app.get('/notes', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/notes.html'), err => {
		if (err) {
			res.status(500).send(err)
		}
	})
)

app.get('/api/notes', (req, res) => {
	// Log our request to the terminal
	console.info(`${req.method} request received to get notes`);

	// Sending all notes to the client
	return res.json(notes);
});

app.post('/api/notes', (req, res) => {
	// Log that a POST request was received
	console.info(`${req.method} request received to add a review`);

	// Prepare a response object to send back to the client
	let response;

	// Check if there is anything in the response body
	if (req.body && req.body.title && req.body.text) {
		response = {
			status: 'success',
			data: req.body,
		};
		res.json(`Review for ${response.data.title} has been added!`);
	} else {
		res.json('Request body must at least contain a note title and text');
	}

	// Log the response body to the console
	console.log(req.body);
});

app.post('/api/notes', (req, res) => {
	// Log that a POST request was received
	console.info(`${req.method} request received to add a review`);

	// Prepare a response object to send back to the client
	let response;

	// Check if there is anything in the response body
	if (req.body && req.body.title && req.body.text) {
		response = {
			status: 'success',
			data: req.body,
		};
		res.json(`Review for ${response.data.title} has been added!`);
	} else {
		res.json('Request body must at least contain a note title and text');
	}

	// Log the response body to the console
	console.log(req.body);
});

app.listen(PORT, () => debug(`listening on ${PORT}`));