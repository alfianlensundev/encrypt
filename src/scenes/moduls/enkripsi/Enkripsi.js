import React, { Component } from 'react'
import Layout from '../../../components/layouts/Layout'
import ParticlesBackground from '../../../components/background/ParticlesBackground'
import FileUpload from '../../../components/fileinput/FileUpload'
import Ripple from 'react-ripples'
import Loader from 'react-loader-spinner'
import { extToIcon } from '../../../helpers/jsxHelpers'
import { BsUpload } from 'react-icons/bs'
import { IoMdCloudUpload } from 'react-icons/io'


export default class Enkripsi extends Component {
    constructor(props){
        super(props)
        this.state = {
            file: null,
            loaderUpload: false,
            extension: null
        }
    }
    render(){
        return (
            <Layout
                {...this.props}
                activePage={1}
            >
                <div className="w-full h-full px-2 flex">
                    <div className="w-5/6 px-2">
                        <div className="bg-grd-orange shadow-lg w-full py-4 flex flex-col rounded-lg px-6 text-white relative overflow-hidden">
                            <div className="w-full">
                                {/* <ParticlesBackground /> */}
                            </div>
                            <div className="w-full text-lg font-bold">
                                Modul Enkripsi
                            </div>
                            <div className="w-full text-sm mt-2 font-light">
                                Silahkan upload lengkapi data berikut untuk mulai melakukan enkripsi
                            </div>
                            
                        </div>
                        <div className="w-full shadow-lg rounded-lg px-4 mt-4 bg-white py-2">
                            {this.state.loaderUpload ? 
                                <div className="w-full h-20 flex items-center justify-center"> 
                                    <Loader type="ThreeDots" color="#00BFFF" height={30} width={30}/>
                                </div>
                                : null
                            }
                            {this.state.file === null ? 
                                <FileUpload 
                                    onChange={(acceptedFiles) => {
                                        
                                        this.setState({
                                            file: acceptedFiles[0],
                                            extension:acceptedFiles[0].name.substr(acceptedFiles[0].name.lastIndexOf('.') + 1)
                                        })
                                    }}
                                />
                                : <div className="w-full items-center flex-col mb-4 flex justify-center pt-2">
                                    {extToIcon('xlsx', 50)}
                                    <div className="font-light text-xs mt-4">
                                        01293.xlsx
                                    </div>
                                    <Ripple
                                        className={'px-4 py-2 mt-4 transition hover:bg-blue-400 hover:text-white text-white bg-blue-500 flex items-center justify-center cursor-pointer rounded-full'}
                                    >
                                        <div className="font-medium text-sm">
                                            Upload
                                        </div>
                                        <div className="pl-4">
                                            <IoMdCloudUpload size={20}/>
                                        </div>
                                    </Ripple>
                                </div>
                            }
                            
                        </div>
                    </div>
                    <div className="w-2/6 h-full overflow-y-scroll overflow-x-hidden bg-white shadow-lg rounded">
                        <div className="w-full px-2 py-2">
                            
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}