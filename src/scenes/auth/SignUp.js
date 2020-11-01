import React, { Component } from 'react'
import TextInput from '../../components/textinputs/TextInput'
import {HiOutlineUser} from 'react-icons/hi'
import {AiOutlineMail} from 'react-icons/ai'
import {FiWifiOff} from 'react-icons/fi'
import {BiLockAlt, BiChevronRight} from 'react-icons/bi'
import Ripple from 'react-ripples'
import moment from 'moment'
import ParticlesBackground from '../../components/background/ParticlesBackground'
import { validateEmail } from '../../helpers/GeneralHelpers'
import {doSignUp} from '../../services/ServiceAuth'
import Loader from 'react-loader-spinner'
import ReactTooltip from 'react-tooltip'

export default class SignUp extends Component{
    constructor(props){
        super(props)
        this.state = {
            date: new Date(),
            email: '',
            fullname: '',
            emailIsValid: false,
            passStr: null,
            emailMessage: '',
            fnMessage: '',
            passMessage: '',
            cpassMessage: '',
            password: '',
            confirmPass: '',
            loader: false,
            errorMessage: false,
            error: false
        }
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            this.setState({
                date: new Date()
            })
        }, 1000);
    }

    resetToolTips = () => {
        this.setState({
            error: false
        })
        ReactTooltip.hide()
    }

    submitSignUp = async () => {
        try {
            this.resetToolTips()
            if (this.state.email.trim().length === 0) throw {
                message: 'Email tidak boleh kosong!',
                type: 'email'
            }
            if (!this.state.emailIsValid) throw {
                message: 'Email tidak valid!',
                type: 'email'
            }

            if (this.state.fullname.trim().length === 0) throw {
                message: 'Masukan nama lengkap anda!',
                type: 'fullname'
            }

            if (this.state.password.trim().length === 0) throw {
                message: 'Masukan password anda',
                type: 'pass'
            }
            if (this.state.confirmPass.trim().length === 0) throw {
                message: 'Konfirmasi password anda terlebih dahulu',
                type: 'cpass'
            }
            if (this.state.password !== this.state.confirmPass) throw {
                message: 'Password tidak sama',
                type: 'cpass'
            }
            this.setState({
                loader: true
            })
            const {data: {code, message, data}} = await doSignUp({
                email: this.state.email,
                fullname: this.state.fullname,
                password: this.state.password
            })

            this.setState({
                loader:false
            })

            if (code === 201) throw {
                message: 'Email sudah pernah terdaftar',
                type: 'emailexist'
            }

            if (code === 200){
                this.props.history.replace('/', {
                    email: data.email,
                    type: 'successsignup'
                })
            }
        } catch({message = null, type = null}){
            if (type === 'email') this.setState({emailMessage: message}, () => ReactTooltip.show(this.emailTooltip))
            if (type === 'fullname') this.setState({fnMessage: message}, () => ReactTooltip.show(this.fnTooltip))
            if (type === 'pass') this.setState({passMessage: message}, () => ReactTooltip.show(this.passTooltip))
            if (type === 'cpass') this.setState({cpassMessage: message}, () => ReactTooltip.show(this.cpassTooltip))
            if (type === 'emailexist') this.setState({error: true, errorMessage: message})
            if (type === null) this.setState({error: true, errorMessage: 'gagal menyimpan data'})
            this.setState({
                loader:false
            })
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }


    render(){
        return (
            <div className="w-screen h-screen bg-grd-blue flex justify-center items-center px-2 overflow-hidden relative">
                
                <ParticlesBackground />
                <div className="w-full absolute top-0 z-20 p-4">
                    <div className="text-white font-light text-xs font-light">
                        {moment(this.state.date).format('DD MMMM YYYY')}
                    </div>
                    <div className="text-white font-light text-4xl font-bold">
                        {moment(this.state.date).format('HH:mm:ss')}
                    </div>
                </div>
                <div className="absolute z-30 h-screen w-screen flex justify-center items-center">
                    
                    <div className="w-full xl:w-1/4 lg:w-2/4 md:w-2/4 sm:w-full overflow-hidden py-10 px-6 items-center bg-white rounded-lg shadow-lg relative">
                        {this.state.error &&
                            <div className={`w-full absolute top-0 left-0 font-light text-white text-sm h-10 flex items-center justify-center ${this.state.error ? 'bg-red-400' : 'bg-orange-400'}`}>
                                <div className="">
                                    {this.state.errorMessage}
                                </div>
                            </div>
                        }
                        <div className="w-full items-center mt-4">
                            <div className="text-xl font-bold text-blue-700 text-center text-shadow-lg">
                                Mendaftar
                            </div>
                            <div className="text-sm font-light text-blue-700 text-center text-shadow-lg mt-2">
                                Silahkan lengkapi form berikut untuk mendaftar
                            </div>
                        </div>
                        <div className="w-full mt-6">
                            <div className="w-full flex">
                                <TextInput 
                                    icon={<AiOutlineMail size={16}/>}
                                    onChange={(e) => {
                                        const validation = validateEmail(e.target.value)
                                        this.setState({
                                            email: e.target.value,
                                            emailIsValid: validation
                                        })
                                    }}
                                    onEnter={this.submitSignUp}
                                    placeholder={'Email'}
                                    value={this.state.email}
                                />
                                <p ref={ref => this.emailTooltip = ref} data-tip={this.state.emailMessage}></p>
                                <ReactTooltip place="right" delayUpdate={500}/>
                            </div>
                        </div>
                        <div className="w-full mt-2 flex">
                            <TextInput 
                                icon={<HiOutlineUser size={16}/>}
                                onChange={(e) => {
                                    this.setState({
                                        fullname: e.target.value
                                    })
                                }}
                                onEnter={this.submitSignUp}
                                placeholder={'Nama Lengkap'}
                                value={this.state.fullname}
                            />
                            <p ref={ref => this.fnTooltip = ref} data-tip={this.state.fnMessage}></p>
                            <ReactTooltip place="right" delayUpdate={500}/>
                        </div>
                        <div className="w-full mt-2 flex">
                            <TextInput 
                                icon={<BiLockAlt size={16}/>}
                                secureText
                                placeholder={'Password'}
                                onEnter={this.submitSignUp}
                                onChange={(e) => {
                                    this.setState({
                                        password: e.target.value
                                    })
                                }}
                                checkStr
                                value={this.state.password}
                            />
                            <p ref={ref => this.passTooltip = ref} data-tip={this.state.passMessage}></p>
                            <ReactTooltip place="right" delayUpdate={500}/>
                        </div>
                        <div className="w-full mt-2 flex">
                            <TextInput 
                                icon={<BiLockAlt size={16}/>}
                                secureText
                                placeholder={'Konfirmasi Password'}
                                onChange={(e) => {
                                    this.setState({
                                        confirmPass: e.target.value
                                    })
                                }}
                                onEnter={this.submitSignUp}
                                value={this.state.confirmPass}
                            />
                            <p ref={ref => this.cpassTooltip = ref} data-tip={this.state.cpassMessage}></p>
                            <ReactTooltip place="right" delayUpdate={500}/>
                        </div>
                        <div className="w-full flex items-center justify-center mt-6">
                            <Ripple 
                                onClick={this.submitSignUp}
                                color={'rgba(255,255,255,.4)'}
                                className="w-1/2 h-8 mr-2 flex justify-center items-center rounded-lg bg-white py-6 cursor-pointer hover:bg-gray-200 shadow-neu-input"
                            >
                                {this.state.loader ? 
                                    <div className="w-10 h-full text-green-100 justify-center flex items-center">
                                        <Loader type="ThreeDots" color={"#1565c0"} height={40} width={40}/>
                                    </div>
                                    : 
                                    <div className="flex-1 justify-center text-blue-700 text-sm font-medium items-center text-center flex">
                                        Mendaftar
                                    </div>
                                }
                                
                            </Ripple>
                            <Ripple 
                                onClick={() => this.props.history.goBack()}
                                color={'rgba(255,255,255,.4)'}
                                className="w-1/2 h-8 ml-2 rounded-lg bg-white cursor-pointer hover:bg-gray-200 py-6 shadow-neu-input"
                            >
                                <div className="w-full h-full px-2 justify-center text-blue-700 text-sm font-medium items-center text-center flex">
                                    <div className="">
                                        Ke Menu Login
                                    </div>
                                    <div className="w-4">
                                        <BiChevronRight size={25}/>
                                    </div>
                                </div>
                            </Ripple>
                        </div>
                    </div>     
                </div>        
            </div>
        )
    }
}