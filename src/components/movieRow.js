import React, { Component } from 'react';

class MovieRow extends Component {

  render() {
    const { movie, handleShow } = this.props
    return (
      <div className="col-sm-6 col-md-4 col-12 mb-3 card-movie">
        <div className="wrapper-movie">
          <img className="img-responsive img-movie" height="300" alt={movie.name} src={movie.url_image} />
          <button className="btn btn-primary btn-reserve btn-radius" onClick={()=>handleShow(movie.id)} >Reservar </button>
        </div>
      </div>
    );
  }
}

export default MovieRow;