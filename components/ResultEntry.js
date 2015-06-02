var React = require('react');

module.exports = React.createClass({
  phoneLink: function () {
    return 'tel://' + this.props.result.phone;
  },
  render: function () {
    return (
      <tr>
        <td> {this.props.result.name} </td>
        <td>
          <a href={this.phoneLink()}>
            {this.props.result.phone}
          </a>
        </td>
      </tr>
    )
  }
});
