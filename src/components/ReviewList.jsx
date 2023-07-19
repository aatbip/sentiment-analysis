import { Box, Typography, Stack } from '@mui/material'
import { convertLength } from '@mui/material/styles/cssUtils';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

  
ChartJS.register( CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
  
const ReviewList = ({id, critic_name, content, review_date, rating, sentimentPred, prob_pos, prob_neg}) => {
    const navigate = useNavigate();

    return (
        <Stack direction="row" gap="1rem" sx={{

            border: "2px solid black",
            borderRadius: "12px",
            padding: "10px",
        }} >
            <Box sx={{flexGrow: 1}}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <img src="/star-solid.svg" alt="Star" width="20" height="20" style={{ marginRight: '5px' }} />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {rating}/5
                    </Typography>
                </Box>
                <Typography variant='h4'> {critic_name}</Typography>
                <Typography variant='body1'>{review_date}</Typography>
                <br></br>
                <Typography variant='h6'>{content}</Typography>
                <br />
                {/* <Typography variant='body1'>Ratings: {rating}</Typography> */}
                <Typography variant='body1' sx={{fontWeight: 'bold'}}>Sentiment Prediction: {sentimentPred}</Typography>
                
                {/* <Typography variant='body1'>Positive Probability: {prob_pos}</Typography>
                <Typography variant='body1'>Negative Probability: {prob_neg} </Typography> */}
            </Box>
            <Box>
                {prob_pos && prob_neg && (
                    <Bar 
                        data = {{
                            labels: ['Positive', 'Negative'],
                            datasets: [
                                {
                                    label: 'Probability',
                                    data: [prob_pos, prob_neg], 
                                    backgroundColor: ['#2ecc71', '#e74c3c'],
                                }
                            ]
                        }}
                        options={{
                            indexAxis: 'y',
                            scales: {
                                x: {
                                    min: 0,
                                    max: 1,
                                    ticks: {
                                        stepSize: 0.2,
                                    }
                                }
                            },
                            elements: {
                                bar: {
                                  borderRadius: 8,
                                  barThickness: 1
                                },
                              },
                              maintainAspectRatio: false,
                        }}
                        
                    />
                )}
            </Box>

        </Stack>
    )
}


export default ReviewList