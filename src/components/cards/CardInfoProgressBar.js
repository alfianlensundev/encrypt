import React from 'react'
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


export default function CardInfoProgressBar({percentage = 0,...props}){
    return (
        <div className="w-full flex py-4 px-4 bg-indigo-100 hover:shadow-lg cursor-pointer rounded-lg">
            <div className="h-10 w-10 flex items-center justify-center">
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0.25,
                    
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                    
                        // Text size
                        textSize: '35px',
                    
                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 0.5,
                    
                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',
                    
                        // Colors
                        pathColor: `rgba(57, 106, 252, ${percentage / 100})`,
                        textColor: '#396afc',
                        trailColor: '#fff',
                        backgroundColor: '#3e98c7',
                    })}
                    />
            </div>
            <div className="flex-1 text-indigo-700 px-4 items-center flex flex-col">
                <div className="w-full font-medium text-sm">
                    PDF 
                </div>
                <div className="w-full font-light text-sm">
                    Total : 20 File 
                </div>
            </div>
        </div>
    )
}