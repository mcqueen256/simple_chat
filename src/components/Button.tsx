import * as React from "react";

export interface ButtonProps {
    buttonText: string;
    onClick: Function;
}

export class Button extends React.Component<ButtonProps, {}> {
    render(){
        return  <div>
                    <button className='ui primary button' role='button' onClick={event => this.props.onClick}>
                        {this.props.buttonText}
                    </button>
                </div>
                
    }
} 

