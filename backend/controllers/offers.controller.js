const Offer = require("../models/Offers");

exports.createOffer = async (req, res) => {
  try {
    const offer = new Offer(req.body);
    const savedOffer = await offer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate("planIds");
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate("planIds");
    if (!offer) return res.status(404).json({ error: "Offer not found" });
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOffer = async (req, res) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOffer)
      return res.status(404).json({ error: "Offer not found" });
    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
    if (!deletedOffer)
      return res.status(404).json({ error: "Offer not found" });
    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
