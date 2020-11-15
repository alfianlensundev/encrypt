import React from 'react'
import Ripple from 'react-ripples'
import {AiFillStar, AiFillFileWord, AiOutlineCloudDownload} from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'

export default function CardFolder({subject, filesize,ondelete,ondownload,...props}){
    return (
        <div className="w-full text-indigo-800 ">
            <div className="w-full relative flex bg-white px-2 py-4 rounded-lg hover:shadow-lg transition cursor-pointer">
                <div className="pl-2 pr-4 flex items-center justify-center">
                    <AiFillFileWord size={30}/>
                </div>
                <div className="flex-1">
                    <div className="w-full font-medium text-sm ">
                        {subject}
                    </div>
                    <div className="w-full font-light text-xs mt-2">
                        Ukuran File: {filesize}
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    {ondownload && 
                        <Ripple
                            onClick={ondownload}
                            className="w-10 h-10 hover:bg-blue-400 hover:text-white transition text-blue-400 justify-center items-center rounded-lg"
                        >
                            <AiOutlineCloudDownload size={20}/>
                        </Ripple>         
                    }           
                    {ondelete &&
                        
                        <Ripple
                            onClick={ondelete}
                            className="w-10 h-10 hover:bg-red-400 hover:text-white transition text-red-400 justify-center items-center rounded-lg"
                        >
                            <BiTrash size={20}/>
                        </Ripple>                    
                    }
                </div>
            </div>
        </div>
    )
}