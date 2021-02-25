import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();
  const { id } = useParams();


  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const handleEditClick = () => {
    console.log(id)
    push(`/update-movie/${id}`)
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleDeleteClick = () => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then((res) => {
      console.log(res)
      props.setMovieList(res.data)
      push('/movies')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="update-button" onClick={handleEditClick}>
        <button>Edit</button>
      </div>
      <div className="update-button" onClick={handleDeleteClick}>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default Movie;
