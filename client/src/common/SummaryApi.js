


export const baseURL = "http://localhost:8080";

const SummaryApi = {
        register: {
          url: "/api/user/register",
          method: 'post'
        },
        login: {
          url: "/api/user/login",
          method: 'post'
        },
        forgot_password: {
          url: "/api/user/forgot-password",
          method: 'put'
        },
        reset_password: {
          url: "/api/user/reset-password",
          method: 'put'
        },
        refreshtoken: {
          url: "/api/user/refresh-token",
          method: 'post'
        },
        userDetails:{
            url : '/api/user/user-details',
            method : 'get'
        },
        logout : {
            url: "/api/user/logout",
          method: 'get'
        },
        uploadAvater : {
          url: "/api/user/upload-avatar",
        method: 'put'
        },
        updateUserDetails : {
          url: "/api/user/upload-user",
        method: 'put'
        },
        addCategory : {
          url: "/api/category/add-category",
        method: 'post'
        },
        uploadImage : {
          url: "/api/file/upload",
        method: 'post'
        },
        getCategory : {
          url: "/api/category/get",
          method: 'get'
        },
        updateCategory:{
          url: "/api/category/update",
          method: 'put'
        },
        deleteCategory:{
          url: "/api/category/delete",
          method: 'delete'
        },
        createSubCategory :{
          url :'/api/subcategory/create',
          method :'post'
        },
        getSubCategory :{
          url:'/api/subcategory/get',
          method :'post'
        },
        updateSubCategory :{
          url:'/api/subcategory/update',
          method :'put'
        },
        deleteSubCategory :{
          url:'/api/subcategory/delete',
          method :'delete'
        },
        createProduct :{
          url:'/api/product/create',
          method :'post'
        },
        getProduct :{
          url:'/api/product/get',
          method :'post'
        },
       

};

export default SummaryApi;