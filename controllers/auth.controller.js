import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const validateCredential = (email, password) => {
    return (
        email && email.includes('@') && password && password.trim().length >= 6
    );
}

const passwordConfirm = (password, confirmPassword) => {
    return password === confirmPassword;
}

export const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    if (!validateCredential(email, password)) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    if (!passwordConfirm(password, confirmPassword)) {
        return res.status(400).json({ message: "Passwords don't match" });
    }
    let file;
    if (req.file) {
      file = req.file;
    } else {
      file = { originalname: "default.png" };
    }

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      profilePictureUrl: `/assets/profile/${file.originalname}`,
    });
    await user.save();

    const token = jwt.sign(
      { name: user.name, email: user.email, id: user._id },
      process.env.JWT_SECRET
    );

    const formattedUser = user.toObject();
    delete formattedUser.password;
    delete formattedUser.isAdmin;

    res.status(200).json({ result: formattedUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { name: user.name, email: user.email, id: user._id },
      process.env.JWT_SECRET
    );
    user = user.toObject();
    delete user.password;
    delete user.isAdmin;
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changeUserToAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "User doesn't exist" });
    user.isAdmin = true;
    await user.save();
    res.status(200).json({ message: "User has been changed to admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
