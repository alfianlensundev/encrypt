import React, { useState } from 'react'
import Ripple from 'react-ripples'
import {IoIosEye, IoIosEyeOff} from 'react-icons/io'
import passwordStrength from 'check-password-strength'

export default function TextInput({value, onChange, onEnter,ref,onChangePassStr,checkStr,icon, secureText, placeholder}){
    const [showPassword, setShowPassword] = useState(false)
    return(
        <div className="w-full h-10 rounded-lg overflow-hidden flex shadow-neu-input-inset bg-white items-center" 
            style={{
                // backgroundColor: 'rgba(0,0,0,.050)'
            }}
        >
            {icon &&
                <div className="flex justify-center items-center text-blue-700 w-8 h-8 ml-2 rounded-lg shadow-neu-input">
                    {icon}
                </div>
            }
            <input 
                type={secureText && showPassword === false ? 'password' : 'text'}
                style={{
                    backgroundColor: "transparent"
                }}
                className="flex-1 font-light outline-none text-sm font-medium px-4 text-blue-700"
                value={value}
                placeholder={placeholder}
                onKeyDown={e => {
                    if (e.keyCode === 13 && onEnter){
                        onEnter()
                    }
                }}
                onChange={onChange}
            />
            {secureText &&
                <div className="flex justify-center items-center text-blue-700">
                    <Ripple 
                        onClick={() => setShowPassword(!showPassword)}
                        className=" w-8 h-8 mr-2 flex justify-center rounded-lg items-center cursor-pointer shadow-neu-input"
                    >
                        {showPassword ? 
                            <IoIosEyeOff size={15}/>  : 
                            <IoIosEye size={15}/>  
                        }
                        
                    </Ripple>
                </div>
            }
        </div>
    )
}