var express = require('express');
var router = express.Router();
var React = require('react');
var Directory = require('../components/Directory');

/* GET home page. */
router.get('/', function(req, res, next) {
  var rootProps = {}

  var markup = React.renderToString(<Directory {...rootProps}/>);

  res.render('home',
    {markup: markup, rootProps: JSON.stringify(rootProps)});
});

module.exports = router;
