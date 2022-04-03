import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo1 from "../images/MyTinerary.png";
import { Link as Linkrouter } from "react-router-dom";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
const NavBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  function SignOut() {
    props.SignOutUser(props.user.email);
    setAnchorElUser(null);
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: "none", boxShadow: "0" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img src={logo1} alt="logo" className="logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Button>
                  <Linkrouter to="/" className="navBarButtons">
                    Home
                  </Linkrouter>
                </Button>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Button>
                  <Linkrouter to="/cities">Cities</Linkrouter>
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img src={logo1} alt="logo" className="logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                backgroundColor: "#fdd000",
                marginLeft: "3px",
              }}
            >
              <Linkrouter to="/" className="buttonNavbar">
                Home
              </Linkrouter>
            </Button>

            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                display: "block",
                backgroundColor: "#fdd000",
                marginLeft: "3px",
              }}
            >
              <Linkrouter to="/cities" className="buttonNavbar">
                Cities
              </Linkrouter>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography sx={{ color: "black" }}>
                  {props.user ? (
                    <>
                      <h4>{props.user.name + " " + props.user.lastName}</h4>
                    </>
                  ) : (
                    <h4>User disconnected</h4>
                  )}
                </Typography>
                <Avatar
                  alt="?"
                  src={
                    props.user
                      ? props.user.userPic
                        ? props.user.userPic
                        : "imagenes/user2.jpg"
                      : "imagenes/user.jpg"
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {props.user ? null : (
                <div>
                  <Linkrouter to="/SignIn">
                    <MenuItem key={"SignIn"} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Sign In</Typography>
                    </MenuItem>
                  </Linkrouter>
                  <Linkrouter to="/SignUp">
                    <MenuItem key={"SignUp"} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Sign Up</Typography>
                    </MenuItem>
                  </Linkrouter>
                </div>
              )}

              <Linkrouter to="#">
                <MenuItem key={"SignOut"} onClick={SignOut}>
                  <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>
              </Linkrouter>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapDispatchToProps = {
  SignOutUser: userActions.SignOutUser,
};
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
