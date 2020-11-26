import React from 'react'
import Ripple from 'react-ripples'
import { AiFillFileWord, AiOutlineCloudDownload} from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { extToIcon } from '../../helpers/jsxHelpers'

export default function CardFolder({subject, ext,filesize,ondelete,ondownload,enctime,dectime,encrypt_status = 1,...props}){
    return (
        <div className="w-full text-indigo-800 ">
            <div className="w-full relative flex bg-white px-2 py-4 rounded-lg hover:shadow-lg transition cursor-pointer">
                <div className="pl-2 pr-4 flex items-center justify-center">
                    {extToIcon(ext)}
                </div>
                <div className="flex-1">
                    <div className="w-full font-medium text-sm ">
                        {subject}
                    </div>
                    <div className="w-full font-light text-xs mt-2">
                        File Size: {filesize}
                    </div>
                    {enctime &&
                        <div className="w-full font-light text-xs">
                            {encrypt_status === 1 ? 'Encryption' : 'Decryption'} Time: {encrypt_status === 1 ? enctime: dectime} second
                        </div>
                    }
                </div>
                <div className="flex items-center justify-end">
                    {ondownload && 
                        <Ripple
                            onClick={ondownload}
                            className="cursor-pointer w-10 h-10 mr-2 hover:bg-blue-400 hover:text-white transition text-blue-400 justify-center items-center rounded-lg"
                        >
                            <AiOutlineCloudDownload size={20}/>
                        </Ripple>         
                    }           
                    {ondelete &&
                        
                        <Ripple
                            onClick={ondelete}
                            className="cursor-pointer w-10 h-10 hover:bg-red-400 hover:text-white transition text-red-400 justify-center items-center rounded-lg"
                        >
                            <BiTrash size={20}/>
                        </Ripple>                    
                    }
                </div>
            </div>
        </div>
    )
}