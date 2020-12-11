import React, { useState } from "react";

import "./Auth.scss";
import { useLoginMutation } from "../../generated/graphql";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "src/accessToken";

export default function Auth() {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error }] = useLoginMutation();
  if (error) {
    console.log(error);
  }
  return (
    <div className="auth">
      <div className="auth-content">
        <div className="text">
          <h2>Welcome to Blizly, Please login.</h2>
          <p>
            New member? <a href="/register">Register</a> here.
          </p>
        </div>
        <form
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              const response = await login({
                variables: {
                  password,
                  username,
                },
              });
              if (response && response.data) {
                setAccessToken(response.data.login.accessToken);
              }
              history.push("/");
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
            <p>
              <a href="/auth">Forget password?</a>
            </p>
          </div>
          <div className="right">
            <button className="btn-primary">Log In</button>
            <p>Or, Log in with</p>
            <button className="facebook-btn">Facebook</button>
            <button className="google-btn">Google</button>
          </div>
        </form>
      </div>
    </div>
  );
}
