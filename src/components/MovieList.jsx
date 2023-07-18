import { Box, Typography, Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieList = ({ id, title, description, date_released, isReview,sentimentPred, smallPosterUrl }) => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" alignItems="center" gap="1rem" sx={{
      border: "2px solid black",
      borderRadius: "12px",
      padding: "10px",
      cursor: !isReview ? 'pointer': 'default',
      "&:hover": {
        backgroundColor: isReview ? "inherit" : "lightgray",
      }
    }} onClick={() => !isReview && navigate(`/reviews/${id}`)}>
      {smallPosterUrl && (
        <img src={smallPosterUrl} alt={title} width={70} height={100} />
      )}
    <Box>

      <Typography variant="h3">{title}</Typography>
      <Typography variant="body2">{description}</Typography>

      {
        isReview ?
        (
          <>
          <Typography variant="body1">Rating: {date_released}</Typography>
          <Typography variant='body1'>Sentiment Prediction: {sentimentPred}</Typography> 
          </>):
          <Typography variant="body1">Date of Release: {date_released}</Typography>
        }
      
      </Box>
    </Stack>
  )
}

export default MovieList
