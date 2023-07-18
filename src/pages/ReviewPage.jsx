import { Box, Stack, Typography, getNativeSelectUtilityClasses } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieList from '../components/MovieList';
import ReviewList from '../components/ReviewList';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import {Pie} from 'react-chartjs-2';
import AddReviewForm from '../components/AddReviewForm';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReviewPage = () => {

  const [reviews, setReviews] = useState();
  const [movieInfo, setMovieInfo] = useState(null);
  const [chartData, setChartData] = useState({});
  const [genres, setGenres] = useState([])
  const [barChartData, setBarChartData] = useState({});

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




  return (
    <Box sx={{
      display: 'flex',
      padding: "10px"
    }}>
    <Box sx={{flex: '1 0 60%'}}>
      <Box sx={{ marginTop: '2rem', display: 'flex',flexWrap: 'wrap', marginBottom: '2rem'}}>
      <Typography variant="h5" sx={{fontWeight: 'bold'}}>Overall Sentiment: {positive > negative ? "POSITIVE" : "NEGATIVE"}</Typography>
      <Box sx={{ marginTop: '2rem' , width: '15vh', height: '15vh'}}>
          {Object.keys(chartData).length > 0 && (
            <Pie data={chartData} />
            )}

      </Box>

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
        <Typography variant='body1'>Genre: {genres.filter((genre) => movieInfo.genre.includes(genre.id)).map((genre) => genre.name).join(', ')}</Typography>
        <Typography variant='body1'>Description: {movieInfo.description}</Typography>

        <Box>
          <AddReviewForm />
        </Box>
      </Box>
    )}
    
    </Box>
  )
}

export default ReviewPage
