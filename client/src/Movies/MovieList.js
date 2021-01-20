import React from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import {Button} from 'reactstrap';

function MovieList({ movies, updateError, requestError, deleteError, addError }) {
  const history = useHistory();
  return (
    <div className="movie-list">
        <Button color='primary' onClick={() => history.push('/add-movie')}>Add Movie</Button>
        <div className='api-error'>{updateError} {requestError} {deleteError} {addError}</div>
     {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
