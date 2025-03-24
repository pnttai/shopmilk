import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const validValue = Object.values(data).every(el => el);

  useEffect(() => {
    if (!(location?.state?.data?.success)) {
      navigate("/");
    }
    if (location?.state?.email) {
      setData((prev) => ({
        ...prev,
        email: location?.state?.email
      }));
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Mật khẩu và mật khẩu xác nhận phải giống nhau");
      return;
    }
    try {
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: data
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: ""
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
        <p className='font-semibold text-lg'>Đặt lại mật khẩu</p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor="newPassword">Mật khẩu mới:</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-secondary-200'>
              <input
                type={showPassword ? 'text' : "password"}
                id='newPassword'
                className='w-full outline-none'
                name='newPassword'
                value={data.newPassword}
                onChange={handleChange}
                placeholder='Nhập mật khẩu mới của bạn'
              />
              <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-secondary-200'>
              <input
                type={showPassword ? 'text' : "password"}
                id='confirmPassword'
                className='w-full outline-none'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder='Xác nhận mật khẩu của bạn'
              />
              <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <button
            disabled={!validValue}
            className={`${validValue ? "bg-blue-600 hover:bg-blue-400" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Đặt lại mật khẩu
          </button>
        </form>
        <p>
          đã có tài khoản? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Đăng nhập</Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;