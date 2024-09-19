import React, { useState } from 'react';
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import ImageIcon from "@mui/icons-material/Image";
import { Carousel } from "react-bootstrap";
import ImagePreviewModal from "../image-preview/imagePreview";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const DrawerUnitList = ({ property }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleShow = (unit, index) => {
    setSelectedUnit(unit);
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {property.units.map((unit) => (
        <Card
          variant="outlined"
          sx={{
            width: '100%',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            },
            animation: `${fadeIn} 0.5s ease-in`,
          }}
          key={unit.id}
        >
          <AspectRatio ratio="16/9">
            <div>
              {unit.images && unit.images.length > 0 ? (
                <Carousel fade indicators={false}>
                  {unit.images.map((image, index) => (
                    <Carousel.Item
                      key={image.id}
                      onClick={() => handleShow(unit, index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={image.file}
                        alt={image.name}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                      <Carousel.Caption>
                        <Typography
                          level="body-sm"
                          sx={{
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                          }}
                        >
                          {image.name}
                        </Typography>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  <ImageIcon sx={{ fontSize: "3rem", opacity: 0.2 }} />
                </Box>
              )}
            </div>
          </AspectRatio>
          <Box sx={{ p: 2 }}>
            <Typography level="title-md" sx={{ mb: 1 }}>{unit.name}</Typography>
            <Typography level="body-sm" sx={{ mb: 2 }}>Description of the Unit</Typography>
            <Button
              variant="outlined"
              color="primary"
              size="sm"
              onClick={() => handleShow(unit, 0)}
              fullWidth
            >
              View Details
            </Button>
          </Box>
        </Card>
      ))}
      {selectedUnit && (
        <ImagePreviewModal
          show={showModal}
          onHide={handleClose}
          images={selectedUnit.images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          unitName={selectedUnit.name}
        />
      )}
    </Box>
  );
};

export default DrawerUnitList;