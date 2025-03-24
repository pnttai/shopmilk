


import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validValue = Object.values(data).every(el => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification_otp"),{
            state : data
        }
        setData({
          email: "",
        });
       
      }
      console.log("response", response);
    } catch (error) {
      AxiosToastError(error);
    }
   
  };

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold etxt-lg'>Quên mật khẩu</p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id='email'
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
              name='email'
              value={data.email}
              onChange={handleChange}
              placeholder='Nhập email của bạn'
            />
          </div>
       

          <button
            disabled={!validValue}
            className={`${validValue ? "bg-blue-600 hover:bg-blue-400" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Gửi OTP
          </button>
        </form>
       <p>
                 đã có tài khoản? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Đăng nhập</Link>
               </p>
      </div>
    </section>
  );
};

export default ForgotPassword;