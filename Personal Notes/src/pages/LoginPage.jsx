import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/api";
import { LocaleConsumer } from "../contexts/LocaleContext";

const LoginPage = ({ loginSuccess }) => {
  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="login-page">
            <br />
            <h2>
              {locale === "id"
                ? "Silakan masuk untuk melanjutkan."
                : "Login to use app, please."}
            </h2>
            <br />
            <LoginInput login={onLogin} />
            <br />
            <p>
              {locale === "id" ? "Belum punya akun?" : "Don't have an account?"}{" "}
              <Link to="/register">
                {locale === "id" ? "Register di sini" : "Register here"}
              </Link>
            </p>
          </section>
        );
      }}
    </LocaleConsumer>
  );
};

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
