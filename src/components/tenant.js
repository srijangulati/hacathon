import React, { Component } from 'react';
import {PageHeader,Jumbotron,Grid,Row,Col,ToolTip,small} from 'react-bootstrap';
import ReactTable from 'react-table';
import './../../node_modules/react-table/react-table.css';
import axios from 'axios';

const TENANT = {
  mac:"00:14:22:01:23:45",
  ip: "0:0:0:0",
  name:'test',
  connectedDevices:[{
      mac:"00:14:22:01:23:00",
      upTime:'107000',
      ip:"0:0:0:1"
    },
    {
      mac:"00:14:22:01:23:11",
      upTime:'17000',
      ip:"0:0:0:2"
    }
  ]
};

const COST_PER_HOUR ="0.01";

export default class Tenant extends Component{
  constructor(props){
    super(props);
    this.state = {
      tenant:{},
      upTime:0
    }
    console.log(this.props);
    this.columns = [{
      Header:"Mac Address",
      accessor:'mac',
    },{
      id:"upTime",
      Header:"Up Time",
      accessor:d=>Math.floor(d.upTime/(1000*60))+'mins',
    },{
      Header:'IP',
      accessor:'ip'
    }]
    this.getTenant()
  }

  deviceInfo(name,id){
    return (
      <Row>
        <Col md={6}>
          <h5 style={{float:"left"}}>{name}</h5>
        </Col>
        <Col md={6}>
          <h6 style={{float:"left"}}>{this.state.tenant[id]}</h6>
        </Col>
      </Row>
    );
  }

  getTenant=()=>{
    setInterval(()=>{
      this.setState({
        tenant:TENANT
      })
    }, 1000);
  }

  netTime=()=>{
    let time = 0;
    this.state.tenant.connectedDevices.map((c)=>{
      time+=parseInt(c.upTime,10);
    });
    return Math.floor(time/(1000*60));
  }

  loading=()=>{
    return (
      <PageHeader>Loading....</PageHeader>
    );
  }

  renderTenant=()=>{
    return (
      <Grid>
      <Row>
        <Col md={3}>
          <PageHeader>{this.props.match.params.id}</PageHeader>
        </Col>
      </Row>
      <hr/>
        <Row>
          <Col md={4}>
            <Jumbotron>
              <h3>Time</h3>
              <p>{this.netTime()+'mins'}</p>
            </Jumbotron>
          </Col>
          <Col md={4}>
            <Jumbotron>
              <h3>Devices</h3>
              <p>{this.state.tenant.connectedDevices.length}</p>
            </Jumbotron>
          </Col>
          <Col md={4}>
            <Jumbotron>
              <h3>Cost</h3>
              <p>{Math.floor(this.netTime()*(COST_PER_HOUR/60))+"$"}</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <PageHeader>Tenant Info</PageHeader>
            {this.deviceInfo('Tenant Name','name')}
            {this.deviceInfo('Tenant Mac','mac')}
            {this.deviceInfo('Tenant Ip','ip')}
          </Col>
          <Col md={6}>
            <PageHeader>Connected Devices</PageHeader>
            <ReactTable
            data={this.state.tenant.connectedDevices}
            columns={this.columns}
            minRows={0}
            className="-striped -highlight"/>
          </Col>
        </Row>
      </Grid>
    );
  }

  render(){
    return this.state.tenant.hasOwnProperty('connectedDevices')?this.renderTenant():this.loading();
  }
}
