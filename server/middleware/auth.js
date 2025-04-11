import jwt from 'jsonwebtoken'

const auth = async (request, response, next) => {
    try {
        let token = request.cookies.accessToken  || request?.headers?.authorization?.split(" ")[1]


        // Nếu không có trong cookie thì kiểm tra header Authorization
        if (!token && request.headers.authorization) {
            const authHeader = request.headers.authorization;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        console.log("Token nhận được:", token);

        if (!token) {
            return response.status(401).json({
                message: "Provide token",
                error: true,
                success: false
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

        if (!decode) {
            return response.status(401).json({
                message: "unauthorized access",
                error: true,
                success: false
            });
        }

        request.userId = decode.id;
        next();

    } catch (error) {
        return response.status(500).json({
            message: "You have not login",
            error: true,
            success: false
        });
    }
}

export default auth;
