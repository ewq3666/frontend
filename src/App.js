import { Router } from "./Routers/Router";
import "./Style/theme.css";
import "./Style/globalStyles.scss";

function App() {
  return (
    <div>
      <Router />
      <>{console.log("www",window.location)}</>
    </div>
  );
}

export default App;
