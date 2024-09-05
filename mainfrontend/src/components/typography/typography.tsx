import { Typography } from "@mui/material";

const Text = ({ size, text }) => {
  return (
    <Typography variant={size} gutterBottom>
      {text}
    </Typography>
  );
};

export default Text;
