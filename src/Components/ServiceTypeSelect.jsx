import { Component } from 'react'
import '../App.css'
import { DropDownList } from './DropDownList.jsx'
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
            <DropDownList items={this.state.serviceTypes} selectedItemChanged={this.selectedItem}>{this.props.user.roleCode}</DropDownList>
        )
    }
}

ServiceTypeSelect.propTypes = {
    setState = PropTypes.func
}
