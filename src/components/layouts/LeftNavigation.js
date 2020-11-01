import React, { Component } from 'react'
import Ripple from 'react-ripples'
import {MdWidgets} from 'react-icons/md'
import {RiDashboardLine} from 'react-icons/ri'
import {BiLogOutCircle} from 'react-icons/bi'
import {FaUnlock, FaUser} from 'react-icons/fa'
import { BsFillShieldLockFill, BsFillFolderFill } from 'react-icons/bs'
import ParticlesBackground from '../../components/background/ParticlesBackground'
import ReactTooltip from 'react-tooltip';

export default class LeftNavigation extends Component{
    constructor(props){
        super(props)
        this.state = {
            activePage: 0,
            userData: JSON.parse(localStorage.getItem('user_data'))
        }
    }
    render(){
        return (
            <div className="xl:flex lg:flex md:hidden sm:hidden hidden bg-grd-blue rounded-tr-xl relative overflow-hidden shadow-xl">
                <div className="absolute z-10">
                    <ParticlesBackground 
                        followParent
                    />
                </div>
                <div className="w-16 h-full py-4 z-20">
                    <div className=" h-full">
                        <Ripple     
                            onClick={() => {this.props.onChangeActivePage(0)}}
                            data-tip="Main Menu"
                            color={'rgba(0,0,0,.1)'}
                            className="w-10 h-10 text-indigo-500 justify-center items-center flex rounded-r-full bg-white cursor-pointer hover:bg-indigo-100">
                            <MdWidgets size={20}/>
                        </Ripple>
                        <Ripple 
                            onClick={() => {
                                localStorage.clear()
                                window.location = '/'
                            }}
                            data-tip="Keluar"
                            color={'rgba(0,0,0,.1)'}
                            className="w-10 h-10 mt-4 text-indigo-500 justify-center items-center flex rounded-r-full bg-white cursor-pointer hover:bg-indigo-100">
                            <BiLogOutCircle size={20}/>
                        </Ripple>
                        <ReactTooltip />
                    </div>       
                    
                </div>
                <div className="w-56 h-full rounded-tr-xl shadow-lg-cs z-20">
                    <div className="w-full h-full pt-32 px-4">
                        <Ripple
                            onClick={() => {this.props.onChangeActivePage(0)}}
                            color={'rgba(255,255,255,.5)'} 
                            className={`w-full h-10 flex items-center flex mt-6 cursor-pointer transition ${this.props.activePage === 0 ? 'text-indigo-600' : 'text-white'} rounded-lg hover:shadow-lg`}
                        >
                            <div className="w-full h-full flex items-center px-2"
                                style={{
                                    backgroundColor: `rgba(255,255,255,${this.props.activePage === 0 ? '1' : '.3'})`
                                }}
                            >  
                                <RiDashboardLine />
                                <div className="pl-4 font-medium text-sm">
                                    Dashboard
                                </div>
                            </div>
                        </Ripple>
                        <Ripple
                            onClick={() => {this.props.onChangeActivePage(1)}}
                            color={'rgba(255,255,255,.5)'} 
                            className={`w-full h-10 flex items-center flex mt-6 cursor-pointer transition ${this.props.activePage === 1 ? 'text-indigo-600' : 'text-white'} rounded-lg hover:shadow-lg`}
                        >
                            <div className="w-full h-full flex items-center px-2"
                                style={{
                                    backgroundColor: `rgba(255,255,255,${this.props.activePage === 1 ? '1' : '.3'})`
                                }}
                            >   
                                <BsFillShieldLockFill />
                                <div className="pl-4 font-medium text-sm">
                                    Enkripsi
                                </div>
                            </div>
                            
                        </Ripple>
                        <Ripple
                            onClick={() => {this.props.onChangeActivePage(2)}}
                            color={'rgba(255,255,255,.5)'} 
                            className={`w-full h-10 flex items-center flex mt-6 cursor-pointer transition ${this.props.activePage === 2 ? 'text-indigo-600' : 'text-white'} rounded-lg hover:shadow-lg`}
                        >
                            <div className="w-full h-full flex items-center px-2"
                                style={{
                                    backgroundColor: `rgba(255,255,255,${this.props.activePage === 2 ? '1' : '.3'})`
                                }}
                            >   
                                <FaUnlock />
                                <div className="pl-4 font-medium text-sm">
                                    Dekripsi
                                </div>
                            </div>
                        </Ripple>
                        {this.state.userData.user_type === 0 &&
                            <Ripple 
                                onClick={() => {this.props.onChangeActivePage(3)}}
                                color={'rgba(255,255,255,.5)'}
                                className={`w-full h-10 flex items-center flex mt-6 cursor-pointer transition ${this.props.activePage === 3 ? 'text-indigo-600' : 'text-white'} rounded-lg hover:shadow-lg`}
                            >
                                <div className="w-full h-full flex items-center px-2"
                                    style={{
                                        backgroundColor: `rgba(255,255,255,${this.props.activePage === 3 ? '1' : '.3'})`
                                    }}
                                >   
                                    <FaUser />
                                    <div className="pl-4 font-medium text-sm">
                                        Validasi Pengguna
                                    </div>
                                </div>
                            </Ripple>
                        }
                        <Ripple 
                            onClick={() => {this.props.onChangeActivePage(4)}}
                            color={'rgba(255,255,255,.5)'}
                            className={`w-full h-10 flex items-center flex mt-6 cursor-pointer transition ${this.props.activePage === 4 ? 'text-indigo-600' : 'text-white'} rounded-lg hover:shadow-lg`}
                        >
                            <div className="w-full h-full flex items-center px-2"
                                style={{
                                    backgroundColor: `rgba(255,255,255,${this.props.activePage === 4 ? '1' : '.3'})`
                                }}
                            >   
                                <BsFillFolderFill />
                                <div className="pl-4 font-medium text-sm">
                                    File
                                </div>
                            </div>
                        </Ripple>
                    </div>
                </div>
            </div>
        )
    }
}