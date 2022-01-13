import { Component } from 'react'
import { DropDown } from './DropDown.jsx'
import StandardLabel from './StandardLabel.jsx'
import '../App.css'

export class DropDownList extends Component {
    constructor(props) {
        super(props);
    }

    selectedItem = (item) => {
        this.props.selectedItemChanged(item);
        this.setState({ showDropDown: false });
    }

    render() {
        return (
            <DropDown modal={
                <ul aria-labelledby="dropDownInit">
                    <li className="hover:bg-slate-600 px-2 cursor-pointer" onClick={() => this.selectedItem("-----")}>
                        <StandardLabel dark={true}>-----</StandardLabel>
                    </li>
                    {
                        this.props.items ?
                            this.props.items.map((item, index) => {
                                return (
                                    <li key={index} className="px-2 hover:bg-slate-600 cursor-pointer" onClick={() => this.selectedItem(item)}>
                                        <StandardLabel dark={true}>{item}</StandardLabel>
                                    </li>
                                )
                            }) : null
                    }
                </ul>
            }>
                {this.props.children ? this.props.children : "-----"}
            </DropDown>
               
                
        )
    }
}
