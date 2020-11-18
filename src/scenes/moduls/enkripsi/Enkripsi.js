import React, { Component } from 'react'
import Layout from '../../../components/layouts/Layout'
import ParticlesBackground from '../../../components/background/ParticlesBackground'
import FileUpload from '../../../components/fileinput/FileUpload'
import Ripple from 'react-ripples'
import Loader from 'react-loader-spinner'
import { extToIcon } from '../../../helpers/jsxHelpers'
import { BsUpload } from 'react-icons/bs'
import {deleteFile, downloadFile, encryptAndSaveFile, getAllFile, uploadFile} from '../../../services/ServiceFiles'
import { IoMdCloudUpload } from 'react-icons/io'
import TextInput from '../../../components/textinputs/TextInput'
import CardFolder from '../../../components/cards/CardFolder'
import { bytesToSize } from '../../../helpers/GeneralHelpers'
import ModalConfirm from '../../../components/modals/ModalConfirm'
import Axios from 'axios'
import { API_BASE_URL } from '../../../constants/config'


export default class Enkripsi extends Component {
    constructor(props){
        super(props)
        this.initialState = {
            subject: '',
            file: null,
            selectedFile: null,
            success: null,
            loaderUpload: false,
            extension: null,
        }

        this.state = {
            listfile: [],
            ...this.initialState
        }
    }

    componentDidMount(){
        this.getAllFile()
    }

    getAllFile = async () => {
        try { 
            const {data: {data: listfile} } = await getAllFile()
            this.setState({
                listfile
            })
        } catch(err){
            this.layout.showToast('danger', 'Cant Connect To Server')
        }
    }

    doUploadFile = async () => {
        try {
            const {_id: userId} = JSON.parse(localStorage.getItem('user_data'))
            this.setState({
                loaderUpload: true
            })
            const formData = new FormData()
            formData.append('file', this.state.file)
            formData.append('userId', userId)
            const {data: {data: fileDetail}} = await uploadFile(formData)
            const {data: {status}} = await encryptAndSaveFile({
                fileDetail,
                userId: userId,
                subject: this.state.subject
            })

            this.layout.showToast('success','data is successfully saved', 4000)
            this.setState(this.initialState)
            this.getAllFile()
        } catch(err){
            this.layout.showToast('danger','failed to save data', 4000)
            this.setState({
                loaderUpload: false
            })
        }
    }

    deleteFile = async () => {
        try {
            await deleteFile(this.state.selectedFile._id)
            this.layout.showToast('success','data is successfully deleted', 4000)
            this.setState(this.initialState)
            this.getAllFile()
        } catch(err){
            this.layout.showToast('danger','failed to save data', 4000)
        }
    }

    render(){
        return (
            <Layout
                ref={ref => this.layout = ref}
                {...this.props}
                activePage={1}
            >
                <div className="w-full h-full px-2 flex">
                    <div className="flex-1 px-2">
                        <div className="bg-grd-orange shadow-lg w-full py-4 flex flex-col rounded-lg px-6 text-white relative overflow-hidden">
                            <div className="w-full">
                                {/* <ParticlesBackground /> */}
                            </div>
                            <div className="w-full text-lg font-bold">
                                Encrypt
                            </div>
                            <div className="w-full text-sm mt-2 font-light">
                                Please upload, complete the following data to start encryption
                            </div>
                            
                        </div>
                        <div className="w-full shadow-lg rounded-lg px-4 mt-4 bg-white py-2">
                            {this.state.loaderUpload ? 
                                <div className="w-full h-20 flex items-center justify-center"> 
                                    <Loader type="ThreeDots" color="#00BFFF" height={30} width={30}/>
                                </div>
                                : null
                            }
                            <div className="w-full xl:w-1/3 lg:w-1/3 md:w-2/3 sm:w-full mb-4">
                                <div className="w-full mb-2 font-medium text-gray-800 pl-2 text-sm ">
                                    Subject
                                </div>
                                <TextInput
                                    placeholder={'What is this file ?'}
                                    onChange={(e) => {
                                        this.setState({
                                            subject: e.target.value
                                        })
                                    }}
                                    value={this.state.subject}
                                />
                            </div>
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
                                    {extToIcon(this.state.extension, 50)}
                                    <div className="font-light text-xs mt-4">
                                        {this.state.file.name}
                                    </div>
                                    <Ripple
                                        onClick={this.doUploadFile}
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
                        {this.state.listfile.map((item, idx) => {
                            console.log(item)
                            return(
                                <div 
                                    key={idx}
                                    className="w-full px-2 py-2 border-b mt-2">
                                    <CardFolder 
                                        enctime={item.time_encryption.$numberDecimal}
                                        ondownload={async () => {
                                            window.location = `${API_BASE_URL}/files/download/${item._id}/1`
                                        }}
                                        ondelete={() => {
                                            this.setState({
                                                selectedFile: item
                                            })
                                            this.modalConfirm.showModal('Are you sure you want to delete this data?')
                                        }}
                                        subject={item.subject}
                                        filesize={bytesToSize(item.file_size)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <ModalConfirm 
                    onConfirm={this.deleteFile}
                    ref={ref => this.modalConfirm = ref}
                />
            </Layout>
        )
    }
}