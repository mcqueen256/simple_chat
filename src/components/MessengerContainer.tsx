import * as React from "react";
import { Button, Input } from "semantic-ui-react";

interface MessengerProp {
    sender: Function;
    msgUpdator: Function;
}

export class MessengerContainer extends React.Component<MessengerProp, {}> {
    render(){
        return <div>
                    <div>Message Box</div>
                    <Input placeholder='Enter Message' onChange={(event) => {
                        this.props.msgUpdator(event.target.value);
                    }}></Input> 
                    <Button onClick={(event) => {
                        this.props.sender();
                    }}>Send</Button>
               </div>

}
}
