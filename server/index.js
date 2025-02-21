const express = require('express');
const path = require('path');
const axios = require('axios');

const { Merchants, Users, Products, Reviews, Subs, Admins } = require('./db.js');

const app = express();
const PORT = 8080;
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
app.use(express.static(CLIENT_PATH));

/**
 * start authentication routes
 */

const passport = require('passport');
require('./passport-setup');
app.use(express.json());
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('hello from google callback');
    console.log(req.user.displayName);
    console.log(req.user.emails[0].value);
    //console.log(req.user.photos[0].value);
    res.redirect('/');
  }
);
// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//check to see if user is logged in
app.get('/testing', (req, res)=>{
  if (req.user) {
    res.send(req.user);
  } else {
    res.send('not logged in');
  }
});

//login failed
app.get('/failed', (req, res) => {
  req.logout();
  res.redirect('/');
});

/**
 * end authentication routes
 */

// app.get('/login', (req, res) => {
//   res.send('<a href="/google"> Login </a>');
// })




/**
 * Merchants
 */

//get all merchants
 app.get('/merchants', (req, res) => {
  Merchants.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//add new merchant
app.post('/addmerchant/:name', (req, res) => {
  const { name } = req.params;
  Merchants.findAll({
    where: {name: name}
  })
    .then(results => {
      if (!results.length) {
        Merchants.create({ name })
          .then(Merchants.findAll({
            where: {}
          })).then(data => res.send(data))
      } else {
        res.send(`${name} is already a pop-up`);
      }
    })
    .catch(err => res.send(err));
});
//delete merchant
app.delete('/deletemerchant/:id', (req, res) => {
  const { id } = req.params;
  Merchants.destroy({
    where: {id: id}
  })
    .then(res.send(`merchant ${id} deleted`));
});
//delete all merchants
app.delete('/deleteallmerchants', (req, res) => {
  Merchants.destroy({
    where: {}
  })
    .then(res.send('no more merchants'))
    .catch(err => res.send(err));
});

/**
 * Users
 */

//get all users
app.get('/users', (req, res) => {
  Users.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//add new user
app.post('/adduser/:name', (req, res) => {
  const { name } = req.params;
  Users.create({ name })
    .then(Users.findAll({
      where: {}
    })).then(data => res.send(data))
    .catch(err => res.send(err));
});
//delete user
app.delete('/deleteuser/:id', (req, res) => {
  const { id } = req.params;
  Users.destroy({
    where: {id: id}
  })
    .then(res.send(`user ${id} deleted`));
});
//delete all users
app.delete('/deleteallusers', (req, res) => {
  Users.destroy({
    where: {}
  })
    .then(res.send('no more users'))
    .catch(err => res.send(err));
});

/**
 * Products
 */

//get all products
app.get('/products', (req, res) => {
  Products.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//add new product
app.post('/addproduct/:name', (req, res) => {
  const { name } = req.params;
  Products.create({ name })
    .then(Products.findAll({
      where: {}
    })).then(data => res.send(data))
    .catch(err => res.send(err));
});
//delete product
app.delete('/deleteproduct/:id', (req, res) => {
  const { id } = req.params;
  Products.destroy({
    where: {id: id}
  })
    .then(res.send(`product ${id} deleted`));
});
//delete all products
app.delete('/deleteallproducts', (req, res) => {
  Products.destroy({
    where: {}
  })
    .then(res.send('no more products'))
    .catch(err => res.send(err));
});

/**
 * Reviews
 */

//get all reviews
app.get('/reviews', (req, res) => {
  Reviews.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//add new review
app.post('/addreview/:user/:merchant/:rating/:message', (req, res) => {
  const { user, merchant, rating, message } = req.params;
  Reviews.create({ user, merchant, rating, message })
    .then(Reviews.findAll({
      where: {}
    })).then(data => res.send(data))
    .catch(err => res.send(err));
});
//delete review
app.delete('/deletereview/:id', (req, res) => {
  const { id } = req.params;
  Reviews.destroy({
    where: {id: id}
  })
    .then(res.send(`review ${id} deleted`));
});
//delete all reviews
app.delete('/deleteallreviews', (req, res) => {
  Reviews.destroy({
    where: {}
  })
    .then(res.send('no more reviews'))
    .catch(err => res.send(err));
});

/**
 * Subs
 */

//get all subs
app.get('/subs', (req, res) => {
  Subs.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//add new sub
app.post('/addsub/:user/:merchant', (req, res) => {
  const { user, merchant } = req.params;
  Subs.findAll({
    where: {user: user, merchant: merchant}
  })
    .then(results => {
      if (!results.length) {
        Subs.create({ user, merchant })
          .then(Subs.findAll({
            where: {}
          })).then(data => res.send(data))
      } else {
        res.send(`${user} is already following ${merchant}`);
      }
    })
    .catch(err => res.send(err));
});
//delete sub
app.delete('/deletesub/:id', (req, res) => {
  const { id } = req.params;
  Subs.destroy({
    where: {id: id}
  })
    .then(res.send(`sub ${id} deleted`));
});
//delete all subs
app.delete('/deleteallsubs', (req, res) => {
  Subs.destroy({
    where: {}
  })
    .then(res.send('no more subs'))
    .catch(err => res.send(err));
});

/**
 * Admins
 */

//get all subs
app.get('/admins', (req, res) => {
  Admins.findAll({
    where: {}
  })
    .then(data => res.send(data))
    .catch(err => res.send(err));
});
//add new sub
app.post('/addadmin/:user/:merchant', (req, res) => {
  const { user, merchant } = req.params;
  Admins.findAll({
    where: {user: user, merchant: merchant}
  })
    .then(results => {
      if (!results.length) {
        Admins.create({ user, merchant })
          .then(Admins.findAll({
            where: {}
          })).then(data => res.send(data))
      } else {
        res.send(`${user} is already administrating ${merchant}`);
      }
    })
    .catch(err => res.send(err));
});
//delete sub
app.delete('/deleteadmin/:id', (req, res) => {
  const { id } = req.params;
  Admins.destroy({
    where: {id: id}
  })
    .then(res.send(`admin ${id} deleted`));
});
//delete all subs
app.delete('/deletealladmins', (req, res) => {
  Admins.destroy({
    where: {}
  })
    .then(res.send('no more admins'))
    .catch(err => res.send(err));
});

app.listen(PORT, (() => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
}));
