import { Component } from 'react'
import '../App.css'
import { DropDown } from './DropDown.jsx'

export class RoleSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            roles: ["ADMIN", "OWNER", "DEV", "READER"]
        }

        this.selectedItem = this.selectedItem.bind(this);
    }
    
    selectedItem = (item) => {
        this.props.setState(this.props.user, item);
    }

    render(){
        return(
            <DropDown items={this.state.roles} buttonText={this.props.user.roleCode} selectedItemChanged={this.selectedItem}></DropDown>
        )
    }
}
