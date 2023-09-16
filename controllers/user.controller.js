import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, isAdmin: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, {
      password: 0,
      isAdmin: 0,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).send("Access Denied");
    }
    const user = await User.findById(req.user.id, { password: 0, isAdmin: 0 });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).send("Access Denied");
    }
    let user = await User.findById(req.user.id);
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    if (req.file) {
      user.profilePictureUrl = `/assets/profile/${req.file.originalname}`;
    }
    if (req.body.hardSkills) {
      user.hardSkills = req.body.hardSkills.split(" ");
    }
    if (req.body.softSkills) {
      user.softSkills = req.body.softSkills.split(" ");
    }
    await user.save();
    user = user.toObject();
    delete user.password;
    delete user.isAdmin;
    res.status(200).json(user);
  } catch (error) {}
};

export const deleteUser = async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    user = user.toObject();
    delete user.password;
    delete user.isAdmin;
    res.status(200).json(user);   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}