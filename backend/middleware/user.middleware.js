const User = require("../models/User");
const bcrypt = require("bcryptjs");

const verifyAdminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "Missing Authorization header" });
        }

        let credentials = authHeader;

        // Handle "Basic <base64>"
        if (authHeader.startsWith("Basic ")) {
            const base64Credentials = authHeader.slice(6).trim();
            const decoded = Buffer.from(base64Credentials, "base64").toString("utf8");
            credentials = decoded;
        }

        const [email, password] = credentials.split(":");
        if (!email || !password) {
            return res.status(400).json({ message: "Invalid Authorization format. Use email:password" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: admin access only" });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = verifyAdminAuth;
