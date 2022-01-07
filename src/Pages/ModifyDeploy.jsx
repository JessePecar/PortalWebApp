import { Component } from 'react'
import axios from 'axios'
import '../App.css'

export class ModifyDeploy extends Component{

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
    }

    componentDidMount() {
        this.getAvailableSteps();
    }

    getAvailableSteps = () =>{
        axios.get(`${window.axiosConfigs.apiUrls.utilityApi}/Deploy/DeploymentSteps`)
        .then((response) => this.setState({availableSteps: response.data}))
        .catch((error) => console.log(error)); 
    }



    render(){
        return(
            <div className="w-full h-full">
                <div className="w-full flex justify-center pl shadow-lg">
                    <div className="pl-8 py-4 w-3/4 uppercase font-medium font-sans text-slate-700">
                        <h3 className="uppercase font-medium font-sans text-slate-700">Modify Deploy</h3>
                    </div>
                </div>
                
            </div>
        )
    }
}