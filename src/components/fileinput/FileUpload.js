import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { RiDragDropLine } from 'react-icons/ri'

export default function FileUpload({onChange}){
    const onDrop = useCallback(onChange, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return (
        <div {...getRootProps()} className="outline-none cursor-pointer hover:bg-indigo-100 transition rounded-lg">
            <input {...getInputProps()} />
            {
                isDragActive ?
                <div className="w-full py-10 font-light text-sm text-indigo-400 flex items-center justify-center flex-col">
                    <FaCloudUploadAlt size={40}/>
                    <p className="mt-4">Put your file here to upload</p>
                </div> :
                <div className="w-full py-10 font-light text-sm text-indigo-400 flex items-center justify-center flex-col">
                    <RiDragDropLine size={40}/>
                    <p className="mt-4">Drag and Drop your file here, or click to select</p>
                </div>
                // 
            }
        </div>
    )
}