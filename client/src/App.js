import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./UpdateMovieForm";
import AddMovieForm from "./AddMovieForm";

import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [requestError, setRequestError] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [addError, setAddError] = useState('');

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
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then((res) => {
        // if update is successful, get updated MovieList
        setDeleteError('');
        getMovieList();
    })
    .catch((err) => {
      setDeleteError(`Unable to Delete Movie  - ${err.response.status} ${err.response.statusText}`);
    });
  }

  const addMovie = newMovie => {
    console.log('adding new movie', newMovie);
    axios
    .post(`http://localhost:5000/api/movies`, newMovie)
    .then((res) => {
        setMovieList(res.data)
    })
    .catch((err) => {
      setAddError(`Unable to Add Movie  - ${err.response.status} ${err.response.statusText}`);
    });
  }
  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} requestError={requestError} addError={addError} updateError={updateError} deleteError={deleteError} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovie={deleteMovie}/>
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovieForm movies={movieList} updateMovieList={updateMovieList} />
      </Route>

      <Route path="/add-movie">
        <AddMovieForm movies={movieList} addMovie={addMovie}/>
      </Route>
    </>
  );
};

export default App;
