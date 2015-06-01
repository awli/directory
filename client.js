var React = require('react');
var Directory = require('./components/Directory');

var rootProps = JSON.parse(document.getElementById('root-props').innerHTML);

React.render(
  <Directory {...rootProps} />,
  document.getElementById('react-app')
);
