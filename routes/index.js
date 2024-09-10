const express = require('express');
const indexController = require('../controllers/indexController');
const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/',indexController.index);

module.exports = router;
