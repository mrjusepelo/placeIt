import React, { Component } from 'react';

class ReserveRow extends Component {
  render() {
    const { reserve } = this.props
    return (
        <tr>
          <td>
            {reserve.movie.name}
          </td>
          <td>
            {reserve.name}
          </td>
          <td>
            {reserve.email}
          </td>
          <td>
            {reserve.number_document}
          </td>
          <td>
            {reserve.cellphone}
          </td>
        </tr>
    );
  }
}

export default ReserveRow;