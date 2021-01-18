import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';


const initialFormObject = {
    title: "",
    director: "",
    metascore: "",
    stars: [],
}

function AddMovieForm(props) {
    const [formValues, setFormValues] = useState(initialFormObject);
    const history = useHistory();

    const handleChange = (e) => {
        console.log(formValues)
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
        console.log(formValues);
        props.addMovie(formValues);
        history.push(`/`);  
    }
  
    return (
        <div className='addMovieForm-wrapper'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input type='text'
                    id='title'
                    name='title'
                    value={formValues.title}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='form-group'>
                <label htmlFor='director'>Director</label>
                <input type='text'
                    id='director'
                    name='director'
                    value={formValues.director}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='form-group'>
                <label htmlFor='metascore'>Metascore</label>
                <input type='text'
                    id='metascore'
                    name='metascore'
                    value={formValues.metascore}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='form-group'>
                <label htmlFor='stars'>Stars</label>    
                    <input type='text'
                    id='stars'
                    name='stars0'
                    value={formValues.stars[0]}
                    onChange={handleChange}
                    />
                     <input type='text'
                    id='stars'
                    name='stars1'
                    value={formValues.stars[1]}
                    onChange={handleChange}
                    />
                     <input type='text'
                    id='stars'
                    name='stars2'
                    value={formValues.stars[2]}
                    onChange={handleChange}
                    />
                </div>
                <button type='submit'>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovieForm;

    

