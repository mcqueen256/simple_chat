import * as React from "react";
import { Button } from "semantic-ui-react";
// import {Button} from "./Button";
interface SettingsProp {
    connector: Function;
}

export class SettingsContainer extends React.Component<SettingsProp, {}> {
    render(){
        return <div>
                    <div>Ip textbox</div>
                    <div>Port textbox</div> 
                    <Button content="Connect" onClick={event => this.props.connector}></Button>
               </div>

}
}
