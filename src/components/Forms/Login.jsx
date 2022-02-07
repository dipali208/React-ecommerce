import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { DataContext } from "../DataProvider";
import CryptoJS from "crypto-js";

const Login = () => {
  let history = useHistory();
  const [msg, setmsg] = useState(" ");
  const value = useContext(DataContext);
  const [user, setuser] = value.user;

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")

      .required("The email field is required."),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Invalid password "
      )
      .required("Password is required."),
  });

  //styled Components

  const FormContainer = styled.form`
    border: 3px solid #f1f1f1;
    font-family: Arial, Helvetica, sans-serif;
    padding: 16px;
    margin: auto;
    width: 50%;
  `;

  const Input = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
   
    box-sizing: border-box;
  `;
  const Button = styled.button`
    background-color: #fdcb6e;
    color: black;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    &:hover {
      background-color:rgb(171, 129, 51);
    }
  `;
  const Error = styled.div`
    color: red;
    text-align: left;
  `;

  const H2 = styled.h2`
    color: gray;
  `;
  const Label = styled.label`
    &:after {
      content: " *";
      color: red;
    }
  `;
  const H3 = styled.h3`
    color: gray;
    text-align: center;
  `;
  return (
    <>
      <H3>{msg}</H3>
      <Formik
        initialValues={{
          email: "",

          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          var users = [];
          users = JSON.parse(localStorage.getItem("signupDetails") || "[]");
          var user = users.find(
            (val) =>
              val.email == values.email &&
              JSON.parse(
                CryptoJS.AES.decrypt(val.password, "secret key 123").toString(
                  CryptoJS.enc.Utf8
                )
              ) == values.password
            //console.log(CryptoJS.AES.decrypt(val.password, 'secret key 123').toString(CryptoJS.enc.Utf8)),
          );

          if (user) {
            // sessionStorage.setItem("user", JSON.stringify(user));
            setuser(user);
            history.push("/");
          } else {
            setmsg("Something went wrong try again");
          }
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <FormContainer onSubmit={handleSubmit}>
            <H2>Login Here </H2>
            <hr></hr>
            <div>
              <Label for="uname">
                <b>Username</b>
              </Label>
              <Input
                type="text"
                placeholder="Enter Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <Error>
                  <p>{errors.email}</p>
                </Error>
              ) : null}

              <Label for="psw">
                <b>Password</b>
              </Label>
              <Input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <Error>
                  <p>{errors.password}</p>
                </Error>
              ) : null}
              <Button type="submit">Login</Button>
            </div>
          </FormContainer>
        )}
      </Formik>
    </>
  );
};
export default Login;
