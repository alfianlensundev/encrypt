import React, { Component } from 'react'
import Layout from '../../../components/layouts/Layout'
import ParticlesBackground from '../../../components/background/ParticlesBackground'
import FileUpload from '../../../components/fileinput/FileUpload'
import Loader from 'react-loader-spinner'
import Ripple from 'react-ripples'
import DataTable from 'react-data-table-component';
import { BsFillFolderFill } from 'react-icons/bs'
import moment from 'moment'
import { getFilesByDate } from '../../../services/ServiceFiles'
import { bytesToSize } from '../../../helpers/GeneralHelpers'
export default class FileDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            file: null,
            listfile: [],
            loaderUpload: false
        }
    }

    componentDidMount(){
        this.getFile()
    }

    getFile = async () => {
        try {
            const {_id: userId} = JSON.parse(localStorage.getItem('user_data'))
            const {data:{data}} = await getFilesByDate(userId, this.props.history.location.state.tgl)
            this.setState({
                listfile: data.map((item, key) => ({
                    no: key+1,
                    time_dec: item.time_decryption.$numberDecimal,
                    time_enc: item.time_encryption.$numberDecimal,
                    ...item
                }))
            })
        } catch(err){
            console.log(err)
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
                            <div className="w-full mt-2 text-xs font-medium">
                                {moment(this.props.history.location.state.tgl).format('DD MMMM YYYY')}
                            </div>
                        </div>
                        <div className="flex-1 shadow-lg rounded-lg px-4 mt-4 bg-white py-2 relative">
                            <DataTable
                                className={'text-sm'}
                                title="Daftar File"
                                columns={[
                                    {
                                        name: 'No',
                                        selector: 'no',
                                        sortable: true,
                                    },
                                    {
                                        name: 'File Name',
                                        selector: 'file_name',
                                        sortable: true,
                                    },
                                    {
                                        format: (row) => bytesToSize(row.file_size),
                                        name: 'File Size',
                                        selector: 'file_size',
                                        sortable: true,
                                    },
                                    {
                                        name: 'Encryption Time',
                                        selector: 'time_enc',
                                        sortable: true,
                                    },
                                    {
                                        name: 'Decryption Time',
                                        selector: 'time_dec',
                                        sortable: true,
                                    },
                                    {
                                        cell: row => <div className={`px-2 py-2 text-xs text-white rounded ${row.encrypt_status === 1 ? 'bg-blue-500 hover:bg-blue-400' : 'bg-red-500 hover:bg-red-400'}`} data-tag="allowRowEvents">{row.encrypt_status === 1 ? 'Encrypted' : 'Decrypted'}</div>,
                                        name: 'Status',
                                        selector: 'status',
                                        sortable: true,
                                    }
                                ]}
                                data={this.state.listfile}
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}