import * as React from "react";
import { SettingsContainer } from "./SettingsContainer";
import { MessengerContainer } from "./MessengerContainer";

// export interface HelloProps {compiler: string; framework: string;}

export class App extends React.Component<{}, {}> {
    render(){
        return <div>
            <SettingsContainer></SettingsContainer>
            <MessengerContainer></MessengerContainer>
        </div>

}
}
