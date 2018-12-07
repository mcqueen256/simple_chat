import * as React from "react";
import { Button, Input } from "semantic-ui-react";

interface SettingsProp {
    connector: Function;
}

export class SettingsContainer extends React.Component<SettingsProp, {}> {
    render(){
        return <div>
                    <Input placeholder='Input Server IP Address'></Input>
                    <Input placeholder='Input Port Number'></Input>
                    <Button onClick={event => this.props.connector}>Connect</Button>
                </div>;
    }
} 