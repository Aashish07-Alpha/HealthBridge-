import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId to `req`
        req.user = { userId: decodedToken.id }; // Note: Attach to `req.user` instead of `req.body`

        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ success: false, message: "Authentication failed. Please login again." });
    }
};

export default authUser;
