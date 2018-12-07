import * as React from "react";
import { Button, Input } from "semantic-ui-react";

interface SettingsProp {
    connector: Function;
    ipUpdator: Function;
    portUpdator: Function;
}

export class SettingsContainer extends React.Component<SettingsProp, {}> {
    render(){
        return <div>
                    <Input
                        placeholder='Input Server IP Address'
                        onChange={event => this.props.ipUpdator(event.target.value)}></Input>
                    <Input
                        placeholder='Input Port Number'
                        onChange={event => this.props.portUpdator(event.target.value)}></Input>
                    <Button onClick={event => this.props.connector()}>Connect</Button>
                </div>;
    }
} 