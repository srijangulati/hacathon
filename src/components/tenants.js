import React, { Component } from 'react';
import ReactTable from 'react-table';
import {Link} from 'react-router-dom';
import {Button,Grid, Row , Col,PageHeader} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import DeleteModal from './modal/deleteModal';
import AddTenantModal from "./modal/addTenantModal";
import './../../node_modules/react-table/react-table.css';
import axios from 'axios';


const DATA = [{
  tenantName: "Test",
  clientCount:2,
  tenantIp:"0.0.0.0",
  status:true
},{
  tenantName: "Test1",
  clientCount:2,
  tenantIp:"0.0.0.0",
  status:true
}];

export default class Tenants extends Component{

  state = {
    data:DATA,
    showModal:false,
    tenantName:null,
    addModal:false
  }

  handleClose=()=>{
    this.setState({
      showModal:false,
    });
  }

  handleAddClose=()=>{
    this.setState({
      addModal:false
    });
  }

  constructor(props){
    super(props);
    this.columns = [{
      Header:"Name",
      accessor:'tenantName',
      Cell: (props)=><Link to={"/tenant/"+props.value}>{props.value}</Link>
    },{
      Header:"Devices Connected",
      accessor:"clientCount"
    },{
      Header:'IP',
      accessor:'tenantIp'
    },{
      id:"status",
      Header:'Status',
      accessor: d=>(d.status)?"up":'down'
    },{
      Header:"Delete",
      accessor:"tenantName",
      Cell:props=><FontAwesome.FaTrash style={{color:'red',cursor:"pointer"}} size={20} onClick={()=>{this.deleteClicked(props.value)}}/>
    }]
    this.getTenants();
  }

  deleteClicked=(tenantName)=>{
    this.setState({
      tenantName:tenantName,
      showModal:true
    })
  }

  deleteTenant=()=>{
    this.setState({
      showModal:false
    })
  }

  addModal=()=>{
    this.setState({
      addModal:true
    });
  }

  getTenants=()=>{
    axios.get('/v1/tenants').then((res)=>{
      this.setState({
        data:res.data
      })
    })
  }

  addTenant=(tenantName)=>{
    let data = {"tenantName":tenantName};
    axios.post('/v1/tenant',data).then((res)=>{
      this.getTenants();
    }).catch((err)=>{
      console.log(err);
    });
  }

  render(){
    return(
      <Grid>
        <Row className="show-grid">
        <Col md={4}>
          <PageHeader>Tenants</PageHeader>
        </Col>
        <Col md={6}/>
        <Col md={2}>
          <FontAwesome.FaPlusCircle style={{color:'#5DADE2',cursor:'pointer',marginTop: 10}} size={30} onClick={this.addModal}/>
        </Col>
        </Row>
        <Row>
          <Col md={12}>
          <ReactTable
            data={this.state.data}
            columns={this.columns}
            loading={this.state.data.length==0?true:false}
            showPagination={true}
            showPaginationTop={false}
            showPaginationBottom={true}
            showPageSizeOptions={true}
            minRows={0}
            className="-striped -highlight"
          />
          </Col>
        </Row>
        <DeleteModal show={this.state.showModal} tenantName={this.state.tenantName} close={this.handleClose} delete={this.deleteTenant}/>
        <AddTenantModal show={this.state.addModal} close={this.handleAddClose} addTenant={this.addTenant}/>
      </Grid>
    );
  }
}
