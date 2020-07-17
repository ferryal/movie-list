import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { fetchListMovie, fetchMovieDetail, addMovie } from '../../actions/movie';
import 'react-toastify/dist/ReactToastify.css';

class ListMovie extends Component {
constructor(props) {
    super(props);
    this.state = {
		title: '',
		showModal: false
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

handleSubmit = () => {
	this.props.fetchListMovie(this.state.title);
}

handleFavorite = (data) => {
	toast.success(`Success add ${data.Title} to my movie`)
	this.props.addMovie(data);
}

renderModalDetail() {
	const { movieDetail } = this.props
	const { detail } = movieDetail;
	return(
	<Modal show={this.state.showModal} onHide={this.handleClose}>
		<Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflow': 'auto'}}>
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

renderListMovie() {
	const { data } = this.props;
	const { listMovie } = data;
	return(
		<React.Fragment>
			<table className="table table-borderless table-hover mb-0 text-center">
				<thead>
					<tr>
						<th>Title</th>
						<th>Year</th>
						<th>imdb ID</th>
						<th>Favorite</th>
					</tr>
				</thead>
				{
					listMovie && listMovie.Search ?
						listMovie.Search.map((data, index) => {
							return (
								<tbody key={index + 1}>
									<tr>
										<td>
											<p className="c-pointer" onClick={ () => {this.handleShow(data.imdbID)}}>{ data.Title }</p>
										</td>
										<td>
											<p>{ data.Year }</p>
										</td>
										<td>{ data.imdbID }</td>
										<td>
											<i className='fa fa-star-o c-pointer' aria-hidden="true" onClick={() => {this.handleFavorite(data)}}></i>
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
				<Link className="nav-movie m-left-15" to="/" />
				<Link className="nav-movie" to='/my-movie'>My Movie</Link>
			</div>
			<div id="container" className="container">	
				<div className="text-center">
					<input className="search-movie" onChange={this.handleChange} value={this.state.title}></input>
					<button className="btn btn-success" onClick={this.handleSubmit}>Search</button>
				</div>
				<div className="row">
					{ this.renderListMovie() }
					{ this.renderModalDetail() }
				</div>
			</div>
			<ToastContainer />
		</React.Fragment>
    )
	}
}

ListMovie.propTypes = {
	fetchListMovie: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	fetchMovieDetail: PropTypes.func.isRequired,
	addMovie: PropTypes.func.isRequired
}

const mapStatetoProps = state => ({
	data: state.listMovie,
	movieDetail: state.detailMovie,
});

const mapDispatchToProps = {
	fetchListMovie, fetchMovieDetail, addMovie
};

export default connect(mapStatetoProps, mapDispatchToProps)(ListMovie);

