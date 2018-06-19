import React, { Component } from 'react';
import {Button, Modal, PageHeader,form, FormControl, FormGroup,ControlLabel, Row,Col} from 'react-bootstrap';

export default class AddTenantModal extends Component{
  state={
    tenantName:''
  }

  getValidationState(){
    if(this.state.tenantName == ''){
      return 'error';
    }
    else{
      return 'success';
    }
  }

  onChange=(e)=>{
    this.setState({
      tenantName:e.target.value
    });
  }

  addTenant=()=>{
    this.props.close();
    this.props.addTenant(this.state.tenantName);
  }

  render(){
    return(
      <Modal show={this.props.show} onHide={this.props.close} style={{opacity: 1}}  aria-labelledby="contained-modal-title-lg" bsSize="large">
      <Modal.Header style={{marginTop:20}}>
          <Modal.Title>Add Tenant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Tenant Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.tenantName}
              placeholder="Enter Tenant Name"
              onChange={this.onChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Row>
            <Col md={9}/>
            <Col md={3}>
            <Button type="button" onClick={this.props.close}>Close</Button>
            <Button type="button" bsStyle="success" onClick={this.addTenant}>Submit</Button>
            </Col>
          </Row>
        </form>
        </Modal.Body>
      </Modal>
    );
  }
}
