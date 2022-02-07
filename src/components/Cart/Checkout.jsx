import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { DataContext } from "../DataProvider";
const Checkout = () => {
  let history = useHistory();
  const value = useContext(DataContext);
  const [cart, setCart] = value.cart;
  const [user, setUser] = value.user;
  const [total, setTotal] = useState(0);

  const filtercart = cart.filter((val) => val.userid == user.email);

  useEffect(() => {
    const getTotal = () => {
      const result = filtercart.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
      setTotal(result);
    };
    getTotal();
  }, [cart]);

  const handleDecrement = (id) => {
    cart.forEach((product) => {
      if (product.productId === id && product.userid == user.email) {
        product.count === 1
          ? removeProduct(product.productId)
          : (product.count = product.count - 1);
      }
    });
    setCart([...cart]);
  };
  const handleIncrement = (id) => {
    cart.forEach((product) => {
      if (product.productId === id && product.userid == user.email) {
        product.count = product.count + 1;
      }
    });
    setCart([...cart]);
  };

  const removeProduct = (id) => {
    cart.forEach((product, i) => {
      if (product.productId === id && product.userid == user.email) {
        cart.splice(i, 1);
      }
    });
    setCart([...cart]);
  };

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
  const Button = styled.button`
    width: 10%;
    height: 10%;
    background-color: #e1e8ee;
    border-radius: 6px;
    color: red;
    border: none;
    cursor: pointer;
    text-align: center;
    margin-left: 3px;
  `;
  if (filtercart.length === 0) {
    return <h1>Cart is empty.....</h1>;
  }

  return (
    <>
      <MainContainer>
        <MainLeftContainer>
          {filtercart.map((product) => (
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
                  <InDe onClick={() => handleDecrement(product.productId)}>
                    -
                  </InDe>
                  <Quantity>{product.count}</Quantity>
                  <InDe onClick={() => handleIncrement(product.productId)}>
                    +
                  </InDe>
                  <Button onClick={() => removeProduct(product.productId)}>
                    X
                  </Button>
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

          <Link to="/deliveryadress">
            <button>Proceed To Checkout</button>
          </Link>
        </MainRightContainer>
      </MainContainer>
    </>
  );
};
export default Checkout;
