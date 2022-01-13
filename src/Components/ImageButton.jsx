import { Component } from 'react'
import PropTypes from 'prop-types';

export default class ImageButton extends Component{

    constructor(props){
        super(props);
    }
    render(){
        return(
            <button 
                className={`rounded-full shadow px-4 py-2  bg-red-700`}
                onClick={this.props.onClick}>{this.props.image}</button>
        )
    }
}

ImageButton.propTypes = {
    image: PropTypes.element,
    onClick: PropTypes.func,
    class: PropTypes.string,
    
}