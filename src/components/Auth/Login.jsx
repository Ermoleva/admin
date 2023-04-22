import { useNavigate } from "react-router-dom";
import auth from "../../api/auth";
import "./Login.scss"
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  function login() {
    const email = document.querySelector("#login-email")?.value;
    const password = document.querySelector("#login-password")?.value;
    auth.login(email, password).then(res => {
      navigate('/lunch')
    }).catch(err => {
      console.error(err);
      Swal.fire('Помилка', "Невірна пошта або пароль", 'error');
    });
  }

  return (
    <div className="login-page">
      <div className="login">
        <h1>Login</h1>
        <p className="label">Email</p>
        <input type="text" id="login-email"/>
        <p className="label">Password</p>
        <input type="password" id="login-password"/>
        <div className="buttons">
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
}


export default Login;