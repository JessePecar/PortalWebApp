import { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import DisabledButton from '../Components/DisabledButton.jsx'
import ButtonModal from '../Components/ButtonModal.jsx'
import ImageButton from '../Components/ImageButton.jsx'
import TextImageButton from '../Components/TextImageButton.jsx'
import StandardLabel from '../Components/StandardLabel.jsx'
import TrashIcon from '@heroicons/react/outline/TrashIcon'
import PlusIcon from '@heroicons/react/solid/PlusIcon'

import '../App.css'
import { DropDown } from '../Components/DropDown';

export class Deployments extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            clonePath: '',
            relativeBuildPath: '',
            showAddSteps: false,
            showDropDown: false,
            canSubmit: false,
            steps: [],
            originalSteps: [],
            availableSteps: [],
            availableServices: [],
            selectedService: ""
        }

        this.getAvailableSteps = this.getAvailableSteps.bind(this);
        this.getAvailableServices = this.getAvailableServices.bind(this);
        this.setSelectedServiceSteps = this.setSelectedServiceSteps.bind(this);
        this.toggleAddDropDown = this.toggleAddDropDown.bind(this);
        this.addStep = this.addStep.bind(this);
        this.removeStep = this.removeStep.bind(this);
        this.verifyStepsChanged = this.verifyStepsChanged.bind(this);
        this.haveStepsChange = this.haveStepsChange.bind(this);
    }

    componentDidMount() {
        this.getAvailableSteps();
        this.getAvailableServices();
        this.verifyStepsChanged();
    }

    getAvailableSteps = () => {
        axios.get(`${window.axiosConfigs.apiUrls.utilityApi}/Deploy/DeploymentSteps`)
        .then((response) => this.setState({availableSteps: response.data}))
        .catch((error) => console.log(error)); 
    }

    getAvailableServices = () => {
        var projects = [];
        if(this.props.user.userGroups){
            var userGroups = this.props.user.userGroups.filter(ug => ug.groupRoleCode !== window.appConfigs.GroupRoles.GroupReader);
            if(userGroups){
                userGroups.map((ug) => {
                    if(ug.groupProjects){
                        ug.groupProjects.map(proj => projects.push(proj));
                    }
                })
            }
        }
        this.setState({ availableServices: projects});
    }

    setSelectedService = (service) => {
        this.setState({selectedService: service})
        axios.get(`${window.axiosConfigs.apiUrls.utilityApi}/Deploy/DeployInformation?deployment=${service.projectName}`)
            .then(response => this.setSelectedServiceSteps(response.data))
    }

    setSelectedServiceSteps = (serviceSteps) => {
        this.setState({ steps: [...serviceSteps ] });
        this.setState({ originalSteps: [...serviceSteps] });

        this.verifyStepsChanged();
    }

    toggleAddDropDown = () => {
        this.setState({ showDropDown: !this.state.showDropDown});
    }

    addStep = (availableId) => {
        var tempSteps = this.state.steps;
        tempSteps.push(this.state.availableSteps[availableId]);
        this.setState({ steps: tempSteps });
        this.setState({ showDropDown: false });

        this.verifyStepsChanged();
    }

    removeStep = (stepIndex) => {
        var tempSteps = this.state.steps;
        tempSteps.splice(stepIndex, 1);
        this.setState({ steps: tempSteps });

        this.verifyStepsChanged();
    }

    submitNewDeployment = () => {
        var deployment = {
            deploymentId: this.state.selectedService.deploymentId,
            deploySteps: [...this.state.steps]
        }

        axios.post(`${window.axiosConfigs.apiUrls.utilityApi}/Deploy/Deployment`, deployment)
            .then(response => this.setSelectedService(this.state.selectedService))
            .catch(error => window.location.href = "")

    }

    verifyStepsChanged(){
        
        this.setState({ canSubmit: this.haveStepsChange()});
    }

    haveStepsChange(){
        if (this.state.steps === this.state.originalSteps) return false;
        if (this.state.steps == null || this.state.originalSteps == null) return true;
        if (this.state.steps.length !== this.state.originalSteps.length) return true;

        for (var i = 0; i < this.state.steps.length; ++i) {
            if (this.state.steps[i] !== this.state.originalSteps[i]) return true;
        }
        return false;
    }

    render(){
        return(
            <div className="w-full h-full">
                <div className="w-full flex justify-center pl shadow-lg">
                    <div className="pl-8 w-3/4 flex uppercase items-center justify-between font-medium font-sans text-slate-700">
                        <h3 className="uppercase font-medium font-sans text-slate-700">Deployments</h3>
                        <div className="py-3 flex space-x-2 items-center">
                            <DropDown modal={
                                <ul className="text-slate-100 bg-slate-700 rounded py-2">
                                    {
                                        this.state.availableServices ?
                                            this.state.availableServices.map((serv, index) => {
                                                return (
                                                    <li key={index} className="px-2 my-2 hover:bg-slate-600 cursor-pointer" onClick={() => this.setSelectedService(serv)}>
                                                        <StandardLabel label={serv.projectName} dark={true}></StandardLabel>
                                                    </li>
                                                )
                                            }) : null
                                    }
                                </ul>
                            }>
                                <StandardLabel>{this.state.selectedService ? this.state.selectedService.projectName : "Select Service"}</StandardLabel>
                            </DropDown>
                            
                            <DisabledButton isDisabled={!this.state.canSubmit} onClick={this.submitNewDeployment}><StandardLabel label="Submit" dark={this.state.canSubmit}></StandardLabel></DisabledButton>
                        </div>
                    </div>
                    
                </div>
                <div className="w-full flex justify-center p-12">
                    <div className="w-3/4">
                        {
                            //TODO: Create this functionality in the drop down
                            this.state.selectedService ?
                                <div className="w-full">
                                    <TextImageButton id="addDropdownInit" data-dropdown-toggle="userDropdownToggle" onClick={this.toggleAddDropDown} buttonText="Add" image={<PlusIcon className="h-5 w-5 text-white"></PlusIcon>}></TextImageButton>
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
                                </div> : null
                        }
                    </div>
                </div>
                {
                    this.state.selectedService ?
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
                                    this.state.steps ?
                                        this.state.steps.map((step, index) => {
                                            return (
                                                <li key={index} className="px-8 py-1">
                                                    <div className="w-full flex space-x-4 items-center divide-x divide-slate-300">
                                                        <div className="w-20 flex justify-center">
                                                            <ImageButton onClick={() => this.removeStep(index)} image={<TrashIcon className="h-4 w-4 text-white"></TrashIcon>}>
                                                            </ImageButton>
                                                        </div>
                                                        <StandardLabel label={step.name} class="w-1/5"></StandardLabel>
                                                        <StandardLabel label={step.description} class="w-3/5"></StandardLabel>
                                                    </div>
                                                </li>
                                            )
                                        })
                                        :
                                        <div className="flex justify-center py-4">
                                            <StandardLabel label="No steps found"></StandardLabel>
                                        </div> 
                                }
                            </ul>
                        </div>
                    </div> : null
                }
            </div>
        )
    }
}

Deployments.propTypes = {
    user: PropTypes.object
}