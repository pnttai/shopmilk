import React, { useState } from "react";
import logo from '../assets/logo.png';
import Search from "./Search";
import { Link ,useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";


const Header = () => {
    const [isMobile] = useMobile()
    const location = useLocation()

    const isSearchPage = location.pathname ==="/search" 
    const navigate = useNavigate()
    const user = useSelector((state)=>state?.user)

    const [openUserMenu,setOpenUserMenu] = useState(false)

    const redirectToLoginPage =()=>{
      navigate("/login")
    }

    const handleCloseUserMenu =()=>{
        setOpenUserMenu(false)
    }
    const handleMobileUser =() =>{
      if(!user._id){
        navigate("/login")
        return
      }
    }
  

  return (
    <header className="h-30 shadow-md sticky top-0 fz-40 lex bg-blue-400 flex-col justify-center gap-1 bg-white">
        {
            
            !(isSearchPage && isMobile) && (
              <div className="container mx-auto flex items-center h-full px-2
              justify-between">
               {/* Logo */}
               <div className="h-full">
                 <Link to={"/"} className="h-full bg-black flex justify-center items-center">
                   <img src={logo} alt="logo" width={150} height={60} 
                     className="hidden lg:block"
                   />
                   <img src={logo} alt="logo" width={120} height={60} 
                     className="lg:hidden"
                   />
                 </Link>
               </div>
               {/* Search */}
                 <div className="hidden lg:block">
                     <Search />
                 </div>
               {/* Login my cart */}
               <div className="">
                 <button className="text-neutral-700 lg:hidden " >
                   <FaRegUserCircle size={26}/>
                 </button>
                 <div className="hidden lg:flex items-center gap-10">
                  {
                    user?._id ?(
                      <div className="relative">
                          <div onClick={()=>setOpenUserMenu(preve => !preve)} className="flex select-none items-center gap-1 cursor-pointer" >
                            <p> tài khoản</p>
                            {
                              openUserMenu ? (
                                <GoTriangleUp size={25} /> 
                              ):(
                                <GoTriangleDown size={25} />
                              )
                            }                        
                            </div> 
                            {
                              openUserMenu && (
                                    <div div className="absolute right-0 top-14">
                                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                                          <UserMenu close={handleCloseUserMenu} />
                                      </div>
                                    </div>
                              )
                            }
                            
                      </div>
                    ):(
                      <button onClick={redirectToLoginPage} className="text-lg px-2">đăng nhập</button>
                    )
                  }

                    <button className="flex items-center gap-2 bg-secondary-300 hover:bg-secondary-200 px-3 py-3 rounded text-white">
                      { /** add to card icons **/ }
                      <div className="animate-bounce">
                          <BsCart4 size={25}/>
                      </div>
                      <div className="font-semibold">
                        <p> My Cart</p>
                        
                      </div>
                    </button>
                 </div>
               </div>
             </div>
            )
        }
    
      <div className="container mx-auto px-2 lg:hidden">
         <Search/>
      </div>
    </header>
  );
}

export default Header;