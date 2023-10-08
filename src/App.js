import { Router } from "./Routers/Router";
import "./Style/theme.css";
import "./Style/globalStyles.scss";
import { send } from "./Email/Send";
import { EmailForm } from "./Email/Email";

function App() {

  return (
    <div>
      <Router />
      <EmailForm/>
      <>{console.log("www",window.location)}</>
    </div>
  );
}

export default App;
