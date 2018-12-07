import * as React from "react";
import { Button, Input } from "semantic-ui-react";

export class SettingsContainer extends React.Component<{}, {}> {
    render(){
        return <div>
                    <Input placeholder='Input Server IP Address'></Input>
                    <Input placeholder='Input Port Number'></Input>
                    <Button>Connect</Button>
               </div>

}
}
