"use client"
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvents";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import StringStateVariables from "./StringStateVariables";
import store from "./store";
import { Provider } from "react-redux";
import UrlEncoding from "./url-encoding/page";
import Link from "next/link";

export default function Lab4() {
    function sayHello() {
        alert("Hello");
    }
    return (
        <Provider store={store}>
            <div className="wd-lab4">
                <h2>Lab4</h2>
                <h3>State</h3>
                <ClickEvent />
                <PassingDataOnEvent />
                <PassingFunctions theFunction={ sayHello }/>
                <Counter />
                <BooleanStateVariables />
                <StringStateVariables />
                <DateStateVariable />
                <ObjectStateVariable />
                <ArrayStateVariable />
                <ParentStateComponent />
                <UrlEncoding />
                <Link href="./lab4/redux">Redux Examples</Link> <br />
                <Link href="./lab4/react-context">React Context Examples</Link> <br />
                <Link href="./lab4/zustand">Zustand Examples</Link>
            </div>
        </Provider>
    )
}