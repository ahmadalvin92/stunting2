const Child = require("../models/childModel");

exports.createChild = async (req, res) => {
  try {
    const { id_parent_user, ch_name, ch_date_birth, ch_gender, ch_birth_height } = req.body;
    const childId = await Child.create({
      id_parent_user,
      ch_name,
      ch_date_birth,
      ch_gender,
      ch_birth_height,
    });
    res.json({ message: "Child data created successfully", childId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateChild = async (req, res) => {
  try {
    const { id_child, ch_name, ch_date_birth, ch_gender, ch_birth_height } = req.body;
    await Child.update(id_child, {
      ch_name,
      ch_date_birth,
      ch_gender,
      ch_birth_height,
    });
    res.json({ message: "Child data updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteChild = async (req, res) => {
  try {
    const { id_child } = req.body;
    await Child.delete(id_child);
    res.json({ message: "Child data deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChildrenByParentId = async (req, res) => {
  try {
    const { id_parent_user } = req.query;
    const children = await Child.getByParentId(id_parent_user);
    res.json(children);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
