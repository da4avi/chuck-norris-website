import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles.css";
import { registerUser } from "../../api/user";
import { useTranslation } from "react-i18next";
import Form from "../../components/General/Form";
import Input from "../../components/General/Input";
import Button from "../../components/General/Button";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [t] = useTranslation("global");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await registerUser(name, email, password);

      if (response.ok) {
        setSuccessMessage(t("registrationSuccess"));
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorMessage = response.error || t("registrationError");
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      setErrorMessage(t("Failed to register user"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <h1>{t("signup")}</h1>
      <div className="card">
        <Form>
          <label htmlFor="username">{t("user")} </label>
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            name="username"
            id="username"
          />
          <label htmlFor="email">Email: </label>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
          />
          <label htmlFor="password">{t("password")} </label>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
          />
        </Form>
        <li>
          <Button type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? t("loading") : t("create")}
          </Button>
          <Link to="/login">
            <Button type="button">{t("login")}</Button>
          </Link>
        </li>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
