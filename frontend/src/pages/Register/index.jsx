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
  const { t } = useTranslation("global");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await registerUser(name, email, password);

      if (!response.error) {
        setSuccessMessage(t("registrationSuccess"));
        setTimeout(() => navigate("/login"), 500);
      } else {
        setErrorMessage(response.error || t("registrationError"));
      }
    } catch (error) {
      setErrorMessage(t("Failed to register user: ", error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <h1>{t("signup")}</h1>
      <div className="card">
        <Form onSubmit={handleSubmit}>
          <label htmlFor="username">{t("user")}</label>
          <Input
            placeholder="Type your name or nickname"
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            name="username"
            id="username"
          />
          <label htmlFor="email">Email:</label>
          <Input
            placeholder="Type your best email"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
          />
          <label htmlFor="password">{t("password")}</label>
          <Input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Type a strong password"
            id="password"
          />
          <div className="actionsButtons">
            <Button type="submit" disabled={loading}>
              {loading ? t("loading") : t("Create")}
            </Button>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </Form>
        {successMessage && (
          <p className="success-message" aria-live="polite">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="error-message" aria-live="assertive">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
