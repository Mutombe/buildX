import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
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
  Drawer,
  Button,
  Skeleton,
  Typography,
  Snackbar,
  Box,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { Chip } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ImagePreviewModal from "../image-preview/imagePreview";
import EditUnitModal from "../units/unitEditForm";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "react-bootstrap";

import {
  fetchUserProperties,
  deleteProperty,
  fetchPropertyUnits,
} from "../../redux/propertySlice";
import EditPropertyModal from "../properties/propertiesEditForm";
import { deleteUnit } from "../../redux/unitSlice";
import UnitForm from "../units/unitAddingForm";

export function PropertyTable() {
  const dispatch = useDispatch();
  const { userProperties, loading: userPropertiesLoading } = useSelector(
    (state) => state.properties
  );
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openUnitModal, setOpenUnitModal] = useState(false);
  const [showUnitAddingModal, setShowUnitAddingModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [previewModalShow, setPreviewModalShow] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

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

  const handleViewUnits = (property) => {
    setSelectedProperty(property);
    setOpenDrawer(true);
    dispatch(fetchPropertyUnits(property.id)); // Fetch units for the selected property
  };

  const handleUnitEditClick = (unit) => {
    setSelectedUnit(unit);
    setOpenUnitModal(true);
  };

  const handleUnitDelete = (unitId) => {
    dispatch(deleteUnit(unitId));
  };

  const handleDeleteAllUnits = () => {
    if (selectedProperty) {
      if (
        window.confirm(
          "Are you sure you want to delete all units? This action cannot be undone."
        )
      ) {
        selectedProperty?.units.forEach((unit) =>
          dispatch(deleteUnit(unit.id))
        );
      }
    }
  };

  const handleAddMoreUnits = () => {
    setShowUnitAddingModal(true);
    setOpenDrawer(false);
  };

  const handleModalClose = () => {
    setShowUnitAddingModal(false);
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
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewUnits(property)}
                        >
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

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div style={{ width: "400px", padding: "20px" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">{selectedProperty?.name} Units</Typography>
            <IconButton onClick={() => setOpenDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Unit Name</TableCell>
                  <TableCell>Occupied</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProperty?.units.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: "center" }}>
                      <Card variant="outlined" style={{ margin: "20px 0" }}>
                        <CardContent>
                          <Typography variant="h6" color="textSecondary">
                            No Units Available
                          </Typography>
                          <Typography color="textSecondary">
                            This property currently has no units. You can add
                            new units by clicking the button below.
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddMoreUnits}
                            style={{ marginTop: "10px" }}
                          >
                            Add Unit
                          </Button>
                        </CardContent>
                      </Card>
                    </TableCell>
                  </TableRow>
                ) : (
                  selectedProperty?.units.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell>{unit.name}</TableCell>
                      <TableCell>
                        <Chip
                          variant="soft"
                          color={unit.occupied ? "warning" : "success"}
                          size="sm"
                        >
                          {unit.occupied ? "Occupied" : "Available"}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleUnitEditClick(unit)}>
                          <EditIcon color="primary" />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleUnitDelete(unit.id)}>
                          <DeleteRoundedIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedProperty?.units.length !== 0 && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddMoreUnits}
                style={{ marginTop: "20px" }}
              >
                Add More
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteAllUnits}
                style={{ marginTop: "20px" }}
              >
                Delete All Units
              </Button>
            </Box>
          )}
        </div>
      </Drawer>

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

      {selectedUnit && (
        <EditUnitModal
          open={openUnitModal}
          onClose={() => setOpenUnitModal(false)}
          unit={selectedUnit}
        />
      )}

      <Modal
        show={showUnitAddingModal}
        onHide={handleModalClose}
        style={{ marginTop: "70px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Units</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnitForm propertyId={localStorage.getItem(selectedProperty?.id)} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <ImagePreviewModal
        show={previewModalShow}
        onHide={() => setPreviewModalShow(false)}
        images={currentImages}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={warningMessage}
      />
    </>
  );
}
