import ReactDOM from "react-dom/client";
import App from "./app/app";
import { Provider } from "react-redux";
// import { store } from "./app/store/";
import { store as RTKstore } from "./app/reduxToolkit";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Provider store={RTKstore}>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </Provider>
);
