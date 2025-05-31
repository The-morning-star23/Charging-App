const db = require("../models");
const Charger = db.charger;

// Create
exports.createCharger = async (req, res) => {
  try {
    const charger = await Charger.create({
      ...req.body,
      userId: req.userId, // from JWT middleware
    });
    res.status(201).json(charger);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read all
exports.getAllChargers = async (req, res) => {
  try {
    const chargers = await Charger.findAll();
    res.status(200).json(chargers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateCharger = async (req, res) => {
  try {
    const id = req.params.id;
    const charger = await Charger.findByPk(id);

    if (!charger) return res.status(404).json({ message: "Not found" });

    await charger.update(req.body);
    res.status(200).json(charger);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deleteCharger = async (req, res) => {
  try {
    const id = req.params.id;
    const charger = await Charger.findByPk(id);

    if (!charger) return res.status(404).json({ message: "Not found" });

    await charger.destroy();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
