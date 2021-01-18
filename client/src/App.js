import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./UpdateMovieForm";

import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [requestError, setRequestError] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data);
        setRequestError('');
      })
      .catch(err => {
        setRequestError(`Unable to Load Movie List - ${err.response.status} ${err.response.statusText}`);
      });
  };

  const updateMovieList = (id, updatedMovie) => {
    axios
        .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
        .then((res) => {
            // if update is successful, get updated MovieList
            setUpdateError('');
            getMovieList();
        })
        .catch((err) => {
          setUpdateError(`Unable to Update Movie  - ${err.response.status} ${err.response.statusText}`);
        });
  }

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const deleteMovie = id => {
    axios
    .delete(`http://localhost:5000/api/movs/${id}`)
    .then((res) => {
        // if update is successful, get updated MovieList
        setDeleteError('');
        getMovieList();
    })
    .catch((err) => {
      setDeleteError(`Unable to Delete Movie  - ${err.response.status} ${err.response.statusText}`);
    });
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} requestError={requestError} updateError={updateError} deleteError={deleteError} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovie={deleteMovie}/>
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovieForm movies={movieList} updateMovieList={updateMovieList} />
      </Route>
    </>
  );
};

export default App;
