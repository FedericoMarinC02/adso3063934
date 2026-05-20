import titleLogin from "../assets/imgs/title-login.png";

function LoginView({ loginForm, onChange, onSubmit }) {
  const { email, password } = loginForm;
  const handleChange = ({ target: { name, value } }) =>
    onChange({ ...loginForm, [name]: value });

  return (
    <main id="login" className="animateView">
      <header>
        <img src={titleLogin} alt="Larapets Login" />
      </header>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="btnLogin">
          Login
        </button>
      </form>
    </main>
  );
}

export default LoginView;
