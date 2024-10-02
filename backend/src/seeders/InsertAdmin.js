const userModel = require("../model/user");
const bcrypt = require("bcrypt");

const admin = {
  name: "Admin",
  email: "admin@chucknorriswebsite.com",
  password: process.env.ADMIN_PASSWORD || "defaultpassword123",
  role: "admin",
};

async function insertAdminIfNotExist() {
  try {
    const existsAdmin = userModel.findOne({
      where: {
        email: admin.email,
      },
    });

    if (!existsAdmin) {
      return console.log("Admin already exists.");
    }

    const cypherpassword = await bcrypt.hash(admin.password, 10);

    await userModel.create({
      name: admin.name,
      email: admin.email,
      password: cypherpassword,
      role: admin.role,
    });
  } catch (err) {
    return console.error(`Erro to create admin: ${err.message}`);
  }
}

module.exports = {
  insertAdminIfNotExist,
};
