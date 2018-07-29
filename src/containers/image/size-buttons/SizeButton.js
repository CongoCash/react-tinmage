import React, { Component } from 'react'

class SizeButton extends Component {

  render() {
    return (
      <div className="row button-margin">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-4 center-tags">
              <button onClick={this.props.small.bind(this)} className="btn btn-primary btn-lg small-button">Small</button>
            </div>
            <div className="col-lg-4 center-tags">
              <button onClick={this.props.medium.bind(this)} className="btn btn-success btn-lg medium-button">Medium</button>
            </div>
            <div className="col-lg-4 center-tags">
              <button onClick={this.props.large.bind(this)} className="btn btn-dark btn-lg large-button">Large</button>
            </div>
          </div>
        </div>
        <div className="col-lg-3"></div>
      </div>
    );
  }
}


export default SizeButton
