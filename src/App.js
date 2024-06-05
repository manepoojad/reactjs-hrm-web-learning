import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RootRoutes from "./container/RootRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <RootRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
