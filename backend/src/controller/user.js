const user = require("../model/user");
const jokeModel = require("../model/joke");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const senderEmail = process.env.SENDER_EMAIL;

const SECRET_KEY = process.env.SECRET_KEY || "development";
const SALT_VALUE = 10;

class UserController {
  async create(name, email, password, role) {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_VALUE);

    try {
      const userValue = await user.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      return userValue;
    } catch (error) {
      if (error.parent?.code === "ER_DUP_ENTRY") {
        throw new Error("Email already exists");
      }
      throw new Error(error.message || "Error creating user");
    }
  }

  async createAccessCode(code, email) {
    if (!code) throw new Error("Code is required");
    if (!email) throw new Error("Email is required");

    const expirationTime = new Date(Date.now() + 5 * 60000);

    try {
      const updated = await user.update(
        {
          accessCode: code,
          accessCodeExpiration: expirationTime,
        },
        {
          where: { email: email },
        }
      );

      if (updated === 0) throw new Error("User not found");

      return { success: true, message: "Access code created successfully" };
    } catch (error) {
      throw new Error(error.message || "Error creating access code");
    }
  }

  async findUser(id) {
    if (!id) throw new Error("Id is required");

    const userValue = await user.findByPk(id);
    if (!userValue) throw new Error("User not found");

    return userValue;
  }

  async findUserByEmail(email) {
    if (!email) throw new Error("Email is required");

    const userValue = await user.findOne({ where: { email } });
    if (!userValue) throw new Error("User not found");

    return userValue;
  }

  async update(id, name, email, password) {
    if (!id || !name || !email || !password) {
      throw new Error("Id, name, email, and password are required");
    }

    const userValue = await this.findUser(id);
    if (!userValue) throw new Error("Internal server error.");

    const hashedPassword = await bcrypt.hash(password, SALT_VALUE);
    userValue.name = name;
    userValue.email = email;
    userValue.password = hashedPassword;
    await userValue.save();

    return userValue;
  }

  async block(id) {
    if (!id) throw new Error("Id is required");

    const userValue = await this.findUser(id);
    if (!userValue) throw new Error("User not found");

    userValue.role = "blocked";
    await userValue.save();

    return userValue;
  }

  async unlock(id) {
    if (!id) throw new Error("Id is required");

    const userValue = await this.findUser(id);
    if (!userValue) throw new Error("User not found");

    userValue.role = "viewer";
    await userValue.save();

    return userValue;
  }

  async delete(id) {
    if (!id) throw new Error("Id is required");

    const userValue = await this.findUser(id);
    if (!userValue) throw new Error("User not found");

    await this.deleteJokesByUserId(id);
    await userValue.destroy();
  }

  async deleteJokesByUserId(userId) {
    await jokeModel.destroy({
      where: { userId },
    });
  }

  async find() {
    return user.findAll();
  }

  async verifyAccessCode(email, code) {
    if (!email || !code) throw new Error("Email and code are required");

    const userValue = await user.findOne({
      where: { email: email },
    });

    if (!userValue) {
      throw new Error("Invalid access code");
    }

    await user.update({ accessCode: null }, { where: { email } });

    return jwt.sign({ id: userValue.id, role: userValue.role }, SECRET_KEY, {
      expiresIn: "1h",
    });
  }

  async login(email, password) {
    if (!email || !password) throw new Error("Email and password are required");

    const userValue = await this.findUserByEmail(email);
    if (!userValue) throw new Error("Invalid email or password");

    const validPassword = await bcrypt.compare(password, userValue.password);
    if (!validPassword) throw new Error("Invalid email or password");

    const accessCode = Math.floor(100000 + Math.random() * 900000);
    await this.createAccessCode(email, accessCode);

    const msg = {
      to: email,
      from: senderEmail,
      subject: "Your Access Code | Chuck Norris",
      text: `Your access code is: ${accessCode}`,
      html: `<p>Your access code is: <strong>${accessCode}</strong></p>`,
    };

    try {
      await sgMail.send(msg);
      return { message: "Access code sent to your email" };
    } catch (error) {
      console.error("Error sending email: ", error);
      throw new Error("Failed to send access code");
    }
  }
}

module.exports = new UserController();
