import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
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
        })
        .catch((err) => {
            console.log(err.response);
            setError(err.response);
            setIsLoaded(true);
            setFormValues(initialFormObject);
        });
    };


    useEffect(() => {
        setMovieToUpdate(id);
    },[])
    
    console.log('formValues', formValues);

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

    const handleSubmit = e => {
        e.preventDefault();
        props.updateMovieList(id, formValues);
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
                <form onSubmit={handleSubmit}>
                    <label htmlFor='title'>Title</label>
                    <input type='text'
                        id='title'
                        name='title'
                        value={formValues.title}
                        onChange={handleChange}
                        />
                    <label htmlFor='director'>Director</label>
                    <input type='text'
                        id='director'
                        name='director'
                        value={formValues.director}
                        onChange={handleChange}
                        />
                    <label htmlFor='metascore'>Metascore</label>
                    <input type='text'
                        id='metascore'
                        name='metascore'
                        value={formValues.metascore}
                        onChange={handleChange}
                        />
                    <label htmlFor='stars'>Stars</label>    
                    {formValues.stars.map((star, index) => (
                        <input key='index' type='text'
                        id='stars'
                        name={`stars${index}`}
                        value={formValues.stars[index]}
                        onChange={handleChange}
                        />
                    ))
                    }
                    <button type='submit'>Submit Update</button>
                </form>
                
            </div>
        )
    }
}

export default UpdateMovieForm
