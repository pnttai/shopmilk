import React, { useEffect, useRef, useState } from 'react'
import { Link, } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'


import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import CardProduct from './CartProduct'

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allSubCategory)
    const loadingCardNumber = new Array(6).fill(null)

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }

    

  

  const handleRedirectProductListpage = ()=>{
      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.category.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })
      const url = `/${valideURLConvert(name )}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`

      return url
  }

  const redirectURL =  handleRedirectProductListpage()
  return (
    <section>
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
            <Link to={redirectURL} className="text-green-600 hover:text-green-400"></Link>
        </div>

        <div className="relative">
            {/* Slider Container */}
            <div
                ref={containerRef}
                className="container mx-auto px-4 flex gap-4 overflow-x-auto scroll-smooth scrollbar-none"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {loading ? (
                    loadingCardNumber.map((_, index) => (
                        <CardProduct key={`loading-${index}`} />
                    ))
                ) : (
                    data.map((product, index) => (
                        <div
                            key={`${product._id}-${index}`}
                            className="flex-shrink-0 w-[calc(100%/4-1rem)] scroll-snap-align-start"
                        >
                            <CardProduct data={product} />
                        </div>
                    ))
                )}
            </div>

            {/* Scroll Buttons */}
            {data.length > 4 && (
                <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none">
                    <button
                        onClick={handleScrollLeft}
                        className="pointer-events-auto bg-white hover:bg-gray-100 shadow p-2 rounded-full"
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        onClick={handleScrollRight}
                        className="pointer-events-auto bg-white hover:bg-gray-100 shadow p-2 rounded-full"
                    >
                        <FaAngleRight />
                    </button>
                </div>
            )}
        </div>
    </section>
);
}

export default CategoryWiseProductDisplay