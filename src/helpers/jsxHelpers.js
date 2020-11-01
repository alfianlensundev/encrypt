import React from 'react'
import { RiFileExcel2Line } from 'react-icons/ri';

export const extToIcon = (ext, size = 30) => {
    switch (ext) {
        case 'xlsx':
            return <RiFileExcel2Line size={size} className="text-green-500"/>
            break;
    
        default:
            return null
            break;
    }
}