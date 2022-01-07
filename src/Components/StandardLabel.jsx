import { Component } from 'react'
import PropTypes from 'prop-types'

export default class StandardLabel extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <h3 className={`pl-2 uppercase md:text-sm lg:text-base font-medium font-sans text-slate-${this.props.dark ? "200" : "700"} ${this.props.class}`}>{this.props.label}</h3>
        )
    }
}

StandardLabel.propTypes = {
    label: PropTypes.string,
    class: PropTypes.string,
    dark: PropTypes.bool
}