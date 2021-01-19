import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const initialFormObject = {
  title: "",
  director: "",
  metascore: "",
  stars: [""],
};

function AddMovieForm(props) {
  const [formValues, setFormValues] = useState(initialFormObject);
  const history = useHistory();

  const handleChange = (e) => {
    console.log(formValues);
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
    const newMovie = formValues;
    const namedStars = formValues.stars.filter(star => star !== '');
    newMovie.stars = namedStars;
    return newMovie;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = removeEmptyStars();
    props.addMovie(newMovie);
    history.push(`/`);
  };

  return (
    <div className="addMovieForm-wrapper">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
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
            required
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
            required
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
          Add Movie
        </Button>
      </Form>
    </div>
  );
}

export default AddMovieForm;
