import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (data.password !== data.confirmPassword) {
      toast.error("Mật khẩu và mật khẩu xác nhận phải giống nhau");
      return;
    }
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        navigate("/login");
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
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              autoFocus
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
              name='name'
              value={data.name}
              onChange={handleChange}
              placeholder='Nhập tên của bạn'
            />
          </div>
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
          </div>
          <div className='grid gap-1'>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-secondary-200'>
              <input
                type={showConfirmPassword ? 'text' : "password"}
                id='confirmPassword'
                className='w-full outline-none'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder='Nhập mật khẩu xác nhận của bạn'
              />
              <div onClick={() => setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <button
            disabled={!validValue}
            className={`${validValue ? "bg-blue-600 hover:bg-blue-400" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Đăng Ký
          </button>
        </form>
        <p>
          đã có tài khoản? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Đăng nhập</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;