import styled from "styled-components";


const FooterDiv=styled.div`

position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
    ${'' /* margin-top: 10px; */}

 
  height:4rem;
  width: 100%;
  
  background-color: rgb(45, 52, 54);
  color: white;
  text-align: center;
  `;


const Footer=(props)=>{
 
    return(
        <FooterDiv>
        <p>Footer</p>
        
    </FooterDiv>
    )
}
export default Footer;