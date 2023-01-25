import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";


    
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

