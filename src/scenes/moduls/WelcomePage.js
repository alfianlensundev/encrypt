import React, { Component } from 'react'
import Layout from '../../components/layouts/Layout'
import Ripple from 'react-ripples'
import {ImFolderDownload} from 'react-icons/im'
import CardFolder from '../../components/cards/CardFolder'
import CardInfoProgressBar from '../../components/cards/CardInfoProgressBar'
import ParticlesBackground from '../../components/background/ParticlesBackground'
export default class WelcomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdata: JSON.parse(localStorage.getItem('user_data'))
        }
        console.log(this.state.userdata)
    }
    render(){
        return(
            <Layout
                {...this.props}
                activePage={0}
            >
                <div className="w-full h-full px-2 flex">
                    <div className="flex-1 px-2">
                        <div className="bg-grd-orange shadow-lg w-full py-4 flex flex-col rounded-lg px-6 text-white relative overflow-hidden">
                            <div className="w-full">
                                {/* <ParticlesBackground /> */}
                            </div>
                            <div className="w-full text-lg font-bold">
                                Welcome
                            </div>
                            <div className="w-full text-sm mt-2 font-light">
                                Welcome to the encryption and decryption app
                            </div>
                            
                        </div>
                        <div className="w-full shadow-lg rounded-lg px-4 mt-4 bg-indigo-500">
                            <div className="w-full font-medium text-sm py-4 text-white">
                                Encryption History
                            </div>
                            
                            <div className="py-4 flex flex-wrap">
                                <div className="xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2 mt-2 xl:w-1/3 lg:w-1/3 md:w-full sm:w-full w-full px-2">
                                    <CardFolder />
                                </div>
                                <div className="xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2 mt-2 xl:w-1/3 lg:w-1/3 md:w-full sm:w-full w-full px-2">
                                    <CardFolder />
                                </div>
                            </div>
                        </div>
                        <div className="w-full shadow-lg rounded-lg px-4 mt-4 bg-indigo-500">
                            <div className="w-full font-medium text-sm py-4 text-white">
                                Riwayat Dekripsi
                            </div>
                            
                            <div className="py-4 flex flex-wrap">
                                <div className="xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2 mt-2 xl:w-1/3 lg:w-1/3 md:w-full sm:w-full w-full px-2">
                                    <CardFolder />
                                </div>
                                <div className="xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2 mt-2 xl:w-1/3 lg:w-1/3 md:w-full sm:w-full w-full px-2">
                                    <CardFolder />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/6 xl:flex lg:flex md:hidden sm:hidden hidden flex-col h-full overflow-y-scroll overflow-x-hidden bg-white shadow-lg rounded">
                        <div className="w-full px-2 py-2">
                            <CardInfoProgressBar 
                                
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}