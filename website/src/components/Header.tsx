import React from "react";
import { Box, Menu, MenuItem, AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material'
import { Login } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "@tanstack/react-location";
export interface Props {
  title: string
}

const HomeHeader: React.FC<Props> = ({ title }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const menuId = 'primary-search-account-menu';;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "white" }} elevation={1}>
        <Toolbar>
          <Link
            to="/"
            style={{ color: "#333631", fontSize: 20, fontWeight: "bold", textDecoration: 'none' }}
          >
            {title}
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <div style={{ marginLeft: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HomeHeader;
