import jwt from "jsonwebtoken";

function verifyToken(req: any, res: any, next: any) {
    const token = req.header("AUTH_TOKEN");
    if (!token)
        return res.status(401).json({
            success: false,
            message: "Unauthorized access",
        });
    try {
        const verifiedUser = jwt.verify(token, `${process.env.JWT_TOKEN_SECRET}`);
        req.user = verifiedUser;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unauthorized access",
        });
    }
}

export default verifyToken;
