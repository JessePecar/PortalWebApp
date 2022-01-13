import { Component } from 'react'
import axios from 'axios'
import DisabledButton from '../Components/DisabledButton.jsx'
import ImageButton from '../Components/ImageButton.jsx'
import TextImageButton from '../Components/TextImageButton.jsx'
import StandardLabel from '../Components/StandardLabel.jsx'
import '../App.css'

import TrashIcon from '@heroicons/react/outline/TrashIcon'
import PlusIcon from '@heroicons/react/solid/PlusIcon'


export class CreateService extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            clonePath: '',
            relativeBuildPath: '',
        }
        this.submitNewDeployment = this.submitNewDeployment.bind(this);
    }
    
    submitNewDeployment = () => {

    }

    render(){
        return(
            <div className="w-full h-full">
                <div className="w-full flex justify-center pl shadow-lg">
                    <div className="pl-8 py-4 w-3/4 uppercase font-medium font-sans text-slate-700">
                        <h3 className="uppercase font-medium font-sans text-slate-700">Create Service</h3>
                    </div>
                </div>
                <div className="w-full flex justify-center p-8 h-1/4">
                    <div className="w-3/4 rounded border border-slate-700 shadow-lg h-full p-4">
                        <div className="p-8 space-x-8 flex">
                            <div className="">
                                <h3 className={`${this.state.name ? "input-label-visible" : "input-label-hidden"} cursor-default uppercase font-medium font-sans text-slate-700 h-8`}>Name</h3> 
                                <input className="bg-slate-200 text-slate-700 border border-slate-700 rounded-full px-4 focus:outline-none focus:bg-slate-100 appearance-none" 
                                value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} placeholder="Name" />
                            </div>
                            <div className="w-1/2">
                                <h3 className={`${this.state.clonePath ? "input-label-visible" : "input-label-hidden"} cursor-default uppercase font-medium font-sans text-slate-700 h-8`}>Github link</h3>
                                <input className=" w-full bg-slate-200 text-slate-700 border border-slate-700 rounded-full px-4 focus:outline-none focus:bg-slate-100 appearance-none" 
                                value={this.state.clonePath} onChange={(e) => this.setState({clonePath: e.target.value})} placeholder="Ex: https://github.com/UserName/ProjectName.git" />
                            </div>
                            <div className="">
                                <h3 className={`${this.state.relativeBuildPath ? "input-label-visible" : "input-label-hidden"} cursor-default uppercase font-medium font-sans text-slate-700 h-8`}>Build Path</h3> 
                                <input className="bg-slate-200 text-slate-700 border border-slate-700 rounded-full px-4 focus:outline-none focus:bg-slate-100 appearance-none" 
                                value={this.state.relativeBuildPath} onChange={(e) => this.setState({relativeBuildPath: e.target.value})} placeholder="./BuildFolder" />
                            </div>
                        </div>
                        <div className="w-full flex justify-end px-8">
                            <DisabledButton isDisabled={!(this.state.name && this.state.clonePath && this.state.relativeBuildPath)} 
                                onClick={this.submitNewDeployment} buttonText="Submit"></DisabledButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}