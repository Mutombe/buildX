import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from '@mui/material';
import { ChevronLeft, ChevronRight, MapPin, Info } from 'lucide-react';
import { PushPin } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Chip as JoyChip } from '@mui/joy';

const StyledCard = styled(Card)({
  maxWidth: 345,
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
  },
});

const ImageContainer = styled(Box)({
  position: 'relative',
  height: 200,
});

const CarouselButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

const EnhancedPropertyCard = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <StyledCard>
      <ImageContainer>
        {property.has_images ? (
          <>
            <CardMedia
              component="img"
              height="200"
              image={property.images[currentImageIndex].file}
              alt={property.images[currentImageIndex].name || "Property"}
            />
            <CarouselButton onClick={prevImage} sx={{ left: 8 }}>
              <ChevronLeft />
            </CarouselButton>
            <CarouselButton onClick={nextImage} sx={{ right: 8 }}>
              <ChevronRight />
            </CarouselButton>
          </>
        ) : (
          <Box
            height={200}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="grey.200"
          >
            <Typography variant="body2" color="text.secondary">
              No image available
            </Typography>
          </Box>
        )}
      </ImageContainer>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {property.name}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <MapPin size={16} style={{ marginRight: 4 }} />
          <Typography variant="body2" color="text.secondary">
            {property.location}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <JoyChip
            variant="soft"
            color="primary"
            size="sm"
          >
            {property.category}
          </JoyChip>
          <Typography variant="body2" color="text.secondary">
            Booked {property.booked_count} times
          </Typography>
        </Box>
        {property.has_units ? (
          <Box display="flex" gap={1}>
            <Button variant="contained" color="primary" fullWidth startIcon={<Info />}>
              View Units
            </Button>
            <Button variant="outlined" color="primary" fullWidth>
              Details
            </Button>
          </Box>
        ) : (
          <Button variant="contained" color="primary" fullWidth>
            Book Property
          </Button>
        )}
      </CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pb={2}>
        <JoyChip
          variant={property.pinned ? "solid" : "soft"}
          color={property.pinned ? "primary" : "neutral"}
          size="sm"
        >
          {property.pinned ? "Pinned" : "Not Pinned"}
        </JoyChip>
        <IconButton color={property.pinned ? "primary" : "default"}>
          <PushPin />
        </IconButton>
      </Box>
    </StyledCard>
  );
};

export default EnhancedPropertyCard;