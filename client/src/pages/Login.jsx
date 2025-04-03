import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

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
        ...SummaryApi.login,
        data: data
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('accesstoken',response.data.data.accesstoken)
        localStorage.setItem('refreshToken',response.data.data.refreshToken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))

        setData({
          email: "",
          password: "",
        });
        navigate("/dashboard/category");
      }
      console.log("response", response);
    } catch (error) {
      AxiosToastError(error);
    }
   
  };

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p>Xin chào bạn đến với ShopMilk</p>
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
          <div className='grid gap-1'>
            <label htmlFor="password">Password:</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-secondary-200'>
              <input
                type={showPassword ? 'text' : "password"}
                id='password'
                className='w-full outline-none'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Nhập mật khẩu của bạn'
              />
              <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>
            Quên mật khẩu
            </Link>
          </div>

          <button
            disabled={!validValue}
            className={`${validValue ? "bg-blue-600 hover:bg-blue-400" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Đăng Nhập
          </button>
        </form>
        <p>
          không có tài khoản ? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Đăng Ký</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;