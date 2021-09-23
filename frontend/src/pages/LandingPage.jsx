import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="container">
      <form className="login-form">
        <h1>Login</h1>
        <div className="login-input">
          <label>Username:</label>
          <input />
        </div>
        <div className="login-input">
          <label>Password:</label>
          <input />
        </div>
        <button>Log In</button>
      </form>
    </div>
  );
};

export default LandingPage;
