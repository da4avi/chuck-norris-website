const userModel = require("../model/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

const admin = {
  name: process.env.ADMIN_NAME,
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  role: "admin",
};

async function insertAdminIfNotExist() {
  try {
    const existsAdmin = await userModel.findOne({
      where: {
        email: admin.email,
      },
    });

    if (existsAdmin) {
      console.log("Admin already exists.");
      return;
    }

    const cypherpassword = await bcrypt.hash(admin.password, 10);

    await userModel.create({
      name: admin.name,
      email: admin.email,
      password: cypherpassword,
      role: admin.role,
    });

    console.log("Admin created successfully.");
  } catch (err) {
    console.error(`Error creating admin: ${err.message}`);
  }
}

module.exports = {
  insertAdminIfNotExist,
};
