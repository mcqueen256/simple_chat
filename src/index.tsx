import * as React from "react";
import * as ReactDOM from "react-dom";

import {App} from "./components/App";
import {SettingsContainer} from "./components/SettingsContainer"

(window as any).WebSocket = (window as any).WebSocket || (window as any).MozWebSocket;
if (!(window as any).WebSocket) {
    console.error('Sorry, but your browser doesn\'t support WebSocket.');
}

ReactDOM.render(
    <App/>,
    document.getElementById("content")
);
