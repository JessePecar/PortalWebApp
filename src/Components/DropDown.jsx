import { Component } from 'react'
import '../App.css'

export class DropDown extends Component{
    constructor(props){
        super(props);
        this.state = {
            showDropDown: false
        }

        this.selectedItem = this.selectedItem.bind(this);
    }
    
    selectedItem = (item) => {
        if(this.state.showDropDown){
            this.props.selectedItemChanged(item);
            this.setState({showDropDown: false});
        }
    }

    render(){
        return(
            <div className="w-full">
                <button className={`w-1/2 bg-slate-100 px-4 flex space-x-4 rounded-t border border-gray-200 border-b border-b-gray-500`} onClick={() => this.setState({showDropDown: !this.state.showDropDown})}>{this.props.buttonText ? this.props.buttonText : "-----" }</button>
                <div className={`${this.state.showDropDown ? "dropdown-visible" : "dropdown-invisible"} rounded bg-slate-100 z-10 absolute`}>
                    <ul className="w-full pt-1 list-none border rounded p-4 divide-y divide-slate-200" aria-labelledby="dropDownInit">
                        <li className="w-full px-4 py-2">
                            <button id={`dropDown_default_`} className="text-slate-700 text-md uppercase" onClick={(mthd) => this.selectedItem("-----")}>
                                -----
                            </button>
                        </li>
                        {
                            this.props.items ? 
                            this.props.items.map((item, index) => {
                                return (
                                    <li className="w-full hover:bg-slate-300 px-4 py-2" key={index}>
                                        <button id={`dropDown_${item}_${index}`} className="text-slate-700 text-md uppercase" onClick={(mthd) => this.selectedItem(item)}>
                                            {item}
                                        </button>
                                    </li>
                                )
                            }) : null
                        }
                    </ul>
                </div> 
            </div>
        )
    }
}
