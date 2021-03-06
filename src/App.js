import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from'./components/Home'
import Header from "./components/layout/Header"
import  Footer  from "./components/layout/Footer"
import ProductDetails from './components/product/ProductDetails'
import Login from './components/user/Login'
import Register from './components/user/Register'
import { loadUser } from './actions/userActions'
import store from './store'
import { useEffect, useState } from 'react'
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/UpdateProfile'
import Cart from './components/cart/Cart'
import UpdatePassword from './components/user/updatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import axios from 'axios'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

  }, [])

  return (
    <Router>
       <div className="App">
         <Header />
         <div className="container container-fluid">
            <Route path="/" component={Home} exact />
            <Route path="/search/:keyword" component={Home} />
            <Route path="/product/:id" component={ProductDetails} exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/me" component={Profile} exact />
            <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
            <Route path="/cart" component={Cart} exact />
            <ProtectedRoute path="/password/update" component={UpdatePassword} exact />
            <Route path="/password/forgot" component={ForgotPassword} exact />
            <ProtectedRoute path="/shipping" component={Shipping}  />
            <ProtectedRoute path="/order/confirm" component={ConfirmOrder}  />
            {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }
           <ProtectedRoute path="/success" component={OrderSuccess} />
           
          </div>  
         <Footer />
       </div>
    </Router>
  );
}

export default App;
