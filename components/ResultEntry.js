var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <li>
        <p> {this.props.result.name} </p>
        <p> {this.props.result.phone} </p>
      </li>
    )
  }
});
