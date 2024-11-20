import axiosInstance from "./instance";

export const login = (username,password) =>{
    return axiosInstance.post('/admin/signin',{username,password})
}
export const update = (tempProduct) => {
    return axiosInstance.post('/api/f0920515972/admin/product',{tempProduct})
}
export const products = () =>{
    return axiosInstance.get('/api/f0920515972/admin/products/all')
}
export function getCookie() {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)heartToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    return myCookie || null;
}