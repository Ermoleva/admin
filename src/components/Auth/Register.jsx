import { useNavigate } from "react-router-dom";
import auth from "../../api/auth";
import "./Login.scss"
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  function register() {
    const name = document.querySelector("#register-name")?.value;
    const email = document.querySelector("#register-email")?.value;
    const phone = document.querySelector("#register-phone")?.value;
    const password = document.querySelector("#register-password")?.value;
    const repeat_password = document.querySelector("#register-password2")?.value;
    if (repeat_password !== password) {
      Swal.fire('Помилка', "Паролі не співпадають", 'error');
      return;
    }
    auth.register({ name, email, phone, password }).then(res => {
      navigate('/lunch')
    }).catch(err => {
      if (err?.response?.data?.status === 405) {
        Swal.fire('Помилка', "Така пошта вже існує", 'error');
      } else {
        Swal.fire('Помилка', undefined, 'error');
        console.error(err);
      }
    });
  }

  return (
    <div className="register-page">
      <div className="register">
        <h1>Register</h1>
        <p className="label">ПІБ</p>
        <input type="text" id="register-name"/>
        <p className="label">Email</p>
        <input type="text" id="register-email"/>
        <p className="label">Phone (необов'язково)</p>
        <input type="text" id="register-phone"/>
        <p className="label">Password</p>
        <input type="password" id="register-password"/>
        <p className="label">Repeat password</p>
        <input type="password" id="register-password2"/>
        <div className="buttons">
          <button onClick={register}>Register</button>
        </div>
      </div>
    </div>
  );
}


export default Register;