import React, { Component } from 'react'
import Popup from 'reactjs-popup';
import Ripple from 'react-ripples'
export default class ModalConfirm extends Component{
    constructor(props){
        super(props)
        this.state= {
            showModal: false,
            modalMessage: ''
        }
    }

    showModal = (modalMessage = '') => {
        this.setState({
            showModal: true,
            modalMessage
        })
    }

    hideModal = () => {
        this.setState({
            showModal: false
        })
    }

    render(){
        return (
            <Popup
                open={this.state.showModal}
                modal
                
            >
                <div className="w-full justify-center flex ">
                    <div className="w-3/5 px-4 py-4 bg-black bg-white rounded-lg">
                        <div className="w-full">
                            Confirm !
                        </div>
                        <div className="w-full mt-4 text-sm font-light">
                            {this.state.modalMessage}
                        </div>
                        <div className="w-full flex pt-4">
                            <Ripple
                                onClick={() => this.setState({
                                    showModal: false
                                })}
                                className="cursor-pointer h-10 flex-1 rounded-lg mr-2 flex justify-center items-center text-red-500 font-bold text-sm"
                            >
                                No
                            </Ripple>
                            <Ripple
                                onClick={() => {
                                    this.setState({
                                        showModal: false
                                    })
                                    this.props.onConfirm()
                                }}
                                className="cursor-pointer h-10 flex-1 bg-blue-500 rounded-lg ml-2 flex justify-center items-center text-white font-bold text-sm"
                            >
                                Yes
                            </Ripple>
                        </div>
                    </div>
                </div>
            </Popup>
            
        )
    }
}