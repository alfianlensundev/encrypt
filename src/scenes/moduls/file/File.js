import React, { Component } from 'react'
import Layout from '../../../components/layouts/Layout'
import ParticlesBackground from '../../../components/background/ParticlesBackground'
import FileUpload from '../../../components/fileinput/FileUpload'
import Loader from 'react-loader-spinner'
import Ripple from 'react-ripples'
import {getFolder} from '../../../services/ServiceFiles'
import { BsFillFolderFill } from 'react-icons/bs'
import moment from 'moment'
export default class File extends Component {
    constructor(props){
        super(props)
        this.state = {
            file: null,
            listFolder: [],
            loaderUpload: false
        }
    }

    componentDidMount(){
        try {
            this.getListFolder()
        } catch(err){

        }
    }

    getListFolder = async () => {
        try {
            const {_id: userId} = JSON.parse(localStorage.getItem('user_data'))
            const {data: {data: listFolder}} = await getFolder(userId)
            this.setState({
                listFolder
            })
        } catch(err){

        }
    }

    render(){
        return (
            <Layout
                {...this.props}
                activePage={4}
            >
                <div className="w-full h-full px-2 flex">
                    <div className="w-full px-2 flex flex-col  pb-4">
                        <div className="bg-grd-orange shadow-lg w-full py-4 flex flex-col rounded-lg px-6 text-white relative overflow-hidden">
                            <div className="w-full">
                                {/* <ParticlesBackground /> */}
                            </div>
                            <div className="w-full text-lg font-bold">
                                Files
                            </div>
                        </div>
                        <div className="flex-1 shadow-lg rounded-lg px-4 mt-4 bg-white py-2 flex flex-wrap relative">
                            {this.state.listFolder.map(item => {
                                return (
                                    <div className="w-1/6 h-fit-content px-2">
                                        <Ripple 
                                            onClick={() => this.props.history.push('files/detail', {
                                                tgl: moment(item).format('YYYY-MM-DD')
                                            })}
                                            color={'rgba(255,255,255,.4)'}
                                            className="w-full h-full mt-4 py-4 rounded-lg flex cursor-pointer hover:bg-gray-200 flex-col items-center py-2 px-2 justify-center">
                                            <BsFillFolderFill size={50} color={'#396afc'}/>
                                            <div className="font-medium text-gray-800 mt-4 text-xs">
                                                {moment(item).format('DD MMMM YYYY')}
                                            </div>
                                        </Ripple>
                                    </div>
                                )
                            })}
                           
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}