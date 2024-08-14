const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.createAccount = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName) {
            return res
                .status(400)
                .json({ error: true, message: "Full Name is required." })
        }
        if (!email) {
            return res
                .status(400)
                .json({ error: true, message: "Email is required." })
        }
        if (!password) {
            return res
                .status(400)
                .json({ error: true, message: "Password is required." })
        }

        const isUser = await User.findOne({ email: email });

        if (isUser) {
            return res.json({
                error: true,
                message: "User already exist"
            })
        }

        const user = new User({
            fullName,
            email,
            password
        });

        await user.save();

        const accessToken = jwt.sign({ user }, process.env.CONNECTION_STRING, {
            expiresIn: "36000m"
        });
        return res.json({
            error: false,
            user,
            accessToken,
            message: "Registration Successfull"
        })
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error", details: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required."
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Password is required."
            });
        }

        const userInfo = await User.findOne({ email: email });

        if (!userInfo) {
            return res.status(400).json({ message: "User not found" })
        }
        if (userInfo.email === email && userInfo.password === password) {
            const user = { user: userInfo };
            const accessToken = jwt.sign(user, process.env.CONNECTION_STRING, {
                expiresIn: "36000m"
            });

            return res.json({
                error: false,
                message: "Login Successfull",
                email,
                accessToken,
            })
        } else {
            return res.status(400).json({
                error: true,
                message: "Invalid Credentials"
            })
        }
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error", details: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { user } = req.user;
        const isUser = await User.findOne({ _id: user._id });

        if (!isUser) {
            return res.sendStatus(401);
        }

        return res.json({
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                "_id": isUser._id,
                createdOn: isUser.createdOn,
            },
            message: "User retrieved successfully",
        });
    } catch (error) {
        console.error("Error in getUser:", error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
            details: error.message,
        });
    }
};
