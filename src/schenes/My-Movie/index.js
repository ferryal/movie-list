import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { fetchMovieDetail, deleteMovie } from '../../actions/movie';
import 'react-toastify/dist/ReactToastify.css';

class MyMovie extends Component {
constructor(props) {
    super(props);
    this.state = {
		title: '',
		showModal: false,
		favoriteMovie: []
	};
  }

handleChange = (e) => {
	const { value } = e.target;
	this.setState({
		title: value
	});
}

handleShow = (id) => {
	this.props.fetchMovieDetail(id)
	this.setState({ showModal: true})
}

handleClose = () => {
	this.setState({ showModal: false})
}

handleRemoveMovie = (e, data, index) => {
	e.preventDefault();
	this.props.deleteMovie(index)
	toast.info(`Delete movie ${data.Title}`)
}

renderModalDetail() {
	const { movieDetail } = this.props
	const { detail } = movieDetail;
	return(
	<Modal show={this.state.showModal} onHide={this.handleClose}>
		<Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
		<div className="text-center"><img src={detail.Poster} alt={detail.Poster}/></div>
			<p className="text-center font-weight-bold">{detail.Title}</p>
			<p className="text-center">{detail.imdbRating} <i class="fa fa-star" aria-hidden="true" style={{ color: '#ffc800'}}/></p>
			<p className="text-center">Year: {detail.Year}</p>
			<p className="text-center">Genre: {detail.Genre}</p>
			<p className="text-center">Production: {detail.Production}</p>
			<p className="text-center">Released: {detail.Released}</p>
			<p className="text-center">Director: {detail.Director}</p>
			<p className="text-center">Actors: {detail.Actors}</p>
			<p className="text-center">Plot: {detail.Plot}</p>
			<p className="text-center">Awards: {detail.Awards}</p>
		</Modal.Body>
      </Modal>
	);
}

renderMyMovie() {
	const { myMovies } = this.props;
	const { myMovie } = myMovies;	
	return(
		<React.Fragment>
			<table className="table table-borderless table-hover mb-0">
				<thead>
					<tr>
						<th>Title</th>
						<th>Year</th>
						<th>imdb ID</th>
						<th>Favorite</th>
					</tr>
				</thead>
				{
					myMovies && myMovie !== '' ?
						myMovie.map((data, index) => {
				return (
					<tbody key={index + 1}>
						<tr>
							<td>
								<p onClick={ () => {this.handleShow(data.imdbID)}}>{ data.Title }</p>
							</td>
							<td>
								<p>{ data.Year }</p>
							</td>
							<td>{ data.imdbID }</td>
							<td>
								<i className="fa fa-star" aria-hidden="true" onClick={(e) => this.handleRemoveMovie(e, data, index )}></i>
							</td>
						</tr>
					</tbody>
				);
					}) : ''
						
				}
			</table>
		</React.Fragment>
	);
}

render() {
    return(
		<React.Fragment>
			<div className="navbar navbar-inverse navbar-fixed-top">
				<Link className="nav-movie m-left-15" to="/">Search Movie</Link>
			</div>
			<div id="container" className="container">	
				<div className="row">
					{ this.renderMyMovie() }
					{ this.renderModalDetail() }
				</div>
			</div>
			<ToastContainer />
		</React.Fragment>
    )
	}
}

MyMovie.propTypes = {
	fetchMovieDetail: PropTypes.func.isRequired,
	deleteMovie: PropTypes.func.isRequired
}

const mapStatetoProps = state => ({
	myMovies: state.myMovie,
	movieDetail: state.detailMovie,
});

const mapDispatchToProps = {
  fetchMovieDetail, deleteMovie
};

export default connect(mapStatetoProps, mapDispatchToProps)(MyMovie);
