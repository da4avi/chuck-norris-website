const user = require("../model/user");
const jokeModel = require("../model/joke");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const apiKeySg = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKeySg);

const SECRET_KEY = process.env.SECRET_KEY || "development";
const SALT_VALUE = 10;
const ACCESS_CODE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes
const SENDER_EMAIL = "matheusmviana@outlook.com.br";

class UserController {
  async create(name, email, password, role) {
    if (!name || !email || !password)
      throw new Error("Name, email, and password are required");

    const hashedPassword = await bcrypt.hash(password, SALT_VALUE);
    try {
      return await user.create({ name, email, password: hashedPassword, role });
    } catch (error) {
      if (error.parent?.code === "ER_DUP_ENTRY")
        throw new Error("Email already exists");
      throw new Error(error.message || "Error creating user");
    }
  }

  async createAccessCode(email, code) {
    if (!code || !email) throw new Error("Code and email are required");

    const expirationTime = new Date(Date.now() + ACCESS_CODE_EXPIRATION_TIME);
    const [updated] = await user.update(
      { accessCode: code, accessCodeExpiration: expirationTime },
      { where: { email } }
    );

    if (updated === 0) throw new Error("User not found");
    return { success: true, message: "Access code created successfully" };
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
    await jokeModel.destroy({ where: { userId } });
  }

  async find() {
    return user.findAll();
  }

  async verifyAccessCode(email, code) {
    if (!email || !code) throw new Error("Email and code are required");

    const userValue = await user.findOne({
      where: { email, accessCode: code },
    });
    if (!userValue || new Date() > userValue.accessCodeExpiration) {
      throw new Error("Invalid or expired access code");
    }

    await user.update(
      { accessCode: null, accessCodeExpiration: null },
      { where: { email } }
    );
    return jwt.sign({ id: userValue.id, role: userValue.role }, SECRET_KEY, {
      expiresIn: "1h",
    });
  }

  async login(email, password) {
    if (!email || !password) throw new Error("Email and password are required");

    const userValue = await this.findUserByEmail(email);
    const validPassword = await bcrypt.compare(password, userValue.password);
    if (!validPassword) throw new Error("Invalid email or password");

    const accessCode = Math.floor(100000 + Math.random() * 900000);
    await this.createAccessCode(email, accessCode);

    const msg = {
      to: email,
      from: "chucknorriswebsiteapi@gmail.com",
      subject: "Seu Código de Acesso | Chuck Norris",
      text: `Parabéns! Você foi escolhido para uma missão aprovada por Chuck Norris: verifique este código para ganhar acesso. Seu código de acesso é: ${accessCode}. Lembre-se, ao verificar o código, o código te respeita.`,
      html: `<p>Parabéns! Você foi escolhido para uma missão aprovada por Chuck Norris: verifique este código para ganhar acesso.</p>
             <p>Seu código de acesso é: <strong>${accessCode}</strong></p>
             <p>Lembre-se, ao verificar o código, o código te respeita.</p> <br>
             <p>E caso tenha dúvidas, lembre-se: Chuck Norris nunca teve.</p>`,
    };

    try {
      await sgMail.send(msg);
      return { message: "Access code sent to your email" };
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response ? error.response.body : error
      );
      throw new Error("Failed to send access code");
    }
  }
}

module.exports = new UserController();
