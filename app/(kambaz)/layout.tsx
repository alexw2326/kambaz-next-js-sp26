"use client"
import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import store from "./store";
import { Provider } from "react-redux";
import "./style.css"
export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
  <Provider store={store}>
     <div className="d-flex" id="wd-kambaz">
       <div>
         <KambazNavigation />
       </div>
       <div className="flex-fill ps-3 wd-main-content-offset">{children}</div>
     </div>
   </Provider>
);}
