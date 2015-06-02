var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <tr>
        <td> {this.props.result.name} </td>
        <td> {this.props.result.phone} </td>
      </tr>
    )
  }
});
