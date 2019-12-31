import React, { Component } from 'react';

export default class EmptyResults extends Component {
    render() {
        return (
          <div className="col-12" style={{marginTop: 10}}>
						<div className="alert alert-danger text-center" role="alert">
							{this.props.message}
						</div>
          </div>
        )
    }
}