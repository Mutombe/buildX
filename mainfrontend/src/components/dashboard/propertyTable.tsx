import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Text from "../typography/typography";
import { deleteProperty } from "../../redux/propertySlice";
import { fetchUserProperties } from "../../redux/propertySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton, Skeleton, TableHead, Tooltip } from "@mui/material";
import EditPropertyModal from "../properties/propertiesEditForm";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CarouselRatio from "./images";

export function PropertyTable() {
  const dispatch = useDispatch();
  const { userProperties, loading: userPropertiesLoading } = useSelector(
    (state) => state.properties
  );
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProperty(null);
  };

  useEffect(() => {
    dispatch(fetchUserProperties());
  }, [dispatch]);

  const handleEditClick = (property: any) => {
    setSelectedProperty(property);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProperty(id));
  };

  return (
    <>
      {userProperties.length === 0 ? (
        <Text size={"h6"} text={"You haven't uploaded any properties"} />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <CameraAltIcon />
                </TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Subscribers</TableCell>
                <TableCell>Units</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userPropertiesLoading ? (
                <>
                  {[...Array(3)].map((_, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                userProperties.map((property) => (
                  <TableRow
                    key={property.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >

                    <TableCell>
                      {property.images.count}
                      <CarouselRatio />
                    </TableCell>
                    <TableCell>{property.category}</TableCell>
                    <TableCell component="th" scope="row">
                      {property.name}
                    </TableCell>
                    {property.accupied ? (
                      <TableCell>Occupied</TableCell>
                    ) : (
                      <TableCell>Unoccupied</TableCell>
                    )}
                    <TableCell>{property.subscribers_count}0</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>
                    <Button variant="outlined" size="small">
                      View Units
                    </Button>
                    </TableCell>

                    <TableCell>
                    
                      <IconButton onClick={() => handleEditClick(property)}>
                        <Tooltip title="Edit" placement="top-start">
                          <EditIcon color="primary" />
                        </Tooltip>
                      </IconButton>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(property.id)}
                      >
                        <Tooltip title="Delete" placement="top-start">
                          <DeleteRoundedIcon color="error" />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )};
      {selectedProperty && (
        <EditPropertyModal
          open={openModal}
          onClose={handleCloseModal}
          property={selectedProperty}
        />
      )}
    </>
  );
}
