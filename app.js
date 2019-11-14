const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

mongoose.Promise = global.Promise;

const projectRoutes = require('./routes/projects');
const projectDetailRoutes = require ('./routes/project-details');

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); //Вместо '*' свой сервер
	res.header(
		"Access-Control-Allow-Headers", 
		"Origin, X-Requsted-With, Content-Type, Accept, Authorization"
	);
	if (req.method === 'OPTIONS') {
		res.hedaer('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(
	'mongodb://localhost:27017/turaev-db',
	{
		useUnifiedTopology: true,
		useNewUrlParser: true
	}
);

app.use('/api/projects', projectRoutes);
app.use('/api/project-details', projectDetailRoutes);

module.exports = app;