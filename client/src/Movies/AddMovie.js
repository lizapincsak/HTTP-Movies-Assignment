import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
    title: '',
    director: '',
    metascore:'',
    stars: [],
}

const AddMovie = props => {
    const [form, setForm ] = useState(initialItem);
    const history = useHistory();

    const handleChange = e => {
        setForm({
            ...form, 
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        const newForm = {
            ...form, 
            id: new Date(),
            stars: [...form.stars.split()]
        } 
        axios
          .post('http://localhost:5000/api/movies', newForm)
          .then((res) => {
            console.log(res)
            props.setMovieList([
                ...props.movieList, newForm
            ])
            history.push("/")
          })
          .catch((err) => {
            console.log(err)
          })
    }

    return (
        <div>
        <h1>Hi</h1>
        <form onSubmit={onSubmit}>
                <input 
                type="text"
                name="title"
                placeholder="title"
                onChange={handleChange}
                value={form.title}
                />
                <input 
                type="text"
                name="director"
                placeholder="director"
                onChange={handleChange}
                value={form.director}
                />
                <input 
                type="text"
                name="metascore"
                placeholder="metascore"
                onChange={handleChange}
                value={form.metascore}
                />
                <input 
                type="text"
                name="stars"
                placeholder="stars"
                onChange={handleChange}
                value={form.stars}
                />
          <button className="quotes-btn" type="add">
            Add Movie
          </button>
        </form>
    </div>)
}

export default AddMovie;