import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies, updateError, requestError, deleteError }) {
  
  return (
    <div className="movie-list">
       <div className='api-error'>{updateError} {requestError} {deleteError}</div>
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
