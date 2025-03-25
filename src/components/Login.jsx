import "../assets/Login.css";

import { supabase } from "../../supabaseClient";
import { useState } from "react";

const Login = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setIsInvalid(false);
    const { name, value } = e.target;
    formData[name] = value;
    setFormData({ ...formData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log("Giriş başarısız: " + error.message);
      setIsInvalid(true);
    } else {
      console.log("Giriş başarılı! Hoş geldiniz, " + data.user.email);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Kurye Giriş</h1>
          <p>Hesabınıza giriş yapın</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-posta adresinizi girin"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Şifrenizi girin"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {isInvalid && <p className="invalid-login-msg">Geçersiz e-posta veya şifre</p>}

          <button type="submit" className="login-button">
            Giriş Yap
          </button>
        </form>

        <div className="login-footer">&copy; {new Date().getFullYear()} Kurye Taşımacılık Servisi</div>
      </div>
    </div>
  );
};

export default Login;
