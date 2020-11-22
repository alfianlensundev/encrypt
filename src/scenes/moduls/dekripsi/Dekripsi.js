import React, { Component } from 'react'
import Layout from '../../../components/layouts/Layout'
import ParticlesBackground from '../../../components/background/ParticlesBackground'
import FileUpload from '../../../components/fileinput/FileUpload'
import Ripple from 'react-ripples'
import Loader from 'react-loader-spinner'
import { extToIcon } from '../../../helpers/jsxHelpers'
import { BsUpload } from 'react-icons/bs'
import {deleteFile, downloadFile, encryptAndSaveFile, getAllFile, uploadFile, decryptAndSaveFile,uploadFileDec, saveDecrypt} from '../../../services/ServiceFiles'
import { IoMdCloudUpload } from 'react-icons/io'
import TextInput from '../../../components/textinputs/TextInput'
import CardFolder from '../../../components/cards/CardFolder'
import { bytesToSize } from '../../../helpers/GeneralHelpers'
import ModalConfirm from '../../../components/modals/ModalConfirm'
import Axios from 'axios'
import { API_BASE_URL } from '../../../constants/config'
import ModalAuth from '../../../components/modals/ModalAuth'


export default class Dekripsi extends Component {
    constructor(props){
        super(props)
        this.initialState = {
            subject: '',
            file: null,
            selectedFile: null,
            success: null,
            loaderUpload: false,
            extension: null,
            dataDecrypt: null
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
            const {_id: userId} = JSON.parse(localStorage.getItem('user_data'))
            const {data: {data: listfile} } = await getAllFile(userId, 0)
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
            const {data: {data: fileDetail}} = await uploadFileDec(formData)
            const {data: {status, data: dataDecrypt}} = await decryptAndSaveFile({
                fileDetail,
                userId: userId
            })

            this.setState({
                dataDecrypt
            })
            this.modalAuth.showModal()
        } catch(err){
            this.layout.showToast('danger','failed to save data', 4000)
            this.setState({
                loaderUpload: false
            })
        }
    }

    onSuccess = async () => {
        try {
            const {data: {code}} = await saveDecrypt({
                files: this.state.dataDecrypt.files
            })
            this.modalAuth.hideModal()
            this.setState(this.initialState)
            this.layout.showToast('success','data is successfully deleted', 4000)
            this.getAllFile()
        } catch(err){
            this.setState(this.initialState)
            this.modalAuth.hideModal()
            this.layout.showToast('danger','failed to save data', 4000)
        }
    }

    onFailed = () => {
        alert('fail;')
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
                activePage={2}
            >
                <div className="w-full h-full px-2 flex">
                    <div className="flex-1 px-2">
                        <div className="bg-grd-orange shadow-lg w-full py-4 flex flex-col rounded-lg px-6 text-white relative overflow-hidden">
                            <div className="w-full">
                                {/* <ParticlesBackground /> */}
                            </div>
                            <div className="w-full text-lg font-bold">
                                Decrypt
                            </div>
                            <div className="w-full text-sm mt-2 font-light">
                                Please upload, complete the following data to start decryption
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
                                        encrypt_status={item.encrypt_status}
                                        enctime={item.time_encryption.$numberDecimal}
                                        dectime={item.time_decryption.$numberDecimal}
                                        ondownload={async () => {
                                            window.location = `${API_BASE_URL}/files/download/${item._id}/0`
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
                <ModalAuth 
                    onSuccess={this.onSuccess}
                    onFailed={this.onFailed}
                    ref={ref => this.modalAuth = ref}
                />
            </Layout>
        )
    }
}