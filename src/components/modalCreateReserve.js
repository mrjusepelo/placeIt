import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Formatter from '../utils/formatter';

const ModalCreateReserve = (props) => {
	console.log('movieId=>'+props.movieId);
	const [reserveDate, setReserveDate] = useState(new Date());
	const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
		const reserve = { ...values, movie_id: props.movieId, reserve_date: Formatter.formatDate(reserveDate) }
		console.log(reserve);
		sendReserve(reserve);
	};

	const sendReserve = reserve => {
		axios.post('http://localhost:3000/reserves', {reserve: reserve})
		.then(response => {
			props.handleClose()
			console.log(response)
		})
		.catch(function (error) {
			console.log(error);
			alert(error.response.data.message);
		})
	}

  return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Body>
			<h4>Reservar</h4>
			<br/>
			<div>
					<form id="form-reserve" onSubmit={handleSubmit(onSubmit)}>
							<div className="row">
								<div className="col-6">
									<div className="form-group">
										<label>Nombre completo:  </label>
										<input
											name="name"
											type="text"
											className="form-control"
											ref={register({
												validate: value => value !== "admin" || "Nice try!"
											})}
										/>
										{errors.name && errors.name.message}
									</div>
								</div>
								<div className="col-6">
									<div className="form-group">
										<label>Celular: </label>
										<input
											name="cellphone"
											type="text"
											className="form-control"
											ref={register({
												required: 'Required'
											})}
										/>
										{errors.cellphone && errors.cellphone.message}
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-6">
									<div className="form-group">
										<label>Silla: </label>
										<input name="seat" type="number" min="1"  max="10" step="1" className="form-control" ref={register} />
									</div>
								</div>
								<div className="col-6">
									<div className="form-group">
										<label>Fecha: </label>
										<DatePicker ref={register}name="reserve_date" className="form-control" selected={reserveDate}
										onChange={date => setReserveDate(date)}  dateFormat="d, MMMM, yyyy"  />
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-6">
									<div className="form-group">
										<label>Cédula: </label>
										<input name="number_document" type="text" className="form-control" ref={register} />
									</div>
								</div>
								<div className="col-6">
									<div className="form-group">
										<label>Correo electrónico: </label>
										<input
											name="email"
											type="text"
											className="form-control"
											ref={register({
												required: 'Required',
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
													message: "invalid email address"
												}
											})}
										/>
										{errors.email && errors.email.message}
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