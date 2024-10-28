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
  const [t] = useTranslation("global");

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

      if (response.error) {
        const { error } = response;
        setErrorMessage(t(error));
      } else if (response.token) {
        login(response.token);
        navigate("/");
      }
    } catch (err) {
      setErrorMessage(t("Email or password is invalid"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <h1>{t("login")}</h1>
      <div className="card">
        <Form action="">
          <label htmlFor="email">{t("email")}: </label>
          <Input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">{t("password")} </label>
          <Input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form>
        <li>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? t("loading") : t("login")}
          </Button>
          <Link to="/register">
            <Button type="button">{t("signin")}</Button>
          </Link>
        </li>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}
