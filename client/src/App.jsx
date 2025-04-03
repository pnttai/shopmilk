import './index.css';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import toast,{ Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import SummaryApi from './common/SummaryApi';
import Axios from './utils/Axios';
import AxiosToastError from './utils/AxiosToastError';
import { setAllCategory ,setAllSubCategory ,setLoadingCategory } from './store/productSlice'
import GlobalProvider from './provider/GlobalProvider';
import { FaCartShopping } from "react-icons/fa6";
import CartMobileLink from './components/CartMoblie';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
 
  const fetchUser = async()=>{
    const userData = await fetchUserDetails()

    dispatch(setUserDetails(userData.data))
  }
  const fetchCategory = async () => {
          try {
              dispatch(setLoadingCategory(true))
              const response = await Axios({
                  ...SummaryApi.getCategory
              })
              const {data : responseData} = response
              if(responseData.success){
                dispatch(setAllCategory(responseData.data))
                
              }
          } catch (error) {          
          } finally {
          }
          dispatch(setLoadingCategory(false))
 
      };

      const fetchSubCategory = async () => {
        try {
     
            const response = await Axios({
                ...SummaryApi.getSubCategory
            })
            const {data : responseData} = response
            if(responseData.success){
              dispatch(setAllSubCategory(responseData.data))
              
            }
        } catch (error) {          
        } finally {
        }
    };
  
  useEffect(()=>{
    fetchUser()
    fetchCategory();
    fetchSubCategory()
  },[])

  return (
    <GlobalProvider>
      <Header />
      <main className='min-h-[70vh]'>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
     </GlobalProvider>
  );
}

export default App;