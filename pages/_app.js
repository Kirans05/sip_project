import "../styles/globals.css";
// import { wrapper } from "../Store/Store";
// import { Provider } from "react-redux";
import Context from "../src/context/Context";

function MyApp(props) {
  

  // var { store, props } = wrapper.useWrappedStore(rest);
  return (
    // <Provider store={store}>
    <Context props={props}/>
      // <Component {...pageProps} />
    // </Provider>
  );
}

export default MyApp;
