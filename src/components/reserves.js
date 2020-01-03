import React, { Component } from 'react';
import ReserveRow from './reserveRow'
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import Formatter from '../utils/formatter';
import EmptyResults from '../utils/emptyResults';
import {modalMessage} from '../utils/alerts';
registerLocale('es', es)

export default class Reserves extends Component {
	state = {
		reserves: [],
		startDate: Formatter.oneMonthAgo,
		endDate: new Date()
	}
	componentDidMount(){
		this.getReserves();
	}

	handleSelectStartDate = date => {
		this.setState({ startDate: date }, () => this.getReserves());
	}
	handleSelectEndDate = (date) => {
		this.setState({ endDate: date }, () => this.getReserves()
			);
	}

	refreshReserves(reserves){
		this.setState({ reserves: reserves });
	}

	getReserves(){
		this.refreshReserves([]);
		axios.get(Formatter.base_url+'reserves/by_date', {
			params: {
				start_date: Formatter.formatDate(this.state.startDate),
				end_date: Formatter.formatDate(this.state.endDate)
			}
		})
		.then(response => {
			if(response.status === 200){
				this.refreshReserves(response.data);
			}
		})
		.catch(function (error) {
			if (error.response !== undefined && error.response.status === 404) {
				modalMessage('Reserva', error.response.data.message, 'error');
			}else{
				modalMessage('Reserva', '¡Ups parece que algo ha salido mal obteniendo las reservas!', 'error');
			}
		})
	}

	tabRow(){
		const { reserves } = this.state;
		if (reserves.length > 0){
			return reserves.map(function(object, i){
					return <ReserveRow reserve={object} key={i} />;
			});
		}else{
			return (
				<tr>
					<td colSpan="5">
						<EmptyResults message="No se encontraron reservas"/>
					</td>
				</tr>
			)
		}
	}

	render() {
		const {startDate, endDate} = this.state;
        return (
          <div style={{marginTop: 10}}>
						<h3>Reservas realizadas</h3>
						<div className="col-12">
								<div className="form-group row">
									<label className="col-sm-3">Seleccionar rango fechas:  </label>
									<div className="col-sm-9">
										<div className="row">
											<div className="col-sm-12 col-md-6">
												<div className="form-group">
													<label className="btn-block">inicio: </label>
													<DatePicker
														className="form-control btn-block"
														locale="es"
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
														className="form-control btn-block"
														locale="es"
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
						<table className="table table-striped" style={{ marginTop: 20 }}>
							<thead>
								<tr>
									<th>Película</th>
									<th>Nombre reservante</th>
									<th>Correo electrónico</th>
									<th>Cédula</th>
									<th>Celular</th>
								</tr>
							</thead>
							<tbody>
								{ this.tabRow() }
							</tbody>
						</table>
          </div>
        )
    }
}