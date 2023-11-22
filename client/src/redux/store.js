import { legacy_createStore as createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk";
import rootReducer from "../redux/reducer/reducer";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // middleware 
);