import { Link } from "react-router-dom";
import styled from "styled-components";

function Card(props) {
  const Card = styled.div`
    ${"" /* border:1px solid black; */}
    max-width: 16.5rem;
    width: 100%;
    overflow: hidden;
    height: 26.5rem;
    box-shadow: 0 0 5px #ccc;
    padding: 15px;
    margin: 15px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      max-height: 240px;
      display: block;
      object-fit: cover;
    }
    &:hover {
      box-shadow: 0 0 15px rgba(33, 33, 33, 0.8);
    }
  `;

  const CardBody = styled.div`
    margin: 2px 0;
    h4 {
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    span {
      width: 60px;
      height: 16px;
      display: block;
      background: url("http://www.itsalif.info/blogfiles/rating/star-rating.png")
        0 0 no-repeat;
      background-position: -24px 0;
    }
    p {
      margin: 2px 0;
      line-height: 1.5;
      display: -webkit-box;
      overflow: hidden;
      height: 50px;
    }
    button {
      width: 100%;
      border: none;
      outline: none;
      background: #fdcb6e;
      color: black;
      text-align: center;
      padding: 10px 0;
      margin: 10px 0;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 2px;

      &:hover {
        background-color: rgb(171, 129, 51);
      }
    }
  `;

  const CardTitle = styled.h4`
    text-align: center;
  `;

  const Button = styled.button`
    width: 100%;
    color: #fff;
    text-align: center;
    background: linear-gradient(to right, #ff416c, #ff4b2b);
    margin-top: 8px;
    text-decoration: none;
    padding: 10px 5px;
  `;

  const CardText = styled.p`
    height: 3rem;
    line-height: 1.5rem;
    overflow: hidden;
  `;

  return (
    <Card>
      <img src={props.imgUrl} className="img" alt="..." />

      <CardBody>
        <h4>{props.productName}</h4>
        <span></span>
        <p>{props.description}</p>
        <Link to={`viewproduct/${props.id}`}>
          <button>Add</button>
        </Link>
      </CardBody>
    </Card>
  );
}

export default Card;
