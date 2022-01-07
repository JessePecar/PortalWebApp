import {Component} from 'react'
import { NavLink } from "react-router-dom";
import ButtonModal from './ButtonModal.jsx'
import StandardLabel from './StandardLabel'

export default class RoleBasedNavigation extends Component{
    constructor(props){
        super(props);
    }

    
    render(){
        if(this.props.user !== null){
            if(this.props.user.appRole === window.appConfigs.Roles.Admin){
                return(
                    <div>
                        <ul className="list-none flex space-x-4 divide-x divide-slate-600">
                            <li className="pl-2" >
                                <ButtonModal width="w-48" isDisabled={false} buttonElement={<StandardLabel dark={true} label="Deployment"></StandardLabel>}>
                                    <ul className="text-slate-100 bg-slate-700 rounded p-2">
                                        <li className="px-2 my-2 hover:bg-slate-600">
                                            <NavLink to="/DeployHistory" className={`text-lg font-sans font-medium`}>Deploy History</NavLink>
                                        </li>
                                        <li className="px-2 my-2 hover:bg-slate-600">
                                            <NavLink to="/CreateService" className={`text-lg font-sans font-medium`}>Create Service</NavLink>
                                        </li>
                                        <li className="px-2 my-2 hover:bg-slate-600">
                                            <NavLink to="/Create" className={`text-lg font-sans font-medium`}>Create Deploy</NavLink>
                                        </li>
                                        <li className="px-2 my-2 hover:bg-slate-600">
                                            <NavLink to="/Modify" className={`text-lg font-sans font-medium`}>Modify Deploy</NavLink>
                                        </li>
                                    </ul>
                                </ButtonModal>
                            </li>
                            <li className="pl-2">
                                <ButtonModal width="w-48" isDisabled={false} buttonElement={<StandardLabel dark={true} label="Users"></StandardLabel>}>
                                    <ul className="text-slate-100 bg-slate-700 rounded p-2">
                                        <li className="px-2 my-2 hover:bg-slate-600">
                                            <NavLink to="/RequestedUsers" className={`text-lg font-sans font-medium h-full`}>Requested Users</NavLink>
                                        </li>
                                        <li className="px-2 my-2 hover:bg-slate-600">
                                            <NavLink to="/CurrentUsers" className={`text-lg font-sans font-medium h-full`}>Current Users</NavLink>
                                        </li>
                                        <li className="px-2 my-2 hover:bg-slate-600">
                                            <NavLink to="/ManageGroup" className={`text-lg font-sans font-medium h-full`}>Manage Group</NavLink>
                                        </li>
                                    </ul>
                                </ButtonModal>
                            </li>

                        </ul>
                    </div>
                );
            }
            if(this.props.user.appRole === window.appConfigs.Roles.ReadonlyUser){
                return(
                    <div>
                        <ul className="list-none flex space-x-4 divide-x divide-slate-600">
                            <li className="pl-2">
                                <ButtonModal width="w-48" isDisabled={false} buttonElement={<StandardLabel dark={true} label="Deployment"></StandardLabel>}>
                                    <ul className="text-slate-100 bg-slate-700 rounded p-2">
                                        <li className="px-2 my-2 hover:bg-slate-600">
                                            <NavLink to={this.props.user ? "/DeployHistory" : "/"} className={`text-lg font-sans font-medium`}>Deploy History</NavLink>
                                        </li>
                                    </ul>
                                </ButtonModal>
                            </li>
                        </ul>
                    </div>
                );
            }
            return (
                <div>
                    <ul className="list-none flex space-x-4 divide-x divide-slate-600">
                        {
                            this.props.user.userGroups ?
                            <li className="pl-2">
                                <ButtonModal width="w-48" isDisabled={false} buttonElement={<StandardLabel dark={true} label="Deployment"></StandardLabel>}>
                                    <ul className="text-slate-100 bg-slate-700 rounded p-2">
                                        <li className="px-2 my-2 hover:bg-slate-600" >
                                            <NavLink to="/DeployHistory" className={`text-lg font-sans font-medium`}>Deploy History</NavLink>
                                        </li>
                                        {
                                            this.props.user.appRole === window.appConfigs.Roles.ProjectOwner || this.props.user.appRole === window.appConfigs.Roles.Admin?
                                                <li className="px-2 my-2 hover:bg-slate-600">
                                                    <NavLink to="/CreateService" className={`text-lg font-sans font-medium`}>Create Service</NavLink>
                                                </li> : null
                                        }
                                        {
                                            this.props.user.userGroups && this.props.user.userGroups.filter(ug => ug.groupRoleCode === window.appConfigs.GroupRoles.GroupOwner).length > 0 ?
                                            <li className="px-2 my-2 hover:bg-slate-600">
                                                <NavLink to="/Create" className={`text-lg font-sans font-medium`}>Create Deploy</NavLink>
                                            </li> : null
                                        }
                                        {
                                            this.props.user.userGroups && this.props.user.userGroups.filter(ug => ug.groupRoleCode !== window.appConfigs.GroupRoles.GroupReader).length > 0 ?
                                            <li className="px-2 my-2 hover:bg-slate-600">
                                                <NavLink to="/Modify" className={`text-lg font-sans font-medium`}>Modify Deploy</NavLink>
                                            </li> : null
                                        }
                                    </ul>
                                </ButtonModal>
                            </li> : null
                        }
                        {
                            this.props.user.appRole === window.appConfigs.Roles.Admin || this.props.user.appRole === window.appConfigs.Roles.Owner ?
                                <li className="pl-2">
                                    <ButtonModal width="w-48" isDisabled={false} buttonElement={<StandardLabel dark={true} label="Users"></StandardLabel>}>
                                        <ul className="text-slate-100 bg-slate-700 rounded p-2">
                                            {
                                                this.props.user && this.props.user.appRole === window.appConfigs.Roles.Admin ?
                                                <li className="px-2 my-2 hover:bg-slate-600">
                                                    <NavLink to="/RequestedUsers" className={`text-lg font-sans font-medium h-full`}>Requested Users</NavLink>
                                                </li> : null 
                                            }
                                            {
                                                this.props.user && this.props.user.appRole === window.appConfigs.Roles.Admin ?
                                                <li className="px-2 my-2 hover:bg-slate-600">
                                                    <NavLink to="/CurrentUsers" className={`text-lg font-sans font-medium h-full`}>Current Users</NavLink>
                                                </li> : null
                                            }
                                            {
                                                this.props.user && (this.props.user.appRole === window.appConfigs.Roles.Admin 
                                                    || (this.props.user.appRole === window.appConfigs.Roles.Owner && this.props.user.userGroups 
                                                        && this.props.user.userGroups.length > 0)) ?
                                                <li className="px-2 my-2 hover:bg-slate-600">
                                                    <NavLink to="/ManageGroup" className={`text-lg font-sans font-medium h-full`}>Manage Group</NavLink>
                                                </li> : null
                                            }
                                        </ul>
                                    </ButtonModal>
                                </li> : null
                        }
                    </ul>
                </div>
            )
        }

        return(
            <div></div>
        )
    }
}