import { Link, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { DataContext } from "../DataProvider";
import styled from "styled-components";
import {
  faBars,
  faShoppingCart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NavBar = (prop) => {
  let history = useHistory();
  const value = useContext(DataContext);
  const [user, setuser] = value.user;
  const cart = value.cart[0];

  const logout = () => {
    sessionStorage.removeItem("deliveryaddress");
    setuser(null);
    // setcart([]);
    history.push("/");
  };
  const Header = styled.header`
    width: 100%;

    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    background-color: #2d3436;
    color: white;
    div {
      margin-left: 5%;
    }
    h1 {
      color: #fdcb6e;
      &:hover {
        color: white;
      }
    }

    a {
      text-decoration: none;
      text-transform: uppercase;
      color: #fdcb6e;
      letter-spacing: 2px;
    }
    a:hover {
      color: white;
    }
    ul {
      margin-left: auto;
      li {
        list-style: none;
        display: inline-block;
        padding: 0 15px;
        div {
          display: none;
        }
      }
    }
    @media (max-width: 700px) {
      ul {
        margin: 0;
        position: fixed;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100vh;
        background: #2d3436;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        opacity: 0.9;
        z-index: 99;
        transition: 0.5s ease-in;
        li {
          div {
            position: absolute;
            top: 20px;
            right: 20px;
            display: block;
            cursor: pointer;
          }
        }
      }
    }
  `;
  const Span = styled.span`
    font-size: 12px;
    background: #ff0000;
    color: #fff;
    padding: 0 5px;
    vertical-align: top;
  `;

  const Menu = styled.div`
    display: none;
    @media (max-width: 700px) {
      display: block;
      cursor: pointer;
    }
  `;

  const [menu, setMenu] = useState(false);
  const styleMenu = {
    left: menu ? 0 : "-100%",
  };
  const toggleMenu = () => {
    setMenu(!menu);
  };
  return (
    <>
      <Header>
        <Menu onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </Menu>

        <div>
          <Link to="/">
            <h1>
              <i>Shopify</i>
            </h1>
          </Link>
        </div>
        <ul style={styleMenu}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Products</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>

          {!user && (
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/orderhistory">My Orders</Link>
            </li>
          )}

          {user && (
            <li>
              <Link to="/checkout">
                <FontAwesomeIcon icon={faShoppingCart} />
                <Span>
                  {cart
                    .filter((val) => val.userid == user.email)
                    .reduce((sum, record) => sum + record.count, 0)}
                </Span>
              </Link>
            </li>
          )}

          <li>
            {user ? (
              <Link onClick={logout}>Logout</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>

          {user && (
            <li>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUserCircle} />
              </Link>
              &nbsp;&nbsp;{`Hi ,${user.userName}`}
            </li>
          )}
          <li onClick={toggleMenu}>
            <div>X</div>
          </li>
        </ul>
      </Header>
    </>
  );
};
export default NavBar;
