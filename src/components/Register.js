import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mix.css";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inpVal, setInpVal] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

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

  const addUserData = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inpVal;

    if (fname === "") {
      alert("Please enter your name");
    } else if (email === "") {
      alert("Please enter your email");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email-id");
    } else if (password === "") {
      alert("Please enter your password");
    } else if (password.length < 6) {
      alert("Password must be 6 or more characters");
    } else if (cpassword === "") {
      alert("Please enter your confirm password");
    } else if (cpassword.length < 6) {
      alert("Confirm password must be 6 or more characters");
    } else if (password != cpassword) {
      alert("Password and Confirm password does not match");
    } else {
      //api work will be done here till that time just console it
      // console.log("User registration successfully done");

      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        }),
      });
      const res = await data.json();
      console.log(res.status);

      if (res.status === 201) {
        alert("User registration done");
        setInpVal({
          ...inpVal,
          fname: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get like it
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                id="fname"
                placeholder="Enter Your Name"
                onChange={setVal}
                value={inpVal.fname}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email Address"
                onChange={setVal}
                value={inpVal.email}
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
                  onChange={setVal}
                  value={inpVal.password}
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
              <div className="form_input">
                <label htmlFor="password">Confirm Password</label>
                <div className="two">
                  <input
                    type={!cpassShow ? "password" : "text"}
                    name="cpassword"
                    id="cpassword"
                    placeholder="Confirm Password"
                    onChange={setVal}
                    value={inpVal.cpassword}
                  />
                  <div
                    className="showpass"
                    onClick={() => setCPassShow(!cpassShow)}
                  >
                    {!cpassShow ? "Show" : "Hide"}
                  </div>
                </div>
              </div>
            </div>
            <button className="btn" onClick={addUserData}>
              Sign Up
            </button>
            <p>
              Already have an Account? <NavLink to="/">Log In</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
