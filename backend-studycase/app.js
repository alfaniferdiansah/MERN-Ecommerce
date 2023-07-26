var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
var indexRouter = require('./routes/index');
const cors = require('cors');
var app = express();
const { NOT_FOUND_PATH } = require('./constant/errorCode');
const { NOT_FOUND, ERROR_SERVER } = require('./constant/errorHttp');
const { PATH_NOT_FOUND } = require('./constant/errorMessage');
const HttpError = require('./interface/httpError');
const ResponseMiddleware = require('./middleware/responseMiddleware');


var allowedOrigins = [
  "http://localhost:3000",
  "https://mern-ecommerce-tawny.vercel.app"
]

app.use(cors({

  origin: function(origin, callback){
    
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },

  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],

  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./middleware/passport-local-strategy');


require('./middleware/passport-jwt-strategy');
app.use(indexRouter);

app.use(ResponseMiddleware.response)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new HttpError(PATH_NOT_FOUND, NOT_FOUND, NOT_FOUND_PATH);
  throw error;
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
      return next(error);
  }
  res.status(error.status || ERROR_SERVER).json({ message : error.message, code: error.code });
})


module.exports = app;
