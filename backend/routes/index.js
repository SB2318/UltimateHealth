 const usersRoutes = require('../routes/usersRoutes');

module.exports = (app) =>{
    app.use('/getUsers', usersRoutes);
};

const authRoutes = require('./auth');
const homeRoutes = require('./home');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/home', homeRoutes);
};