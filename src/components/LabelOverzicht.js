import React from 'react';
import decideColor from './ColorGiver';

const labels = ["School", "Werk", "Vrije tijd"];

export default function LabelOverzicht() {
    return (
        <div className='border border-gray-300'>
            {
                labels.map(label => {
                    return (
                    <p key={label} className={`${decideColor(label)} m-2 rounded-md text-center`}>
                        {label}
                    </p>
                    )
                })
            }
        </div>
    );
}
