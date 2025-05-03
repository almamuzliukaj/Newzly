import { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

function App() {
  const [view, setView] = useState("register"); // ose "login", "forgot"
<p>Aktualisht në view: {view}</p>

  return (
    <div>
      <h1>Welcome to Newzly</h1>

      {view === "register" && (
        <RegisterForm onSwitch={() => setView("login")} />
      )}

      {view === "login" && (
        <LoginForm
          onSwitch={() => setView("register")}
          onForgot={() => setView("forgot")}
        />
      )}

      {view === "forgot" && (
        <ForgotPasswordForm onSwitch={() => setView("login")} />
      )}
    </div>
  );
}

export default App;
