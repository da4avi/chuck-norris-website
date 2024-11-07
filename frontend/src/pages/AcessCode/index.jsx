import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyAccessCode } from "../../api/user"; // Função para verificar o código
import { AuthContext } from "../../auth/Context";
import { useTranslation } from "react-i18next";
import Form from "../../components/General/Form";
import Input from "../../components/General/Input";
import Button from "../../components/General/Button";
import "./styles.css";

export default function AccessCode() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation("global");
  const location = useLocation();
  const email = location.state?.email; // Get email from state
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await verifyAccessCode(email, code);

      if (response.error) {
        setErrorMessage(t(response.error));
      } else if (response.token) {
        login(response.token);
        navigate("/");
      }
    } catch (err) {
      setErrorMessage(t("Invalid access code"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="access-code">
      <h1>{t("Enter Access Code")}</h1>
      <div className="card">
        <Form onSubmit={handleSubmit}>
          <label htmlFor="access-code">{t("Access Code")}</label>
          <Input
            placeholder={t("Enter your access code")}
            required
            type="text"
            id="access-code"
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="actionsButtons">
            <Button type="submit" disabled={loading}>
              {loading ? t("Loading") : t("Verify Code")}
            </Button>
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
