'use client';
/** 
 * https://github.com/atmulyana/react-packages
 **/
import React from 'react';
import {emptyObject} from 'javascript-common';
import type {TStyle} from '@react-packages/common';
import Rect, {styles as rectStyles} from '@react-packages/rect';

type Params = {
    noImage?: React.ReactNode,
    ratioX?: number,
    ratioY?: number,
    styles?: {
        background?: TStyle,
        content?: TStyle,
    },
};

const defaults = {
    noImage: <svg viewBox="0 0 32 32" fill="" stroke='currentColor' strokeWidth={0.5} style={rectStyles.fill}>
        <rect fill="#6B7280" height={32} stroke='#6B7280' width={32} />
        <path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z"/>
        <path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z"/>
    </svg>,
    styles: {
        // background: {
        //     style: {
        //         backgroundColor: '#6B7280',
        //     },
        // },
        content: {
            style: rectStyles.centeredContent,
        }
    } as NonNullable<Params['styles']>,
};

export function createComponent(parameters?: Params) {
    let {
        noImage = defaults.noImage,
        ratioX = 1,
        ratioY = 1,
        styles = defaults.styles,
    } = parameters ?? (emptyObject as Params);
    ratioX = typeof(ratioX) != 'number' || isNaN(ratioX) ? 1 : Math.floor(ratioX);
    if (ratioX < 1) ratioX = 1;
    ratioY = typeof(ratioY) != 'number' || isNaN(ratioY) ? 1 : Math.floor(ratioY);
    if (ratioY < 1) ratioY = 1;

    function Thumbnail({className, image, style}: {image?: HTMLImageElement | null} & TStyle) {
        const canvas = React.useRef<HTMLCanvasElement>(null);
        const [contentRendered, setContentRendered] = React.useState(false);
        const [noThumbnail, setNoThumbnail] = React.useState(!image);

        React.useEffect(() => {
            setNoThumbnail(!image);
        }, [image]);
        
        React.useEffect(() => {
            if (!canvas.current) return;
            const canv = canvas.current;
            const canvCont = canvas.current.parentElement?.parentElement as HTMLElement;
            const maxHeight = canvCont.offsetHeight,
                  maxWidth = canvCont.offsetWidth;
            if (image) {
                image.decode().then(() => {
                    const imgHeight = image.naturalHeight, imgWidth = image.naturalWidth;
                    let width = maxHeight * imgWidth / imgHeight,
                        height = maxWidth * imgHeight / imgWidth;
                    if (height > maxHeight) {
                        height = maxHeight;
                    }
                    else if (width > maxWidth) {
                        width = maxWidth;
                    }
                    else {
                        if (maxHeight - height > maxWidth - width) {
                            height = maxHeight;
                        }
                        else {
                            width = maxWidth;
                        }
                    }
                    
                    canv.height = height;
                    canv.width = width;
                    const ctx = canv.getContext('2d');
                    ctx?.drawImage(image, 0, 0, imgWidth, imgHeight, 0, 0, width, height);
                }).catch(() => setNoThumbnail(true));
            }
            else {
                setNoThumbnail(true);
            }
        }, [noThumbnail, contentRendered]);

        return <div className={className} style={style}>
            <Rect
                {...styles.background}
                onRendered={isRendered => setContentRendered(isRendered)}
                ratioX={ratioX}
                ratioY={ratioY}
            >
                {noThumbnail ? noImage : <div {...styles.content}>
                    <canvas ref={canvas} height={1} width={1}>
                    </canvas>
                </div>}
            </Rect>
        </div>
    }
    return Thumbnail;
}

const Thumbnail = createComponent();
export default Thumbnail;