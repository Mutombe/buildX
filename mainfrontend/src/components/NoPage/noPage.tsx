import { Box, Typography, Button, Paper, keyframes } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useNavigate } from 'react-router-dom';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #6b6bff 30%, #6bffff 90%)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 4,
          textAlign: 'center',
          maxWidth: 400,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <SentimentVeryDissatisfiedIcon 
          sx={{ 
            fontSize: 120, 
            color: 'warning.main', 
            mb: 2,
            animation: `${float} 3s ease-in-out infinite`
          }} 
        />
        <Typography variant="h1" gutterBottom fontWeight="bold" color="warning.main">
          404
        </Typography>
        <Typography variant="h4" gutterBottom color="text.primary">
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ 
            mt: 2,
            backgroundImage: 'linear-gradient(45deg, #6b6bff 30%, #6bffff 90%)',
            color: 'white',
            '&:hover': {
              backgroundImage: 'linear-gradient(45deg, #6bffff 30%, #6b6bff 90%)',
            }
          }}
        >
          Go to Homepage
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;