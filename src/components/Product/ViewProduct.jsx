import { useHistory, useParams } from "react-router-dom";
import { DataContext } from "../DataProvider";
import ProductData from "../ProductListData";
import styled from "styled-components";
import { useContext } from "react";
import { useAlert } from "react-alert";
import _ from "lodash";

const ViewProduct = () => {
  
  let history = useHistory();
  const {id} = useParams();
  const value = useContext(DataContext);
  const [cart, setCart] = value.cart;
  const [user, setuser] = value.user;
  const alert = useAlert();

  const product = _.find(ProductData, function(o) { return o.productId == id; });
  const addCart = (id) => {
    if (user) {
      if (cart.length == 0) {
        const data = ProductData.find((product) => {
          return product.productId === id;
        });
        console.log(data);
       
        setCart([...cart, { ...data, userid: user.email }]);
      } else {
        const check = cart.some((item) => {
          return item.userid === user.email && item.productId === id;
        });

        if (!check) {
          const data = ProductData.find((product) => {
            return product.productId === id;
          });
          console.log(data);
         
          setCart([...cart, { ...data, userid: user.email }]);
          console.log(cart);
        } else {
          cart.forEach((product) => {
            if (product.productId === id && product.userid == user.email) {
              product.count = product.count + 1;
            }
          });
          setCart([...cart]);
        }
      }
    } else {
      alert.show("Login First");
      history.push("/login");
    }
  };

  //Styled Components
  const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px;
    display: flex;
    border: 1px solid black;
    @media (max-width: 940px) {
      flex-direction: column;
      margin-top: 60px;
    }
  `;
  const LeftContainer = styled.div`
    width: 53%;
    height: 30rem;

    margin-top: 5px;
    @media (max-width: 940px) {
      width: 100%;
      height: 20rem;
    }
  `;
  const Img = styled.img`
    height: 30rem;
    width: 100%;
    @media (max-width: 940px) {
      width: 100%;
      height: 20rem;
    }
    @media (max-width: 535px) {
      width: 100%;
    }
  `;
  const RightContainer = styled.div`
    width: 45%;
    height: 20rem;
    margin-top: 5px;
    margin-left:10px;
    @media (max-width: 940px) {
      width: 100%;
      height: 20rem;
    }
  `;
  const ProductDesc = styled.div`
    border-bottom: 1px solid #e1e8ee;
    margin-bottom: 20px;

    h3 {
      color: #43484d;
      letter-spacing: -2px;
    }
    p {
      font-size: 11px;
      font-weight: 300;
      color: #86939e;
      line-height: 24px;
    }
  `;
  const ProductPrice = styled.div`
    display: flex;
    align-items: center;
    span {
      font-size: 26px;
      font-weight: 300;
      color: #43474d;
      margin-right: 20px;
    }
  `;
  const AddToCart = styled.button`
    display: inline-block;
    background-color: #eba52a;
    color: black;
    border-radius: 6px;
    font-size: 16px;

    text-decoration: none;
    padding: 12px 30px;
    transition: all 0.5s;
    :hover {
      background-color: #fdcb6e;
    }
  `;

  return (
    <Container>
      <LeftContainer>
        <Img src={product.imgUrl}></Img>
      </LeftContainer>
      <RightContainer>
        <ProductDesc>
          <h3>{product.productName}</h3>
          <p>{product.description}</p>
        </ProductDesc>

        <ProductPrice>
          <span>Rs.{product.price}</span>

          <AddToCart onClick={() => addCart(product.productId)}>
            Add to cart
          </AddToCart>
        </ProductPrice>
      </RightContainer>
    </Container>
  );
};
export default ViewProduct;
