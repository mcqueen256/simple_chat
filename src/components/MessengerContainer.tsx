import * as React from "react";
import { Button, Input } from "semantic-ui-react";

export class MessengerContainer extends React.Component<{}, {}> {
    render(){
        return <div>
                    <div>Message Box</div>
                    <Input placeholder='Enter Message'></Input> 
                    <Button>Send</Button>
               </div>

}
}
