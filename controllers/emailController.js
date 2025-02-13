const services = require("../services");

const emailController = {
  create: async (req, res, next) => {
    const { to } = req.body;
    try {
      const response = await services.emailService.create({ to });
      res.status(200).json(response); // Send the response once
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Error sending OTP", error });
    }
  },
};

module.exports = emailController;
