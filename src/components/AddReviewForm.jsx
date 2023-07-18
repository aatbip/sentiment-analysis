import { Box, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

const AddReviewForm = () => {
    const [rating, setRating] = useState('');
    const [reviewContent, setReviewContent] = useState('');

    const handleRating = (e) => {
        setRating(e.target.value);
    }

    const handleContent = (e) => {
        setReviewContent(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/reviews/', {
                rating: rating,
                content: reviewContent,
            });

            setRating('');
            setReviewContent('');

        } catch (error) {
            console.log('Error adding review: ', error)
        }
    }

    return (
        <Box>
            <Typography variant='h4'>Add New Review</Typography>
            <Box sx={{marginBottom: '1rem'}}>
                <Typography variant='body1'> Review</Typography>
                <TextField label='content' name='content' multiline rows={4} value={reviewContent} onChange={handleContent}/>
            </Box>
            <Box sx={{ marginBottom: '1rem'}}>
                
                <TextField label='rating' name='rating' type='number' value={rating} onChange={handleRating}/>
            </Box>
            <Button variant='contained' onClick={handleSubmit}>
                Add Review
            </Button>
        </Box>
    )

}

export default AddReviewForm;