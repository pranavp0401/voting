import React from "react";
import { useForm } from "react-hook-form";

import { Container } from "react-bootstrap";

import axios from "axios";

import "./Signin.css";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onFormSubmit = (userData) => {
    axios
      .post("/user/signin", userData)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => console.log(`Error Occured: ${err.message}`));
  };

  return (
    <>
      <Container fluid>
        <h2 className="text-center mt-3">Signup</h2>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="signup-form-width mx-auto"
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
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password?.type === "required" && (
            <p className="text-danger">*Passord is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-danger">
              *Password should be a minimum of 8 characters
            </p>
          )}

          <button className="d-block mx-auto btn btn-warning mt-3">
            Signin
          </button>
        </form>
      </Container>
    </>
  );
};

export default Signin;
