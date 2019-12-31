import React from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ModalCreateMovie = (props) => {
	console.log('props==>',props);
	const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
		console.log(values);
		const movie = { ...values, movie_id: props.movieId }
		console.log(movie);
		props.sendMovie(movie);
	};

  return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Body>
			<div style={{marginTop: 10}}>
				<h4>Crear película</h4>
				<br/>
				<form id="form-movie" onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group row">
							<label className="col-sm-3">Título:  </label>
							<div className="col-sm-9">
								<input
									name="name"
									type="text"
									className="form-control form-control-sm"
									ref={register({
										validate: value => value !== "admin" || "Nice try!"
									})}
								/>
							</div>
							{errors.name && errors.name.message}
						</div>
						<div className="form-group row">
								<label className="col-sm-3">Sinopsis: </label>
								<div className="col-sm-9">
									<input
										name="description"
										type="text"
										className="form-control form-control-sm"
										ref={register}
									/>
								</div>

						</div>
						<div className="form-group row">
							<label className="col-sm-3">Poster url: </label>
							<div className="col-sm-9">
								<input name="url_image"type="text"className="form-control form-control-sm" ref={register} />
							</div>
						</div>
						<div className="row">
							<label className="col-sm-3">Fechas: </label>
							<div className="col-sm-9">
								<div className="row">
									<div className="col-6 form-group">
											<label>Inicio: </label>
											<input name="start_date" type="date"className="form-control" ref={register} />
									</div>
									<div className="col-6 form-group">
											<label>Fin: </label>
											<input name="end_date" type="date"className="form-control" ref={register}/>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Button type="submit" variant="primary float-right btn-radius" onClick={props.handleClose} form="form-movie">
									<FontAwesomeIcon icon={faPlus} /> Crear nueva película
								</Button>
							</div>
						</div>


				</form>
			</div>
			</Modal.Body>
		</Modal>

  );
};

export default ModalCreateMovie;