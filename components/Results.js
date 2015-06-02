var React = require('react');
var ResultEntry = require('./ResultEntry');
var Table = require('react-bootstrap').Table;

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      results: []
    };
  },
  render: function () {
    if (this.props.results.length == 0) return <div></div>

    return (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {this.props.results.map(function (result) {
            return <ResultEntry key={result.name} result={result}/>
          })}
        </tbody>
      </Table>
    )
  }
});
