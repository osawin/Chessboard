const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

var state = {};

app.use(express.static('dist'));
app.post('/api/getUsername', function (req, res) {
	var apple = req.body.word;
	//var cap = apple.word;
	//apple = JSON.stringify(apple);
	res.send({ username: " mark " + apple })
})
app.post('/api/save', function (req, res) {
	//state = req.body;
	fs.writeFile("test.txt", JSON.stringify(req.body));
})
app.get('/api/load', function (req, res) {
	var text = fs.readFileSync("test.txt", 'utf8');
	text = JSON.parse(text);
	res.send(text);
})
app.listen(8080, () => console.log('Listening on port 8080!'));