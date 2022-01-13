import { Component } from 'react'
import '../App.css'
import { DropDownList } from './DropDownList.jsx'

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
            <DropDownList items={this.state.roles} selectedItemChanged={this.selectedItem}>{this.props.user.roleCode}</DropDownList>
        )
    }
}
