import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    first_name: '',
    last_name: '',
    user_profile: {
        profile_picture: null,
        genre_preferences: []

    }
});


    const [genre, setGenres] = useState([])

    useEffect(() => {
        const fetchGenres = async () => {
          try {
            const {data} = await axios.get(`/genres/`);
            setGenres(data)
          } catch (error) {
            console.error("Error fetching Genres:", error)
          }
        };
    
        fetchGenres();
      })
    
    const handleGenreChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            user_profile: {
                ...prevData.user_profile,
                genre_preferences: [...prevData.user_profile.genre_preferences, value]
            }
        }))
    }

    const handleImageChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            profile_picture: file,
        }))
    }
    // const handleProfileChange = (event) => {
    //     event.preventDefault();
    //     const {name, value} = event.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         user_profile: {
    //             ...prevData.user_profile,
    //             [name]: value,
    //         }
    //     }))
    // }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const formJson = JSON.stringify(formData);
    try {
      const response = await axios.post('/auth/register/', formData);
      // Handle successful registration
      console.log('Registration successful');
    } catch (error) {
      // Handle registration error
      console.error('Error during registration:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Confirm Password"
        name="password2"
        type="password"
        value={formData.password2}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleInputChange}
        required
      />
      
      <input type='file' accept='image/*' onChange={handleImageChange} />
      <InputLabel>Genre Preference</InputLabel>
        <Select
            name='genre_preferences'
            multiple
            value={formData.user_profile.genre_preferences}
            defaultValue={genre.length> 0? genre[0].name: ''}
            onChange={handleGenreChange}
        >
            {genre && genre.map(g=> (
                <MenuItem value={g.id} key={g.id} >{g.name}</MenuItem>
            ))}
        </Select>
      <Button variant="contained" type="submit">
        Register
      </Button>
    </form>
  );
};

export default RegisterPage;
