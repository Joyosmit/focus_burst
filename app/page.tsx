//@ts-nocheck
'use client'
import Header from "@/components/Header"
import { Suspense } from "react"
import Loading from "./loading"
import Countdown from "@/app/Countdown"
import { useTimerStore } from "./store"
import Countdown_Break from "./Countdown_Break"


const page = () => {
    // const { forTask, forBreak, setForTask, setForBreak, toggleForTask, toggleForBreak } = useTimerStore();

    return (
        <Suspense fallback={<Loading/>}>
            <div className="w-full min-h-full flex flex-col items-center">
                <Header /> 
                <Countdown step={1} minVal={0} maxVal={100}/>
                <Countdown_Break step={0.5} minVal={0} maxVal={10}/>
                
            </div>
        </Suspense>
    )
}
export default page
