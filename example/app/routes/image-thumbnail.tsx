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