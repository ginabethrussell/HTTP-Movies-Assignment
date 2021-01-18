import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies, updateError, requestError, deleteError, addError }) {
  
  return (
    <div className="movie-list">
        <Link className='add-movie-link' to='/add-movie'>Add Movie</Link>
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
