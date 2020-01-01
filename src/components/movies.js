import React, { Component } from 'react';
import MovieRow from './movieRow'
import ModalCreateReserve from './modalCreateReserve'
import ModalCreateMovie from './modalCreateMovie';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Formatter from '../utils/formatter';
import EmptyResults from '../utils/emptyResults';

export default class Movies extends Component {

	state = {
		show: false,
		showMovie: false,
		movies: [],
		movie_id: null,
		startDate: new Date(),
		endDate: new Date()
	}


	handleClose = () => {
		this.setState({show: false})
	}

	handleShow = (movie_id) => {
		this.setState({show: true, movie_id})
	}
	handleCloseMovie = () => {
		this.setState({showMovie: false})
	}

	handleShowMovie = () => {
		this.setState({showMovie: true})
	}
	handleSelectStartDate = date => {
		this.setState({ startDate: date }, () => this.getMovies());
	}
	handleSelectEndDate = (date) => {
		this.setState({ endDate: date }, () => this.getMovies()
			);
	}

	sendMovie = movie => {
		axios.post(Formatter.base_url+'movies', movie)
		.then(response => {
			const { movies } = this.state;
			movies.push(response.data.movie);
			this.setState({ movies: movies });
			console.log(response)
		})
		.catch(function (error) {
			console.log(error);
			alert(error.response.data.message);
		})
	}

	refreshMovies(movies){
		this.setState({ movies: movies });
	}

	componentDidMount(){
		this.getMovies();
	}

	getMovies(){
		this.refreshMovies([]);
		axios.get(Formatter.base_url+'movies/by_date', {
			params: {
				start_date: Formatter.formatDate(this.state.startDate),
				end_date: Formatter.formatDate(this.state.endDate)
			}
		})
		.then(response => {
			if(response.status == 200){
				this.refreshMovies(response.data);
			}
			console.log('datos===>'+response)
		})
		.catch(function (error) {
			console.log(error);
		})
	}


	tabRow = (handleShow) => {
		const { movies } = this.state;
		console.log(movies)
		if (movies.length > 0){
			return movies.map(function(object, i){
					return <MovieRow movie={object} key={i} handleShow={ handleShow } />;
			});
		}else{
			return <EmptyResults message="No se encontraron películas"/>
		}
	}

	render() {
		const {show, movie_id, showMovie, startDate, endDate} = this.state;
        return (
          <div>
						<span className="font-weight-lighter h3">Películas</span>
						<Button variant="primary float-right btn-radius" onClick={this.handleShowMovie}>
							<FontAwesomeIcon icon={faPlus} /> Crear nueva película
						</Button>
						<div className="row mt-5">
							<div className="col-12">
								<div className="form-group row">
									<label className="col-sm-3">Seleccionar rango fechas:  </label>
									<div className="col-sm-6">
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label className="btn-block">inicio: </label>
													<DatePicker
														name="start_date"
														className="form-control btn-block"
														dateFormat="d, MMMM, yyyy"
														selected={startDate}
														onChange={date => this.handleSelectStartDate(date)}
														selectsStart
														startDate={startDate}
														endDate={endDate}
													/>
												</div>
											</div>
											<div className="col-sm-6">
												<div className="form-group">
													<label className="btn-block">fin: </label>
													<DatePicker
														name="end_date"
														className="form-control btn-block"
														dateFormat="d, MMMM, yyyy"
														selected={endDate}
														onChange={date => this.handleSelectEndDate(date)}
														selectsEnd
														startDate={startDate}
														endDate={endDate}
														minDate={startDate}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							{ this.tabRow(this.handleShow) }
							<ModalCreateReserve show={show} handleClose={this.handleClose} movieId={movie_id} date={this.state.startDate} />
							<ModalCreateMovie show={showMovie} handleClose={this.handleCloseMovie} sendMovie={this.sendMovie} />
						</div>
          </div>
        )
    }
}