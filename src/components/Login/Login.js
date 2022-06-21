import React from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { Container } from "react-bootstrap";
import axios from "axios";

import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const onFormSubmit = (userData) => {
    axios
      .post("/user/login", userData)
      .then((response) => {
        alert(response.data.message);

        if (response.data.message === "user logged in") {
          localStorage.setItem("isAuth", true);
          localStorage.setItem("username", response.data.username);
          navigate("/");
        }
      })
      .catch((err) => console.log(`Error Occured: ${err.message}`));
  };

  return (
    <Container fluid>
      <h2 className="text-center mt-3">Login</h2>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="login-form-width mx-auto"
      >
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          {...register("username", { required: true })}
        />
        {errors.username?.type === "required" && (
          <p className="text-danger">*Username is required</p>
        )}

        <label htmlFor="password" className="form-label mt-3">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <p className="text-danger">*Passord is required</p>
        )}

        <button className="d-block mx-auto btn btn-warning mt-3">Login</button>
      </form>
    </Container>
  );
};

export default Login;
