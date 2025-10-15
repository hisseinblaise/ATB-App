require('dotenv').config();
const Contact = require("../models/contactModel");
const transporter = require("../email/mailTransporter");
// Route POST pour enregistrer un message
 const saveMessage = async (req, res) => {
  try {
    const { lastName, firstName, email, sujet, message } = req.body;

    const newContact = new Contact({ lastName, firstName, email, sujet, message });
    await newContact.save();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirmation de réception",
      text: `Bonjour ${firstName} ${lastName},\n\nMerci pour votre message concernant "${sujet}".\nNous vous répondrons très bientôt.\n\nCordialement,\nequipe dynamique wenaklabs AHH`,
    });

    res.status(201).json({ message: "Message enregistré et email envoyé !" });
  } catch (err) {
    console.error("Erreur saveMessage:", err);
    res.status(500).json({ error: err.message });
  }
};

// Route GET pour consulter tous les messages
const getAllMessages = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
};

const message = async (req, res) => {
  try {
    const { reply } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { reply },
      { new: true }
    );
    res.json({ message: "Réponse envoyée avec succès", contact });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'envoi de la réponse" });
  }
};

const getIdMessage = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Message non trouvé" });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération du message" });
  }
};

const deleteMessge = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};
module.exports = { saveMessage, getAllMessages,message,getIdMessage, deleteMessge};