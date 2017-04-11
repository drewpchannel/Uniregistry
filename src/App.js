import React, { Component } from 'react';
import $ from 'jquery';
import domains from '../assets/domains.json'

class DomainTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentTable: [],
      domains: {},
      editorForm: {}
    }
  }

  displayCheck(domainInformation){
    if (domainInformation === 1) {
      return <img src="http://www.virtualpitchfest.com/assets/Uploads/homenolgcheck.gif" alt="Uniregistry" style={{height:22}} />;
    }
  }

  createTableArray(currentDomains) {
    var tableArray = [];
    currentDomains.forEach((elem, index) => {
      tableArray.push(
        <tr key={currentDomains[index].domain}>
          <td><a href="#" onClick={this.loadEditor.bind(this)}>{currentDomains[index].domain}</a></td>
          <td>{this.displayCheck(currentDomains[index].id)}</td>
          <td>${(currentDomains[index].price/100).toFixed(2)}</td>
        </tr>
        );
    });
    this.setState({currentTable: tableArray});
  }

  componentWillMount() {
    this.createTableArray(domains.domains);
    this.setState({domains: domains})
  }

  loadEditor(linkClicked){
    $('#mainTable').hide();
    var foundData = {};
    domains.domains.forEach((elem, index) => {
      if (elem.domain === linkClicked.target.text) {
        foundData = domains.domains[index];
      }
    });
    this.setState({editorForm: foundData});
    console.log(this.state)
    $('#editor').show();
  }

  saveButton() {
    $('#mainTable').show();
    $('#editor').hide();
    var tableChanges = this.state.domains.domains;
    tableChanges.forEach((elem, index) => {
      if (tableChanges[index].domain === $('#domainName')[0].placeholder) {
        tableChanges.splice(index, 1);
        tableChanges.push({
          domain: $('#domainName')[0].value,
          email: $('#registranEmail')[0].value,
          price: $('#priceValue')[0].value
        })
      }
    });
    this.createTableArray(tableChanges);
  }

  render() {
    return (
      <div className="table-striped">
        <table id="mainTable" className="table table-striped">
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
        <div id="editor" style={{display:'none'}}>
          
          <form className="form-horizontal" style={{maxWidth:'600px'}}>
            <div className="form-group">
              <label className="control-label col-sm-2">Domain Name:</label>
              <div className="col-sm-10">
                <input className="form-control" id="domainName" placeholder={this.state.editorForm.domain}></input>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2">Registran Email:</label>
              <div className="col-sm-10"> 
                <input className="form-control" id="registranEmail" placeholder="Enter email"></input>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2">Price:</label>
              <div className="col-sm-10"> 
                <input className="form-control" id="priceValue" placeholder={this.state.editorForm.price}></input>
              </div>
            </div>
            <div className="form-group"> 
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default" onClick={this.saveButton.bind(this)}>Save Changes</button>
              </div>
            </div>
          </form>

        </div>
      </div>
    );
  }
}

export default DomainTable;