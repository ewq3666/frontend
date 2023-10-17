import { Router } from "./Routers/Router";
import "./Style/theme.css";
import "./Style/globalStyles.scss";
import Payment from "./gateway/payment";

function App() {
  return (
    <div>
      <Router />
      <>{console.log("www",window.location)}</>
      <Payment/>
    </div>
  );
}

export default App;
