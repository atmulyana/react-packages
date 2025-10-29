/**
 * Example of how to use `Keywords` component
 * https://github.com/atmulyana/react-packages
 */
import React from 'react';
import {emptyArray} from 'javascript-common';
import Keywords1, {createInput} from "@react-packages/keywords";
const Keywords2 = createInput({
    // nextKeys: ['ArrowDown', 'Down'],
    // prevKeys: ['ArrowUp', 'Up'],
    styles: {
        buzzedItemBox: {
            className: 'animate-ping !border-yellow-500',
        },
        close: {
            className: 'ml-1.5 font-extrabold outline-0 !no-underline',
        },
        container: {
            className: `flex flex-wrap gap-1 w-full h-auto py-1.5 px-3 text-base
            border border-solid rounded-sm border-gray-600 dark:border-gray-400
            bg-clip-border bg-white dark:bg-black text-gray-600 dark:text-gray-400`,
        },
        itemsBox: {
            className: `flex flex-none border-solid border-2 border-gray-200 dark:border-gray-800 rounded-sm
            bg-gray-200 dark:bg-gray-800 has-focus:border-blue-500 px-1 py-0.5 h-auto leading-none cursor-default`,
        },
        inputText: {
            className: `block flex-1 border-solid border-2 border-transparent rounded-sm bg-transparent
            outline-0 outline-none leading-none bg-transparent bg-clip-border h-auto p-0.5 min-w-9`,
        },
        word: {
            className: 'cursor-default',
        }
    }
});

export function meta() {
    return [
        {title: "Keywords Component Demo"}
    ];
}

export default function KeywordsDemo() {
    const [keywords, setKeywords] = React.useState(emptyArray);
    return <form
        className='p-4'
        onSubmit={ev => {
            ev.preventDefault();
            const formData = new FormData(ev.target as HTMLFormElement);
            alert('Keywords 1: ' + (formData.getAll('keywords')).join(', ') + '\n' +
                  'Keywords 2: ' + keywords.join(', ')
            );
        }}
    >
        <div className='mb-4'>
            <label className='block'>Keywords 1 (Default CSS)</label>
            <Keywords1 name='keywords' />
        </div>
        <div className='mb-4'>
            <label className='block'>Keywords 2 (Tailwind CSS)</label>
            <Keywords2 onChange={val => setKeywords(val)} />
        </div>
        <button className='bg-blue-500 text-white'>Submit</button>
    </form>;
}
