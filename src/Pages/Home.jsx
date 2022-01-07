import react from 'react'
import {Login} from '../Components/Login.jsx'
import axios from 'axios'
import RoleBasedNavigation from '../Components/RoleBasedNavigation.jsx'
import { RequestedUsers } from './RequestedUsers.jsx'
import { CreateDeploy } from './CreateDeploy.jsx'
import { ModifyDeploy } from './ModifyDeploy.jsx'
import { CurrentUsers } from './CurrentUsers.jsx'
import { DeployHistory } from './DeployHistory.jsx'
import { RequestAccessModal } from '../Components/RequestAccessModal.jsx'
import StandardLabel from '../Components/StandardLabel.jsx'
import { Routes, Route } from "react-router-dom";
import Cookies from 'universal-cookie'

export class Home extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            user: null,
            googleUser: null,
            showRequestAccessModal: false,
            requestingUser: null
        };
        this.cookies = new Cookies();

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleBadSignin = this.handleBadSignin.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleRequestAccess = this.handleRequestAccess.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addTokenToCache = this.addTokenToCache.bind(this);
    }

    componentDidMount() {
        axios.post(`${window.axiosConfigs.apiUrls.utilityApi}/Portal/VerifyToken`, this.cookies.get('googleUser'))
            .then((response) => { this.handleTokenSigning(response)} )
            .catch((error) => { console.log("Returned on mount from server with failure! :(")} );
    }

    handleLogin = (gu, setLoggedInState) => {
        axios.post(`${window.axiosConfigs.apiUrls.utilityApi}/Portal/VerifyToken`, { token: gu.tokenId } )
            .then((response) => this.handleSuccess(response, gu, setLoggedInState))
            .catch((error) => this.handleBadSignin(error, setLoggedInState));
    }

    handleSuccess(u, gu, change){
        if(u.status === 202){
            //Show request access modal
            this.setState({showRequestAccessModal: true})
            this.setState({ requestingUser: gu.profileObj})
        } else if(u.status === 200){
            this.setState({user: u.data});
            this.setState({googleUser: { token: gu.tokenId }});
            this.addTokenToCache();
        }

        console.log(u);
        if(change !== undefined && change !== null){
            change();
        }
    }

    handleTokenSigning(u){
        if (u.status === 200) {
            this.setState({ user: u.data });
            this.setState({ googleUser: this.cookies.get('googleUser')});
        }
    }

    addTokenToCache(){
        this.cookies.set('googleUser', this.state.googleUser);
    }

    handleBadSignin(error, change){
        this.setState({googleUser: null});
        change();
    }

    handleLogout = () =>{
        this.setState({googleUser: null});
        this.setState({user: null});
    }

    handleRequestAccess = () => {
        axios.post(`${window.axiosConfigs.apiUrls.utilityApi}/Portal/RequestAccess`, this.state.requestingUser)
            .then((response) => this.closeModal())
            .catch((error) => console.log("Error requesting access"));
    }

    closeModal = () => {
        this.setState({showRequestAccessModal: false});
    }

    render(){
        return (
            <div className="w-full h-screen overflow-y-hidden">
                <div className="w-full flex bg-slate-700  drop-shadow-2xl">
                    <div className="w-full flex justify-start px-8 items-center space-x-8">
                        <h1 className="text-lg font-sans text-slate-200 font-medium">Portal Service</h1>
                        <RoleBasedNavigation user={this.state.user}></RoleBasedNavigation>
                    </div>
                    <div className="w-full flex justify-end  pt-2 p-4 h-16">
                        <Login googleUser={this.state.googleUser} user={this.state.user} handleLogin={this.handleLogin} handleLogout={this.handleLogout}></Login>
                    </div>        
                </div>
                <RequestAccessModal showModal={this.state.showRequestAccessModal} requestAccess={this.handleRequestAccess} closeModal={this.closeModal}></RequestAccessModal>

                <Routes>
                    <Route path="/"></Route>

                    <Route path="*" element={
                        <div className="w-full h-full flex items-center justify-center">
                            <StandardLabel label="Oops! You have stumbled into the wrong den, and you should turn around now!"></StandardLabel>
                        </div>}>
                    </Route>
                    {this.state.user ? <Route path="/DeployHistory" element={<DeployHistory></DeployHistory>}></Route> : null }
                    {this.state.user && this.state.user.appRole !== window.appConfigs.Roles.ReadonlyUser ? <Route path="/Create" element={<CreateDeploy ownerId={this.state.user.googleId}></CreateDeploy>}></Route> : null }
                    {this.state.user && this.state.user.appRole !== window.appConfigs.Roles.ReadonlyUser ? <Route path="/Modify" element={<ModifyDeploy ownerId={this.state.user.googleId}></ModifyDeploy>}></Route> : null }
                    {this.state.user && this.state.user.appRole === window.appConfigs.Roles.Admin ? <Route path="/RequestedUsers" element={<RequestedUsers></RequestedUsers>}></Route> : null }
                    {this.state.user && this.state.user.appRole === window.appConfigs.Roles.Admin ? <Route path="/CurrentUsers" element={<CurrentUsers></CurrentUsers>}></Route> : null}
                    {this.state.user && this.state.user.appRole !== window.appConfigs.Roles.ReadonlyUser && this.state.user.appRole !== window.appConfigs.Roles.Developer 
                        ? <Route path="/ManageUsers" element={<CurrentUsers></CurrentUsers>}></Route> : null }
                </Routes>
            </div>
        )
    }
}