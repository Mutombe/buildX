import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import './images.css';

const CarouselRatio = ({property}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        overflow: 'auto',
        height: 50,
        width: 200,
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
              '::-webkit-scrollbar': { display: 'none' },
        paddingTop: 0,
        paddingBottom:0,
      }}
    >
      {property.images.map((image) => (
        <Card orientation="horizontal" size="sm" key={image.id} variant="outlined" sx={{height:40, width:50, padding:0 }}>
          <AspectRatio ratio="1" sx={{ minWidth: 50 }}>
            <img
              srcSet={`${image.file}?h=50&fit=crop&auto=format&dpr=2 2x`}
              src={`${image.file}?h=50&fit=crop&auto=format`}
              alt={image.name}
            />
          </AspectRatio>
        </Card>
      ))}
    </Box>
  );
}

export default CarouselRatio