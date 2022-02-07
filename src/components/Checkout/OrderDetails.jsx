import { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataProvider";
import styled from "styled-components";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

const OrderDetails = () => {
  const value = useContext(DataContext);
  //console.log(value.cart[0]);
  let history = useHistory();
  const params = useParams();
  const [cart, setCart] = value.cart;
  const [order, setOrder] = value.order;
  const user = value.user[0];
  const [total, setTotal] = useState(0);
  const alert = useAlert();
  const UserOrderD = cart.filter((val) => val.userid == user.email);

  useEffect(() => {
    const getTotal = () => {
      const result = UserOrderD.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
      setTotal(result);
    };
    getTotal();
  }, [UserOrderD]);

  //Styled Components
  const MainContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px;
    display: flex;

    @media (max-width: 940px) {
      flex-direction: column;
      margin-top: 60px;
    }
  `;
  const MainLeftContainer = styled.div`
    width: 53%;

    margin: auto;
    margin-top: 5px;
    @media (max-width: 940px) {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  `;
  const Img = styled.img`
    width: 100%;
    height: 8rem;
    @media (max-width: 940px) {
      width: 100%;
    }
    @media (max-width: 535px) {
      width: 100%;
    }
  `;
  const MainRightContainer = styled.div`
    width: 45%;

    margin-top: 5px;
    button {
      cursor: pointer;
      background: #fdcb6e;
      width: 100%;
      padding: 10px 15px;
      border: 0;
      color: black;
      font-family: "Roboto";
      font-size: 14px;
      font-weight: 400;
    }
    @media (max-width: 940px) {
      width: 100%;
      margin-left: 0px;
    }
  `;

  const ProductDesc = styled.div`
    border-bottom: 1px solid #e1e8ee;
    margin-bottom: 20px;

    h3 {
      color: #43484d;
      letter-spacing: -2px;
    }
  `;
  const ProductPrice = styled.div`
    display: flex;
    align-items: center;
    span {
      color: #43474d;
      margin-right: 20px;
    }
  `;
  const InDe = styled.button`
    width: 10%;
    height: 10%;
    background-color: #e1e8ee;
    border-radius: 6px;
    color: black;
    border: none;
    cursor: pointer;
    text-align: center;
  `;
  const Quantity = styled.span`
    border: none;
    padding-left: 2px;
    width: 3%;
    color: black;
  `;
  const Left = styled.div`
     width: 30%;
      height: 8rem;  
      @media (max-width: 940px) {
      width: 100%;
      }
    }
      `;
  const Container = styled.div`
    display: flex;
    margin-bottom: 5px;
    @media (max-width: 940px) {
      width: 100%;
    }
  `;
  const Right = styled.div`
    width: 70%;
    margin-left: 10px;
    height: 8rem;
    background-color: white;
    @media (max-width: 940px) {
      width: 100%;
    }
  `;

  const orderplaced = () => {
    const userorder = cart.filter((val) => val.userid == user.email);
    const newCart = cart.filter((val) => val.userid != user.email);
    // alert(newCart);
    setCart(newCart);
    setOrder([
      ...order,
      {
        order: userorder,
        userid: user.email,
        grandtotal: total + 0.05 * total,
      },
    ]);
    history.push("/");
  };

  return (
    <>
      <MainContainer>
        <MainLeftContainer>
          {UserOrderD.map((product) => (
            <Container>
              <Left>
                <Img src={product.imgUrl} />
              </Left>
              <Right>
                <ProductDesc>
                  <h3>{product.productName}</h3>
                </ProductDesc>
                <ProductPrice>
                  <span>Rs.{product.price}</span>

                  <Quantity>
                    <b>Qty:</b>
                    {product.count}
                  </Quantity>
                </ProductPrice>
                <br></br>
              </Right>
            </Container>
          ))}
        </MainLeftContainer>
        <MainRightContainer>
          <h2>Order Details</h2>
          <h3>Item Cost: Rs.{total}</h3>
          <h3>Gst 5% on Cost:{0.05 * total}</h3>
          <hr></hr>
          <h3>Total Ammount:{total + 0.05 * total}</h3>
          <hr />
          <h3>Delivery Address</h3>
          <h4>{params.address}</h4>
          <button onClick={() => orderplaced()}>Confirm Order</button>
          <br />
          <br></br>
          <Link to="/checkout">
            <button>Cancel Order</button>
          </Link>
        </MainRightContainer>
      </MainContainer>
    </>
  );
};

export default OrderDetails;
