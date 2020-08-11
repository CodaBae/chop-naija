const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Product = require('../models/Product');
const User = require('../models/User');

 
// Welcome Page
router.get('/', (req, res) => {
  Product.find({}, function (err, product) {
    let url = req.protocol + '://' + req.get('host') + req.originalUrl
    let id = url.replace("http://www.chopnaija.com/?id=", '')

    console.log()

    if (id === 'http://www.chopnaija.com/'){  
    
    req.flash(
      'success_msg',
      'you need to login or register'
    );
    res.redirect('/users/login');
    }else{

      User.findOne({ _id: id }).then(user => {
        res.render('index', { product: product, user:user.cart });
  
      }) 
    }
  });
});

// Dashboard
router.get('/vendor', ensureAuthenticated, (req, res) => {
  res.render('vendor', {
    user: req.user
  })


});


router.get('/add_product', ensureAuthenticated, (req, res) =>
  res.render('addProducts', {
    user: req.user
  })
);




module.exports = router;
