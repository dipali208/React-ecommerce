import NavBar from "./components/Header/NavBar";
import { Route } from "react-router-dom";
import { DataProvider } from "./components/DataProvider";
import Footer from "./components/Footer/Footer";
import Routes from "./components/Routes";
import styled from "styled-components";

const DivMain = styled.div`
  height: 100%;
  box-sizing: border-box;
`;
const Div = styled.div`
  position: relative;
  margin: 0;
  padding-bottom: 6rem;
  min-height: 54rem;
`;

function App() {
  return (
    <>
      <DivMain>
        <DataProvider>
          <Div>
            <Route path="/">
              <NavBar></NavBar>
            </Route>

            <Routes></Routes>

            <Footer/>
          </Div>
        </DataProvider>
      </DivMain>
    </>
  );
}

export default App;
