const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
mongoose.connect('mongodb://localhost/testblog', { useNewUrlParser: true });
mongoose.set('debug', true);

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'TestBlog', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials',true);
  next();
})

require('./models/Posts');
app.use(require('./routes'));

/* Server ERROR codes */
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

if(!isProduction) {
	app.use((err,req,res) => {
		res.status(err.status || 500);
		res.json({
			errors: {
				message: err.message,
				error: err
			}
		})
	})
}

const server = app.listen(8080, () => console.log('Listening on 8080!'));