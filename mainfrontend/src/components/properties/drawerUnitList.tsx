import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import ImageIcon from "@mui/icons-material/Image";
import { Carousel } from "react-bootstrap";
import ImagePreviewModal from "../image-preview/imagePreview";
import { useState } from "react";

const DrawerUnitList = ({ property }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    
      property.units.map((unit) => (
        <>
        <Card variant="outlined" sx={{ width: '100%' }} key={unit.id}>
          <AspectRatio>
            <div>
              {unit.images ? (
                <Carousel fade>
                  {unit.images.map((image, index) => (
                    <Carousel.Item
                      key={image.id}
                      onClick={() => {
                        setCurrentIndex(index);
                        handleShow();
                      }}
                    >
                      <img
                        className="card-img"
                        src={image.file}
                        alt={image.name}
                      />
                      <Carousel.Caption>{image.name}</Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <ImageIcon sx={{ fontSize: "3rem", opacity: 0.2 }} />
              )}
            </div>
          </AspectRatio>
          <div>
            <Typography level="title-md">{unit.name}</Typography>
            <Typography level="body-sm">Description of the Unit</Typography>
          </div>
        </Card>      
        <ImagePreviewModal
        show={showModal}
        onHide={handleClose}
        images={unit.images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        />
        </>
      )) 
  );
};

export default DrawerUnitList;
