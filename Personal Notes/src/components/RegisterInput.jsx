import { useState } from "react";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

const RegisterInput = ({ register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Konfirmasi password tidak cocok");
      return;
    }

    register({ name, email, password });
  };

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="form-container">
            <form onSubmit={onSubmitHandler} className="register-input">
              <input
                type="text"
                name="name"
                placeholder={locale === "id" ? "Nama" : "Name"}
                value={name}
                onChange={onInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={onInputChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder={
                  locale === "id" ? "Konfirmasi password" : "Confirm password"
                }
                value={confirmPassword}
                onChange={onInputChange}
              />
              <button>Register</button>
            </form>
          </div>
        );
      }}
    </LocaleConsumer>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
