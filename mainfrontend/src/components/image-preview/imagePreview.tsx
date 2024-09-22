import React from 'react';
import { Modal } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './imagePreview.css';

interface ImagePreviewModalProps {
  show: boolean;
  onHide: () => void;
  images: Array<{ id: number; file: string; name: string }>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  unitName: string;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  show,
  onHide,
  images,
  currentIndex,
  setCurrentIndex,
  unitName,
}) => {
  const handlePrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  return (
    <Modal show={show} onHide={onHide} size="xl" sx={{ borderRadius: '10px' }} centered>
      <Modal.Body className="p-0">
        <Box sx={{ position: 'relative', bgcolor: 'black', height: '90vh', borderRadius: '10px' }}>
          <IconButton
            onClick={onHide}
            sx={{ position: 'absolute', top: 10, right: 10, color: 'white', zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Carousel
            activeIndex={currentIndex}
            onSelect={(index) => setCurrentIndex(index)}
            interval={null}
            indicators={false}
            prevIcon={<NavigateBeforeIcon sx={{ fontSize: 40, color: 'white' }} />}
            nextIcon={<NavigateNextIcon sx={{ fontSize: 40, color: 'white' }} />}
          >
            {images.map((image) => (
              <Carousel.Item key={image.id}>
                <Box
                  sx={{
                    height: '90vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={image.file}
                    alt={image.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              </Carousel.Item>
            ))}
          </Carousel>

        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default ImagePreviewModal;