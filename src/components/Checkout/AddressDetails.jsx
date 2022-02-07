import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

const Add = styled.div`
  margin: auto;
  margin-top: 6%;
  width: 40%;
  border: 2px solid black;
  padding: 10px;
`;
const In = styled.input`
  width: 90%;
  height: 2rem;
`;
const Button=styled.button`

      cursor: pointer;
  background: #fdcb6e;
  width: 100%;
  padding: 10px 15px;
  border: 0;
  color: black;
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 400;
    `;
const AddressDetails=()=>{
  const history=useHistory();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const oldAddress=user.address;
const [newaddress,setnewaddress]=useState("");
const [deliveryaddres,setdeliveryaddres]=useState("");
const [flag,setflag]=useState(false);
const alert = useAlert();
  const saveDeliveryAddress=()=>{
    if (!flag ||deliveryaddres == "") {
      alert.error("You need to select delevery address....");
    } else {
      //alert(this.state.deliveryaddres);
      // sessionStorage.setItem(
      //   "deliveryaddress",
      //   JSON.stringify(this.state.deliveryaddres)
      // );
      history.push(`/orderdetails/${deliveryaddres}`);
    }
  } 
  return (
    <>
      <Add>
        <h2>Select a Delivery Address:</h2>
        <hr></hr>

        <label>
          <input
            type="radio"
            name="address"
            value={oldAddress}
            onChange={(e) =>
             {setdeliveryaddres(e.target.value); setflag(true)}
            }
          />
          {oldAddress} <span>(Register address)</span>
        </label>
        <br></br>
        <br></br>
        <label>
          <input
            type="radio"
            name="address"
            onChange={(e) =>  setflag(true)}
          />
          <In
            type="text"
            name="other_reason"
            placeholder="Add new addresss"
            value={newaddress}
            onChange={(e) => {
             
                setnewaddress(e.target.value);
                setdeliveryaddres(e.target.value);

            }}
          />
        </label>
        <br></br>
        <br></br>

        <Button onClick={()=>saveDeliveryAddress()}>Make your choice</Button>
      </Add>
    </>
  );

} 

export default AddressDetails;
