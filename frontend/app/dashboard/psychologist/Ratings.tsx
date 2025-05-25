import React from 'react';
import { Box, Typography, Rating, Divider } from '@mui/material';
import dayjs from 'dayjs';

interface RatingData {
  clientName: string;
  rating: number;
  reviewDate: string;
}

const Ratings = () => {
  // Mock data: client reviews
  const reviews: RatingData[] = [
    { clientName: 'Anna Kowalska', rating: 5, reviewDate: '2025-05-20' },
    { clientName: 'Marek Nowak', rating: 4.5, reviewDate: '2025-05-18' },
    { clientName: 'Ewa Wiśniewska', rating: 4, reviewDate: '2025-05-15' },
    { clientName: 'Piotr Zieliński', rating: 3.5, reviewDate: '2025-05-10' },
    { clientName: 'Katarzyna Lewandowska', rating: 5, reviewDate: '2025-05-05' },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Client Reviews
      </Typography>
      {reviews.map((review, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Rating value={review.rating} readOnly precision={0.5} size="small" />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              {review.clientName}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {dayjs(review.reviewDate).format('MMMM D, YYYY')}
          </Typography>
          <Divider sx={{ marginTop: 1 }} />
        </Box>
      ))}
    </Box>
  );
};

export default Ratings;
