import * as React from "react";
import {Segment} from "semantic-ui-react";
import { SettingsContainer } from "./SettingsContainer";
import { MessengerContainer } from "./MessengerContainer";

export class App extends React.Component<{}, {}> {
    render(){
        return  <Segment>
                    <SettingsContainer></SettingsContainer>
                     <MessengerContainer></MessengerContainer>
                </Segment>;
                
    }
} 

