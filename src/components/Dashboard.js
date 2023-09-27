import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const [data, setData] = useState(false);

  const { loginData, setLoginData } = useContext(LoginContext);
  //    console.log(loginData.validUserOne.email)
  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("userDataToken");
    console.log(token);

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();

    if (data.status === 401 || !data) {
      // console.log("Error page redirect");
      history("*");
    } else {
      console.log("User verified");
      setLoginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="./man.png"
            alt="Man Photo"
            style={{ width: "200px", marginTop: 20 }}
          />
          <h1>User Email: {loginData ? loginData.validUserOne.email : ""}</h1>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Dashboard;
