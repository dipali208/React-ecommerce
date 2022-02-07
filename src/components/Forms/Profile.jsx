import { Formik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import styled from "styled-components";
import CryptoJS from "crypto-js";
import { DataContext } from "../DataProvider";

const Profile = () => {
  const [showpass,setpass]=useState(true);

  const value = useContext(DataContext);
  const [user, setuser] = value.user;
  var signuparray = JSON.parse(localStorage.getItem("signupDetails") || "[]");
 
  var descryptedPassword = JSON.parse(
    CryptoJS.AES.decrypt(user.password, "secret key 123").toString(
      CryptoJS.enc.Utf8
    )
  );
  const [msg, setmsg] = useState(" ");

  const validationSchema = Yup.object({
    userName: Yup.string()
      .max(15, ({ max }) => `username must be at least ${max} characters`)
      .required("The username field is required."),

    address: Yup.string()
      .max(250, ({ max }) => `Address must be max ${max} characters`)
      .required("The Adress field is required."),

    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("Password is required"),

    conpassword: Yup.string()
      .required("The password field is required.")
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
  const togglePassword=()=>{    
    setpass(!showpass);
  }
  return (
    <>
      <H3>{msg}</H3>
      <Formik
        initialValues={{
          userName: user.userName,
          email: user.email,
          address: user.address,
          password: descryptedPassword,
          conpassword: descryptedPassword,
        }}
        validationSchema={validationSchema}


        onSubmit={(values) => {
          sessionStorage.removeItem("user");
          
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(values.password), 'secret key 123').toString();
         console.log(ciphertext);
          var encrypt={
          userName: values.userName,
          email: values.email,
          address: values.address,
          password: ciphertext,
          conpassword: ciphertext
          }
          setuser(encrypt);
       
        

                                                                   
          var news = signuparray.map((item) => {
            var temp = Object.assign({}, item);
            if (temp.email === values.email) {
              temp.userName = encrypt.userName;
              temp.email = encrypt.email;
              temp.address = encrypt.address;
              temp.password = encrypt.password;
              temp.conpassword = encrypt.conpassword;
            }
            return temp;
          });

          localStorage.removeItem("signupDetails");
          localStorage.setItem("signupDetails", JSON.stringify(news));
          setmsg("Profile Updated Suceessfully");
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
            <H2>Update Profile here...</H2>
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
                readOnly
              />

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
               <input type="checkbox" checked={!showpass} onClick={togglePassword}/>Show Password
              {errors.password && touched.password ? (
                <Error>
                  <p>{errors.password}</p>
                </Error>
              ) : null}
                <br></br><br></br>
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
              <Button type="submit">Update Profile</Button>
            </div>
          </FormContainer>
        )}
      </Formik>
      
    </>
  );
};
export default Profile;
