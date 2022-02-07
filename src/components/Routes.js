import Search from './Search/Search';
import { Switch, Route } from 'react-router-dom';
import SignUp from './Forms/SignUp';
import Login  from './Forms/Login';
import ViewProduct from './Product/ViewProduct';
import Checkout from './Cart/Checkout';
import Profile from './Forms/Profile';
import AddressDetails from './Checkout/AddressDetails';
import OrderDetails from './Checkout/OrderDetails';
import OrderHistory from "./OrderDetails/OrderHistory";
import { useContext } from 'react';
import { DataContext } from './DataProvider';
import ProtectedRoutes from './ProtectedRoutes';
import Home from './HomePage/Home';
const Routes=()=>{
     return(<>
   
       
      <Switch>
       
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/login" component={Login} />
        <ProtectedRoutes path="/checkout" component={Checkout}  />
        <ProtectedRoutes path="/profile" component={Profile} />
        <ProtectedRoutes path="/deliveryadress" component={AddressDetails} />
        <Route path="/orderdetails/:address" component={OrderDetails} />
        <ProtectedRoutes path="/orderhistory" component={OrderHistory}/>
        <Route path="/signup" component={SignUp} />
        <Route path="/viewproduct/:id" component={ViewProduct}/>
        
      </Switch>
   
  
      </>)
}
export default Routes;