var React = require('react');
var QueryBar = require('./QueryBar');
var Results = require('./Results');
var PageHeader = require('react-bootstrap').PageHeader;
var DirectoryStore = require('../stores/DirectoryStore');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      results: []
    }
  },

  onChange: function () {
    this.setState({
      results: DirectoryStore.getResults()
    })
  },

  componentDidMount: function () {
    DirectoryStore.on('change', this.onChange);
  },

  componentWillUnmount: function () {
    DirectoryStore.off('change', this.onChange);
  },

  render: function () {
    return (
      <div className="container">
        <PageHeader>Directory Lookup</PageHeader>
        <QueryBar />
        <Results {...this.props} results={this.state.results}/>
      </div>
    )
  }
});
