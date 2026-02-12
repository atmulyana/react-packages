/**
 * https://github.com/atmulyana/react-packages
 */
import React from 'react';
import {emptyArray, emptyObject, emptyString} from 'javascript-common';
import {createInput} from '@react-packages/file-upload';
import {createComponent} from '@react-packages/image-thumbnail';
import '../inputs.css';

const FileInput = createInput({
    ListPopup: null,
    maxViewSize: Number.POSITIVE_INFINITY,
    moreFile: null,
    styles: {
        bgView: emptyObject,
        buttonMore: emptyObject,
        buttonNav: emptyObject,
        container: {
            className: 'flex',
        },
        containerView: {
            className: 'absolute opacity-0 pointer-events-none -z-[1000] w-32',
        },
        fileName: {
            className: 'input cursor-pointer flex-1 overflow-hidden text-ellipsis whitespace-nowrap',
        },
        image: {
            className: 'source-image'
        },
        input: {
            className: 'flex flex-1',
        },
    },
});
const Thumbnail = createComponent({
    styles: {
        content: {
            className: 'output-image',
        }
    }
});

export function meta() {
    return [
        {title: "Example: Image Watrmark"}
    ];
}

function number(s: any) {
    return Math.floor( Math.abs( parseFloat(s) ) );
}

function numberVal(value: number) {
    return isNaN(value) ? emptyString : value;
}

function changeVal(ev: React.ChangeEvent<HTMLInputElement>) {
    return number(ev.target.value);
}

type Params = {
    alignHort: CanvasTextAlign,
    alignVert: CanvasTextBaseline,
    alpha: number,
    angle: number,
    color: string,
    fontSize: number,
    fontStyle: string,
    fontType: string,
    imgRef: HTMLImageElement,
    text: string,
    width: number,
    x: number,
    y: number,
};

export default function ImageWatermarkPage() {
    const formRef = React.useRef<HTMLFormElement>(null);
    const saveRef = React.useRef<HTMLAnchorElement>(null);
    const [alignHort, setAlignHort] = React.useState<CanvasTextAlign>('center');
    const [alignVert, setAlignVert] = React.useState<CanvasTextBaseline>('middle');
    const [alpha, setAlpha] = React.useState(30);
    const [angle, setAngle] = React.useState(45);
    const [color, setColor] = React.useState('#808080');
    const [file, setFile] = React.useState<File | null>(null);
    const [fileName, setFileName] = React.useState(emptyString);
    const [fontSize, setFontSize] = React.useState(64);
    const [fontStyle, setFontStyle] = React.useState('normal');
    const [fontType, setFontType] = React.useState('sans-serif');
    const [width, setWidth] = React.useState(NaN);
    const [text, setText] = React.useState('SPECIMEN');
    const [x, setX] = React.useState(NaN);
    const [y, setY] = React.useState(NaN);
    const [params, setParams] = React.useState<Params | null>(null);

    React.useEffect(() => {
        if (formRef.current) formRef.current.addEventListener('focusin', ev => {
            const target = ev.target as (HTMLInputElement | null);
            if (target?.tagName == 'INPUT' && (target?.type == 'text' || target?.type == 'number')) {
                target.select();
            }
        });
    }, emptyArray);

    return <>
        <p className='pt-4 px-4'>
            This app is to decorate an image with a watermark text. (<b>NOTE:</b> No data submitted to the server)
        </p>
        <form ref={formRef} className='p-4' onSubmit={ev => ev.preventDefault()}>
            <div className='flex gap-4 items-center'>
                <span className='whitespace-nowrap'>
                    <label>File:&nbsp;</label>
                    <FileInput
                        accept="image/*"
                        onChange={ev => {
                            const files = (ev.target as HTMLInputElement).files;
                            if (!files || files.length < 1) setFile(null);
                            else setFile(files.item(0));
                        }}
                    />
                </span>
                <span className='whitespace-nowrap'>
                    <label>Output Width:&nbsp;</label>
                    <input className='input w-24' type='number' min={0} size={4} value={numberVal(width)} onChange={ev => setWidth(changeVal(ev))} /> px
                </span>
                
                <span className='whitespace-nowrap'>
                    <label>Output Height:&nbsp;</label>
                    <i>Auto</i>
                </span>
            </div>
            <fieldset className='border-4 border-double border-gray-400 mt-4 p-2 max-w-5xl'>
                <legend className='px-1'>Watermark</legend>
                <div className='flex gap-4 items-start'>
                    <div className='flex flex-col flex-1 items-stretch'>
                        <label>Text:</label>
                        <input type='text' className='input' value={text} onChange={ev => setText(ev.target.value)} />
                    </div>
                    <div className='flex flex-col flex-none items-stretch'>
                        <label>Color:</label>
                        <input type='color' className='input' value={color} onChange={ev => setColor(ev.target.value)} />
                    </div>
                    <div className='flex flex-col flex-none items-stretch'>
                        <label>Transparency:</label>
                        <input type='number' className='input w-24' min={10} max={100} size={3}
                            value={alpha}
                            onChange={ev => setAlpha(changeVal(ev))}
                            onBlur={ev => {
                                let alp = number(ev.target.value);
                                if (isNaN(alp) || alp < 10) alp = 10;
                                else if (alp > 100) alp = 100;
                                setAlpha(alp);
                            }}
                        />
                    </div>
                </div>
                <div className='flex gap-4 items-start mt-2'>
                    <div className='flex flex-col flex-none items-stretch'>
                        <label className='whitespace-nowrap'>X Coord:</label>
                        <input type='number' className='input w-24' min={0} size={4} value={numberVal(x)} onChange={ev => setX(changeVal(ev))} />
                    </div>
                    <div className='flex flex-col flex-none items-stretch'>
                        <label className='whitespace-nowrap'>Y Coord:</label>
                        <input type='number' className='input w-24' min={0} size={4} value={numberVal(y)} onChange={ev => setY(changeVal(ev))} />
                    </div>
                    <div className='flex flex-col flex-none items-stretch'>
                        <label className='whitespace-nowrap'>Horizontal Align:</label>
                        <select className='input' value={alignHort} onChange={ev => setAlignHort(ev.target.value as CanvasTextAlign)}>
                            <option>left</option>
                            <option>center</option>
                            <option>right</option>
                        </select>
                    </div>
                    <div className='flex flex-col flex-none items-stretch'>
                        <label className='whitespace-nowrap'>Vertical Align:</label>
                        <select className='input' value={alignVert} onChange={ev => setAlignVert(ev.target.value as CanvasTextBaseline)}>
                            <option>top</option>
                            <option>middle</option>
                            <option value="alphabetic">bottom</option>
                        </select>
                    </div>
                    <div className='flex flex-col flex-none items-stretch'>
                        <label>Angle:</label>
                        <span className='flex gap-0.5'>
                            <input type='number' className='input w-20' min={0} max={360}
                                value={angle}
                                onChange={ev => {
                                    let ang = parseFloat(ev.target.value || '0');
                                    if (isNaN(ang)) return;
                                    else if (ang < 0) ang = 0;
                                    else if (ang > 360) ang = 360;
                                    setAngle(ang);
                                }}
                            />
                            <sup className='relative top-1'>o</sup>
                        </span>
                    </div>
                </div>
                <fieldset className='border border-gray-400 mt-2 p-2'>
                    <legend>Font</legend>
                    <div className='flex gap-4'>
                        <span className='flex items-center whitespace-nowrap'>
                            <label>Type:&nbsp;</label>
                            <select className='input' value={fontType} onChange={ev => setFontType(ev.target.value)}>
                                <option>serif</option>
                                <option>sans-serif</option>
                                <option>monospace</option>
                                <option>cursive</option>
                                <option>fantasy</option>
                                <option>system-ui</option>
                            </select>
                        </span>
                        <span className='flex items-center whitespace-nowrap'>
                            <label>Size:&nbsp;</label>
                            <input type='number' className='input w-24' min={0} size={4}
                                value={numberVal(fontSize)} onChange={ev => setFontSize(changeVal(ev))} />&nbsp;px
                        </span>
                        <span className='flex items-center whitespace-nowrap'>
                            <label>Style:&nbsp;</label>
                            <select className='input' value={fontStyle} onChange={ev => setFontStyle(ev.target.value)}>
                                <option>normal</option>
                                <option>bold</option>
                                <option>italic</option>
                                <option>bold italic</option>
                            </select>
                        </span>
                    </div>
                </fieldset>
            </fieldset>
            <div className='flex gap-4 mt-4'>
                <button type='button' className='btn' onClick={() => {
                    if (!file) {
                        //setParams(null);
                        alert('Please select an image file!');
                        return;
                    }
                    const imgRef = formRef.current?.querySelector('.source-image') as (HTMLImageElement | null);
                    if (!imgRef) setParams(null);
                    else {
                        setParams({
                            alignHort,
                            alignVert,
                            alpha,
                            angle,
                            color,
                            fontSize,
                            fontStyle,
                            fontType,
                            imgRef,
                            text,
                            width,
                            x,
                            y
                        });
                        const dotIdx = file.name.lastIndexOf('.');
                        setFileName(dotIdx < 0
                            ? file.name + '-copy'
                            : file.name.substring(0, dotIdx) + '-copy' + file.name.substring(dotIdx)
                        );
                    }
                }}>Update</button>
                <button type='button' className='btn'
                    onClick={() => {
                        if (!saveRef.current || !formRef.current) return;
                        const canvas = (formRef.current.nextSibling as HTMLDivElement)?.querySelector('.output-image canvas') as (HTMLCanvasElement | null);
                        if (!canvas) return;
                        saveRef.current.href = canvas.toDataURL();
                        saveRef.current.download = fileName;
                        saveRef.current.click();  
                    }}
                >Save</button>
                <a ref={saveRef} href='#' className='hidden'>&nbsp;</a>
            </div>
        </form>
        <div className='px-4 pb-4'>
            <h3 className='font-bold text-lg'>Output:</h3>
            {params && <OutputImage {...params} />}
        </div>
    </>;
}

const OutputImage = React.memo(function OutputImage({
    alignHort,
    alignVert,
    alpha,
    angle,
    color,
    fontSize,
    fontStyle,
    fontType,
    imgRef,
    text,
    width,
    x,
    y
}: Params) {
    const ts = new Date().getTime();
    const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null);
    const [className, setClassName] = React.useState('ts-' + ts);

    const srcWidth = imgRef.naturalWidth || imgRef.width,
          srcHeight = imgRef.naturalHeight || imgRef.height;
    if (isNaN(width)) width = srcWidth;
    if (isNaN(x)) x = Math.floor(width / 2);
    if (isNaN(y)) {
        const height = Math.round(srcHeight / srcWidth * width);
        y = Math.floor(height / 2);
    }

    React.useEffect(() => {
        setCanvas(null);
        setClassName('ts-' + ts);
    }, [
        alignHort,
        alignVert,
        alpha,
        angle,
        color,
        fontSize,
        fontStyle,
        fontType,
        imgRef,
        text,
        width,
        x,
        y
    ]);

    React.useEffect(() => {
        if (!canvas) return;
        try {
            const ctx = canvas.getContext('2d');
            if (!ctx) throw 'Canvas 2D context is `null`';
            
            const font: string[] = [fontStyle];
            if (!isNaN(fontSize)) font.push(fontSize + 'px');
            font.push(fontType);
            ctx.font = font.join(' ');

            ctx.fillStyle = color;
            ctx.globalAlpha = alpha / 100;
            ctx.textAlign = alignHort;
            ctx.textBaseline = alignVert;
            
            ctx.translate(x, y);
            ctx.rotate((angle * Math.PI) / 180);
            
            ctx.fillText(text, 0, 0);

            //To revert the coord transformation for the next rendering
            ctx.rotate((-angle * Math.PI) / 180);
            ctx.translate(-x, -y);
        }
        catch (ex) {
            console.error(ex);
            alert('Error happened!');
        }
    }, [canvas]);

    return <Thumbnail
        className={className /* Dummy className to force the `Thumbnail` to re-render when assigned a different `className` */}
        image={imgRef}
        onDrawn={canvas => setCanvas(canvas)}
        ratioX={srcWidth}
        ratioY={srcHeight}
        style={{width}}
    />;
});