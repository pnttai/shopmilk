export const DisplayPriceInRupees = (price)=>{
    if (isNaN(price)) return "0 ₫";
  
    // Định dạng số và thêm ký hiệu VND
    return `${Number(price).toLocaleString('vi-VN')}                        ₫`;
  }
  
  export default DisplayPriceInRupees;