import React, { Component } from 'react'
import Layout from '../../components/layouts/Layout'
import Ripple from 'react-ripples'
import {ImFolderDownload} from 'react-icons/im'
import CardFolder from '../../components/cards/CardFolder'
import CardInfoProgressBar from '../../components/cards/CardInfoProgressBar'
import ParticlesBackground from '../../components/background/ParticlesBackground'
import { dashboardExt, dashboardData } from '../../services/ServiceFiles'
import { bytesToSize } from '../../helpers/GeneralHelpers'
export default class WelcomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            userdata: JSON.parse(localStorage.getItem('user_data')),
            listDashboardExt: [],
            listDashboard: {
                listDec: [],
                listEnc: [],
            }
        }
    }

    componentDidMount(){
        this.getDashboardExt()
        this.getDashboard()
    }

    getDashboard = async () => {
        try {
            const {_id: userId} = JSON.parse(localStorage.getItem('user_data'))
            const {data: {data}} = await dashboardData(userId)
            this.setState({
                listDashboard:data
            })
            console.log(data)
        } catch(err){
            console.log(err)
        }
    }

    getDashboardExt = async () => {
        try {
            const {_id: userId} = JSON.parse(localStorage.getItem('user_data'))
            const {data: {data}} = await dashboardExt(userId)
            this.setState({
                listDashboardExt:data
            })
        } catch(err){
            console.log(err)
        }
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
                                {this.state.listDashboard.listEnc.map(item => {
                                    return (
                                        <div className="xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2 mt-2 xl:w-1/2 lg:w-1/2 md:w-full sm:w-full w-full px-2">
                                            <CardFolder 
                                                encrypt_status={item.encrypt_status}
                                                enctime={item.time_encryption.$numberDecimal}
                                                dectime={item.time_decryption.$numberDecimal}
                                                subject={item.subject}
                                                filesize={bytesToSize(item.file_size)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="w-full shadow-lg rounded-lg px-4 mt-4 bg-indigo-500">
                            <div className="w-full font-medium text-sm py-4 text-white">
                                Riwayat Dekripsi
                            </div>
                            
                            <div className="py-4 flex flex-wrap">
                                {this.state.listDashboard.listDec.map(item => {
                                    return (
                                        <div className="xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2 mt-2 xl:w-1/2 lg:w-1/2 md:w-full sm:w-full w-full px-2">
                                            <CardFolder 
                                                encrypt_status={item.encrypt_status}
                                                enctime={item.time_encryption.$numberDecimal}
                                                dectime={item.time_decryption.$numberDecimal}
                                                subject={item.subject}
                                                filesize={bytesToSize(item.file_size)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-2/6 xl:flex lg:flex md:hidden sm:hidden hidden flex-col h-full overflow-y-scroll overflow-x-hidden bg-white shadow-lg rounded">
                        {this.state.listDashboardExt.map(item => {
                            return <div className="w-full px-2 py-2">
                                 <CardInfoProgressBar 
                                    percentage={item.persent}
                                    itemcount={item.total}
                                    ext={item.ext}
                                />
                            </div>
                        })}
                    </div>
                </div>
            </Layout>
        )
    }
}