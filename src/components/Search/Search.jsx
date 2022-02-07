import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

import DisplayProductList from "../Product/DisplayProductList";
import ProductListData from "../ProductListData";

const Wrap = styled.div`
  width: 50%;
  position: relative;

  margin: auto;
`;
const SearchD = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;
const SearchBox = styled.input`
  width: 100%;
  ${"" /* border: 3px solid black; */}

  padding: 5px;
  height: 36px;
  border-radius: 5px 0 0 5px;

  color: black;
  &:focus {
    color: black;
  }
`;
const Button = styled.button`
  width: 40px;
  height: 36px;
  ${"" /* border: 1px solid black; */}
  background:#fdcb6e;
  text-align: center;
  color: black;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      flag: false,
      val: "",
      filterArray: "",
    };
  }

  search = () => {
    //alert(this.state.val);

    const filterArray = ProductListData.filter((filterArray) =>
      filterArray.productName
        .toLowerCase()
        .includes(this.state.val.toLowerCase())
    );

    this.setState({ flag: true, filterArray: filterArray });
  };

  render() {
    let flag = this.state.flag;
    let array = this.state.filterArray;

    return (
      <>
        <Wrap>
          <SearchD>
            <SearchBox
              type="text"
              type="text"
              placeholder="Search Product.."
              value={this.state.val}
              onChange={(e) => {
                this.setState({ val: e.target.value });
              }}
            />
            <Button type="submit" onClick={this.search}>
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </Button>
          </SearchD>
        </Wrap>

        {flag && array.length > 0 ? (
          <DisplayProductList
            ProductListData={this.state.filterArray}
          ></DisplayProductList>
        ) : flag && array.length == 0 ? (
          <>
            <h1>Don't Find Any match</h1>
            <p>Please See Other Products</p>
            <DisplayProductList
              ProductListData={ProductListData}
            ></DisplayProductList>
          </>
        ) : (
          <DisplayProductList
            ProductListData={ProductListData}
          ></DisplayProductList>
        )}
      </>
    );
  }
}
export default Search;
