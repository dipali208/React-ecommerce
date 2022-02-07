import Card from "./Card";
import styled from "styled-components";


const DisplayProductList = (prop) => {
  const Container = styled.div`
   
    width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 15px 0;
  `;
 
  return (
    <Container>
     
        {prop.ProductListData.map((name) => (
          <Card
            id={name.productId}
            imgUrl={name.imgUrl}
            productName={name.productName}
            description={name.description}
          ></Card>
        ))}
     
    </Container>
  );
};
export default DisplayProductList;
