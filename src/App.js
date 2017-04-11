import React, { Component } from 'react';

class DomainTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentTable: []
    }
  }

  displayCheck(domainInformation){
    if (domainInformation === 1) {
      return <img src="http://www.virtualpitchfest.com/assets/Uploads/homenolgcheck.gif" alt="Uniregistry" style={{height:22}} />;
    }
  }

  createTableArray() {
    var domains = require('../assets/domains.json');
    var tableArray = [];
    domains.domains.forEach((elem, index) => {
      tableArray.push(
        <tr key={domains.domains[index].domain}>
          <td><a href={domains.domains[index].domain}>{domains.domains[index].domain}</a></td>
          <td>{this.displayCheck(domains.domains[index].id)}</td>
          <td>${(domains.domains[index].price/100).toFixed(2)}</td>
        </tr>
        );
    });
    this.setState({currentTable: tableArray});
  }

  componentWillMount() {
    this.createTableArray();
  }

  render() {
    return (
      <div className="table-striped">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Domain Name</th>
              <th>Uniregistry</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.currentTable}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DomainTable;