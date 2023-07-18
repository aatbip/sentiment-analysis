import { Box, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieList from '../components/MovieList';
import ReviewList from '../components/ReviewList';

const ReviewPage = () => {

  const [reviews, setReviews] = useState();
  const [movieInfo, setMovieInfo] = useState(null);

  let positive = 0;
  let negative = 0;

  let { id } = useParams();

  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios.get(`/movies/${id}/reviews/`)
          setReviews(data)
        } catch (error) {
          console.error("Error fetching Reviews: ", error)
        }
        
      }
    )()
  }, [])

  useEffect(() => {
    if (!reviews) return;
    reviews?.map(el => {
      if (el.sentiment_pred === "Positive") {
        positive += 1;
      } else {
        negative += 1;
      }
    })
  }, [reviews])

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const {data} = await axios.get(`/movies/${id}/`);
        setMovieInfo(data);
      } catch (error) {
        console.error("Error fetching movie info:", error)
      }
    };

    fetchMovieInfo();
  }, [id]);

  return (
    <Box sx={{
      display: 'flex',
      padding: "10px"
    }}>
    <Box sx={{flex: '1 0 60%'}}>

      <Typography variant="h4">Overall Sentiment: {positive > negative ? "POSITIVE" : "NEGATIVE"}</Typography>
      <Stack direction="column" rowGap="2rem">
        {
          reviews?.map((el, key) => {
            return <ReviewList  key={key} id={el.id} critic_name={el.critic_name} content={el.content} review_date={el.review_date} sentimentPred={el.sentiment_pred} prob_neg={el.prob_neg} prob_pos={el.prob_pos}/>
          })
        }
      </Stack>
    </Box>

    {movieInfo && (
      <Box sx={{ flex: '1 0 40%', marginLeft: '2rem'}}>
        <img
          src={movieInfo.medium_poster_url}
          alt={movieInfo.title}
          style={{width: '40vh', height: '40vh'}}
        />
        <Typography variant='h3'>{movieInfo.title}</Typography>
        <Typography variant='body1'>Date of Release: {movieInfo.date_released}</Typography>

        <Typography variant='body1'>Description: {movieInfo.description}</Typography>
      </Box>
    )}
    </Box>
  )
}

export default ReviewPage
