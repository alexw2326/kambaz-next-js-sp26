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
import ReduxExamples from "./ReduxExamples/page";
import StringStateVariables from "./StringStateVariables";
import store from "./store";
import { Provider } from "react-redux";

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
                <ReduxExamples />
            </div>
        </Provider>
    )
}