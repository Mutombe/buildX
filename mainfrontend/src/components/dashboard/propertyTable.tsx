import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Skeleton,
} from "@mui/material";
import { Chip } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ImagePreviewModal from "../image-preview/imagePreview";

import { fetchUserProperties, deleteProperty } from "../../redux/propertySlice";
import EditPropertyModal from "../properties/propertiesEditForm";

export function PropertyTable() {
  const dispatch = useDispatch();
  const { userProperties, loading: userPropertiesLoading } = useSelector(
    (state) => state.properties
  );
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [previewModalShow, setPreviewModalShow] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchUserProperties());
  }, [dispatch]);

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProperty(id));
  };

  const handleImageClick = (images) => {
    setCurrentImages(images);
    setCurrentImageIndex(0);
    setPreviewModalShow(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ width: "100%", cursor: "pointer" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Subscribers</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userPropertiesLoading
              ? [...Array(3)].map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell colSpan={9}>
                      <Skeleton
                        animation="wave"
                        height={60}
                        variant="rectangular"
                        width="100%"
                      />
                    </TableCell>
                  </TableRow>
                ))
              : userProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell
                      onClick={() => handleImageClick(property.images)}
                    >
                      <img
                        src={property.images[0].file}
                        alt="Preview"
                        style={{
                          width: "50px",
                          height: "auto",
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                      />
                    </TableCell>
                    <TableCell>{property.category}</TableCell>
                    <TableCell>{property.name}</TableCell>
                    <TableCell>
                      {" "}
                      <Chip
                        variant="soft"
                        color={property.occupied ? "warning" : "success"}
                        size="sm"
                      >
                        {property.occupied ? "Occupied" : "Unoccupied"}
                      </Chip>
                    </TableCell>
                    <TableCell>{property.subscribers_count}</TableCell>
                    <TableCell>{property.units.length}</TableCell>
                    <TableCell>
                      <Tooltip title="View Property Units">
                        <Button variant="outlined" size="small">
                          View Units
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(property)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(property.id)}>
                        <DeleteRoundedIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedProperty && (
        <EditPropertyModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedProperty(null);
          }}
          property={selectedProperty}
        />
      )}
      <ImagePreviewModal
        show={previewModalShow}
        onHide={() => setPreviewModalShow(false)}
        images={currentImages}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
      />
    </>
  );
}
