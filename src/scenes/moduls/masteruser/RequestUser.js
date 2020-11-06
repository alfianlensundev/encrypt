import React, { Component } from 'react'
import Layout from '../../../components/layouts/Layout'
import ParticlesBackground from '../../../components/background/ParticlesBackground'
import Ripple from 'react-ripples'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import { TiTimesOutline } from 'react-icons/ti'
import { getAllUsers, doValidateUser } from '../../../services/ServiceAuth'
export default class RequestUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            file: null,
            userData: JSON.parse(localStorage.getItem('user_data')),
            loaderUpload: false,
            listUser: []
        }
    }

    getAllUser = async () => {
        try {
            const {data: {data: listUser}} = await getAllUsers()
            this.setState({
                listUser: listUser.filter(u => u._id !== this.state.userData._id)
            })
        } catch(err){
            console.log(err)
        }
    }

    validateUser = async (account_status, userdata) => {
        try {
            const {data} = await doValidateUser({
                IDUser: userdata._id,
                account_status
            })
            this.getAllUser()
        } catch(err){
            console.log(err)
        }
    }

    componentDidMount(){
        this.getAllUser()
    }
    render(){
        return (
            <Layout
                {...this.props}
                activePage={3}
            >
                <div className="w-full h-full px-2 flex relative">
                    <div className="w-full flex flex-col px-2 pb-4">
                        <div className="bg-grd-orange shadow-lg w-full py-4 flex flex-col rounded-lg px-6 text-white relative overflow-hidden">
                            <div className="w-full">
                                {/* <ParticlesBackground /> */}
                            </div>
                            <div className="w-full text-lg font-bold">
                                Modul validasi pengguna
                            </div>
                        </div>
                        <div className="flex-1 shadow-lg shadow-neu-input-inset overflow-y-scroll overflow-x-hidden rounded-lg px-2 mt-4 bg-white py-2">
                            {this.state.listUser.map((u, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className={'rounded w-full bg-white shadow-neu-input flex py-2 px-4 mt-2 cursor-pointer hover:shadow-md transition'}
                                    >
                                        <div className="flex-1 flex flex-col">
                                            <div className="font-light text-xs text-gray-800 flex">
                                                Nama Lengkap
                                            </div>
                                            <div className="font-bold text-sm text-gray-800">
                                                {u.full_name}
                                            </div>
                                            <div className="font-light text-xs text-gray-800 flex mt-2">
                                                Email
                                            </div>
                                            <div className="font-bold text-sm text-gray-800">
                                                {u.email}
                                            </div>
                                        </div>
                                        {u.account_status === 0 &&
                                            <div className="">
                                                <Ripple
                                                    onClick={() => this.validateUser(1, u)}
                                                    className="shadow-neu-input font-bold px-2 py-2 rounded cursor-pointer hover:bg-green-500 hover:text-white transition text-green-700 text-sm flex items-center justify-center"
                                                >
                                                    <div className="pr-2">
                                                        Terima 
                                                    </div>
                                                    <HiOutlineBadgeCheck size={20}/>
                                                </Ripple>
                                                <Ripple
                                                    onClick={() => this.validateUser(2, u)}
                                                    className="shadow-neu-input ml-2 font-bold px-2 py-2 rounded cursor-pointer hover:bg-red-500 hover:text-white transition text-red-700 text-sm flex items-center justify-center"
                                                >
                                                    <div className="pr-2">
                                                        Hapus 
                                                    </div>
                                                    <TiTimesOutline size={20}/>
                                                </Ripple>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* <div className="w-2/6 h-full overflow-y-scroll overflow-x-hidden bg-white shadow-lg rounded">
                        <div className="w-full px-2 py-2">
                            
                        </div>
                    </div> */}
                </div>
            </Layout>
        )
    }
}