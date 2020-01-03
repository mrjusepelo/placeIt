import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Reserves from './components/reserves';
import Movies from './components/movies';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="row bg-primary">
          <div className="col-sm-4 col-md-3 content-sidebar" variant="primary">
          <Nav defaultActiveKey="/home" className="flex-column text-white mt-5">
            <Link to={'/movies'} className="nav-link text-white text-center">
              <h1 className="d-inline italy-bold" >Place</h1>
              <h1 className="d-inline italy-light" >It</h1>
            </Link>
            <ul className="navbar-nav">
              <li className="nav-item">
                <div className="option-nabvar">
                  <Link to={'/reserves'} className="nav-link text-white">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Reservas
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="option-nabvar">
                  <Link to={'/movies'} className="nav-link text-white">
                  <FontAwesomeIcon icon={faFilm} className="mr-2" /> Películas
                  </Link>
                </div>
              </li>
            </ul>
          </Nav>

          </div>
          <div className="col-sm-8 col-md-9 text-md-left text-center bg-white">
            <div className="container mt-5 px-5">
              <Switch>
                  <Route exact path='/reserves' component={ Reserves } />
                  <Route path='/movies' component={ Movies } />
                  <Route path='/' component={ Movies } />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
