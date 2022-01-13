import { Component } from 'react'

export class RequestAccessModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            isButtonDisabled: false
        }
        this.handleRequestAccess = this.handleRequestAccess.bind(this);
    }

    handleRequestAccess = () =>{
        this.setState({isButtonDisabled: true});
        this.props.requestAccess();
        this.setState({isButtonDisabled: false});
    }
    render(){
        return(
            <div>
                {
                    this.props.showModal && 
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-700 opacity-50">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-100 outline-none focus:outline-none px-4">
                                    <div className="flex items-center justify-between p-5 rounded-t border-b border-solid border-slate-900">
                                        <h3 className="text-2xl font-semibold text-slate-800">
                                            Request Access?
                                        </h3>
                                    </div>
                                    <div className="flex items-start p-4">
                                        <h3 className="text-lg">Would you like to request access to the portal?</h3>
                                    </div>

                                    <div className="flex items-end justify-end p-4 space-x-4">
                                        <a className="hover:underline" onClick={this.props.closeModal}>Cancel</a>
                                        <button className="bg-slate-800 text-slate-200 rounded px-2 font-bold py-1" disabled={this.state.isButtonDisabled} onClick={this.props.requestAccess}>Request Access</button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                }
            </div>  
        )
    }
}