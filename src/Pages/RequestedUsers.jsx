import { Component } from 'react'
import axios from 'axios'
import { RoleSelect } from '../Components/RoleSelect.jsx'
import StandardLabel from '../Components/StandardLabel.jsx'
import DisabledButton from '../Components/DisabledButton.jsx'


export class RequestedUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            requestedUsers: null
        }

        this.setRequestedUsers = this.setRequestedUsers.bind(this);
        this.setUsersRole = this.setUsersRole.bind(this);
        this.acceptUser = this.acceptUser.bind(this);
        this.denyUser = this.denyUser.bind(this);
        this.removeUserFromList = this.removeUserFromList.bind(this);
    }

    componentDidMount(){
        axios.get(`${window.axiosConfigs.apiUrls.utilityApi}/Portal/RequestedUsers`)
            .then(response => this.setRequestedUsers(response.data))
            .catch(error => console.log(error));
    }

    setRequestedUsers = (users) => {
        this.setState({requestedUsers: users})
    }

    setUsersRole = (user, role) => {
        var users = this.state.requestedUsers;
        var userIndex = users.findIndex(u => u.id === user.id);
        users[userIndex].roleCode = role;
        this.setState({requestedUsers: users});
    }

    acceptUser = (user) => {
        axios.get(`${window.axiosConfigs.apiUrls.utilityApi}/Portal/AcceptRequest?googleId=${user.googleId}&roleCode=${user.roleCode}`)
            .then(response => this.removeUserFromList(user))
            .catch(error => console.log(error));
    }

    denyUser = (user) => {
        axios.get(`${window.axiosConfigs.apiUrls.utilityApi}/Portal/DenyRequest?googleId=${user.googleId}`)
            .then(response => this.removeUserFromList(user))
            .catch(error => console.log(error));
    }

    removeUserFromList = (user) => {
        var users = this.state.requestedUsers;
        var userIndex = users.findIndex(u => u.id === user.id);
        users.splice(userIndex, 1);
        this.setState({ requestedUsers: users });
    }

    render(){
        
        return(
            <div className="w-full h-full">
                <div className="w-full flex justify-center pl shadow-lg">
                    <div className="pl-8 py-4 w-3/4 uppercase font-medium font-sans text-slate-700">
                        <h3 className="uppercase font-medium font-sans text-slate-700">Requesting Users</h3>
                    </div>
                </div>
                {
                    !this.state.requestedUsers ?
                    <div className="w-full pt-8 justify-center"><StandardLabel dark={true} label="Loading..."></StandardLabel></div>
                    : <div className="w-full p-8 flex justify-center py-8">
                        <ul className="w-3/4 list-none border border-slate-700 rounded">
                            <li className="bg-slate-700 py-2 mb-2">
                                <div className="w-full flex space-x-4 items-center divide-x">
                                    <div className="w-20"></div>
                                    <StandardLabel class="w-1/6" dark={true} label="Name"></StandardLabel>
                                    <StandardLabel class="w-1/4" dark={true} label="Email"></StandardLabel>
                                    <StandardLabel class="w-1/6" dark={true} label="Role"></StandardLabel>
                                    <StandardLabel class="w-1/4" dark={true} label="Accept"></StandardLabel>
                                </div>
                            </li>
                        {
                            this.state.requestedUsers && this.state.requestedUsers.length > 0
                            ? this.state.requestedUsers.map((user, index) => {
                                return(
                                    <li key={index} className="w-full py-2 border-slate-700 shadow-sm">
                                        <div className="w-full flex space-x-4 items-center">
                                            <span className="flex justify-center w-20">
                                                <img src={user.imageUrl} alt="N/A" className="h-10 w-10 rounded-full uppercase"/>
                                            </span>
                                            <StandardLabel class="w-1/6" label={user.usersName}></StandardLabel>
                                            <StandardLabel class="w-1/4" label={user.email}></StandardLabel>
                                            <div className="w-1/6 pl-2">
                                                <RoleSelect user={user} setState={this.setUsersRole}></RoleSelect>
                                            </div>
                                            <div className="w-1/4 px-2 space-x-4">
                                                <DisabledButton isDisabled={user.roleCode === "-----" || user.roleCode === null} 
                                                onClick={() => this.acceptUser(user)} buttonText="Accept"></DisabledButton>
                                                <DisabledButton isDisabled={false} onClick={() => this.denyUser(user)} buttonText="Deny"></DisabledButton>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }) : 
                            <li className="w-full flex justify-center py-2 border-slate-700 shadow-sm">
                                <h3 className="bg-slate-100 rounded-full shadow px-4 uppercase font-medium font-sans text-slate-700">No Requested Users</h3>
                            </li>
                        }

                        </ul>
                    </div>
                }
            </div>
        )
    }
}