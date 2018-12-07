import * as React from "react";
import {Segment} from "semantic-ui-react";
import { SettingsContainer } from "./SettingsContainer";
import { MessengerContainer } from "./MessengerContainer";

var $ = ($ as any);

export class App extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
        this.state = {
            myColor: "",
            myName: "",
            connection: new WebSocket('ws://127.0.0.1:1337')
        };
        var self = (this.state as any);
        self.connection.onopen = function () {
            // choose a name
            // TODO
        };
        self.connection.onerror = function () {
            $('#content').html($('<p>', {
                text: 'Sorry, but there\'s some problem with your '
                   + 'connection or the server is down.'
              }));
        };

        self.connection.onmessage = function (message: any) {
            try {
                var json = JSON.parse(message.data);
            } catch (e) {
                console.log('Invalid JSON: ', message.data);
                return;
            }
            if (json.type === 'color') {
                self.myColor = json.data;
                $('#status').text(self.myName + ': ').css('color', self.myColor);
                $('#input').removeAttr('disabled').focus();
                // from now user can start sending messages
            } else if (json.type === 'history') { // entire message history
                // insert every single message to the chat window
                for (var i=0; i < json.data.length; i++) {
                this.addMessage(json.data[i].author, json.data[i].text,
                    json.data[i].color, new Date(json.data[i].time));
                }
            } else if (json.type === 'message') { // it's a single message
                // let the user write another message
                $('#input').removeAttr('disabled'); 
                this.addMessage(json.data.author, json.data.text,
                            json.data.color, new Date(json.data.time));
            } else {
                console.log('Hmm..., I\'ve never seen JSON like this:', json);
            }
            setInterval(function() {
                if (self.connection.readyState !== 1) {
                  $("#status").text('Error');
                  $("#input").attr('disabled', 'disabled').val(
                      'Unable to communicate with the WebSocket server.');
                }
            }, 3000);
        };
    }

    render(){
        return  <Segment>
                    <SettingsContainer></SettingsContainer>
                     <MessengerContainer></MessengerContainer>
                </Segment>;
                
    }

    addMessage(author: string, message: string, color: string, dt: Date) {
        $("#content").prepend('<p><span style="color:' + color + '">'
            + author + '</span> @ ' + (dt.getHours() < 10 ? '0'
            + dt.getHours() : dt.getHours()) + ':'
            + (dt.getMinutes() < 10
              ? '0' + dt.getMinutes() : dt.getMinutes())
            + ': ' + message + '</p>');
    }
} 

