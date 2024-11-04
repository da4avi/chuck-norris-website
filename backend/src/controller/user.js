const user = require("../model/user");
const jokeModel = require("../model/joke");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const SECRET_KEY = process.env.SECRET_KEY || "development";
const SALT_VALUE = 10;

class UserController {
  async create(name, email, password, role) {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }

    const cypherpassword = await bcrypt.hash(password, SALT_VALUE);

    try {
      const userValue = await user.create({
        name,
        email,
        password: cypherpassword,
        role,
      });

      return userValue;
    } catch (error) {
      if (error.parent && error.parent.code === "ER_DUP_ENTRY") {
        throw new Error("Email already exists");
      }
      throw new Error(error.message || "Error creating user");
    }
  }

  async createAccessCode({ code, email }) {
    if (!code) {
      throw new Error("Code is required");
    }

    try {
      const userValue = await user.update(
        { accessCode: code },
        { where: { email } }
      );

      if (!userValue[0]) {
        throw new Error("User not found");
      }

      return userValue;
    } catch (error) {
      throw new Error(error.message || "Error creating access code");
    }
  }

  async findUser(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    const userValue = await user.findByPk(id);

    if (!userValue) {
      throw new Error("User not found");
    }

    return userValue;
  }

  async update(id, name, email, password) {
    if (!id || !name || !email || !password) {
      throw new Error("Id, name, email, and password are required");
    }

    const userValue = await this.findUser(id);

    if (!userValue) {
      throw new Error("Internal server error.");
    }

    const cypherpassword = await bcrypt.hash(password, SALT_VALUE);
    userValue.name = name;
    userValue.email = email;
    userValue.password = cypherpassword;
    await userValue.save();

    return userValue;
  }

  async block(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    const userValue = await this.findUser(id);

    if (!userValue) {
      throw new Error("User not found.");
    }

    userValue.role = "blocked";

    await userValue.save();

    return userValue;
  }
  async unlock(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    const userValue = await this.findUser(id);

    if (!userValue) {
      throw new Error("User not found.");
    }

    userValue.role = "viewer";

    await userValue.save();

    return userValue;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    const userValue = await this.findUser(id);
    if (!userValue) {
      throw new Error("User not found");
    }

    await this.deleteJokesByUserId(id);

    await userValue.destroy();
  }

  async deleteJokesByUserId(userId) {
    await jokeModel.destroy({
      where: { userId: userId },
    });
  }

  async find() {
    return user.findAll();
  }

  async login(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const userValue = await user.findOne({ where: { email } });
    const accessCode = Math.floor(100000 + Math.random() * 900000);
    const userCode = await this.createAccessCode(accessCode, email);

    if (!userCode) {
      throw new Error("Access code not generated");
    }

    if (!userValue) {
      throw new Error("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(password, userValue.password);
    if (!validPassword) {
      throw new Error("Invalid email or password");
    }

    const msg = {
      to: email,
      from: "chucknorriswebsiteapi@gmail.com",
      subject: "Your Access Code | Chuck Norris",
      text: `Your access code is: ${accessCode}`,
      html: `Your access code is: <strong>${accessCode}</strong>`,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error("Error sending email: ", error);
      throw new Error("Failed to send access code");
    }

    return jwt.sign({ id: userValue.id, role: userValue.role }, SECRET_KEY, {
     
      expiresIn: "1h",
  
    });
  }
}

module.exports = new UserController();
