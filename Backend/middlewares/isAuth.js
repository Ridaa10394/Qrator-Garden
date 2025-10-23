import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
    // Try cookie first
    let token = req.cookies && req.cookies.token;

    // Fallback to Authorization header (Bearer <token>) for environments where cookies are not sent
    if (!token && req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(" ");
        if (parts.length === 2 && parts[0] === "Bearer") {
            token = parts[1];
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Token not found. Send cookie 'token' or Authorization: Bearer <token> header." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        return next();
    } catch (error) {
        console.error("Token verification failed:", error.message || error);
        return res.status(401).json({ message: "Token not verified" });
    }
};