import React, { Component } from 'react';
import {PageHeader,Jumbotron,Grid,Row,Col,ToolTip,small} from 'react-bootstrap';
import ReactTable from 'react-table';
import './../../node_modules/react-table/react-table.css';
import axios from 'axios';

const TENANT = {
  "customer1":{
    ip: "10.197.104.76",
    name:'customer 1',
    connectedDevices:[{
      mac:"A1A2A3A4A5A6",
      upTime:'107000',
      ip:""
    },
    {
      mac:"B1B2B3B4B5B6",
      upTime:'17000',
      ip:""
    }
  ]},
  "customer2":{
    ip: "10.197.104.77",
    name:'customer 1',
    connectedDevices:[{
      mac:"C1C2C3C4C5C6",
      upTime:'177000',
      ip:""
    },
    {
      mac:"D1D2D3D4D5D6",
      upTime:'1117000',
      ip:""
    }
  ]}
};

const COST_PER_HOUR ="0.1";

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
      accessor:d=>Math.floor(d.upTime/(60))+'mins',
    },{
      Header:'IP',
      accessor:'ip'
    }]
    this.getTenant();
    this.interval = setInterval(()=>{
      this.getTenant();
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
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
    axios.get('/v1/dummy').then((res)=>{
      let tempData = [];
      res.data.connectedDevices = res.data.connectedDevices.filter((cd)=>cd.mac);
      this.setState({
        tenant:res.data
      });
    });
    // setInterval(()=>{
    //   this.setState({
    //     tenant:TENANT[this.props.match.params.id]
    //   })
    // }, 1000);
  }

  netTime=()=>{
    let time = 0;
    this.state.tenant.connectedDevices.map((c)=>{
      time+=Math.floor(parseInt(c.upTime,10)/(60));
    });
    return time;
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
              <p>{(this.netTime()*(COST_PER_HOUR/60)).toFixed(2)+"$"}</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <PageHeader>Tenant Info</PageHeader>
            {this.deviceInfo('Tenant Name','name')}
            {this.deviceInfo('Gateway Ip','ip')}
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
