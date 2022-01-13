import { Component } from 'react'
import StandardLabel from '../Components/StandardLabel.jsx'

export default class Landing extends Component{

    render(){
        return(
            <div className="w-full h-full justify-center mt-16">
                <div className="w-full flex justify-center pl shadow-lg">
                    <div className="pl-8 py-4 w-3/4 uppercase font-medium font-sans text-slate-700">
                        <h3 className="uppercase font-medium font-sans text-slate-700">Welcome</h3>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-3/4 text-center mt-16">
                        <StandardLabel>Welcome to the PecTech Portal<br/>Deployments, organizations and services at your fingertips</StandardLabel>
                        <div className="mt-8">
                            <StandardLabel>Some rules to follow when using the portal:</StandardLabel>
                            <ul className="">
                                <li>
                                    <StandardLabel>1.) Be rootin</StandardLabel>
                                </li>
                                <li>
                                    <StandardLabel>2.) Be tootin</StandardLabel>
                                </li>
                                <li>
                                    <StandardLabel>3.) by god be shootin</StandardLabel>
                                </li>
                                <li>
                                    <StandardLabel>4.) but most of all, be kind</StandardLabel>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}