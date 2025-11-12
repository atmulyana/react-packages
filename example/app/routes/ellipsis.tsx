/**
 * Example of how to use `Ellipsis` component
 * https://github.com/atmulyana/react-packages
 */
import React from 'react';
import Ellipsis from '@react-packages/ellipsis';

export function meta() {
    return [
        {title: "Ellipsis Component Demo"}
    ];
}

export default function EllipsisDemo() {
    return <div className='p-4 w-full'>
        <div className='mb-6'>Please shrink the browser window to see the <i>ellipsis</i> mark on the texts below:</div>
        
        <h1 className='text-4xl font-extrabold'><Ellipsis>This is a very very long long looong text that can be exceeds one line</Ellipsis></h1>
        <h3 className='text-2xl font-extrabold w-3/4'><Ellipsis>This is a very very long long looong text that can be exceeds one line</Ellipsis></h3>
        <b className='inline-block w-1/2'><Ellipsis>This is a very very long long looong text that can be exceeds one line</Ellipsis></b>
        <div className='flex mb-4'>
            <i className='basis-1/2 shrink-0'><Ellipsis>This is a very very long long looong text that can be exceeds one line</Ellipsis></i>
        </div>
        <div className='flex w-3/4'>
            <div className='basis-1/2 shrink-0 border px-4 py-2 text-center'>
                <Ellipsis>Not very long text which is center aligned</Ellipsis>
            </div>
            <div className='basis-1/2 shrink-0 border px-4 py-2 text-right'>
                <Ellipsis>Not very long text which is right aligned</Ellipsis>
            </div>
        </div>

        <hr className='mt-8'/>
        <div className='mb-6'>The block below is without <code>Ellipsis</code> element. There is a different part.
        Please check it out.</div>

        <h1 className='text-4xl font-extrabold text-ellipsis overflow-hidden whitespace-nowrap'>This is a very very long long looong text that can be exceeds one line</h1>
        <h3 className='text-2xl font-extrabold w-3/4 text-ellipsis overflow-hidden whitespace-nowrap'>This is a very very long long looong text that can be exceeds one line</h3>
        <b className='inline-block w-1/2 text-ellipsis overflow-hidden whitespace-nowrap'>This is a very very long long looong text that can be exceeds one line</b>
        <div className='flex mb-4'>
            <i className='basis-1/2 shrink-0 text-ellipsis overflow-hidden whitespace-nowrap'>This is a very very long long looong text that can be exceeds one line</i>
        </div>
        <div className='flex w-3/4'>
            <div className='basis-1/2 shrink-0 border px-4 py-2 text-center'>
                <div className='text-ellipsis overflow-hidden whitespace-nowrap w-full'>Not very long text which is center aligned</div>
            </div>
            <div className='basis-1/2 shrink-0 border px-4 py-2 text-right text-ellipsis overflow-hidden whitespace-nowrap'>
                Not very long text which is right aligned
            </div>
        </div>
    </div>;
}