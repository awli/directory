var React = require('react');
var QueryBar = require('./QueryBar');
var Results = require('./Results');

module.exports = React.createClass({
  render: function () {
    var fakeResults = [
      {name: 'Oski Bear', phone: '5551234'},
      {name: 'Oski Bear', phone: '5551234'},
      {name: 'Oski Bear', phone: '5551234'},
      {name: 'John ', phone: '5551234'}
    ];
    return (
      <div className="container-fluid">
        <h1>Directory Lookup</h1>
        <QueryBar />
        <Results {...this.props} results={fakeResults}/>
      </div>
    )
  }
});
