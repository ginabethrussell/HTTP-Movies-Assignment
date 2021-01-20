import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const initialFormObject = {
  id: 0,
  title: "",
  director: "",
  metascore: 0,
  stars: [],
};

function UpdateMovieForm(props) {
  const [formValues, setFormValues] = useState(initialFormObject);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const movies = props.movies;
    if (movies.length > 0) {
      const movie = movies.find((movie) => movie.id.toString() === id);
      setFormValues(movie);
    }
  }, [props.movies]);

  const handleChange = (e) => {
    if (e.target.name.includes("stars")) {
      const name = e.target.name;
      const index = name.slice(5);
      const newStars = formValues.stars;
      newStars[Number(index)] = e.target.value;
      setFormValues({
        ...formValues,
        stars: [...newStars],
      });
    } else {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addStarInput = (e) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      stars: [...formValues.stars, ""],
    });
  };

  const removeEmptyStars = () => {
    const editedMovie = formValues;
    const namedStars = formValues.stars.filter((star) => star !== "");
    editedMovie.stars = namedStars;
    return editedMovie;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedMovie = removeEmptyStars();
    props.updateMovieList(id, editedMovie);
    history.push(`/`);
  };

  return (
    <div className="updateForm-wrapper">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="director">Director</Label>
          <Input
            type="text"
            id="director"
            name="director"
            value={formValues.director}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="metascore">Metascore</Label>
          <Input
            type="text"
            id="metascore"
            name="metascore"
            value={formValues.metascore}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="stars">Stars</Label>
          {formValues.stars.map((star, index) => (
            <Input
              key="index"
              type="text"
              id="stars"
              name={`stars${index}`}
              value={formValues.stars[index]}
              onChange={handleChange}
            />
          ))}
          <Button onClick={addStarInput}>+</Button>
        </FormGroup>
        <Button color="primary" type="submit">
          Submit Update
        </Button>
      </Form>
    </div>
  );
}

export default UpdateMovieForm;
