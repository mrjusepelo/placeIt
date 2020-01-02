import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Formatter from '../utils/formatter';
import {modalMessage} from '../utils/alerts';

const ModalCreateReserve = (props) => {
	const { show, handleClose, movieId } = props;
	const [reserveDate, setReserveDate] = useState(new Date());
	const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
		const reserve = { ...values, movie_id: movieId, reserve_date: Formatter.formatDate(reserveDate) }
		sendReserve(reserve);
	};


	const sendReserve = reserve => {
		axios.post(Formatter.base_url+'reserves', {reserve: reserve})
		.then(response => {
			handleClose();
			modalMessage('Reserva', response.data.message, 'success');
		})
		.catch(function (error) {
			if (error.response !== undefined && error.response.status === 422) {
				modalMessage('Reserva', error.response.data.message, 'error');
			}else{
				modalMessage('Reserva', '¡Ups parece que algo ha salido mal!', 'error');
			}
		})
	}

  return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Body>
			<h4>Reservar</h4>
			<br/>
			<div>
					<form id="form-reserve" onSubmit={handleSubmit(onSubmit)}>
							<div className="row">
								<div className="col-6">
									<div className="form-group">
										<label htmlFor="reserve_name">Nombre completo:  </label>
										<input
											name="name"
											id="reserve_name"
											type="text"
											className="form-control"
											ref={register({
												required: 'Requerido'
											})}
										/>
										{errors.name && <p className="text-danger">{errors.name.message}</p>}
									</div>
								</div>
								<div className="col-6">
									<div className="form-group">
										<label htmlFor="reserve_cellphone">Celular: </label>
										<input
											name="cellphone"
											id="reserve_cellphone"
											type="text"
											className="form-control"
											ref={register({
												required: 'Requerido'
											})}
										/>
										{errors.cellphone && <p className="text-danger">{errors.cellphone.message}</p>}
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-6">
									<div className="form-group">
										<label htmlFor="reserve_seat">Silla: </label>
										<input
										name="seat"
										id="reserve_seat"
										type="number"
										min="1" max="10" step="1"
										className="form-control"
										ref={register({
												required: 'Requerido'
											})} />
										{errors.seat && <p className="text-danger">{errors.seat.message}</p>}
									</div>
								</div>
								<div className="col-6">
									<div className="form-group">
										<label htmlFor="reserve_reserve_date">Fecha: </label>
										<DatePicker
											name="reserve_date"
											id="reserve_reserve_date"
											className="form-control"
											selected={reserveDate}
											onChange={date => setReserveDate(date)}
											dateFormat="d, MMMM, yyyy"
											ref={register} />
										{errors.reserve_date && <p className="text-danger">{errors.reserve_date.message}</p>}
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-6">
									<div className="form-group">
										<label htmlFor="reserve_number_document">Cédula: </label>
										<input name="number_document" id="reserve_number_document" type="text" className="form-control"
										ref={register({
											required: 'Requerido'
										})} />
										{errors.number_document && <p className="text-danger">{errors.number_document.message}</p>}
									</div>
								</div>
								<div className="col-6">
									<div className="form-group">
										<label htmlFor="reserve_email">Correo electrónico: </label>
										<input
											name="email"
											id="reserve_email"
											type="text"
											className="form-control"
											ref={register({
												required: 'Requerido',
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
													message: "dirección de correo inválida"
												}
											})}
										/>
										{errors.email && <p className="text-danger">{errors.email.message}</p>}
									</div>
								</div>
							</div>

							<div className="form-group">
									<input type="submit" value="Reservar ahora" className="btn btn-primary btn-radius px-4 float-right"/>
							</div>
					</form>
			</div>
			</Modal.Body>
		</Modal>

  );
};

export default ModalCreateReserve;