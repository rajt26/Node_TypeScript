import jwt from 'jsonwebtoken'

const verifyToken = async (req: any, res: any, next: any) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }

    try {
        const verifiedToken = jwt.verify(token, 'Secret');
        req.user = verifiedToken;
        next();
    } catch (error) {
        return res.status(400).json({ error: "Token is not valid" });
    }
}

export default verifyToken