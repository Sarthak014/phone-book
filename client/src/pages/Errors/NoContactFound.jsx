import { Box, Typography } from "@mui/material";

const emptyListMessage = "No Contacts Found!";

const NoContactBox = () => {
  return (
    <Box
      component="div"
      sx={{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)'
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        noWrap={true}
        sx={{
          fontWeight: 600,
          fontFamily: 'monospace',
          letterSpacing: '.2rem'
        }}
      >
        { emptyListMessage }
      </Typography>
    </Box>
  );  
};

export default NoContactBox;
