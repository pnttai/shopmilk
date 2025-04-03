import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useNavigate , useLocation, Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaLongArrowAltLeft } from "react-icons/fa"
import useMobile from '../hooks/useMobile';

const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage ,setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)

    useEffect(()=>{
        const isSearch = location.pathname ==="/search"
        setIsSearchPage(isSearch)
    },[location])

  

    const redirectToSearcchPage = ()=>{
        navigate("/search")
    }
    const handleOnChange = (e)=>{
      const value = e.target.value
      const url = `/search?q=${value}`
      navigate(url)
  }
   


  return (
    <div className='w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200'>
     <div>
      {
        (isMobile && isSearchPage) ?(
          <Link to={"/"} className='flex justify-center items-center h-full  p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md'>
              <FaLongArrowAltLeft size={20}/>
        </Link>
        ):(
            <button className='flex justify-center items-center h-full  p-3 group-focus-within:text-primary-200'>
             <FaSearch size={22} />
             </button>
        )
      }
     </div>
      <div className='w-full h-full'>
        {
            ! isSearchPage ? (
                <div onClick={redirectToSearcchPage} className='flex-grow w-full h-full flex items-center'>
                <TypeAnimation
                sequence={[
                    'Tim kiem "Sữa"',
                    1000,
                    'Tim kiem "Sữa cho trẻ em"',
                    1000,
                    'Tim kiem "Sữa cho mẹ"',
                    1000,
                    
                ]}
                speed={50}
                repeat={Infinity}
                />
            </div>
            ):(
                <div className='w-full h-full'>
                    <input type="text" placeholder='Search'
                    defaultValue={searchText}
                     className='bg-transparent w-full h-full outline-none' 
                    onChange={handleOnChange}
                    />
                </div>
            )
        }
                
      </div>
     
    </div>
  )
}

export default Search