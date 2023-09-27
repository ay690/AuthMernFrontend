import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutUser = async () => {
    let token = localStorage.getItem("userDataToken");
    console.log(token);
    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },

      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 201) {
  
      console.log("User Logged out");
      localStorage.removeItem("userDataToken");
      setLoginData(false);
      history("/");
      
    } else {
      console.log("Error");
    }
  };

  const goError = () => {
    history("*");
  };

  const goDash = () => {
    history("/dash");
  };

  return (
    <>
      <header>
        <nav>
          <h1>HP Cloud</h1>
          <div className="avtar">
            {loginData.validUserOne ? (
              <Avatar
                style={{
                  background: "salmon",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
                onClick={handleClick}
              >
                {loginData.validUserOne.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                style={{
                  background: "blue",
                }}
                onClick={handleClick}
              />
            )}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {loginData.validUserOne ? (
              <>
                <MenuItem
                  onClick={() => {
                    goDash();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logOutUser();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    goError();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
              </>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;
