import React from "react";
import Joi from "joi";
import { useParams, useNavigate } from "react-router-dom";
import Form from "../components/common/Form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import "../Pages/loginForm.css";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.params.id;
    if (!movieId) return;

    const movie = getMovie(movieId);
    if (!movie) {
      setTimeout(() => this.props.navigate("/not-found"));
      return;
    }

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit() {
    saveMovie(this.state.data);
    this.props.navigate("/movies");
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Movie Form</div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("title", "Title")}
                  {this.renderSelect("genreId", "Genre", this.state.genres)}
                  {this.renderInput("numberInStock", "Stock", "number")}
                  {this.renderInput("dailyRentalRate", "Rate", "number")}
                  {this.renderButton("Save")}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// A wrapper to pass hooks into class component
export default function MovieFormWrapper() {
  const params = useParams();
  const navigate = useNavigate();

  return <MovieForm params={params} navigate={navigate} />;
}
