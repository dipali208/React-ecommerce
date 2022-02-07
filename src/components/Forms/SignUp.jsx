import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CryptoJS from "crypto-js";
import { useState } from "react";

const SignUp = () => {
  let history = useHistory();
  const [showpass, setpass] = useState(true);
  const [emailmsg, setmsg] = useState(" ");
  var signuparray = [];

  signuparray = JSON.parse(localStorage.getItem("signupDetails") || "[]");
  const emailAddress = [];

  for (let i = 0; i < signuparray.length; i++) {
    emailAddress[i] = signuparray[i].email;
  }

  const validationSchema = Yup.object({
    userName: Yup.string()
      .max(15, ({ max }) => `username must be at least ${max} characters`)
      .required("The username field is required."),

    address: Yup.string()
      .max(250, ({ max }) => `Address must be max ${max} characters`)
      .required("The Adress field is required."),

    email: Yup.string()
      .email("Invalid email address")
      .lowercase()
      .required("The email field is required."),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("The password field is required."),

    conpassword: Yup.string()
      .required("The Confirm password field is required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
    border: 1px solid #ccc;
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
      background-color: rgb(171, 129, 51);
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
  const togglePassword = () => {
    setpass(!showpass);
  };

  return (
    <>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          address: "",
          password: "",
          conpassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const check = emailAddress.every((val) => {
            return val !== values.email;
          });
         
          if (check) {
            let ciphertext = CryptoJS.AES.encrypt(
            JSON.stringify(values.password),
            "secret key 123"
          ).toString();
          console.log(ciphertext);
          var encrypt = {
            userName: values.userName,
            email: values.email,
            address: values.address,
            password: ciphertext,
            conpassword: ciphertext,
          };
          signuparray.push(encrypt);

          localStorage.setItem("signupDetails", JSON.stringify(signuparray));
          history.push("/login");
          }
          else{
            setmsg("Emailid Already Exist");

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
            <H2>Sign Up To create Account..</H2>
            <hr></hr>
            <div>
              <Label for="uname">
                <b>Username</b>
              </Label>
              <Input
                type="text"
                placeholder="Enter Username"
                name="userName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
              />
              {errors.userName && touched.userName ? (
                <Error>
                  <p>{errors.userName}</p>
                </Error>
              ) : null}
              <Label for="email">
                <b>Email</b>
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
              <Error>
                  <p>{emailmsg}</p>
                </Error>
              <Label for="address">
                <b>Address</b>
              </Label>
              <Input
                type="text"
                placeholder="Enter Address"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
              {(values.address.length>0)&&(250 - values.address.length) >0 ? (
                <Error>
                  <p>{250 - values.address.length} character left</p>
                </Error>
              ) : null}
              {errors.address && touched.address ? (
                <Error>
                  <p>{errors.address}</p>
                </Error>
              ) : null}
              <Label for="psw">
                <b>Password</b>
              </Label>
              <Input
                type={showpass ? "password" : "text"}
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <input
                type="checkbox"
                checked={!showpass}
                onClick={togglePassword}
              />
              Show Password
              {errors.password && touched.password ? (
                <Error>
                  <p>{errors.password}</p>
                </Error>
              ) : null}
              <br></br> <br></br>
              <Label for="conpsw">
                <b>Confirm Password</b>
              </Label>
              <Input
                type="password"
                placeholder="Re-enter Password"
                name="conpassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.conpassword}
              />
              {errors.conpassword && touched.conpassword ? (
                <Error>
                  <p>{errors.conpassword}</p>
                </Error>
              ) : null}
              <Button type="submit">SignUp</Button>
            </div>
          </FormContainer>
        )}
      </Formik>
    </>
  );
};
export default SignUp;
