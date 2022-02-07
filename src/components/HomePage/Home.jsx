import styled,{ keyframes }  from "styled-components";
 //import "../components/home.css";
import DisplayProductList from "../Product/DisplayProductList";
import ProductListData from "../ProductListData";
const Home=()=>{
	const slider= keyframes `
		0% {
			left: 0;
		}
		20% {
			left: 0;
		}
		25% {
			left: -100%;
		}
		45% {
			left: -100%;
		}
		50% {
			left: -200%;
		}
		70% {
			left: -200%;
		}
		75% {
			left: -300%;
		}
		95% {
			left: -300%;
		}
		100% {
			left: -400%;
		}
	`
    const Slider=styled.div`
    overflow: hidden;
    height: 17rem;
    figure{
        position: relative;
	width: 500%;
	margin: 0;
	left: 0;
    animation: 20s ${slider} infinite;
    height: 17rem;
    img{
        width: 20%;
    float: left;
    height: 17rem;
    }
    }
   
	`;
	const H1=styled.h1`
	text-align:center
	`;
	

    const newArray = ProductListData.slice(0, 4)
    return(<>
      
<Slider >
		<figure>
			<img src="../images/offer4.jpg"/>			
			<img src="../images/offer1.jpg"/>
			<img src="../images/offer2.jpg"/>
            <img src="../images/offer5.jpg"/>
            <img src="../images/offer6.jpg"/>
			
		</figure>
	</Slider>
<H1 className="head">Our Top Brands...</H1>
<DisplayProductList ProductListData={newArray}></DisplayProductList>

    </>)
}
export default Home;