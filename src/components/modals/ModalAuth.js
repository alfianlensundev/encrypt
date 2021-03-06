import React, { Component } from 'react'
import { BiLockAlt } from 'react-icons/bi'
import Ripple from 'react-ripples'
import Popup from 'reactjs-popup'
import { doLogin, doValidateFile } from '../../services/ServiceAuth'
import TextInput from '../textinputs/TextInput'

export default class ModalAuth extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            password: '',
            invalidMessage: ''
        }
    }

    showModal = () => {
        this.setState({
            showModal: true
        })
    }

    hideModal = () => {
        this.setState({
            showModal: false,
            password: '',
            invalidMessage: ''
        })   
    }

    submitPassword = async () => {
        try {
            this.setState({
                invalidMessage: ''
            })
            if (this.state.password.length === 0){
                this.setState({
                    invalidMessage: 'Masukan password terlebih dahulu!'
                })   
                return false
            }
            const {extenddata = {}} = this.props
            
            const {data: {code, data, message}} = await doValidateFile({
                ...extenddata,
                password: this.state.password
            })
            
            if (code !== 200){
                this.setState({
                    invalidMessage: message
                })
                return false
            }
            
            this.props.onSuccess()
        } catch(err){
            
        }
    }

    render(){
        return(
            <Popup
                open={this.state.showModal}
                modal
                
            >
                <div className="w-full justify-center flex ">
                    <div className="w-3/5 flex flex-col bg-black bg-white rounded-lg">
                        {this.state.invalidMessage.length > 0 &&
                            <div className="w-full px-4 py-2 flex justify-center items-center bg-red-400 font-bold text-sm text-white">
                                {this.state.invalidMessage}
                            </div>
                        }
                        <div className="flex-1 px-4 py-4 ">
                            <div className="w-full">
                                Password Validation
                            </div>
                            <div className="w-full mt-2 text-xs font-light">
                                Masukan password anda
                            </div>
                            <div className="w-full py-2 mt-6">
                                <TextInput 
                                    icon={<BiLockAlt size={16}/>}
                                    secureText
                                    placeholder={'Password'}
                                    onEnter={this.submitPassword}
                                    onChange={(e) => {
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }}
                                    value={this.state.password}
                                />
                            </div>
                            <div className="w-full flex pt-4">
                                <Ripple
                                    onClick={() => this.setState({
                                        showModal: false
                                    }, () => this.props.onFailed())}
                                    className="cursor-pointer h-10 flex-1 rounded-lg mr-2 flex justify-center items-center text-red-500 font-bold text-sm"
                                >
                                    Cancel
                                </Ripple>
                                <Ripple
                                    onClick={this.submitPassword}
                                    className="cursor-pointer h-10 flex-1 bg-blue-500 rounded-lg ml-2 flex justify-center items-center text-white font-bold text-sm"
                                >
                                    Submit
                                </Ripple>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
            
        )
    }
}