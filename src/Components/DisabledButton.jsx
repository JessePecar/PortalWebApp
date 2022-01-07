import { Component } from 'react'
import PropTypes from 'prop-types';

export default class DisabledButton extends Component{

    constructor(props){
        super(props);
    }
    render(){
        return(
            <button disabled={this.props.isDisabled}
                className={`${this.props.isDisabled ? "bg-slate-100 text-slate-600" : "bg-slate-700 hover:bg-slate-600 text-slate-200"} 
                            ${this.props.noBorder ? "" : "rounded-full shadow border border-slate-200"}
                            ${this.props.class} uppercase px-4 text-medium font-medium py-2`}
                onClick={this.props.onClick}>{this.props.children ? this.props.children : this.props.buttonText }</button>
        )
    }
}

DisabledButton.propTypes = {
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    buttonText: PropTypes.string,
    class: PropTypes.string,
    noBorder: PropTypes.bool
}