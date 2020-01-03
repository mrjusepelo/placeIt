import React, { Component } from 'react';
import MovieRow from './movieRow'
import ModalCreateReserve from './modalCreateReserve'
import ModalCreateMovie from './modalCreateMovie';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import Formatter from '../utils/formatter';
import EmptyResults from '../utils/emptyResults';
import { modalMessage } from '../utils/alerts';
registerLocale('es', es)

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
			modalMessage('Películas', response.data.message, 'success');
			this.handleCloseMovie();
		})
		.catch(function (error) {
			if (error.response !== undefined && error.response.status === 422) {
				modalMessage('Películas', error.response.data.message, 'error');
			}else{
				modalMessage('Películas', '¡Ups parece que algo ha salido mal!', 'error');
			}
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
			if(response.status === 200){
				this.refreshMovies(response.data);
			}
		})
		.catch(function (error) {
			if (error.response !== undefined && error.response.status === 404) {
				modalMessage('Películas', error.response.data.message, 'error');
			}else{
				modalMessage('Películas', '¡Ups parece que algo ha salido mal obteniendo las películas!', 'error');
			}
		})
	}


	tabRow = (handleShow) => {
		const { movies } = this.state;
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
						<div className="row">
							<div className="col-sm-6">
								<span className="font-weight-lighter h3">Películas</span>
							</div>
							<div className="col-sm-6">
								<Button variant="primary float-sm-left float-md-right btn-radius" onClick={this.handleShowMovie}>
									<FontAwesomeIcon icon={faPlus} /> Crear nueva película
								</Button>
							</div>
						</div>
						<div className="row mt-5">
							<div className="col-12">
								<div className="form-group row">
									<label className="col-sm-3">Seleccionar rango fechas:  </label>
									<div className="col-sm-9">
										<div className="row">
											<div className="col-sm-12 col-md-6">
												<div className="form-group">
													<label className="btn-block">inicio: </label>
													<DatePicker
														name="start_date"
														locale="es"
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
											<div className="col-sm-12 col-md-6">
												<div className="form-group">
													<label className="btn-block">fin: </label>
													<DatePicker
														name="end_date"
														locale="es"
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