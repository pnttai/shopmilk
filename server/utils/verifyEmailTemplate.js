const verifyEmailTemplate = ({ name, url }) => {
    return `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #071263;">Xin chào ${name},</h2>
        <p>Cảm ơn bạn đã đăng ký tài khoản tại <strong>Shop Milk</strong>!</p>
        <p>Vui lòng nhấp vào nút bên dưới để xác thực email của bạn:</p>
        <a href="${url}" style="display: inline-block; color: white; background: #071263; margin-top: 10px; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Xác thực email
        </a>
        <p>Nếu bạn không thực hiện đăng ký này, vui lòng bỏ qua email này.</p>
        <p>Trân trọng,</p>
        <p><strong>Đội ngũ Shop Milk</strong></p>
    </div>
    `;
};
export default verifyEmailTemplate;