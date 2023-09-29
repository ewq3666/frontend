import './App.css';
import { Router } from "./Routers/Router";

function App() {
  return (
    <div>
      <Router />
      <>{console.log("www",window.location)}</>
    </div>
  );
}

export default App;
