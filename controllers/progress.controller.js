import Progress from "../models/Progress.js";

export const postProgress = async (req, res) => {
  try {
    const { title, progressNumber, progressTime, progressSkills } = req.body;
    let file;
    if (req.file) {
      file = req.file;
    } else {
      file = { originalname: "default.png" };
    }
    const formattedSkills = progressSkills.split(" ");
    const progress = new Progress({
      userId: req.user.id,
      title,
      progressNumber,
      progressTime,
      progressSkills: formattedSkills,
      progressPictureUrl: `/assets/progress/${file.originalname}`,
    });
    await progress.save();
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.find();
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user.id });
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProgressById = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProgressById = async (req, res) => {
    try {
        const {title, progressNumber, progressTime, progressSkills} = req.body;
        if(title === undefined || progressNumber === undefined || progressTime === undefined || progressSkills === undefined) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const progress = await Progress.findById(req.params.id);
        if (req.user.id !== progress.userId) {
            return res.status(403).json({ message: "Access Denied" });
        }
        let file;
        if(req.file) {
            file = req.file;
            progress.progressPictureUrl = `/assets/progress/${file.originalname}`;
        }
        const formattedSkills = progressSkills.split(" ");
        progress.title = title;
        progress.progressNumber = progressNumber;
        progress.progressTime = progressTime;
        progress.progressSkills = formattedSkills;
        await progress.save();
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProgressById = async (req, res) => {
    try {
        const progress = await Progress.findById(req.params.id);
        if (req.user.id !== progress.userId) {
            return res.status(403).json({ message: "Access Denied" });
        }
        await progress.delete();
        res.status(200).json({ message: "Progress has been deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}