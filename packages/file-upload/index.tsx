'use client';
/** 
 * https://github.com/atmulyana/react-packages
 **/
import React, {type CSSProperties} from 'react';
import {emptyArray, emptyObject, emptyString} from 'javascript-common';
import {setRef} from 'reactjs-common';
import {extendStyle, type TStyle} from '@react-packages/common';
import Rect, {styles as rectStyles} from '@react-packages/rect';

type ListPopupProps = {
    files: File[],
    setViewIndex: (index: number) => void,
    setVisible: (visible: boolean) => void,
    viewIndex: number,
    visible?: boolean,
};

type Params = {
    ListPopup?: React.ComponentType<ListPopupProps> | null,
    maxViewSize?: number,
    moreFile?: string | React.ComponentType<{count: number}> | null,
    noFileImage?: React.ReactNode,
    noFileName?: React.ReactNode,
    noViewImage?: React.ReactNode,
    ratioX?: number,
    ratioY?: number,
    styles?: {
        audio?: TStyle,
        bgView: TStyle,
        bgViewSingle?: TStyle,
        buttonMore: TStyle,
        buttonNav: TStyle,
        container: TStyle,
        containerView: TStyle,
        fileItem?: TStyle,
        fileItemViewed?: TStyle,
        fileItemText?: TStyle,
        fileList?: TStyle,
        fileListBackdrop?: TStyle,
        fileName: TStyle,
        fileNameSingle?: TStyle,
        image?: TStyle,
        input: TStyle,
        text?: TStyle,
        video?: TStyle,
        onLoad?: (styles: Omit<NonNullable<Params['styles']>, 'onLoad'>) => void,
    },
}

export type Props = Omit<React.ComponentProps<'input'>, 'type'> & {
    type?: 'file',
};

const gray = '#6a7282';
const defaults = {
    maxViewSize: 10 * 1024 * 1024,
    moreFile: 'more',
    noFileImage: <svg 
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{...rectStyles.absoluteFill, opacity: 0.5}}
    >
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>,
    noFileName: <i>No file selected</i>,
    noViewImage: <svg 
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{...rectStyles.absoluteFill, opacity: 0.5}}
    >
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
        <path
            strokeWidth={1}
            fill="currentColor"
            d="M12.01509627,18.9791746 C12.40494433,18.9791746 12.72097863,19.2922622 12.72097863,19.6784753 C12.72097863,20.0646884 12.40494433,20.377776 12.01509627,20.377776 C11.62524821,20.377776 11.30921392,20.0646884 11.30921392,19.6784753 C11.30921392,19.2922622 11.62524821,18.9791746 12.01509627,18.9791746 Z
            M14.1827155,11.48219134 C14.7596649,12.06011092 14.9556072,12.75942613 14.8818293,13.4800176 C14.8265271,14.0201556 14.4779753,14.5509802 13.9947767,15.0505594 L13.9460794,15.1005594 L13.9460794,15.1005594 L13.8408488,15.2063462 C13.7641308,15.2825287 13.6701753,15.3741416 13.534329,15.5058727 C13.3893855,15.6464238 13.2890121,15.7442705 13.2120648,15.8206852 L13.1115703,15.9218921 C13.0821667,15.9520424 13.0559765,15.9794937 13.0303569,16.006905 C12.82641639,16.2251078 12.76260226,16.3170885 12.72854047,16.4181966 C12.69459728,16.5189526 12.64965619,16.73941 12.60228918,17.0591422 C12.54714237,17.4313887 12.20954705,17.6870941 11.84824894,17.6302762 C11.48695082,17.5734583 11.23876616,17.2256328 11.29391297,16.8533862 C11.35258575,16.4573391 11.4111532,16.1700378 11.47818729,15.9710557 C11.58800251,15.6450833 11.75186564,15.4088935 12.07699042,15.0610316 C12.20092661,14.9284281 12.31857892,14.8121689 12.62440373,14.5156121 C12.85403277,14.2929392 12.95768805,14.1909631 13.0572705,14.0880047 C13.3397662,13.7959324 13.5516497,13.4732459 13.5656029,13.3369643 C13.5996372,13.0045498 13.5199654,12.72020231 13.2601126,12.45991256 C12.9148549,12.11407421 12.49243177,11.95163821 12.06509601,11.9849994 C11.57490635,12.02326746 11.18677184,12.20493363 10.86942647,12.56406039 C10.63826622,12.82565499 10.48192741,13.1361318 10.39737772,13.5061904 C10.31363213,13.8727296 9.9573436,14.0999218 9.60158501,14.0136385 C9.24582642,13.9273551 9.02531631,13.56027 9.10906189,13.1937308 C9.24453674,12.60078215 9.50611003,12.08131772 9.89074945,11.64603703 C10.44488347,11.01894624 11.15005931,10.68888903 11.96509653,10.62526082 C12.77527949,10.56201157 13.5686439,10.86708705 14.1827155,11.48219134 Z"
        />
    </svg>,
    styles: {
        audio: {
            style: {
                ...rectStyles.fill,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'stretch',
                paddingInline: '2rem',
            },
        },
        bgView: {
            style: {
                backgroundColor: gray,
                flex: 1,
                marginInline: '-2rem',
            },
        },
        bgViewSingle: {
            style: {
                marginInline: 0,
            },
        },
        buttonMore: {
            style: {
                borderBottomRightRadius: '0.25rem',
                borderTopRightRadius: '0.25rem',
                borderWidth: '1px',
                cursor: 'pointer',
                flex: 'none',
                marginLeft: '-1px',
                padding: '0.125rem 0.25rem',
            },
        },
        buttonNav: {
            style: {
                backgroundColor: 'black',
                borderRadius: '0.25rem',
                boxSizing: 'border-box',
                color: 'white',
                cursor: 'pointer',
                flex: 'none',
                fontWeight: 'bold',
                opacity: 0.5,
                paddingBlock: '0.25ren',
                textAlign: 'center',
                width: '2rem',
                zIndex: 1,
            },
        },
        container: {
            style: {
                alignItems: 'stretch',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                maxWidth: '20rem',
            },
        },
        containerView: {
            style: {
                alignItems: 'center',
                display: 'flex',
            },
        },
        fileItem: {
            style: {
                cursor: 'pointer',
                paddingInline: '0.5rem',
            },
        },
        fileItemViewed: {
            style: {
                backgroundColor: gray,
                color: 'white',
                listStyleType: 'disc',
            },
        },
        fileItemText: {
            style: {
                display: 'inline-block',
                marginInlineStart: '-0.25rem',
                verticalAlign: 'top',
            },
        },
        fileList: {
            style: {
                backgroundColor: 'white',
                borderWidth: '1px',
                borderColor: gray,
                color: 'black',
                listStylePosition: 'inside',
                listStyleType: 'circle',
                outlineColor: '#d1d5dc',
                outlineWidth: '2px',
                paddingBlock: '0.5rem',
                paddingInline: '0.125rem',
            },
        },
        fileListBackdrop: {
            style: {
                backgroundColor: 'black',
                opacity: 0.5,
                zIndex: -1,
            },
        },
        fileName: {
            style: {
                borderBottomLeftRadius: '0.25rem',
                borderTopLeftRadius: '0.25rem',
                borderWidth: '1px',
                cursor: 'pointer',
                flex: 1,
                overflow: 'hidden',
                padding: '0.125rem 0.25rem',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            },
        },
        fileNameSingle: {
            style: {
                borderBottomRightRadius: '0.25rem',
                borderTopRightRadius: '0.25rem',
            },
        },
        image: {
            style: rectStyles.centeredImage,
        },
        input: {
            style: {
                display: 'flex',
            },
        },
        text: {
            style: {
                ...rectStyles.fill,
                backgroundColor: 'white',
                borderColor: gray,
                borderWidth: '2px',
                color: 'black',
                fontSize: '0.625rem',
                lineHeight: '0.9rem',
                overflow: 'auto',
                padding: '4px',
            },
        },
        video: {
            style: rectStyles.fill,
        },
    } as NonNullable<Params['styles']>,
};

const internalStyles = {
    defaultTop: {
        display: 'inline-block',
        width: '20rem', 
    } as CSSProperties,
    hidden: {
        display: 'none',
    } as CSSProperties,
    fileListContainer: {
        ...rectStyles.absoluteFill,
        alignItems: 'center',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
    } as CSSProperties,
    popup: {
        backgroundColor: 'transparent',
        display: 'fixed',
        height: '100%',
        left: 0,
        top: 0,
        width: '100%',
    } as CSSProperties,
};

declare global {
    interface Window {
        __TextMimeTypes__: string[],
    }
}

const textMimeTypes = new Set([
    'application/json',
    'application/x-javascript',
    'application/x-mpegurl',
    'audio/mpegurl',
    'audio/x-mpegurl',
]);
if (typeof(window) == 'object' && Array.isArray(window.__TextMimeTypes__)) {
    window.__TextMimeTypes__.forEach(type => {
        if (!textMimeTypes.has(type)) textMimeTypes.add(type);
    });
}


export function createInput(parameters?: Params) {
    let {
        ListPopup,
        maxViewSize = defaults.maxViewSize,
        moreFile = defaults.moreFile,
        noFileImage = defaults.noFileImage,
        noFileName = defaults.noFileName,
        noViewImage = defaults.noViewImage,
        ratioX,
        ratioY,
        styles = defaults.styles,
    } = parameters ?? (emptyObject as Params);

    styles.bgViewSingle = extendStyle(styles.bgView, styles.bgViewSingle);
    styles.fileItemViewed = extendStyle(styles.fileItem ?? emptyObject, styles.fileItemViewed);
    styles.fileNameSingle = extendStyle(styles.fileName, styles.fileNameSingle);
    if (styles.fileListBackdrop) styles.fileListBackdrop = extendStyle(styles.fileListBackdrop, {style: rectStyles.absoluteFill});
    if (!styles.audio) styles.audio = defaults.styles.audio;
    if (!styles.image) styles.image = defaults.styles.image;
    if (!styles.text) styles.text = defaults.styles.text;
    if (!styles.video) styles.video = defaults.styles.video;
    let stylesLoad = styles.onLoad;

    function Content({file}: {file: File | null}) {
        const [node, setNode] = React.useState<React.ReactNode>(null);
        React.useEffect(() => {
            const type = file ? file.type.toLowerCase() : emptyString;

            if (file == null) setNode(noFileImage);
            else if (file.size > maxViewSize) setNode(noViewImage);
            else if (type.startsWith('text/') || type == emptyString || textMimeTypes.has(type)) {
                //const text = React.use(file.text()); 
                //file.text().then(text => setNode(<pre {...styles.text}>{text}</pre>));
                
                file.arrayBuffer().then(buffer => {
                    let decoder = new TextDecoder("utf-8", {fatal: true}); 
                    let text!: string;
                    try {
                        text = decoder.decode(buffer);
                    }
                    catch (ex) {
                        if (type != emptyString) {
                            decoder = new TextDecoder("iso-8859-2");
                            text = decoder.decode(buffer);
                        }
                        else {
                            throw ex;
                        }
                    }
                    setNode(<pre {...styles.text}>{text}</pre>);
                }).catch(() => {
                    setNode(noViewImage);
                });
            }
            else if (type.startsWith('audio/'))
                setNode(<div {...styles.audio}>
                    <audio src={URL.createObjectURL(file)} autoPlay controls />
                </div>);
            else if (type.startsWith('image/'))
                setNode(<img {...styles.image} src={URL.createObjectURL(file)} />);
            else if (type.startsWith('video/'))
                setNode(<video {...styles.video} src={URL.createObjectURL(file)} autoPlay />);
            else setNode(noViewImage);
        }, [file]);

        return node;
    };

    let MoreFile!: React.ComponentType<{count: number}> | null;
    if (typeof(moreFile) == 'string') {
        MoreFile = function({count}: {count: number}) {
            return <span style={{whiteSpace: 'nowrap'}}>{`+${count - 1} ${moreFile}`}</span>
        };
    }
    else {
        MoreFile = moreFile;
    }

    if (!ListPopup && ListPopup !== null) {
        ListPopup = function({files, viewIndex, setViewIndex, setVisible, visible}: ListPopupProps) {
            const popupRef = React.useRef<HTMLDivElement>(null);

            React.useEffect(() => {
                if (!popupRef.current) return;
                try {
                    if (visible) popupRef.current.showPopover();
                    else popupRef.current.hidePopover();
                }
                catch {
                    if (!popupRef.current.showPopover) throw "Popover API is not supported";
                }
            }, [visible]);

            return <div ref={popupRef} popover='auto' style={internalStyles.popup}>
                {styles.fileListBackdrop && <div {...styles.fileListBackdrop}></div>}
                <div
                    style={internalStyles.fileListContainer}
                    onClick={ev => {
                        if (ev.target == ev.currentTarget) {
                            setVisible(false);
                        }
                    }}
                >
                    <ul {...styles.fileList}>
                        {files.map((file, idx) => <li key={idx}
                            {...(idx == viewIndex ? styles.fileItemViewed : styles.fileItem)}
                            onClick={() => {
                                setViewIndex(idx);
                                setVisible(false);
                            }}
                        >
                            <span {...styles.fileItemText}>{file.name}</span>
                        </li>)}
                    </ul>
                </div>
            </div>;
        }
    }

    const FileUpload = React.forwardRef(function FileUpload(
        {className, disabled, style, ...props}: React.PropsWithoutRef<Props>,
        ref: React.Ref<HTMLInputElement>
    ) {
        const inputRef = React.useRef<HTMLInputElement>(null);
        const [cssToAdjust, setCssToAdjust] = React.useState(!!stylesLoad);
        const [files, setFiles] = React.useState<File[]>(emptyArray);
        const [popupVisible, setPopupVisible] = React.useState(false);
        const [viewIndex, setViewIndex] = React.useState(0);

        React.useEffect(() => {
            setRef(ref, inputRef.current);
            return () => setRef(ref, null);
        }, [ref]);

        React.useEffect(() => {
            if (cssToAdjust) {
                if (stylesLoad) { //Check if there is no another instance of this component that has executed the function 
                    stylesLoad(styles);
                    stylesLoad = void(0); //Only one instance that can execute the function
                }
                setCssToAdjust(false);
            }
        }, emptyArray);

        const isMultiple = files.length > 1;
        return <div {...extendStyle({style: internalStyles.defaultTop}, {className, style})}>
            <div {...styles.container}>
                <div {...styles.containerView}>
                    {isMultiple && <button
                        {...styles.buttonNav}
                        type='button'
                        disabled={disabled || viewIndex < 1}
                        onClick={() => setViewIndex(idx => idx < 1 ? 0 : idx-1)}
                    >
                        <span>&lt;</span>
                    </button>}
                    <div {...(isMultiple ? styles.bgView : styles.bgViewSingle)}>
                        <Rect ratioX={ratioX} ratioY={ratioY}>
                            <Content file={files[viewIndex] || null} />
                        </Rect>
                    </div>
                    {isMultiple && <button
                        {...styles.buttonNav}
                        type='button'
                        disabled={disabled || viewIndex >= files.length - 1}
                        onClick={() => setViewIndex(idx => idx >= files.length-1 ? idx : idx+1)}
                    >
                        <span>&gt;</span>
                    </button>}
                </div>
                <div {...styles.input}>
                    <button
                        {...(isMultiple && MoreFile ? styles.fileName : styles.fileNameSingle)}
                        type='button'
                        disabled={disabled}
                        onClick={() => {if (inputRef.current) inputRef.current.click()}}
                    >{
                        files.length < 1 ? noFileName : files[viewIndex].name
                    }</button>
                    {isMultiple && MoreFile && <button 
                        {...styles.buttonMore}
                        type='button'
                        disabled={disabled}
                        onClick={() => setPopupVisible(true)}
                    >
                        <MoreFile count={files.length} />
                    </button>}
                </div>
                <input
                    {...props}
                    ref={inputRef}
                    disabled={disabled}
                    style={internalStyles.hidden}
                    type='file'
                    onChange={ev => {
                        const inp = ev.target as HTMLInputElement;
                        if (!inp.files || inp.files.length < 1) setFiles(emptyArray);
                        else {
                            const files: File[] = [];
                            for (let i = 0; i < inp.files.length; i++) {
                                files.push(inp.files[i]);
                            }
                            setFiles(files);
                        }
                        setViewIndex(0);
                        if (props.onChange) props.onChange(ev);
                    }}
                />
                {isMultiple && ListPopup && <ListPopup
                    files={files}
                    setViewIndex={setViewIndex}
                    setVisible={setPopupVisible}
                    viewIndex={viewIndex}
                    visible={popupVisible}
                />}
            </div>
        </div>;
    });
    FileUpload.displayName = 'FileUpload';

    return FileUpload;
}

const FileUpload = createInput();
export default FileUpload;