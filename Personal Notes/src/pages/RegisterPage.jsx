import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/api";
import { LocaleConsumer } from "../contexts/LocaleContext";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onRegisterHandler = async (user) => {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="register-page">
            <br />
            <h2>
              {locale === "id"
                ? "Isi form untuk mendaftar akun."
                : "Fill the form to register account."}
            </h2>
            <br />
            <RegisterInput register={onRegisterHandler} />
            <br />
            <p>
              {locale === "id"
                ? "Sudah punya akun?"
                : "Already have an account?"}{" "}
              <Link to="/">
                {locale === "id" ? "Login di sini" : "Login here"}
              </Link>
            </p>
          </section>
        );
      }}
    </LocaleConsumer>
  );
};

export default RegisterPage;
