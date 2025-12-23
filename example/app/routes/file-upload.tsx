/**
 * Example of how to use `FileUpload` component
 * https://github.com/atmulyana/react-packages
 */
import React from 'react';
import {emptyObject} from 'javascript-common';
import {extendStyle} from '@react-packages/common';
import FileUpload, {createInput} from '@react-packages/file-upload';

const FileUpload2 = createInput({
    //ListPopup: null,
    moreFile: function({count}) {
        return <>
            <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className='h-4 w-4'
            >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <div
                className={`absolute bottom-px left-0.5 rounded-full p-px bg-white dark:bg-black
                text-gray-700 dark:text-gray-300 text-xs leading-3 font-extrabold`}
            >{count}</div>
        </>;
    },
    styles: {
        audio: {
            className: 'h-full w-full flex items-center justify-stretch px-8',
        },
        bgView: {
            className: 'bg-gray-500 grow -mx-8 rounded-sm overflow-hidden',
        },
        bgViewSingle: {
            className: 'mx-0',
        },
        buttonMore: {
            className: 'relative flex-none border rounded-r-sm cursor-pointer -ml-px px-1 py-0.5',
        },
        buttonNav: {
            className: 'file-upload-btn-nav',
        },
        container: {
            className: 'flex flex-col-reverse items-stretch gap-0.5 max-w-80',
        },
        containerView: {
            className: 'file-upload-view flex items-center',
        },
        fileItem: {
            className: 'cursor-pointer px-2',
        },
        fileItemViewed: {
            className: 'bg-blue-500 text-white list-disc',
        },
        fileItemText: {
            className: 'inline-block align-top',
        },
        fileList: {
            className: `bg-white dark:bg-black text-black dark:text-white
            border border-gray-500 outline-gray-300 dark:outline-gray-700 outline-2 px-1 py-0.5
            list-inside list-[circle]`,
        },
        fileListBackdrop: {
            className: 'bg-black dark:bg-white opacity-50 -z-10',
        },
        fileName: {
            className: 'border rounded-l-sm cursor-pointer grow overflow-hidden text-ellipsis whitespace-nowrap px-1 py-0.5',
        },
        fileNameSingle: {
            className: 'rounded-r-sm',
        },
        image: {
            className: 'h-full w-full object-contain object-center',
        },
        input: {
            className: 'flex',
        },
        text: {
            className: `absolute left-0 top-0 right-0 bottom-0
            bg-white dark:bg-black text-black dark:text-white
            border-2 border-gray-500 overflow-auto p-1 text-xs`,
        },
        video: {
            className: 'h-full w-full',
        },
        onLoad(styles) {
            const ua = window.navigator.userAgent.toLowerCase();
            const idxWk = ua.indexOf('webkit');
            const wkVer = parseInt(ua.substring(idxWk + "webkit/".length));
            styles.fileItemText = extendStyle(
                styles.fileItemText ?? emptyObject,
                {className: (
                    idxWk < 0 ? '-ms-0.5' :
                    wkVer >= 600 ? '-ms-1.5' : '-ms-3'
                )}
            );
        },
    }
});

export function meta() {
    return [
        {title: "FileUpload Component Demo"}
    ];
}

export function links() {
    return [
        {
            rel: "stylesheet",
            href: "/file-upload.css",
        },
    ];
}

export default function FileUploadDemo() {
    return <div className='p-4 space-x-2'>
        <FileUpload name='uploadedFiles' multiple className='align-bottom'/>
        <FileUpload2 name='uploadedFiles2' multiple className='align-botoom' />
    </div>;
}