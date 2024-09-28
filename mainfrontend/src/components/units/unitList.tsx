import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPropertyUnits } from "../../redux/propertySlice";
import { Box, Typography, Button, Card, CardContent, Grid } from "@mui/material";
import { Chip } from "@mui/joy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { Boxes } from "lucide-react";

const UnitList = () => {
  const { propertyId } = useParams();
  const dispatch = useDispatch();
  const units = useSelector((state) => state.properties.units);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPropertyUnits(propertyId));
  }, [propertyId, dispatch]);

  const handleBookUnit = (unitId) => {
    navigate(`/book/unit/${unitId}/`);
  };

  return (
    <Box className="unit-list-container" sx={{marginTop: "100px", marginLeft: "10px", marginRight: "10px"}}>
      <Typography variant="h4" sx={{ mb: 3 }}>Property Units</Typography>
      <Grid container spacing={3}>
        {units.map((unit) => (
          <Grid item key={unit.id} xs={12} sm={6} md={4} className="unit-grid-item">
            <Card className="unit-card">
              <CardContent className="unit-card-content">
                <Typography variant="h6" gutterBottom>
                  {unit.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Rented: {unit.booked_count} times
                </Typography>
                <Box className="unit-chip-container">
                  <Chip
                    variant={unit.occupied ? "solid" : "soft"}
                    color={unit.occupied ? "warning" : "success"}
                    startDecorator={unit.occupied ? <CancelIcon /> : <CheckCircleIcon />}
                  >
                    {unit.occupied ? "Occupied" : "Vacant"}
                  </Chip>
                  <Chip
                    variant="soft"
                    color="primary"
                    startDecorator={<LocalAtmIcon />}
                  >
                    {unit.price_per_month ? `$${unit.price_per_month}/month` : "Unspecified"}
                  </Chip>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Boxes size={20} />}
                  endIcon={<ArrowForwardIcon />}
                  className="book-unit-button"
                  onClick={() => handleBookUnit(unit.id)}
                >
                  Book Unit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UnitList;