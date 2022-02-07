import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { DataContext } from "./DataProvider";

const ProtectedRoutes = ({ component: Component, ...rest }) => {
    const value = useContext(DataContext);
    const [user, setuser] = value.user;

    return (
    <Route {...rest} render={() => (
      user
        ? <Component/>
        : <Redirect to='/login' />
    )} />
    )
}
  export default ProtectedRoutes;