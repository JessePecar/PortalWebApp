import { Component } from 'react'
import PropTypes from 'prop-types';
import StandardLabel from './StandardLabel.jsx'

export default class TextImageButton extends Component{

    constructor(props){
        super(props);
    }
    render(){
        return(
            <button 
                className={`rounded-full shadow px-4 py-1 bg-green-700`}
                onClick={this.props.onClick}>
                <div className="flex items-center">
                    {this.props.image}
                    <StandardLabel dark={true}>{this.props.buttonText}</StandardLabel>
                </div>
            </button>
        )
    }
}

TextImageButton.propTypes = {
    image: PropTypes.element,
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
    class: PropTypes.string
}