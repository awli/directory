var React = require('react');
var ResultEntry = require('./ResultEntry');

module.exports = React.createClass({
  render: function () {
    return (
      <ul>
        {this.props.results.map(function (result) {
          return <ResultEntry result={result}/>
        })}
      </ul>
    )
  }
});
