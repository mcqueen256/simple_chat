import * as React from "react";

export interface ButtonProps {buttonText: string;}

export class Button extends React.Component<ButtonProps, {}> {
    render(){
        return  <div>
                    <button className='ui primary button' role='button'>
                        {this.props.buttonText}
                    </button>
                </div>
                
    }
} 

