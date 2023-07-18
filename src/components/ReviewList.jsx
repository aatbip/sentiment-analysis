import { Box, Typography, Stack } from '@mui/material'
import { convertLength } from '@mui/material/styles/cssUtils';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ReviewList = ({id, critic_name, content, review_date, rating, sentimentPred, prob_pos, prob_neg}) => {
    const navigate = useNavigate();

    return (
        <Stack direction="row" gap="1rem" sx={{

            border: "2px solid black",
            borderRadius: "12px",
            padding: "10px",
        }} >
            <Box>
                <Typography variant='h5'> {critic_name}</Typography>
                <Typography variant='body2'>{content}</Typography>
                <Typography variant='body1'>Review Date: {review_date}</Typography>
                <Typography variant='body1'>Ratings: {rating}</Typography>
                <Typography variant='body1'>Sentiment Prediction: {sentimentPred}</Typography>
                <Typography variant='body1'>Positive Probability: {prob_pos}</Typography>
                <Typography variant='body1'>Negative Probability: {prob_neg} </Typography>
            </Box>

        </Stack>
    )
}


export default ReviewList