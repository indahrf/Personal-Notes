import { useState } from "react";
import PropTypes from "prop-types";

const LoginInput = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({ email, password });
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmitHandler} className="login-input">
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
          value={password}
          onChange={onInputChange}
        />
        <button className="login-input">Login</button>
      </form>
    </div>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
