import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  // 綁定 Input 取得 name、value 值，並用解構將值寫入 useState();
  const getValue = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // 將登入資料帶入取得 API 資料，判斷為 TRUE 跳轉後台
  const submit = async (e) => {
    try {
      console.log(e);
      const res = await axios.post('/v2/admin/signin', loginData);
      const { token, expired, success } = res.data;
      // 儲存 Token
      document.cookie = `familyPetToken=${token}; expires=${new Date(expired)}`;
      if (success) {
        navigate('/admin/products');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login">
        <div className="login__container">
          <div className="login__title">LOGIN</div>
          <div className="login__data">
            <i className="bi bi-envelope login__data__icon"></i>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              className="login__data__input"
              required
              onChange={getValue}
            />
            <label htmlFor="username" className="login__data__label">
              Email
            </label>
          </div>
          <div className="login__data">
            <i className="bi bi-key login__data__icon"></i>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              className="login__data__input"
              required
              onChange={getValue}
            />
            <label htmlFor="password" className="login__data__label">
              Password
            </label>
          </div>
          <button className="login__button" onClick={submit}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
