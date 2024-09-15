import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPropertyUnits } from '../../redux/propertySlice';
import { CssVarsProvider } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './unitList.css'

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
    <CssVarsProvider>
      <Typography level="h2" sx={{ mb: 2 }}>
        Available Units
      </Typography>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {units.map((unit) => (
          <Grid key={unit.id} xs={12} sm={6} md={4}>
            <Card
              variant="outlined"
              sx={{
                '&:hover': {
                  boxShadow: 'md',
                  borderColor: 'neutral.outlinedHoverBorder',
                },
              }}
            >
              <CardContent>
                <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                  {unit.name}
                </Typography>
                <Typography level="body2" sx={{ mb: 1 }}>
                  Rented: {unit.booked_count} times
                </Typography>
                <Chip
                  variant="outlined"
                  color={unit.occupied ? 'warning' : 'success'}
                  startDecorator={unit.occupied ? <CancelIcon /> :<CheckCircleIcon /> }
                >
                  {unit.occupied ? 'Occupied' : 'Vacant'}
                </Chip>
                <Button
                  variant="solid"
                  color="primary"
                  startDecorator={<HomeIcon />}
                  endDecorator={<ArrowForwardIcon />}
                  sx={{ mt: 2, width: '100%' }}
                  onClick={() => handleBookUnit(unit.id)}
                >
                  Book Unit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </CssVarsProvider>
  );
};

export default UnitList;