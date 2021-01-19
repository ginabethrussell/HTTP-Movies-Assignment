import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

const initialFormObject = {
    id: 0,
    title: "",
    director: "",
    metascore: 0,
    stars: []
}
function UpdateMovieForm(props) {
    const [formValues, setFormValues] = useState(initialFormObject);
    const [error, setError] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const params = useParams();
    const id = params.id
    const history = useHistory();
   

    const setMovieToUpdate = () => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            setFormValues(res.data);
            setIsLoaded(true);
            setError('');
            console.log(res.data);
        })
        .catch((err) => {
            setError(err.response);
            setIsLoaded(true);
            setFormValues(initialFormObject);
        });
    };


    useEffect(() => {
        setMovieToUpdate(id);
    },[id])
    

    const handleChange = (e) => {
        if (e.target.name.includes('stars')){
            const name = e.target.name;
            const index = name.slice(5,)
            const newStars = formValues.stars;
            newStars[Number(index)] = e.target.value;
            setFormValues({
                ...formValues,
                stars: [...newStars]
            })
        }else {
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value
            })
        }   
    }

    const addStarInput = e => {
        e.preventDefault();
        setFormValues({
            ...formValues,
            stars: [...formValues.stars, '']
        })
    }

    const removeEmptyStars = () => {
        const editedMovie = formValues;
        const namedStars = formValues.stars.filter(star => star !== '');
        editedMovie.stars = namedStars;
        return editedMovie;
    }

    const handleSubmit = e => {
        e.preventDefault();
        const editedMovie = removeEmptyStars();
        props.updateMovieList(id, editedMovie);
        history.push(`/`);  
    }

    if (error !== '' ){
        return (
            <div>{error}</div>
        )
    }else if (!isLoaded){
        return (
            <div>Loading Movie to Update</div>
        )
    }else {
        return (
            <div className='updateForm-wrapper'>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                    <Label htmlFor='title'>Title</Label>
                    <Input type='text'
                        id='title'
                        name='title'
                        value={formValues.title}
                        onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor='director'>Director</Label>
                    <Input type='text'
                        id='director'
                        name='director'
                        value={formValues.director}
                        onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor='metascore'>Metascore</Label>
                    <Input type='text'
                        id='metascore'
                        name='metascore'
                        value={formValues.metascore}
                        onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor='stars'>Stars</Label>    
                    {formValues.stars.map((star, index) => (
                        <Input key='index' type='text'
                        id='stars'
                        name={`stars${index}`}
                        value={formValues.stars[index]}
                        onChange={handleChange}
                        />
                    ))
                    }
                    <Button onClick={addStarInput} >+</Button>
                    </FormGroup>
                    <Button color='primary' type='submit'>Submit Update</Button>
                </Form>
                
            </div>
        )
    }
}

export default UpdateMovieForm
