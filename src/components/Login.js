import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [inpVal, setInpVal] = useState({
    email: "",
    password: "",
  });
  const history = useNavigate();

  console.log(inpVal);

  const setVal = (e) => {
    // console.log(e.target.name); //fname email password cpassword
    // console.log(e.target.value);
    const { name, value } = e.target;
    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value,
      };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = inpVal;

    if (email === "") {
      alert("Please enter your email");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email-id");
    } else if (password === "") {
      alert("Please enter your password");
    } else if (password.length < 6) {
      alert("Password must be 6 or more characters");
    } else {
      //api work will be done here till that time just console it
      // console.log("User Logged in successfully!!!");

      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        localStorage.setItem("userDataToken", res.result.token);
        history("/dash");
        setInpVal({
          ...inpVal,
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are glad to have you back. Please login.</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email Address"
                value={inpVal.email}
                onChange={setVal}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  value={inpVal.password}
                  onChange={setVal}
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginUser}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
            </p>
            <p style={{ color: "black", fontWeight: "bold" }}>
              Forgot Password? <NavLink to="/password-reset">Click Here</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
