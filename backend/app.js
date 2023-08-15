const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const {
  validationLogin,
  validationCreateUser,
} = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login, logout } = require('./controllers/users');
const NotFound = require('./utils/not-found');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } =
  process.env;

const app = express();

// app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(
  cors({ origin: 'https://mesto.yanika90.nomoreparties.co', credentials: true })
);

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.post('/signout', logout);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFound('Указанный путь не найден'));
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('База данных подключена');
  })
  .catch(() => {
    console.log('База данных не подключена');
  });

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
