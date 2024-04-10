//@ts-nocheck
'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useTimerStore } from './store';
import './Countdown.css'
import { MoveUp, MoveVertical } from 'lucide-react';
interface CountdownProps { }
type Props = {

    minVal: number,
    maxVal: number,
    step: number,
    // forTask?: boolean,
    // forBreak?: boolean
}


const Countdown: any = ({ minVal, maxVal, step }: Props) => {
    const [minutes, setMinutes] = useState<number>(1); // Initial state for minutes
    const [seconds, setSeconds] = useState<number>(1500); // Initial state for seconds
    const [extraSeconds, setExtraSeconds] = useState<number>(0)
    const [isRunning, setIsRunning] = useState<boolean>(false); // Flag for timer state
    const { toggleForTask, toggleForBreak, forBreak, forTask } = useTimerStore()

    // Function to handle user input for minutes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMinutes = parseInt(event.target.value, 10);
        if (!isNaN(newMinutes)) {
            setMinutes(newMinutes);
            setSeconds(newMinutes * 60); // Reset seconds when minutes change
        }
    };
    const handleExtraSecondChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSeconds = parseInt(event.target.value, 10);
        if (!isNaN(newSeconds)) {
            setExtraSeconds(newSeconds);
            setSeconds(seconds => seconds + 1)
        }
    }

    // Function to handle start/stop of countdown
    const handleStartStop = () => {

        setIsRunning(!isRunning);
    };

    // Function to handle countdown logic
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isRunning && seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => Math.max(prevSeconds - 1, 0)); // Decrement seconds
                if (seconds === 1) {
                    toggleForBreak()
                    clearInterval(intervalId);
                    setIsRunning(false); // Stop timer and set flag to false when reaches 0 seconds
                }
            }, 1000);
        } else {
            clearInterval(intervalId); // Clear interval if not running or seconds reach 0
        }

        // Cleanup function to stop timer on unmount
        return () => clearInterval(intervalId);
    }, [seconds, isRunning]); // Re-run useEffect when seconds or isRunning changes

    // Function to format time for display
    const formattedTime = `${Math.floor(seconds / 60)}:${seconds % 60}`.padStart(5, '0');
    const handleSlider = (value: number) => {
        setMinutes(value);
        setSeconds(value * 60);
        console.log(value)
    }


    return (
        <div className='w-[80%] h-[40vh] flex flex-row justify-center'>
            <div className='w-[60%] flex flex-col gap-y-4 items-center justify-center'>
                <div className={cn(isRunning ? 'running-time-but-for-big-div' : '', 'dur flex flex-col items-center')}>
                    <h2 className='mb-3 text-lg font-semibold'>Set Countdown (minutes):</h2>

                    <Slider max={maxVal} step={step} defaultValue={[25]} disabled={isRunning} onValueChange={handleSlider}
                        className={cn(isRunning ? 'opacity-50 cursor-not-allowed z-10' : '', 'mx-auto')} />

                    <div className='w-[40vw] mt-2 flex justify-between'>
                        <div className='flex flex-col items-center'>
                            <MoveUp className='h-5' />0
                        </div>
                        <div className='flex flex-col items-center'>
                            <MoveUp className='h-5' />{maxVal / 4}
                        </div>
                        <div className='flex flex-col items-center'>
                            <MoveUp className='h-5' />{maxVal / 2}
                        </div>
                        <div className='flex flex-col items-center'>
                            <MoveUp className='h-5' />{maxVal * 0.75}
                        </div>
                        <div className='flex flex-col items-center'>
                            <MoveUp className='h-5' />{maxVal}
                        </div>

                    </div>
                </div>
                <Button onClick={handleStartStop} size="lg" variant="secondary" className='z-[100]'>{isRunning ? 'Stop' : 'Start'}</Button>

            </div>
            <div className={cn(isRunning ? 'running-time' : '', 'dur w-[30%] flex flex-col justify-center items-center text-3xl')}>
                <h1>{formattedTime}</h1>
            </div>

        </div>
    );
};

export default Countdown;
