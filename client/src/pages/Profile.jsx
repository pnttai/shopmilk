import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';

const Profile = () => {
    const user = useSelector(state => state.user); // Get user data from Redux store
    const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
    const [userData, setUserData] = useState({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || ""
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // Update userData state when user data changes
        setUserData({
            name: user.name || "",
            email: user.email || "",
            mobile: user.mobile || ""
        });
    }, [user]);

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data: userData
            });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                const userData = await fetchUserDetails()

                dispatch(setUserDetails(userData.data))
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            {/* User Avatar */}
            <div className='w-20 h-20 bg-blue-500 flex items-center justify-center 
            rounded-full overflow-hidden drop-shadow-sm'>
                {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className='w-full h-full' />
                ) : (
                    <FaRegUserCircle size={65} />
                )}
            </div>
            <button
                onClick={() => setProfileAvatarEdit(true)}
                className='text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3'>
                Edit
            </button>

            {/* User Profile Avatar Edit */}
            {openProfileAvatarEdit && (
                <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
            )}

            {/* User Details Form */}
            <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        value={userData.name}
                        placeholder='Nhập tên của bạn'
                        className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
                        onChange={handleOnchange}
                        name='name'
                        required
                    />
                </div>
                <div className='grid'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={userData.email}
                        placeholder='Nhập email của bạn'
                        className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
                        onChange={handleOnchange}
                        name='email'
                        id='email'
                        required
                    />
                </div>
                <div className='grid'>
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="text"
                        value={userData.mobile}
                        placeholder='Nhập số của bạn'
                        className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
                        onChange={handleOnchange}
                        name='mobile'
                        id='mobile'
                        required
                    />
                </div>
                <button
                    className='border px-4 py-2 font-semibold hover:bg-primary-200 border-primary-100 hover:text-neutral-800 rounded'>
                    {loading ? "Loading..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default Profile;