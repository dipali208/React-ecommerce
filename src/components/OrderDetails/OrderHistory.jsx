import React from "react";
import styled from "styled-components";
import { DataContext } from "../DataProvider";

const Table = styled.table`
  
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  ul {
    li {
      list-style: none;
    }
  }

  caption {
    font-size: 1.5em;
    margin: 0.5em 0 0.75em;
  }
  tr {
    background-color: #f8f8f8;
   
    padding: 0.35em;
  }
  th {
    padding: 0.625em;
    text-align: center;
    font-size: 0.85em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background-color: #fdcb6e;
  }
  td {
    padding: 0.625em;
    text-align: center;
    border-bottom: 1px solid black;
  }
  @media screen and (max-width: 2000px) {
    border: 0;

    caption {
      font-size: 1.3em;
    }

    thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: 0.625em;
    }

    td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size:1em;
      text-align: right;
      &::before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
      }
      &:last-child {
        border-bottom: 0;
      }
    }
  }
`;
class OrderHistory extends React.Component {
  static contextType = DataContext;
  constructor() {
    super();
    this.state = {
      order: [],
    };
  }

  render() {
    return (
      <>
        <Table>
          <caption>Order Summary</caption>
          <thead>
            <tr>
              <th>OrderId</th>
              <th>Products</th>
              <th>total(Rs.)</th>
              <th>Status</th>
            </tr>
          </thead>
          {this.context.order[0]
            .filter((val) => val.userid == this.context.user[0].email)
            .map((val, index) => (
              <tr>
                <td data-label="OrderId">{index + 1}</td>

                <td data-label="Products">
                  {val.order.map((val) => (
                    <ul>
                      <li>{val.productName}</li>
                    </ul>
                  ))}
                </td>

                <td data-label="Total">{val.grandtotal}</td>
                <td data-label="Status">Completed</td>
              </tr>
            ))}
        </Table>
      </>
    );
  }
}
export default OrderHistory;
