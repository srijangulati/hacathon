import React, { Component } from 'react';

export default class Tenant extends Component{
  constructor(props){
    super(props);
    console.log(this.props);
  }
  render(){
    return(
      <div>
        <h3>Single Tenants</h3>
        <h3>{this.props.match.params.id}</h3>
      </div>
    );
  }
}
