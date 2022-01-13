import { Component } from 'react'
import '../App.css'
import ChevronRightIcon from '@heroicons/react/solid/ChevronRightIcon'

export class DropDown extends Component{
    constructor(props){
        super(props);
        this.state = {
            showDropDown: false
        }
    }

    render(){
        return(
            <div className="w-full inline-block">
                <button className={`w-full bg-slate-100 px-4 inline-flex space-x-4 py-2 rounded-t border border-gray-200 border-b border-b-gray-500`}
                    onClick={() => this.setState({showDropDown: !this.state.showDropDown})}>
                    <div className="w-full flex justify-between items-center">
                        {this.props.children ? this.props.children : "-----" }
                        <ChevronRightIcon className={`${this.state.showDropDown ? "dropdown-marker-active" : "dropdown-marker-inactive"} text-slate-700 h-4 w-4`}></ChevronRightIcon>
                    </div>
                </button>
                <div className={`${this.state.showDropDown ? "dropdown-visible" : "dropdown-invisible"} absolute pt-1 list-none border border-slate-400 bg-slate-700 rounded py-2 divide-y divide-slate-200"`}
                    onClick={() => this.setState({ showDropDown: !this.state.showDropDown })}>
                    {this.props.modal ? this.props.modal : null }
                </div>
            </div>
        )
    }
}
