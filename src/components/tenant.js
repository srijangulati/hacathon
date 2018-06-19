import React, { Component } from 'react';
import {PageHeader,Jumbotron,Grid,Row,Col,ToolTip,small} from 'react-bootstrap';

export default class Tenant extends Component{
  constructor(props){
    super(props);
    console.log(this.props);
  }
  render(){
    return(
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
              <p>time here</p>
            </Jumbotron>
          </Col>
          <Col md={4}>
            <Jumbotron>
              <h3>Devices</h3>
              <p>Number of devices here</p>
            </Jumbotron>
          </Col>
          <Col md={4}>
            <Jumbotron>
              <h3>Cost</h3>
              <p>cost here</p>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
}
