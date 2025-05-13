export const baseURL = import.meta.env.VITE_API_URL

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login : {
        url : '/api/user/login',
        method : 'post'
    },
    user_detail : {
       url : '/api/user/user-details',
       method : 'get'
    },
     forgot_password : {
        url: '/api/user/forgot-password-otp',
        method : 'post'
    },
    verify_otp_expiry : {
        url : "/api/user/verify-password-expiry-otp",
        method : 'put'
    },
    reset_password : {
        url : "/api/user/reset-password",
        method : 'post'
    },
    refresh_token : {
        url : '/api/user/refresh-token',
        method : 'post'
    },
    logout : {
        url : '/api/user/logout',
        method : 'get'
    },
    upload_avatar : {
        url : '/api/user/profile-avatar',
        method : 'put'
    },
    update_userDtail : {
        url : '/api/user/update-user',
        method : 'put'
    },
    addcategory : {
        url : '/api/category/add-category',
        method : 'post'
    },
    uploadimage : {
        url : '/file/uploadimage',
        method : 'post'
    },
    get_category : {
        url : '/api/category/get-category-data',
        method : 'get'
    },
    update_category : {
        url : '/api/category/update-category',
        method : 'put'
    },
    delete_category : {
        url : '/api/category/delete-category',
        method : 'delete'
    },
    add_subcategory : {
        url : '/api/subcategory/add-subcategory',
        method : 'post'
    },
    get_subcategory : {
        url : '/api/subcategory/get-subcategorydata',
        method : 'get'
    },
    update_subcategory : {
        url : '/api/subcategory/update-subCategory',
        method : 'put'
    },
    delete_subcategory : {
        url : '/api/subcategory/delete-subCategory',
        method : 'delete'
    },
    create_product : {
        url : '/api/product/create',
        method : 'post'
    },
    get_product : {
        url : '/api/product/get',
        method : 'post'
    },
    categorywise_product : {
        url : '/api/product/categorywise-product',
        method : 'post'
    },
    categorySubCategorywise_product : {
        url : '/api/product/categoryandsubCategorywise-product',
        method : 'post'
    },


    

}


export default SummaryApi