import { Component } from 'react'
import axios from 'axios'

export class DeployHistory extends Component{

    constructor(props){
        super(props);
        this.state = {
            deployHistory: []
        }
    }

    componentDidMount() {
        axios.get(`${window.axiosConfigs.apiUrls.utilityApi}/Portal/DeploymentHistory`)
            .then(response => this.setDeploymentHistory(response.data))
            .catch(error => console.log(error));
    }

    setDeploymentHistory = (history) => {
        this.setState({ deployHistory: history })
    }

    render(){
        return(
            <div className="w-full">
                <div className="w-full flex justify-center pl shadow-lg">
                    <div className="pl-8 py-4 w-3/4 uppercase font-medium font-sans text-slate-700">
                        <h3 className="uppercase font-medium font-sans text-slate-700">Deployment History</h3>
                    </div>
                </div>
                <div className="w-full flex justify-center p-8 ">
                    <ul className="w-3/4 list-none border border-slate-700 rounded">
                        <li className="bg-slate-700 py-2 mb-2">
                            <div className="w-full flex space-x-4 items-center divide-x">
                                <h3 className="w-1/4 pl-2 uppercase font-medium font-sans text-slate-200">Service</h3>
                                <h3 className="w-3/4 pl-4 uppercase font-medium font-sans text-slate-200">Deployment</h3>
                            </div>
                        </li>
                        {this.state.deployHistory.map((history, index) => {
                            return (
                                <li key={index} className="w-full py-2 border-slate-700 shadow-sm">
                                    <div className="w-full flex space-x-4 items-center">
                                        <h3 className="w-1/4 pl-2 uppercase font-medium font-sans text-slate-700">{history.deploymentName}</h3>
                                        <h3 className="w-3/4 pl-4 uppercase font-medium font-sans text-slate-700">{new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(history.deploymentTime))}</h3>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}