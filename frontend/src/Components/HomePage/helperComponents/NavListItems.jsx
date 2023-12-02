import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  ListItemButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { forwardRef, useState } from "react";
import { useSelector } from "react-redux";


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavListItems = () => {
  const [open, setOpen] = useState(false);
  const {isAuthenticated} = useSelector(state => state.auth)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    Cookies.remove("user")
    setOpen(false);
    window.location.reload()
  }

  return (
    <>
      <Stack spacing={1} sx={{display: isAuthenticated ? "flex" : "none"}}>
        <ListItemButton component={Link} to="/">
          <Typography>Home</Typography>
        </ListItemButton>
        <ListItemButton component={Link} to="/communities">
          <Typography>Communities</Typography>
        </ListItemButton>
        <ListItemButton component={Link} to="/notifications">
          <Typography>Notifications</Typography>
        </ListItemButton>
        <ListItemButton component={Link} to="/profile">
          <Typography>Profile</Typography>
        </ListItemButton>
        <ListItemButton component={Link} to="/setting">
          <Typography>Settings</Typography>
        </ListItemButton>
        <ListItemButton
          variant="outlined"
          sx={{ outline: { md: "1px solid red" }, borderRadius: "5px" }}
          onClick={handleClickOpen}
        >
          <Typography>Log Out</Typography>
        </ListItemButton>
      </Stack>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Log Out"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Click Yes to log out and click no to cancel.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            No
          </Button>
          <Button onClick={handleLogout} variant="outlined" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavListItems;
