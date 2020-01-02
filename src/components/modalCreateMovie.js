import React from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ModalCreateMovie = (props) => {
	const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
		const movie = { ...values, movie_id: props.movieId }
		props.sendMovie(movie);
	};

  return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Body>
			<div>
				<h4>Crear película</h4>
				<br/>
				<form id="form-movie" onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group row">
							<label htmlFor="movie_name" className="col-sm-3">Título:  </label>
							<div className="col-sm-9">
								<input
									name="name"
									id="movie_name"
									type="text"
									className="form-control form-control-sm"
									ref={register({
										required: 'Requerido'
									})}
								/>
							</div>
							{errors.name && <p className="text-danger">{errors.name.message}</p>}
						</div>
						<div className="form-group row">
								<label htmlFor="movie_description" className="col-sm-3">Sinopsis: </label>
								<div className="col-sm-9">
									<textarea
										name="description"
										id="movie_description"
										type="text"
										className="form-control form-control-sm"
										ref={register}
									/>
								</div>

						</div>
						<div className="form-group row">
							<label htmlFor="movie_url_image" className="col-sm-3">Poster url: </label>
							<div className="col-sm-9">
								<input
									name="url_image"
									id="movie_url_image"
									type="text"
									className="form-control form-control-sm"
									ref={register({
											required: 'Requerido'
									})}
								/>
								{errors.url_image && <p className="text-danger">{errors.url_image.message}</p>}
							</div>
						</div>
						<div className="row">
							<label className="col-sm-3">Fechas: </label>
							<div className="col-sm-9">
								<div className="row">
									<div className="col-6 form-group">
											<label htmlFor="movie_start_date">Inicio: </label>
											<input
												name="start_date"
												id="movie_start_date"
												type="date"
												className="form-control"
												ref={register}
											/>
											{errors.start_date && <p className="text-danger">{errors.start_date.message}</p>}
									</div>
									<div className="col-6 form-group">
											<label htmlFor="movie_end_date">Fin: </label>
											<input
												name="end_date"
												id="movie_end_date"
												type="date"
												className="form-control"
												ref={register}
											/>
											{errors.end_date && <p className="text-danger">{errors.end_date.message}</p>}
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<Button type="submit" variant="primary float-right btn-radius" form="form-movie">
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