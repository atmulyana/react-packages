/**
 * Example of how to use `Thumbnail` component
 * https://github.com/atmulyana/react-packages
 */
import React from 'react';
import Thumbnail/*, {createComponent}*/ from '@react-packages/image-thumbnail';
// const Thumbnail = createComponent({
//     ratioX: 3,
//     ratioY: 2,
//     styles: {
//         background: {
//             className: 'bg-gray-500'
//         },
//         content: {
//             className: 'w-full h-full flex items-center justify-center'
//         }
//     }
// });

export function meta() {
    return [
        {title: "Thumbnail Component Demo"}
    ];
}

/**
 * To know whether there is a double request or not, please open a terminal/command console and then change
 * the working directory to where you clone "react-packages" and then execute the following command:
 *  > node example/image-server.js
 * (On Windows, alter `/` with `\`). The script will run a simple "image" server.
 * Change the value `imageUrl` variable below to "http://localhost:1234/image".
 * On the console where you run the "image" server, there will be a log every time a request come. Please
 * checkout when you use `Thumbnail` and when you don't.
 **/
const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png";
//const imageUrl = "http://localhost:1234/image";

export default function ThumbnailDemo() {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const [visible, setVisible] = React.useState(false);
    const [thumb, setThumb] = React.useState(true);

    return <div className='p-4 space-x-2'>
        <img ref={imgRef} src={imageUrl} className='w-64 h-auto inline-block align-middle' />
        <Thumbnail image={null} className='w-64 inline-block align-middle' />
        <br/><br/>
        <button onClick={() => setVisible(v => !v)} className='border cursor-pointer px-4 py-2'>Show/Hide</button>
        <input type='checkbox' checked={thumb} onChange={ev => setThumb(ev.target.checked)} />&nbsp;Use&nbsp;Thumbnail
        <br/><br/>
        {visible && (thumb
            ? <Thumbnail image={imgRef.current} className='w-24' /> /* won't trigger request for non-cached image */
            : <img src={imageUrl} className='w-24 h-24 object-center object-contain'/> /* trigger request for non-cached image */
        )}
    </div>;
}
/* <p className='p-4'>
<svg viewBox="0 0 24 24" stroke="currentColor" className='w-16 h-16' strokeWidth={0.5}>
	<path d="M7.828 5l-1-1H22v15.172l-1-1v-.69l-3.116-3.117-.395.296-.714-.714.854-.64a.503.503 0 0 1 .657.046L21 16.067V5zM3 20v-.519l2.947-2.947a1.506 1.506 0 0 0 .677.163 1.403 1.403 0 0 0 .997-.415l2.916-2.916-.706-.707-2.916 2.916a.474.474 0 0 1-.678-.048.503.503 0 0 0-.704.007L3 18.067V5.828l-1-1V21h16.172l-1-1zM17 8.5A1.5 1.5 0 1 1 15.5 7 1.5 1.5 0 0 1 17 8.5zm-1 0a.5.5 0 1 0-.5.5.5.5 0 0 0 .5-.5zm5.646 13.854l.707-.707-20-20-.707.707z"/>
</svg>
    </p>
    <p className='p-4'>
<svg viewBox="0 0 32 32" stroke='currentColor' className='w-16 h-16' strokeWidth={0.5}>
    <path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z"/>
    <path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z"/>
</svg>
    </p> */