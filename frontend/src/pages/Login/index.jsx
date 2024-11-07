import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { loginUser } from "../../api/user";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/Context";
import { useTranslation } from "react-i18next";
import Form from "../../components/General/Form";
import Input from "../../components/General/Input";
import Button from "../../components/General/Button";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation("global");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await loginUser(email, password);

      login(response.token);

      navigate("/access-code", { state: { email } });
    } catch (err) {
      setErrorMessage(t("An error occurred. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <h1>{t("login")}</h1>
      <div className="card">
        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">{t("Email")}: </label>
          <Input
            placeholder={"Email"}
            required
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">{t("Password")}</label>
          <Input
            placeholder={"Password"}
            required
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="actionsButtons">
            <Button type="submit" disabled={loading}>
              {loading ? t("Loading") : t("Login")}
            </Button>
            <p>
              New here? <Link to="/register">Create an account</Link>
            </p>
          </div>
        </Form>
        {errorMessage && (
          <p className="error-message" aria-live="assertive">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
