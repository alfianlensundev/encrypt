import React, { Component } from 'react'
import LeftNavigation from './LeftNavigation'
import SearchInput from '../textinputs/SearchInput'
import {IoIosPerson} from 'react-icons/io'
import {MdClose, MdWidgets} from 'react-icons/md'
import Ripple from 'react-ripples'
import Popup from 'reactjs-popup';
import { BiLogOutCircle } from 'react-icons/bi'
import { HiUserCircle } from 'react-icons/hi'

export default class Layout extends Component{
    constructor(props){
        super(props)
        this.state = {
            toastType: 'default',
            showToast: false,
            toastMessage: ''
        }
    }

    toastType = () => {
        switch (this.state.toastType) {
            case 'success':
                return 'bg-green-500 text-white'
                break;
            case 'danger':
                return 'bg-red-500 text-white'
                break;
        
            default:
                return 'bg-teal-200'
                break;
        }
    }

    showToast = (toastType = 'default' ,toastMessage = '',timeout = 10000) => {
        clearTimeout(this.timeout)
        this.setState({
            toastMessage,
            toastType,
            showToast: true
        })

        this.timeout = setTimeout(() => {
            this.setState({
                showToast: false
            })
        }, timeout);
    }
    render(){
        return (
            <div className="w-screen h-screen bg-white flex">
                <LeftNavigation 
                    activePage={this.props.activePage}
                    onChangeActivePage={(page) => {
                        switch (page) {
                            case 0:
                                this.props.history.push('/')
                                break;
                            case 1:
                                this.props.history.push('/enkripsi')
                                break;
                            case 2:
                                this.props.history.push('/dekripsi')
                                break;
                            case 3:
                                this.props.history.push('/master/users')
                                break;
                            case 4:
                                this.props.history.push('/files')
                                break;
                        
                            default:
                                break;
                        }
                    }}
                />
                <div className="flex-1 flex flex-col">
                    <div className="w-full px-2 py-2 flex justify-end items-center shadow-cs-header">
                        <div className="flex-1 flex xl:hidden lg:hidden md:flex sm:flex">
                            <Ripple
                                color={'rgba(255,255,255,.4)'}
                                className="w-10 h-10 rounded-full text-gray-800 flex items-center justify-center"
                            >
                                <MdWidgets size={20}/>
                            </Ripple>
                        </div>
                        <div className="w-1/4 hidden xl:flex lg:flex md:hidden sm:hidden justify-end">
                            <Ripple 
                                onClick={() => {
                                    alert()
                                }}
                                className="button h-10 w-10 focus:outline-none cursor-pointer transition rounded-full flex items-center justify-center text-blue-800">
                                <HiUserCircle size={25}/>
                            </Ripple>
                        </div>
                        <div className="w-1/4 flex xl:hidden lg:hidden md:flex sm:flex justify-end">

                            <Popup
                                ref={refPerson => this.refPerson = refPerson}
                                trigger={
                                    <button type="button" className="button h-10 w-10 focus:outline-none cursor-pointer transition rounded-full flex items-center justify-center text-blue-800">
                                        <HiUserCircle size={25}/>
                                    </button>
                                }
                                position="bottom right"
                                closeOnDocumentClick
                            >
                                <div
                                    className="bg-white w-full"
                                >
                                    <Ripple 
                                        color={'rgba(0,0,0,.1)'}
                                        onClick={() => {
                                            localStorage.clear()
                                            window.location = '/'
                                        }}
                                        className="flex w-full h-12 items-center px-2 cursor-pointer hover:bg-blue-200 overflow-hidden transition rounded-lg">
                                        <div className="flex-1 flex items-center font-medium text-sm text-blue-700">
                                            Keluar 
                                        </div>
                                        <div className="w-10 h-full flex items-center text-blue-600">
                                            <BiLogOutCircle size={20}/>
                                        </div>
                                    </Ripple>
                                </div>
                            </Popup>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-scroll overflow-x-hidden pt-4">
                        {this.props.children}
                    </div>
                </div>
                {this.state.showToast && 
                    <div className={`px-4 h-12 mx-2 my-2  font-light text-sm shadow-lg rounded-lg flex items-center absolute left-0 bottom-0 ${this.toastType()}`} style={{
                        width: 'fit-content'
                    }}>
                        {this.state.toastMessage}
                        <Ripple     
                            onClick={() => {
                                clearTimeout(this.timeout)
                                this.setState({
                                    showToast: false
                                })
                            }}
                            className="cursor-pointer z-20 w-10 h-10 flex items-center justify-center">
                            <MdClose size={20}/>
                        </Ripple>
                    </div>
                }
            </div>
        )
    }
}