import UserProfile from "./Pages/UserProfile";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import HeaderComp from './Components/HeaderComp'
import HomePage from './Pages/HomePage'
import FooterComp from './Components/FooterComp'
import ScrollToTop from './Components/hooks/ScrollToTop'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BasicAnimation from './Components/BasicAnimation'
import Register from './Components/Register'
import Login from './Components/Login'
import AdminLayout from './Pages/Admin/AdminLayout'
import DashboardHome from './Components/Admin/DashboardHome'
import DashBoardProduct from './Components/Admin/DashboardProduct'
import DashboardAnalytics from './Components/Admin/DashboardAnalytics'
import DashboardCommunity from './Components/Admin/DashboardCommunity'
import DashboardCustomization from './Components/Admin/DashboardCustomization'
import ShoppingForm from './Components/Admin/ShoppingForm'
import Shoppage from './Components/Shoppage'
import Users from './Components/Admin/Users'
import Singleproductpage from './Components/Singleproductpage'
import AddProductForm from './Components/AddProductForm'
import CartPage from './Components/CartPage'
import ProceedToCheckout from './Components/ProceedToCheckout'
import PlacedOrder from './Components/placedorder'
import NewArrivalsPage from './Components/NewArrivalsPage'
import Wishlistpage from './Components/Wishlistpage'
import BrandsPage from "./Pages/BrandsPage";
import BrandDetails from "./Pages/BrandDetails";
import { Toaster } from "react-hot-toast";




// import Shoppage from './Components/Shoppage'



const MainLayout = ({ children }) => (
  <>
    <HeaderComp />
    {children}
    <FooterComp />
  </>
)





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    duration: 3500,
    style: {
      background: "#111",
      color: "#fff",
      borderRadius: "12px",
    },
  }}
/>


   <ScrollToTop/>
   
  <Routes>


    <Route path='/' element={
      <MainLayout>
      <HomePage/>
      </MainLayout>
      }/>

    

  <Route path="/CartPage" element={
    <MainLayout>
    <CartPage />
    </MainLayout>
    
    } />

   <Route path='/ProceedToCheckout' element={
     <MainLayout>
    <ProceedToCheckout/>
    </MainLayout>
   
    } />







    <Route path='/basic' element={<BasicAnimation/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/shoppage' element={
      <MainLayout>
      <Shoppage/>
      </MainLayout>
      }/>

  <Route path='/singlepageproduct/:id' element={
    <MainLayout>
    <Singleproductpage/>
    </MainLayout>
    
    }/>


<Route
path="/new-arrivals"
element={
<MainLayout>
<NewArrivalsPage/>
</MainLayout>
}
/>


<Route path="/wishlist"element={
  <MainLayout>
  <Wishlistpage/>
  </MainLayout>
  }/>

<Route
path="/profile"
element={
<MainLayout>
<UserProfile/>
</MainLayout>
}
/>



<Route
  path="/brands"
  element={
    <MainLayout>
      <BrandsPage />
    </MainLayout>
  }
/>

<Route
  path="/brand/:brandName"
  element={
    <MainLayout>
      <BrandDetails />
    </MainLayout>
  }
/>















   <Route path='/addproductform' element={
    <AddProductForm/>
   }/>

  <Route path="/placedorders" element={
    <MainLayout>
    <PlacedOrder/>
    </MainLayout>
    } />
 

   


  <Route path='/adminpanel' element={<AdminLayout/>}>

  <Route index element={<DashboardHome/>}  />
  <Route path='admin-products' element={<DashBoardProduct/>}/>
  <Route path='users' element={<Users/>}/>
  {/* <Route path='analytics' element={<DashboardAnalytics/>}/>
  <Route path='community' element={<DashboardCommunity/>}/>
  <Route path='customization' element={<DashboardCustomization/>}/>
  <Route path='marketing' element={<h1>Marketing</h1>}/>
  <Route path='settings' element={<h1>Settings</h1>}/> */}
  <Route path='shoppingform' element={<ShoppingForm/>}/>

  
  


  
  
  </Route>









  </Routes>
 




   
     
     
     
    </>
  )
}

export default App
