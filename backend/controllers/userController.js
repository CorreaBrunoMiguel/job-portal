const fs = require("fs");
const path = require("path");
const User = require("../model/User");

/* @desc Update user profile (name, avatar, company details) */
exports.updateProfile = async (req, res) => {
  try {
    const {
      name,
      avatar,
      companyName,
      companyDescription,
      companyLogo,
      resume,
    } = req.body;
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    user.name = name || user.name;
    user.avatar = avatar || user.avatar;
    user.resume = resume || user.resume;

    /* If employer, allow updating company info */
    if (user.role === "employer") {
      user.companyName = companyName || user.companyName;
      user.companyDescription = companyDescription || user.companyDescription;
      user.companyLogo = companyLogo || user.companyLogo;
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      companyName: user.companyName,
      companyDescription: user.companyDescription,
      companyLogo: user.companyLogo,
      resume: user.resume || "",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* @desc Delete resume file (JobSeeker only) */
exports.deleteResume = async (req, res) => {
  try {
    const { resumeUrl } = req.body;

    /* Extract file name from URL */
    const fileName = resumeUrl?.split("/")?.pop();

    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    if (user.role !== "jobseeker")
      return res
        .status(403)
        .json({ message: "Somente o empregado pode deletar o currículo" });

    /* Construct the full file path */
    const filePath = path.join(__dirname, "../uploads", fileName);

    /* Check if the file exists and then delete */
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    /* Set the user's resume to an empty string */
    user.resume = "";
    await user.save();

    res.json({ message: "Currículo deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* @desc Get user public profile */
exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
