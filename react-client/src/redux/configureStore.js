import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createForms } from "react-redux-form";
import { LoginForm, SignupForm } from "./forms";
import { composeWithDevTools } from 'redux-devtools-extension'; 
import { userLogin } from './reducers/user';

export const ConfigureStore = () => {
    const store = createStore(
      combineReducers({
        userLogin : userLogin,
        ...createForms({
          loginForm : LoginForm,
          signupForm : SignupForm,
        }),
      }),
      //applyMiddleware(thunk)
      composeWithDevTools(applyMiddleware(thunk))
    );
  
    return store;
  };