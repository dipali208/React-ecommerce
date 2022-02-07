import React, {createContext, useState, useEffect} from 'react'
export const DataContext = createContext();

export const DataProvider = (props) => {
  const [order, setOrder] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setuser] = useState(null);

  useEffect(() => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    const user = JSON.parse(sessionStorage.getItem("user"));
    const dataorder = JSON.parse(localStorage.getItem("dataorder"));
    //alert(dataorder);
    if (user) setuser(user);
    if (dataCart) setCart(dataCart);
    if (dataorder) setOrder(dataorder);
  }, []);

  useEffect(() => {
    //alert("cart");
    localStorage.setItem("dataCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    // alert("order");
    localStorage.setItem("dataorder", JSON.stringify(order));
  }, [order]);

  const actions = {
    cart: [cart, setCart],
    user: [user, setuser],
    order: [order, setOrder],
  };

  return (
    <DataContext.Provider value={actions}>{props.children}</DataContext.Provider>
  );
}