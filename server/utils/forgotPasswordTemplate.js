const forgotPasswordTemplate = ({name ,otp}) => {
return `
<div>
<p> Xin chao ,${name} </p>

<p> Ban dang quen mat khau , Vui long theo doi ma OTP de thay doi lai mat khau</p>
<div style= "background-color: #f8f8f8; padding: 10px; border-radius: 5px;"></div>
<h1> ${otp} </h1>
</div>
<p> Ma OTP nay chi co hieu luc 1 gio , Ban vui long vao shop milk de tien hanh dat lai mat khau</p>
<br/>
</br>
<p>Cam on</p>
<p>ShopMilk</p>
</div>
`
}
export default forgotPasswordTemplate;
