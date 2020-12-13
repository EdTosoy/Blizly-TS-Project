import React, { useState } from "react";

import "./Register.scss";
import { useRegisterMutation } from "../../../generated/graphql";
import { useHistory } from "react-router-dom";

export default function Register() {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [register, { error }] = useRegisterMutation();
  return (
    <div className="register">
      <div className="register-content">
        <div className="text">
          <h2>Create Your Blizly Account</h2>
          <p>
            Already member? <a href="/auth">Log in</a> here.
          </p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await register({
                variables: {
                  password,
                  username,
                },
              });
              history.push("/auth");
              window.location.reload();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <div className="left">
            {error && <div className="error">{error.message}</div>}
            <div className="row">
              <label>Username*</label>
              <input
                type="text"
                placeholder="Please Enter Your Username"
                required={true}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="row">
              <label>Phone Number or Email*</label>
              <input
                type="email"
                placeholder="Please Enter Your Number or Email"
                required={true}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="row">
              <label>Password*</label>
              <input
                type="password"
                placeholder="Please Enter Your Password"
                required={true}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="right">
            <button className="btn-primary" type="submit">
              Sign up
            </button>
            <p className="agreement">
              By clicking “SIGN UP”, I agree to Blizly’s
              <a href="/register"> Terms of Use </a> and
              <a href="/register"> Privacy Plicy</a>
            </p>
            <p>Or, Sign Up with</p>
            <button className="facebook-btn">Facebook</button>
            <button className="google-btn">Google</button>
          </div>
        </form>
      </div>
    </div>
  );
}
