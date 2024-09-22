import { useEffect, useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import {
  Button,
  Typography,
  Box,
  Grid,
  Container,
  Card,
  IconButton,
  AspectRatio,
  Divider,
  List,
  ListItem,
  ListItemDecorator,
  Chip,
  Link,
} from "@mui/joy";
import {
  Home as HomeIcon,
  Notifications as NotificationsIcon,
  Group as GroupIcon,
  CalendarMonth as CalendarMonthIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Business as BusinessIcon,
  Chat as ChatIcon,
  Search as SearchIcon,
  Apartment as ApartmentIcon,
  Villa as VillaIcon,
  Warehouse as WarehouseIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import "./mainpage.css";

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        textAlign: "center",
        transition: "all 0.3s ease-in-out",
        transform: isHovered ? "translateY(-10px)" : "none",
        boxShadow: isHovered ? "0 10px 20px rgba(0,0,0,0.1)" : "none",
        "&:hover": {
          bgcolor: "background.level2",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        sx={{
          fontSize: 48,
          mb: 2,
          transition: "all 0.3s ease-in-out",
          transform: isHovered ? "scale(1.2)" : "none",
          color: isHovered ? "primary.main" : "text.primary",
        }}
      />
      <Typography
        level="h4"
        component="h3"
        mb={2}
        sx={{
          transition: "color 0.3s ease-in-out",
          color: isHovered ? "primary.main" : "text.primary",
        }}
      >
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </Card>
  );
};

const PropertyTypeCard = ({ icon: Icon, title }) => (
  <Card
    variant="soft"
    sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}
  >
    <Icon sx={{ fontSize: 32 }} />
    <Typography level="h6">{title}</Typography>
  </Card>
);

export default function LandingPage() {
  return (
    <CssVarsProvider>
      <Box
        sx={{
          bgcolor: "background.body",
          minHeight: "100vh",
          transition: "background-color 0.3s",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            pt: 2,
            pb: { xs: 8, md: 12 },
            position: "relative",
            overflow: "hidden",
            clipPath: "polygon(0 0, 100% 0, 100% 85%, 0% 100%)",
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography level="h4" component="h1" sx={{ color: "white" }}>
                Homer
              </Typography>
              <ColorSchemePicker />
            </Box>

            <Grid container spacing={4} alignItems="center">
              <Grid xs={12} md={6}>
                <Typography
                  level="h1"
                  component="h2"
                  mb={2}
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Revolutionize Your Property Experience
                </Typography>
                <Typography
                  level="h4"
                  component="h3"
                  mb={4}
                  sx={{
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  Seamless Management, Instant Communication, Smart Bookings
                </Typography>
                <Button
                  size="lg"
                  variant="solid"
                  sx={{
                    bgcolor: "white",
                    color: "black",
                  }}
                >
                  <Link href="/property" underline="none">
                    Explore Properties
                  </Link>
                </Button>
              </Grid>
              <Grid xs={12} md={6}>
                <AspectRatio
                  ratio="16/9"
                  sx={{
                    mt: { xs: 4, md: 0 },
                    borderRadius: "md",
                    overflow: "hidden",
                    boxShadow: "lg",
                    transform:
                      "perspective(1000px) rotateY(-15deg) rotateX(5deg) rotate(1deg) scale(0.9)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform:
                        "perspective(1000px) rotateY(-5deg) rotateX(5deg) rotate(1deg) scale(0.95)",
                    },
                  }}
                >
                  <img
                    src="https://github.com/user-attachments/assets/0eceef67-7b6e-4abf-b1fa-efe56dec106d"
                    alt="Modern apartment interior"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </AspectRatio>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ my: 8 }}>
            <Grid xs={12} sm={6} md={3}>
              <FeatureCard
                icon={HomeIcon}
                title="Smart Property Matching"
                description="AI-powered recommendations for your perfect home or office."
              />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <FeatureCard
                icon={ChatIcon}
                title="Instant Communication"
                description="Real-time chat between tenants and property owners."
              />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <FeatureCard
                icon={BusinessIcon}
                title="Office Space Solutions"
                description="Flexible workspaces for businesses of all sizes."
              />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <FeatureCard
                icon={CalendarMonthIcon}
                title="Smart Booking System"
                description="Optimize occupancy and pricing with our AI algorithms."
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 8 }}>
            <Chip variant="soft" color="primary">
              Diverse Property Types
            </Chip>
          </Divider>

          <Grid container spacing={2} sx={{ mb: 8 }}>
            <Grid xs={6} sm={3}>
              <PropertyTypeCard icon={ApartmentIcon} title="Apartments" />
            </Grid>
            <Grid xs={6} sm={3}>
              <PropertyTypeCard icon={VillaIcon} title="Houses" />
            </Grid>
            <Grid xs={6} sm={3}>
              <PropertyTypeCard icon={BusinessIcon} title="Offices" />
            </Grid>
            <Grid xs={6} sm={3}>
              <PropertyTypeCard icon={WarehouseIcon} title="Warehouses" />
            </Grid>
          </Grid>

          <Box
            sx={{
              bgcolor: "background.level1",
              borderRadius: "lg",
              p: 4,
              mb: 8,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography level="h3" component="h3" mb={2}>
                Why Choose Homer?
              </Typography>
              <List>
                <ListItem>
                  <ListItemDecorator>
                    <CheckIcon color="primary" />
                  </ListItemDecorator>
                  Streamlined property management
                </ListItem>
                <ListItem>
                  <ListItemDecorator>
                    <CheckIcon color="primary" />
                  </ListItemDecorator>
                  Instant messaging with property owners
                </ListItem>
                <ListItem>
                  <ListItemDecorator>
                    <CheckIcon color="primary" />
                  </ListItemDecorator>
                  Smart recommendations based on your preferences
                </ListItem>
                <ListItem>
                  <ListItemDecorator>
                    <CheckIcon color="primary" />
                  </ListItemDecorator>
                  Flexible office space solutions
                </ListItem>
              </List>
            </Box>
            <AspectRatio
              ratio="4/3"
              sx={{
                width: { xs: "100%", md: "50%" },
                borderRadius: "md",
                overflow: "hidden",
              }}
            >
              <img
                src="https://github.com/user-attachments/assets/0eceef67-7b6e-4abf-b1fa-efe56dec106d"
                alt="Happy tenants"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </AspectRatio>
          </Box>

          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography level="h2" component="h2" mb={2}>
              Ready to Find Your Perfect Space?
            </Typography>
            <Button
              size="lg"
              variant="solid"
              color="primary"
              startDecorator={<SearchIcon />}
              sx={{ mt: 2 }}
            >
              Start Your Search
            </Button>
          </Box>
        </Container>
      </Box>
    </CssVarsProvider>
  );
}
