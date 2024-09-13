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
import { IconButton, TableHead } from "@mui/material";
import EditPropertyModal from "../properties/propertiesEditForm";

export function PropertyTable() {
  const dispatch = useDispatch();
  const userProperties = useSelector(
    (state) => state.properties.userProperties
  );
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleEditClick = (property: any) => {
    setSelectedProperty(property);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProperty(null);
  };

  useEffect(() => {
    dispatch(fetchUserProperties());
  }, [dispatch]);

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
                <TableCell>Photos</TableCell>
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
              {userProperties.map((property) => (
                <TableRow
                  key={property.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>400</TableCell>
                  <TableCell>{property.category}</TableCell>
                  <TableCell component="th" scope="row">
                    {property.name}
                  </TableCell>
                  {property.accupied ? (
                    <TableCell>Occupied</TableCell>
                  ) : (
                    <TableCell>Unoccupied</TableCell>
                  )}
                  <TableCell>{property.subscribers}0</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>View Units</TableCell>

                  <TableCell>
                    <IconButton onClick={() => handleEditClick(property)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(property.id)}
                    >
                      <DeleteRoundedIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      ;
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
