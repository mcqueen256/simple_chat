import * as React from "react";
//import { Button } from "semantic-ui-react";
import {Button} from "./Button";
export class SettingsContainer extends React.Component<{}, {}> {
    render(){
        return <div>
                    <div>Ip textbox</div>
                    <div>Port textbox</div> 
                    <Button buttonText="Connect"></Button>
               </div>

}
}
