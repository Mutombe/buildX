import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  List, 
  ListItem, 
  Input, 
  Button, 
  IconButton, 
  Divider 
} from '@mui/joy';
import { 
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon
} from '@mui/icons-material';
import "./footer.css"

export default function Footer() {
  return (
    <Box sx={{ 
      bgcolor: '#2BA84A', 
      color: 'white', 
      py: 6,
      mt: 8
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Typography level="h5" component="h3" mb={2} color='primary'>
              Homer
            </Typography>
            <Typography mb={2} sx={{color: 'white'}}>
              Homer is your gateway to finding the perfect living space. We connect property seekers with unique homes and office spaces across the Zimbabwe.
            </Typography>
            </Grid>
          <Grid xs={12} md={4}>
            <Typography level="h5" component="h3" mb={2} color='primary'>
              Quick Links
            </Typography>
            <List>
              <ListItem><Typography color='primary'>Home</Typography></ListItem>
              <ListItem><Typography color='primary'>Properties</Typography></ListItem>
              <ListItem><Typography color='primary'>About Us</Typography></ListItem>
              <ListItem><Typography color='primary'>Contact</Typography></ListItem>
            </List>
                  </Grid> 
             
          <Grid xs={12} md={4}>
            <Typography level="h5" component="h3" mb={2} color='primary'>
              Stay Connected
            </Typography>
            <Typography mb={2} sx={{color: 'white'}}>
              Subscribe to our newsletter for the latest property updates.
            </Typography>
            <Input
              placeholder="Your email"
              endDecorator={
                <Button variant="solid" color="primary">
                  Subscribe
                </Button>
              }
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <IconButton variant="plain" color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton variant="plain" color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton variant="plain" color="danger">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
        <Typography textAlign="center" level="body2">
          © 2024 Homer. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}