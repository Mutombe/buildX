import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import './imagePreview.css'

interface ImagePreviewModalProps {
    show: boolean;
    onHide: () => void;
    images: Array<{ id: number; file: string; name: string }>;
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ show, onHide, images, currentIndex, setCurrentIndex }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Body>
                <Carousel activeIndex={currentIndex} onSelect={(index) => setCurrentIndex(index)}>
                    {images.map((image) => (
                        <Carousel.Item key={image.id}>
                            <img
                                className="d-block w-100"
                                src={image.file}
                                alt={image.name}
                            />
                            <Carousel.Caption>
                                <h5>{image.name}</h5>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImagePreviewModal;
