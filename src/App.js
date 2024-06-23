import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RootRoutes from "./container/RootRoutes";
import { store } from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <RootRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
