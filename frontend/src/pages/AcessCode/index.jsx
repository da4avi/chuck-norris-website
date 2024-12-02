import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, verifyAccessCode } from "../../api/user";
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
  const email = location.state?.email;
  const password = location.state?.password;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (countdown === null || countdown === 0) {
      setIsDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendCode = async () => {
    setCountdown(60);
    setIsDisabled(true);
    try {
      const response = await loginUser(email, password);
    } catch (err) {
      setErrorMessage("Error:", err.message);
    }
  };

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
          <Input
            placeholder={t("Enter your access code")}
            required
            type="text"
            id="access-code"
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="actionsButtonsAcessButton">
            <Button type="submit" disabled={loading}>
              {loading ? t("Loading") : t("Verify Code")}
            </Button>
            <a
              onClick={!isDisabled ? handleResendCode : null}
              className={isDisabled ? "disabled" : ""}
            >
              {isDisabled
                ? `${t("Send code again in")} ${countdown}s`
                : t("Send code again")}
            </a>
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
