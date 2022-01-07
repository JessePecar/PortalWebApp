import { Component } from 'react'
import axios from 'axios'
import DisabledButton from '../Components/DisabledButton.jsx'
import ImageButton from '../Components/ImageButton.jsx'
import TextImageButton from '../Components/TextImageButton.jsx'
import StandardLabel from '../Components/StandardLabel.jsx'
import '../App.css'

import TrashIcon from '@heroicons/react/outline/TrashIcon'
import PlusIcon from '@heroicons/react/solid/PlusIcon'


export class CreateDeploy extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            clonePath: '',
            relativeBuildPath: '',
            showAddSteps: false,
            showDropDown: false,
            steps: [],
            availableSteps: []
        }

        this.getAvailableSteps = this.getAvailableSteps.bind(this);
        this.confirmDeployFields = this.confirmDeployFields.bind(this);
        this.toggleAddDropDown = this.toggleAddDropDown.bind(this);
        this.addStep = this.addStep.bind(this);
        this.removeStep = this.removeStep.bind(this);
        this.submitNewDeployment = this.submitNewDeployment.bind(this);
    }

    componentDidMount() {
        this.getAvailableSteps();
    }

    getAvailableSteps = () =>{
        axios.get(`${window.axiosConfigs.apiUrls.utilityApi}/Deploy/DeploymentSteps`)
        .then((response) => this.setState({availableSteps: response.data}))
        .catch((error) => console.log(error)); 
    }

    confirmDeployFields = () => {
        this.setState({showAddSteps: true})
    }

    toggleAddDropDown = () =>{
       this.setState({showDropDown: !this.state.showDropDown})
    }

    addStep = (availableId) => {
        var tempSteps = this.state.steps;
        tempSteps.push(this.state.availableSteps[availableId]);
        this.setState({steps: tempSteps});
        this.setState({showDropDown: false});
    }

    removeStep = (stepIndex) => {
        var tempSteps = this.state.steps;
        tempSteps.splice(stepIndex, 1);
        this.setState({steps: tempSteps});
    }

    submitNewDeployment = () => {
        var deployment = {
            IISName: this.state.name,
            name: this.state.name,
            folderPath: `{0}\\${this.state.name}`,
            clonePath: this.state.clonePath, 
            relativeBuildPath: this.state.relativeBuildPath,
            ownerGoogleId: this.props.ownerId,
            deploySteps: this.state.steps
        }

        axios.post(`${window.axiosConfigs.apiUrls.utilityApi}/Deploy/NewDeployment`)
        console.log(JSON.stringify(deployment));
    }

    render(){
        return(
            <div className="w-full h-full">
                <div className="w-full flex justify-center pl shadow-lg">
                    <div className="pl-8 py-4 w-3/4 uppercase font-medium font-sans text-slate-700">
                        <h3 className="uppercase font-medium font-sans text-slate-700">Create Deploy</h3>
                    </div>
                </div>
                <div className="w-full flex justify-center p-8 h-1/4">
                    <div className="w-3/4 rounded border border-slate-700 shadow-lg h-full">
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
                            {
                                this.state.showAddSteps ?
                                <DisabledButton isDisabled={!(this.state.name && this.state.clonePath && this.state.relativeBuildPath && this.state.steps.length > 0)} 
                                onClick={this.submitNewDeployment} buttonText="Submit"></DisabledButton> :
                                <DisabledButton isDisabled={!(this.state.name && this.state.clonePath && this.state.relativeBuildPath)} 
                                onClick={this.confirmDeployFields} buttonText="Confirm"></DisabledButton> 
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center px-12">
                    <div className="w-3/4">
                    {
                        this.state.showAddSteps ? 
                            <div className="w-full relative">
                                <TextImageButton id="addDropdownInit" data-dropdown-toggle="userDropdownToggle" onClick={this.toggleAddDropDown} buttonText="Add" color="green" image={<PlusIcon className="h-5 w-5 text-white"></PlusIcon>}></TextImageButton>
                                <div className={`${this.state.showDropDown ? "dropdown-visible" : "dropdown-invisible"} absolute mt-8 rounded w-3/4 bg-slate-200 divide-y divide-gray-100 shadow`}>
                                    <ul className="py-1 w-full divide-y divide-slate-300" aria-labelledby="dropDownInit">
                                        {
                                            this.state.availableSteps ?
                                            this.state.availableSteps.map((step, index) => {
                                                return (
                                                    <li key={index} onClick={() => this.addStep(index)} className="w-full cursor-pointer hover:bg-slate-300">
                                                        <div className="w-full py-1 px-4 flex items-center divide-x divide-slate-300">
                                                            <StandardLabel label={step.description} class="w-full"></StandardLabel>
                                                        </div>
                                                    </li>
                                                )
                                            }) : null
                                        }
                                    </ul>
                                </div> 
                            </div>: null
                        }
                    </div>
                </div>
                <div className="w-full flex justify-center p-8">
                    <div className="w-3/4 rounded border border-slate-700 shadow-lg h-full">
                        <ul className="w-full list-none border border-slate-700 rounded divide-y divide-slate-300">
                            <li className="px-8 py-1 bg-slate-700">
                                <div className="w-full flex space-x-4 items-center divide-x">
                                    <div className="w-20"></div>
                                    <StandardLabel label="Name" dark={true} class="w-1/5"></StandardLabel>
                                    <StandardLabel label="Description" dark={true} class="w-3/5"></StandardLabel>
                                </div>
                            </li>
                        {
                            this.state.steps && this.state.showAddSteps ?
                            this.state.steps.map((step, index) => {
                                return (
                                    <li key={index} className="px-8 py-1">
                                        <div className="w-full flex space-x-4 items-center divide-x divide-slate-300">
                                            <div className="w-20 flex justify-center">
                                                <ImageButton onClick={() => this.removeStep(index)} color="red" image={<TrashIcon className="h-4 w-4 text-white"></TrashIcon>}>
                                                </ImageButton>
                                            </div>
                                            <StandardLabel label={step.name} class="w-1/5"></StandardLabel>
                                            <StandardLabel label={step.description} class="w-3/5"></StandardLabel>
                                        </div>
                                    </li>
                                )
                            })
                            : null
                        }
                        </ul>
                    </div>
                </div>
                
            </div>
        )
    }
}