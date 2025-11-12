/**
 * Example of how to use `Rect` component
 * https://github.com/atmulyana/react-packages
 */
import React from 'react';
import Rect, {FlexImage, styles} from '@react-packages/rect';

export function meta() {
    return [
        {title: "Rect Component Demo"}
    ];
}

export default function RectDemo() {
    return <div className='p-4 h-screen'> 
        <div className='inline-flex flex-col items-start border border-blue-500 h-1/2 p-2 gap-2 mb-8'>
            <Rect className='flex-1 border border-gray-500 px-2 py-1' />
            <Rect className='flex-1 border border-gray-500 px-2 py-1' ratioX={3} ratioY={2}>
                <img style={styles.centeredImage} src='https://www.pngmart.com/files/23/React-Logo-PNG.png' />
            </Rect>
            <Rect className='flex-1 border border-gray-500 px-2 py-1' ratioX={2} ratioY={3}>
                <img style={styles.centeredImage} src='https://www.pngmart.com/files/23/React-Logo-PNG.png' />
            </Rect>
            <Rect className='flex-1 border border-gray-500 px-2 py-1'>
                <img style={styles.centeredImage} src='https://www.pngmart.com/files/23/React-Logo-PNG.png' />
            </Rect>
            <FlexImage
                bg={{className:'flex-1 border border-gray-500 px-2 py-1'}}
                src='https://www.pngmart.com/files/23/React-Logo-PNG.png'
                vertical
            />
            <Rect className='flex-1 border border-gray-500 px-2 py-1' />
        </div>
        
        <div className='flex items-start border border-blue-500 w-1/3 p-2 gap-2'>
            <Rect className='flex-1 border border-gray-500 px-2 py-1' />
            <Rect className='flex-1 border border-gray-500 px-2 py-1' ratioX={3} ratioY={2}>
                <img style={styles.centeredImage} src='https://www.pngmart.com/files/23/React-Logo-PNG.png' />
            </Rect>
            <Rect className='flex-1 border border-gray-500 px-2 py-1' ratioX={3} ratioY={4}>
                <img style={styles.centeredImage} src='https://www.pngmart.com/files/23/React-Logo-PNG.png' />
            </Rect>
            <Rect className='flex-1 border border-gray-500 px-2 py-1'>
                <img style={styles.centeredImage} src='https://www.pngmart.com/files/23/React-Logo-PNG.png' />
            </Rect>
            <FlexImage
                bg={{className:'flex-1 border border-gray-500 px-2 py-1'}}
                src='https://www.pngmart.com/files/23/React-Logo-PNG.png'
                vertical={false}
            />
            <Rect className='flex-1 border border-gray-500 px-2 py-1' />
        </div>
    </div>;
}