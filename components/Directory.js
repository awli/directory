var React = require('react');
var QueryBar = require('./QueryBar');
var Results = require('./Results');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        <h1>Directory Lookup</h1>
        <QueryBar />
        <Results {...this.props}/>
      </div>
    )
  }
});
