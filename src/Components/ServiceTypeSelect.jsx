import { Component } from 'react'
import '../App.css'
import { DropDown } from './DropDown.jsx'
import PropTypes from 'prop-types'

export class ServiceTypeSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            serviceTypes: ["NPM", ".Net 6", ".Net 5"]
        }

        this.selectedItem = this.selectedItem.bind(this);
    }
    
    selectedItem = (item) => {
        this.props.setState(this.props.user, item);
    }

    render(){
        return(
            <DropDown items={this.state.serviceTypes} selectedItemChanged={this.selectedItem}>{this.props.user.roleCode}</DropDown>
        )
    }
}

ServiceTypeSelect.propTypes = {
    setState = PropTypes.func
}
