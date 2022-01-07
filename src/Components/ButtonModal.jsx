import { Component } from 'react'
import '../App.css'
import PropTypes from 'prop-types'
import DisabledButton from './DisabledButton.jsx'
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon'

export default class DropDown extends Component{
    constructor(props){
        super(props);
        this.state = {
            showDropDown: false
        }

        this.selectedItem = this.selectedItem.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    selectedItem = (item) => {
        if(this.state.showDropDown){
            this.props.selectedItemChanged(item);
            this.setState({showDropDown: false});
        }
    }

    toggleModal = () => {
        this.setState({ showDropDown: !this.state.showDropDown })
    }

    render(){
        return(
            <div className="w-full">
                <DisabledButton
                    isDisabled={this.props.isDisabled} 
                    class={`${this.props.width} relative`} 
                    onClick={this.toggleModal}
                    noBorder={true}
                    >
                    <div className="flex space-x-1 items-center ">
                        {this.props.buttonElement}
                        <span className={`${this.state.showDropDown ? "dropdown-marker-active" : "dropdown-marker-inactive"} float-right`}>
                            <ChevronRightIcon className="h-4 w-4"></ChevronRightIcon>
                        </span>
                    </div>
                </DisabledButton>
                <div onClick={this.toggleModal} className={`${this.state.showDropDown ? "dropdown-visible" : "dropdown-invisible"} ${this.props.width} rounded z-10 mt-4 absolute`}>
                   {this.props.children}
                </div> 
            </div>
        )
    }
}

DisabledButton.propTypes = {
    isDisabled: PropTypes.bool,
    buttonElement: PropTypes.element,
    children: PropTypes.element,
    width: PropTypes.string
}
