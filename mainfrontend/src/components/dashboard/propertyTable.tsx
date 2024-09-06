import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Text from "../typography/typography";
import { deleteProperty } from "../../redux/propertySlice";
import { fetchUserProperties } from "../../redux/propertySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";

export function PropertyTable() {
  const dispatch = useDispatch();
  const userProperties = useSelector(
    (state) => state.properties.userProperties
  );

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
            <TableBody>
              {userProperties.map((property) => (
                <TableRow
                  key={property.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {property.name}
                  </TableCell>
                  {property.accupied ? (
                    <TableCell align="right">Booked</TableCell>
                  ) : (
                    <TableCell align="right">Open</TableCell>
                  )}

                  <TableCell align="right">{property.location}</TableCell>
                  <TableCell align="right">
                    <EditIcon color="primary" />
                  </TableCell>

                  <TableCell align="right">
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
    </>
  );
}
