import React, { Component } from 'react'
import Layout from '../../../components/layouts/Layout'
import { getAllFile } from '../../../services/ServiceFiles'


export default class Dekripsi extends Component{
    constructor(props){
        super(props)
        this.state = {
            listFile: []
        }
    }

    componentDidMount(){
        
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
    
    render(){
        return (
            <Layout
                ref={ref => this.layout = ref}
                {...this.props}
                activePage={2}
            >
                <div className="w-full h-full px-2 flex">
                    <div className="w-full px-2">
                        <div className="bg-grd-orange shadow-lg w-full py-4 flex flex-col rounded-lg px-6 text-white relative overflow-hidden">
                            <div className="w-full">
                                {/* <ParticlesBackground /> */}
                            </div>
                            <div className="w-full text-lg font-bold">
                                Decrypt
                            </div>
                            <div className="w-full text-sm mt-2 font-light">
                                Select file to decrypt
                            </div>
                            
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}