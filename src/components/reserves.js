import React, { Component } from 'react';
import ReserveRow from './reserveRow'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Formatter from '../utils/formatter';
import EmptyResults from '../utils/emptyResults';

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
		axios.get('http://localhost:3000/reserves/by_date', {
			params: {
				start_date: Formatter.formatDate(this.state.startDate),
				end_date: Formatter.formatDate(this.state.endDate)
			}
		})
		.then(response => {
			if(response.status == 200){
				this.refreshReserves(response.data);
			}
			console.log('datos===>'+response)
		})
		.catch(function (error) {
			console.log(error);
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
									<div className="col-sm-6">
										<div className="row">
											<div className="col-sm-6">
												<div className="form-group">
													<label className="btn-block">inicio: </label>
													<DatePicker
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