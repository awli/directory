var React = require('react');
var Input = require('react-bootstrap').Input;
var QueryActionCreators = require('../actions/QueryActionCreators');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      value: ''
    };
  },

  onChange: function () {
    this.setState({
      value: this.refs.input.getValue()
    });
    QueryActionCreators.queryPerson(this.refs.input.getValue());
  },

  render: function () {
    return (
      <Input
        type='text'
        value={this.state.value}
        placeholder='Who are you looking for?'
        ref='input'
        autoFocus
        groupClassName='group-class'
        labelClassName='label-class'
        onChange={this.onChange} />
    );
  }
});
