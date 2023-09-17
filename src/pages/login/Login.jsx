import { useState } from "react";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { logncordinator } from "../../utils/Constants";
import { setLogin } from "../../Redux/store";

const Login = () => {
  const [datas, setDatas] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setDatas({ ...datas, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(logncordinator, datas);
      dispatch(setLogin({ cord: data.data, token: data.cord_jwt }));
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>LOGIN TO CORDINATOR!</h1>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
              value={datas.username}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={datas.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Login
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to='/cordinator-signup'>signup?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
