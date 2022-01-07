import {Component} from 'react'
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon'
import LoginIcon from '@heroicons/react/outline/LoginIcon'
import LogoutIcon from '@heroicons/react/outline/LogoutIcon'
import '../App.css'

export class Login extends Component{
    constructor(props){
        super(props);
        
        this.onSuccess = this.onSuccess.bind(this);
        this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
        this.setIsLoggedInState = this.setIsLoggedInState.bind(this);
        this.state = {
            isLoggedIn: (props.googleUser !== null),
            clientId: `${window.googleConfigs.clientId}.apps.googleusercontent.com`,
            showDropDown: false
        };
    }

    onSuccess(res){
        this.props.handleLogin(res, this.setIsLoggedInState);
    }

    setIsLoggedInState(){
        this.setState({isLoggedIn: (this.props.googleUser !== null)});
    }

    onLogoutSuccess(res){
        console.log(`Logged out successfully: ${res}`);
        this.props.handleLogout();
        this.setState({isLoggedIn: false});
        this.setState({showDropDown: false});
    }

    onFailure(res){
        console.log("Login failed!");
    }

    render(){
        return(
            <div className="flex">
                { this.props.googleUser !== null 
                    ? 
                    <div>
                        <button id="dropDownInit" data-dropdown-toggle="userDropdownToggle" onClick={() => this.setState({showDropDown: !this.state.showDropDown})} type="button">
                            <div className="px-4 flex space-x-4 rounded hover:bg-slate-600">
                                <div className="flex space-x-6 items-center h-12">
                                    {
                                        this.props.user ?  
                                            <img src={this.props.user.imageUrl} alt="N/A" className="h-10 w-10 rounded-full"/> :
                                            <div></div>
                                    }
                                    {
                                        this.props.user ?
                                            <h3 className="uppercase font-medium font-sans text-slate-200 underline">{this.props.user.usersName}</h3> : 
                                        <div></div>
                                    }
                                    <span className={this.state.showDropDown ? "dropdown-marker-active" : "dropdown-marker-inactive"}>
                                        <ChevronRightIcon className="h-4 w-4 text-slate-200"></ChevronRightIcon>
                                    </span>
                                </div>
                            </div>
                        </button>
                        <div className={`${this.state.showDropDown ? "dropdown-visible" : "dropdown-invisible"} mt-2 rounded bg-slate-200 divide-y divide-gray-100 shadow`}>
                            <div className="text-slate-700 py-3 px-4">
                            {
                                this.props.user ?  
                                    <span className="block uppercase font-medium">{this.props.user.appRole}</span> :
                                    <span></span>
                            }
                            {
                                this.props.user ?  
                                    <span className="border-b border-slate-300 mb-2 block uppercase font-medium">{this.props.user.email}</span> :
                                    <span></span>
                            }
                            {
                                this.props.user && this.props.user.userGroups ?
                                this.props.user.userGroups.map((group, index) => {
                                    return (<span key={index} className="block uppercase font-medium">{group.code} - {group.groupRoleCode}</span>)
                                })
                                : <span></span>
                            }
                            
                            </div>
                            <ul className="py-1 px-4" aria-labelledby="dropDownInit">
                                <li className="flex justify-end">
                                     <GoogleLogout
                                        clientId={this.state.clientId}
                                        buttonText="Logout"
                                        onLogoutSuccess={this.onLogoutSuccess}
                                        render={(renderProps) => 
                                            <button onClick={renderProps.onClick} disabled={renderProps.disabled}
                                             className="h-8 shadow-none bg-slate-200 text-slate-700 font-sans">
                                                <div className="flex">
                                                    <LogoutIcon className="h-6 w-6"></LogoutIcon>
                                                    <span>Logout</span>
                                                </div>
                                            </button>
                                        }
                                        ></GoogleLogout> 
                                </li>
                            </ul>
                        </div> 
                    </div>
                    : 
                    <div className="flex items-center">
                        <GoogleLogin
                            clientId={this.state.clientId}
                            buttonText="Login"
                            onSuccess={this.onSuccess}
                            onFailure={this.onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={false}
                            className="shadow-none"
                            render={(renderProps) => 
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled}
                                 className="h-8 bg-slate-700 text-slate-200 font-sans px-4">
                                    <div className="flex items-center space-x-2">
                                        <LoginIcon className="h-6 w-6"></LoginIcon>
                                        <span>Login</span>
                                    </div>
                                 </button>
                            }></GoogleLogin>
                    </div>
                }
            </div>
        )
    }
}