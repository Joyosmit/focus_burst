'use client'

import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider'; // Assuming Shadcn Slider import path

const SliderValue = () => {
    const [currentValue, setCurrentValue] = useState<number>(50); // Initial value

    const handleChange = (value) => {
        console.log(value)
        setCurrentValue(value);
    };

    return (
        <div>
            <Slider min={1} max={100} step={1} defaultValue={[25]} onValueChange={handleChange} />
            <p>Current Value: {currentValue}</p>
        </div>
    );
};

export default SliderValue;
