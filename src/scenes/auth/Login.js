import React, { Component } from 'react'
import TextInput from '../../components/textinputs/TextInput'
import {HiOutlineUser} from 'react-icons/hi'
import {BiLockAlt} from 'react-icons/bi'
import {ImUserCheck} from 'react-icons/im'
import Ripple from 'react-ripples'

import moment from 'moment'
import ParticlesBackground from '../../components/background/ParticlesBackground'
import { validateEmail } from '../../helpers/GeneralHelpers'
import { AiOutlineMail } from 'react-icons/ai'
import { doLogin } from '../../services/ServiceAuth'
import Loader from 'react-loader-spinner'
import ReactTooltip from 'react-tooltip'

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            params: this.props.history.location.state,
            date: new Date(),
            email: this.props.history.location.state !== undefined ? this.props.history.location.state.email : '',
            password: '',
            emailIsValid: false,
            passMessage: '',
            emailMessage: '',
            submitted: false,
            loader: false
        }
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            this.setState({
                date: new Date()
            })
        }, 1000);
    }

    resetTooltip = () => {
        ReactTooltip.hide()
    }

    submitLogin = async () => {
        try {
            this.setState({
                loader: true
            })
            this.resetTooltip()
            const {data: {code, data, message}} = await doLogin({
                email: this.state.email,
                password: this.state.password
            })

            if (code === 201) throw {
                message,
                type: 'email'
            }
            if (code === 202) throw {
                message,
                type: 'email'
            }
            if (code === 203) throw {
                message,
                type: 'pass'
            }
            if (code === 204) throw {
                message,
                type: 'email'
            }

            if (code === 205) throw {
                message,
                type: 'pass'
            }
            localStorage.setItem('user_data', JSON.stringify(data))
            window.location = '/'
            this.setState({
                loader: false
            })
        } catch({type = null, message = null}){
            if (type === 'email') this.setState({emailMessage: message}, () => ReactTooltip.show(this.emailTooltip))
            if (type === 'pass') this.setState({passMessage: message}, () => ReactTooltip.show(this.passTooltip))
            this.setState({
                loader: false
            })
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }


    render(){
        return (
            <div className="w-screen h-screen bg-grd-blue flex justify-center items-center px-2 overflow-hidden relative">
                {/* <ParticlesBackground /> */}
                <div className="w-full absolute top-0 z-20 p-4">
                    <div className="text-white font-light text-xs font-light">
                        {moment(this.state.date).format('DD MMMM YYYY')}
                    </div>
                    <div className="text-white font-light text-4xl font-bold">
                        {moment(this.state.date).format('HH:mm:ss')}
                    </div>
                </div>
                <div className="absolute z-30 h-screen w-screen flex justify-center items-center">
                    {this.state.params !== undefined &&
                        this.state.params.type === 'successsignup' ? 
                            <div className="absolute hidden flex xl:flex lg:flex md:hidden sm:hidden right-0 top-0 w-1/3 text-white mr-2 mt-2 rounded-lg font-light text-sm p-2 items-center" 
                                style={{
                                    background: 'rgba(255,255,255,.4)'
                                }}
                            >
                                <div className="flex-1">
                                    Pendaftaran anda dalam proses validasi. Anda akan dapat login setelah pendaftaran anda di validasi
                                </div>
                                <div className="w-10 text-white h-full flex items-center">
                                    <ImUserCheck size={30}/>
                                </div>
                            </div>
                        : null
                    }
                    
                    <div className="w-full xl:w-1/4 lg:w-2/4 md:w-2/4 sm:w-full py-10 px-6 items-center relative">
                        <div className="w-full items-center">
                            <div className="text-xl font-bold text-white text-center text-shadow-lg">
                                SIGN IN
                            </div>
                            <div className="text-sm font-light text-white text-center text-shadow-lg mt-2">
                                Welcome to the encryption and decryption application
                            </div>
                        </div>
                        <div className="w-full mt-6 flex">
                            <TextInput 
                                icon={<AiOutlineMail size={16}/>}
                                onChange={(e) => {
                                    const validation = validateEmail(e.target.value)
                                    this.setState({
                                        email: e.target.value,
                                        emailIsValid: validation
                                    })
                                }}
                                onEnter={this.submitLogin}
                                placeholder={'Email'}
                                value={this.state.email}
                            />
                            <p ref={ref => this.emailTooltip = ref} data-tip={this.state.emailMessage}></p>
                            <ReactTooltip place="right" delayUpdate={500}/>
                        </div>
                        <div className="w-full mt-2 flex">
                            <TextInput 
                                icon={<BiLockAlt size={16}/>}
                                secureText
                                placeholder={'Password'}
                                onEnter={this.submitLogin}
                                onChange={(e) => {
                                    this.setState({
                                        password: e.target.value
                                    })
                                }}
                                value={this.state.password}
                            />
                            <p ref={ref => this.passTooltip = ref} data-tip={this.state.passMessage}></p>
                            <ReactTooltip place="right" delayUpdate={500}/>
                        </div>
                        <div className="w-full flex items-center justify-center mt-6">
                            <Ripple 
                                onClick={this.submitLogin}
                                color={'rgba(255,255,255,.4)'}
                                className="w-1/2 h-8 mr-2 flex justify-center items-center rounded-lg bg-white cursor-pointer hover:bg-gray-200"
                            >
                                {this.state.loader ? 
                                    <div className="w-10 h-full text-green-100 justify-center flex items-center">
                                        <Loader type="ThreeDots" color={"#1565c0"} height={40} width={40}/>
                                    </div>
                                    : 
                                    <div className="flex-1 justify-center text-blue-700 text-sm font-medium items-center text-center flex">
                                        Sign In
                                    </div>
                                }
                            </Ripple>
                            <Ripple 
                                onClick={() => this.props.history.push('/sign-up')}
                                color={'rgba(255,255,255,.4)'}
                                className="w-1/2 h-8 ml-2 rounded-lg bg-white cursor-pointer hover:bg-blue-100"
                            >
                                <div className="w-full h-full justify-center text-blue-700 text-sm shadow-xl font-bold items-center text-center flex">
                                    Register
                                </div>
                            </Ripple>
                        </div>
                    </div>     
                </div>        
            </div>
        )
    }
}