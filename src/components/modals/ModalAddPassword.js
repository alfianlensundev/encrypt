import React, { Component } from 'react'
import { BiLockAlt } from 'react-icons/bi'
import Ripple from 'react-ripples'
import Popup from 'reactjs-popup'
import { doLogin } from '../../services/ServiceAuth'
import TextInput from '../textinputs/TextInput'
import PasswordStrengthBar from 'react-password-strength-bar';
 

export default class ModalAddPassword extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            password: '',
            passwordScore: 0,
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
                    invalidMessage: 'Enter your password'
                })
                return false
            }

            if (this.state.passwordScore < 3){
                this.setState({
                    invalidMessage: 'Your password is too weak, please update your password'
                })
                return false
            }
            
            this.props.onSubmit(this.state.password)
        } catch(err){
            // console.log(err)
        }
    }

    render(){
        return(
            <Popup
                onClose={() => this.setState({
                    showModal: false
                }, () => {
                    this.props.onCancel()
                })}
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
                                Password
                            </div>
                            <div className="w-full mt-2 text-xs font-light">
                                Enter a password to encrypt this file
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
                                {this.state.password.length > 0 &&
                                    <PasswordStrengthBar 
                                        onChangeScore={(score) => {
                                            this.setState({
                                                passwordScore: score
                                            })
                                        }}
                                        password={this.state.password} />
                                }
                            </div>
                            <div className="w-full flex pt-4">
                                <Ripple
                                    onClick={() => this.setState({
                                        showModal: false
                                    }, () => {
                                        this.props.onCancel()
                                    })}
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