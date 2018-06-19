import React, { Component } from 'react';
import {Button, Modal, PageHeader, Row, Col} from 'react-bootstrap';

export default class DeleteModal extends Component{
  render(){
    return(
      <Modal show={this.props.show} onHide={this.props.close} style={{opacity: 1}}  aria-labelledby="contained-modal-title-lg" bsSize="large">
      <Modal.Header>
          <Modal.Title>Delete Tenant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete {this.props.tenantName}?</p>
          <Row>
            <Col md={9}/>
            <Col md={3}>
              <Button  onClick={this.props.close}>Close</Button>
              <Button bsStyle="danger" onClick={this.props.delete}>Delete</Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}
