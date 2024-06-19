const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      // Set session user dengan gender dan tanggal_lahir
      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        birth_date: user.birth_date,
      };
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        birth_date: user.birth_date,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.register = async (req, res) => {
  const { email, password, name, role, gender, birth_date } = req.body;
  try {
    // Cek apakah email sudah ada
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Jika tidak ada, buat pengguna baru
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = await User.create({
      email,
      password: hashedPassword,
      name,
      role,
      gender,         // Tambahkan gender
      birth_date,  // Tambahkan tanggal_lahir
    });
    res.json({ message: "User registered successfully", userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateProfile = async (req, res) => {
  const { id_user, phone, address, gender, birth_date } = req.body;
  try {
    // Pastikan pengguna dengan id_user ada
    const user = await User.findById(id_user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update data profile pengguna
    const updatedData = { phone, address, gender, birth_date };
    await User.update(id_user, updatedData);

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { id_user, old_password, new_password } = req.body;
  try {
    // Pastikan pengguna dengan id_user ada
    const user = await User.findById(id_user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verifikasi old_password
    if (!bcrypt.compareSync(old_password, user.password)) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // Hash new_password dan update
    const hashedPassword = bcrypt.hashSync(new_password, 10);
    await User.update(id_user, { password: hashedPassword });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


