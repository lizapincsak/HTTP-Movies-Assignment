import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const initialItem = {
    id: '',
    title: '',
    director: '',
    metascore:'',
    stars: [],
}

const UpdateForm = (props) => {
    const [item, setItem] = useState(initialItem)
    const { id } = useParams(); 
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then((res)=> {
            setItem(res.data)
        })
        .catch((err)=> {
            console.log(err)
        })
    }, [id])

    const changeHandles = e => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then((res) => {
                console.log(res)
                props.setMovieList([
                    ...props.movieList.map(movie => {
                        if(movie.id === item.id){
                            return item
                        } else {
                            return movie
                        }
                    })
                ]);
                setItem(initialItem)
                push(`/movies`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return(
        <div>
            <h1>Update Movie Info</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:
                <input 
                type="text"
                name="title"
                onChange={changeHandles}
                placeholder="title"
                value={item.title}
                />
                </label>
                <label>Director: 
                 <input 
                type="text"
                name="director"
                onChange={changeHandles}
                placeholder="director"
                value={item.director}
                />
                </label>
                <label>Metascore: 
                 <input 
                type="text"
                name="metascore"
                onChange={changeHandles}
                placeholder="metascore"
                value={item.metascore}
                />
                </label>
                <label>Stars: 
                 <input 
                type="text"
                name="stars"
                onChange={changeHandles}
                placeholder="stars"
                value={item.stars}
                />
                </label>
                <button className="updatebutton">Update</button>
            </form>
        </div>
    )
}

export default UpdateForm;