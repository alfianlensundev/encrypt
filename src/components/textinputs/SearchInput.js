import React, { Component } from 'react'
import {IoMdSearch} from 'react-icons/io'

export default class SearchInput extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="w-full h-10 rounded-full bg-gray-300 overflow-hidden flex">
                <div className="pl-4 h-full bg-transparent flex text-indigo-500 items-center justify-center">
                    <IoMdSearch size={18}/>
                </div>
                <input 
                    className="w-full h-full bg-transparent outline-none px-4 text-sm font-light"
                    placeholder="Ketik untuk mencari"
                />
            </div>
        )
    }
}