import { Component } from 'react'
import StandardLabel from '../Components/StandardLabel.jsx'
import { NavLink } from "react-router-dom";

export default class ErrorPage extends Component{

    render(){
        return(
            <div className="w-full h-full justify-center mt-16">
                <div className="w-full flex justify-center pl shadow-lg">
                    <div className="pl-8 py-4 w-3/4 uppercase font-medium font-sans text-slate-700">
                        <StandardLabel>Oops!</StandardLabel>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center mt-32">
                    <div className="text-center">
                        <StandardLabel>Oops! You have stumbled into the wrong den! <br/>You should turn around now!</StandardLabel>
                        <div className="w-full flex justify-center">
                            <NavLink to="/" className="bg-slate-700 text-slate-200 rounded-full px-4 py-2 mt-8 uppercase text-md font-bold">Return to safety</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}