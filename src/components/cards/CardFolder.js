import React from 'react'
import Ripple from 'react-ripples'
import {AiFillStar, AiFillFileWord} from 'react-icons/ai'

export default function CardFolder({...props}){
    return (
        <div className="w-full text-indigo-800 ">
            <div className="w-full relative flex bg-white px-2 py-4 rounded-lg hover:shadow-lg transition cursor-pointer">
                <div className="pl-2 pr-4 flex items-center justify-center">
                    <AiFillFileWord size={30}/>
                </div>
                <div className="flex-1">
                    <div className="w-full font-medium text-sm ">
                        Daftar Mahasiswa 
                    </div>
                    <div className="w-full font-light text-xs mt-2">
                        Ukuran File: 15MB
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    
                </div>
            </div>
        </div>
    )
}