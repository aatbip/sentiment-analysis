import { Box, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieList from '../components/MovieList';
import ReviewList from '../components/ReviewList';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import {Pie} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReviewPage = () => {

  const [reviews, setReviews] = useState();
  const [movieInfo, setMovieInfo] = useState(null);
  const [chartData, setChartData] = useState({});
  
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
    if (reviews) {
      
      const chartData = {
        labels: ["Positive", "Negative"],
        datasets: [
          {
            data: [positive, negative],
            backgroundColor: ["#2ecc71", "#e74c3c"]
          },
        ]
      }
      setChartData(chartData)
    }
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
      <Box sx={{ marginTop: '2rem' , width: '20vh', height: '20vh'}}>
          {Object.keys(chartData).length > 0 && (
            <Pie data={chartData} />
            )}

        </Box>
      <Stack direction="column" rowGap="2rem">
        {
          reviews?.map((el, key) => {
            return <ReviewList  key={key} id={el.id} critic_name={el.critic_name} content={el.content} review_date={el.review_date} sentimentPred={el.sentiment_pred} rating={el.rating} prob_neg={el.prob_neg} prob_pos={el.prob_pos}/>
          })
        }
      </Stack>
    </Box>

    {movieInfo && (
      <Box sx={{ flex: '1 0 40%', marginLeft: '2rem'}}>
        <img
          src={movieInfo.medium_poster_url}
          alt={movieInfo.title}
          style={{width: '70%', height: '50vh', objectFit: 'fit'}}
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
