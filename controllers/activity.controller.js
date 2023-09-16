import Activity from '../models/Activity.js'

export const postActivity = async (req, res) => {
    try {
        const {title, activityTime, activitySkills} = req.body;
        let file;
        if(req.file) {
         file = req.file;
        } else {
            file = {originalname: "default.png"};
        }
        const formattedSkills = activitySkills.split(" ");
        const activity = new Activity({
            userId: req.user.id,
            title,
            activityTime,
            activitySkills : formattedSkills,
            activityPictureUrl: `/assets/activities/${file.originalname}`,
        });
        await activity.save();
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserActivities = async (req, res) => {
    try {
        const activities = await Activity.find({userId: req.user.id});
        res.status(200).json(activities);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        res.status(200).json(activity);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateActivityById = async (req, res) => {
    try {
        if(title === undefined || activityTime === undefined || activitySkills === undefined) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const activity = await Activity.findById(req.params.id);
        if (req.user.id !== activity.userId) {
            return res.status(403).json({ message: "Access Denied" });
        }
        let file;
        const {title, activityTime} = req.body;
        const activitySkills = req.body.skills.split(" ");
        if(req.file) {
            file = req.file;
            activity.activityPictureUrl = `/assets/activities/${file.originalname}`;
        }
        activity.title = title;
        activity.activityTime = activityTime;
        activity.activitySkills = activitySkills;
        await activity.save();
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if(req.user.id === activity.userId)  
            await activity.delete();
        else
            return res.status(403).json({ message: "Access Denied" });     
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}