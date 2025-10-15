require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const userModel = require("../models/usersModel");
const generateOtp = require("../email/generateOtp");
const transporter = require("../email/mailTransporter");
const otpModel = require("../models/otpModel")

const register = async (req, res) => {
  try {
    console.log("Register endpoint hit");
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      res.status(422).json({ message: "Tous les champs sont obligatoires" });
      return;
    }

    if (password.length < 6) {
      res.status(422).json({ message: "Le mot de passe doit contenir au moins 6 caractères." });
      return;
    }

    // Vérifier si l'email est déjà utilisé
    const mailExist = await userModel.findOne({ email });
    if (mailExist) {
      res.json({ message: "email existe dejà" });
      return;
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      password: hashedPassword,
    });

    const otp = generateOtp();
    const otpToken = uuid.v4();

    const otpTest = await otpModel.create({
      userId: user._id,
      otp,
      otpToken,
      purpose: "verify email",
    }
    );
    // transporter.sendMail({
    //     from: process.env.EMAIL_USER,
    //     to: user.email,
    //     subject: "verification de votre email",
    //     html: `<h1>Vérification email</h1>
    //     <div>
    //         Utilisez ce code pour vérifier votre email :<br>
    //         <strong>${otp}</strong>
    //     </div>`
    // });
    console.log(user)
    console.log("OTP details:", otpTest);
    
    res.json({ messege: "utilisateur ajouté avec succès ", otpToken, user });
  } catch (error) {
    logger.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};


const verify = async (req, res) => {
  const { otp, otpToken, purpose } = req.body;

  if (purpose !== "verify email") {
    res.status(422).send({
      message: "purpose est invalide",
    });
    return;
  }

  const otpTest = await otpModel.findOne({
    otpToken,
    purpose,
  })

  if (!otpTest) {
    console.log("OTP non trouvé");

    res.status(406).send({
      message: "otp est invalide",
    });
    return
  }

  if (otp !== otpTest.otp) {
    res.status(406).send({
      message: "otp est invalide",
    });
    return
  }

  const updateUser = await userModel.findByIdAndUpdate(
    otpTest.userId,
    { isVerified: true },
    { new: true }
  );

  res.send({
    message: "utilisateur est verifié avec sucés",
    updateUser,
  });
};

const login = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  // console.log(user);
  if (!user) {
    res.status(404).send({ message: "user not found" });
    return;
  }
  const isExactPassword = bcrypt.compareSync(password, user.password);
  if (!isExactPassword) {
    res.status(401).send({ message: "invalid credentials" });
    return;
  }
  // console.log(isPasswordCorrect);

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email
    },
    process.env.SECRET_KEY
  );
  // console.log(token);
  res.send({
    message: "user connect successfully",
    token
  });
};

module.exports = { register, verify, login }