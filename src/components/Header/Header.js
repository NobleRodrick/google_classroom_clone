import React from 'react';
import { useTheme } from '@mui/material/styles';  // Import useTheme to access theme.spacing
import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Add, Apps } from '@mui/icons-material';
import { CreateClass, JoinClass } from '..';
import { useLocalContext } from "../../context/context";
import { useStyles } from './style';  // Ensure this import matches your styles file

const Header = ({ children }) => {
  const theme = useTheme();  // Use useTheme to access the theme object
  const classes = useStyles();  // Corrected here, using useStyles hook for custom styles

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const {
    setCreateClassDialog,
    setJoinClassDialog,
    loggedInUser,
    logout,
  } = useLocalContext();

  const handleCreate = () => {
    handleClose();
    setCreateClassDialog(true);
  };

  const handleJoin = () => {
    handleClose();
    setJoinClassDialog(true);
  };

  return (
    <div className={classes.root}>  {/* Now it uses the classes object */}
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
            {children}
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
              alt="Classroom"
            />
            <Typography variant="h6" className={classes.title}>
              Classroom
            </Typography>
          </div>
          <div className={classes.header__wrapper__right}>
            <Add onClick={handleClick} className={classes.icon} />
            <Apps className={classes.icon} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class</MenuItem>
            </Menu>
            <div>
              <Avatar
                onClick={() => logout()}
                src={loggedInUser?.photoURL}
                className={classes.icon}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass />
      <JoinClass />
    </div>
  );
};

export default Header;

