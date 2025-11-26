'use client';
/** 
 * https://github.com/atmulyana/react-packages
 **/
import React, {type CSSProperties, type MouseEvent} from 'react';
import {emptyArray, emptyObject} from 'javascript-common';
import {setRef} from 'reactjs-common';
import {extendStyle, type TStyle} from '@react-packages/common';
import {FlexImage, styles} from '@react-packages/rect';

type Params = {
    hiddenFirst?: boolean,
    leftButtonContent?: React.ReactNode,
    maxVisibleCount?: 1|2|3|4|5|6,
    ratioX?: number,
    ratioY?: number,
    rightButtonContent?: React.ReactNode,
    styles?: {
        bgImage?: TStyle,
        button?: TStyle,
        buttonAtFirst?: TStyle,
        buttonAtLast?: TStyle,
        buttonHover?: TStyle,
        container?: TStyle,
        image?: TStyle,
        imageHover?: TStyle,
        imageSelected?: TStyle,
        imagesBox?: TStyle,
        imagesBoxAtFirst?: TStyle,
        imagesBoxAtLast?: TStyle,
    },
}

type Indexes = {
    selected: number,
    start: number,
};

export type ImageItem = string | {src: string, alt?: string};
export type Props = {
    baseSrc?: URL | string,
    images: ImageItem[], //[ImageItem, ...ImageItem[]],
    onChange?: (indexes: Indexes) => any,
    selectedIndex?: number | Number,
};

export type RefInstance = {
    selectedIndex: number,
    startIndex: number,
};

export let isHoverSupported = true;
if (typeof(window) == 'object') {
    if (window.matchMedia('(hover: none)').matches || /\W(android|iphone)/i.test(window.navigator.userAgent))
        isHoverSupported = false;
}
const defaultStyles: NonNullable<Params['styles']> = {
    bgImage: {
        style: {
            paddingInline: '0.25rem',
        }
    },
    button: {
        style: {
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: 'black',
            borderRadius: '0.25rem',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            flex: 'none',
            fontSize: '1ren',
            height: '2rem',
            justifyContent: 'center',
            lineHeight: '1.5',
            opacity: '70%',
            padding: '0px',
            textAlign: 'center',
            verticalAlign: 'middle',
            visibility: isHoverSupported ? 'hidden' : `visible`,
            whiteSpace: 'nowrap',
            width: '2rem',
            zIndex: 1,
        }
    },
    buttonAtFirst: {
        style: {
            display: 'none',
        }
    },
    buttonAtLast: {
        style: {
            display: 'none',
        }
    },
    buttonHover: {
        style: {
            visibility: 'visible',
        }
    },
    container: {
        style: {
            display: 'flex',
        }
    },
    image: {
        style: {
            ...styles.centeredImage,
            borderColor: 'transparent',
            borderRadius: '0.25rem',
            boxSizing: 'border-box',
            borderWidth: '2px',
            cursor: 'pointer',
            display: 'block',
        }
    },
    imageHover: {
        style: {
            scale: 1.5,
            transition: "0.5s ease-in-out",
        }
    },
    imageSelected: {
        style: {
            borderColor: '#0E9F6E',
            cursor: 'default',
        }
    },
    imagesBox: {
        style: {
            flex: 1,
            marginInline: '-2.25rem',
            overflowInline: 'hidden',
        }
    },
    imagesBoxAtFirst: {
        style: {
            marginLeft: '-0.25rem',
        }
    },
    imagesBoxAtLast: {
        style: {
            marginRight: '-0.25rem',
        }
    },
};

const internalStyles = {
    arrow: {
        borderColor: 'white',
        borderWidth: '3px',
        boxSizing: 'border-box',
        height: '11px',
        rotate: '45deg',
        width: '11px',
    } as CSSProperties,
    hidden: {
        style: {
            visibility: 'hidden'
        } as CSSProperties,
    },
    hiddenFlex: {
        style: {
            display: 'flex',
            flex: 1,
            visibility: 'hidden'
        } as CSSProperties,
    },
};
const defaultButtonContent = {
    left: <div style={{...internalStyles.arrow, borderRightWidth: '0px', borderTopWidth: '0px'}}></div>,
    right: <div style={{...internalStyles.arrow, borderBottomWidth: '0px', borderLeftWidth: '0px'}}></div>,
};

const initIndexes = {
    selected: -1,
    start: 0,
};

export function createComponent(parameters?: Params) {
    let {
        hiddenFirst,
        leftButtonContent = defaultButtonContent.left,
        maxVisibleCount = 6,
        ratioX,
        ratioY,
        rightButtonContent = defaultButtonContent.right,
        styles: _styles = {...defaultStyles}
    } = parameters ?? (emptyObject as Params);
    maxVisibleCount = Math.floor(maxVisibleCount) as NonNullable<Params['maxVisibleCount']>;
    if (maxVisibleCount < 1) maxVisibleCount = 1;
    else if (maxVisibleCount > 6 || isNaN(maxVisibleCount)) maxVisibleCount = 6;

    const styles: Params['styles'] & {
        buttonHoverAtFirst?: TStyle,
        buttonHoverAtLast?: TStyle,
        imageHoverSelected?: TStyle,
        imagesBoxFit?: TStyle,
    } = {..._styles};
    styles.bgImage = extendStyle(
        styles.bgImage ?? emptyObject,
        {
            style: {
                alignSelf: 'center',
                boxSizing: 'border-box',
                flex: 'none',
                flexBasis: `calc(1/${maxVisibleCount} * 100%)`,
            },
        }
    );
    styles.buttonAtFirst = extendStyle(styles.button ?? emptyObject, styles.buttonAtFirst);
    styles.buttonAtLast = extendStyle(styles.button ?? emptyObject, styles.buttonAtLast);
    styles.buttonHover = extendStyle(styles.button ?? emptyObject, styles.buttonHover);
    styles.buttonHoverAtFirst = extendStyle(styles.button ?? emptyObject, styles.buttonHover, styles.buttonAtFirst);
    styles.buttonHoverAtLast = extendStyle(styles.button ?? emptyObject, styles.buttonHover, styles.buttonAtLast);
    styles.imageHover = extendStyle(styles.image ?? emptyObject, styles.imageHover);
    styles.imageHoverSelected = extendStyle(styles.image ?? emptyObject, styles.imageSelected, styles.imageHover);
    styles.imageSelected = extendStyle(styles.image ?? emptyObject, styles.imageSelected);
    styles.imagesBox = extendStyle(
        styles.imagesBox ?? emptyObject, 
        {
            style: {display: 'flex'}
        }
    );
    styles.imagesBoxAtFirst = extendStyle(styles.imagesBox, styles.imagesBoxAtFirst);
    styles.imagesBoxAtLast = extendStyle(styles.imagesBox, styles.imagesBoxAtLast);
    styles.imagesBoxFit = extendStyle(styles.imagesBox, styles.imagesBoxAtFirst, styles.imagesBoxAtLast);
    
    const InternalImageSlider = React.memo(function InternalImageSlider({
        $ref,
        baseSrc,
        images,
        onChange,
        selectedIndex,
    }: Props & {
        $ref: React.Ref<RefInstance>,
    }) {
        const imageId = React.useId();
        
        const imageCount = images.length;
        const maxStartIdx = imageCount - maxVisibleCount;
        const [indexes, _setIndexes] = React.useState<Indexes>(initIndexes);
        const setIndexes = React.useCallback((idxs: Partial<Indexes>) => {
            const newIdxs: Partial<Indexes> = {};
            if ('start' in idxs) {
                let idx = idxs.start as number;
                if (idx > maxStartIdx) idx = maxStartIdx;
                if (idx < 0 || isNaN(idx)) idx = 0;
                if (idx != indexes.start) newIdxs.start = idx;
            }
            if ('selected' in idxs) {
                let idx = idxs.selected as number;
                if (idx < 0 || idx >= imageCount || isNaN(idx)) idx = -1;
                if (idx != indexes.selected) newIdxs.selected = idx;
                if (idx >= 0) {
                    let start = newIdxs.start ?? indexes.start;
                    if (idx < start) start = idx;
                    else if (idx >= start + maxVisibleCount) start = idx - maxVisibleCount + 1;
                    if (start != indexes.start) newIdxs.start = start;
                }
            }
            if (Object.keys(newIdxs).length > 0) _setIndexes(indexes => ({...indexes, ...newIdxs}));
        }, [indexes, imageCount]);

        const [hover, _setHover] = React.useState({on: false, index: -1});
        const setHover = React.useCallback((hvr: Partial<typeof hover>) => {
            if ('on' in hvr) {
                if (!hvr.on) {
                    hvr.index = -1;
                }
            }
            if (('index' in hvr) && (hvr.index as number) != -1) {
                const idx = hvr.index as number;
                if (idx < 0 && idx >= imageCount) hvr.index = -1;
            }
            _setHover(hover => {
                if (
                    (hvr.on !== undefined && hvr.on != hover.on) ||
                    (hvr.index !== undefined && hvr.index != hover.index)
                ) return {...hover, ...hvr};
                return hover;
            });
        }, [imageCount]);

        const mouseOverHandler = React.useCallback((ev: MouseEvent<HTMLDivElement>) => {
            const hvr: Partial<typeof hover> = {};
            if (!ev.currentTarget.contains(ev.relatedTarget as Node)) hvr.on = true;
            const target = ev.target as HTMLElement;
            if (target.id.startsWith(imageId)) {
                const idx = parseInt(target.id.substring(imageId.length));
                if (!isNaN(idx)) hvr.index = idx;
            }
            setHover(hvr);
        }, emptyArray);

        const mouseOutHandler = React.useCallback((ev: MouseEvent<HTMLDivElement>) => {
            const hvr: Partial<typeof hover> = {},
                  target = ev.target as HTMLElement,
                  toNode = ev.relatedTarget as (HTMLElement | null);
            if (!ev.currentTarget.contains(toNode)) hvr.on = false;
            if (target.id.startsWith(imageId) && !toNode?.id.startsWith(imageId)) hvr.index = -1;
            setHover(hvr);
        }, emptyArray);

        React.useEffect(() => {
            let idx: number | null = null;
            if (selectedIndex instanceof Number) idx = selectedIndex.valueOf();
            else if (typeof(selectedIndex) == 'number') idx = selectedIndex;
            if (idx !== null) setIndexes({selected: idx});
        }, [selectedIndex]);
        
        React.useEffect(() => {
            if (typeof(onChange) == 'function' && indexes != initIndexes) onChange(indexes);
        }, [indexes]);

        React.useEffect(() => {
            const ref: RefInstance = {
                get selectedIndex() {
                    return indexes.selected;
                },
                set selectedIndex(index) {
                    setIndexes({selected: index});
                },
                get startIndex() {
                    return indexes.start;
                },
                set startIndex(index) {
                    setIndexes({start: index});
                },
            };
            setRef($ref, ref);
            return () => setRef($ref, null);
        }, [$ref, setIndexes]);

        const [mounted, setMounted] = React.useState(false);
        React.useEffect(() => {
            if (hiddenFirst) setMounted(true);
        }, emptyArray);
        
        const isFirst = indexes.start <= 0,
              isLast = indexes.start >= maxStartIdx;
        return <div {...styles.container} onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler}>
            <button type='button'
                {...(
                    hiddenFirst && !mounted ? internalStyles.hidden :
                    isFirst && hover.on ? styles.buttonHoverAtFirst :
                    isFirst ? styles.buttonAtFirst :
                    hover.on ? styles.buttonHover :
                    styles.button
                )}
                disabled={isFirst}
                onClick={() => setIndexes({start: indexes.start - 1})}
            >
                {leftButtonContent}
            </button>
            <div {...(
                hiddenFirst && !mounted ? internalStyles.hiddenFlex :
                isFirst && isLast ? styles.imagesBoxFit :
                isFirst ? styles.imagesBoxAtFirst :
                isLast ? styles.imagesBoxAtLast :
                styles.imagesBox
            )}>
                {images.slice(indexes.start, indexes.start + maxVisibleCount).map((img, idx) => {
                    idx += indexes.start;
                    let {src, alt} = typeof(img) == 'object' ? img : {src: img};
                    if (baseSrc) src = new URL(src, baseSrc).toString();
                    return <div key={idx} {...styles.bgImage}>
                        <FlexImage
                            alt={alt || '...'}
                            id={imageId + idx}
                            ratioX={ratioX}
                            ratioY={ratioY}
                            src={src}
                            {...(
                                hiddenFirst && !mounted ? internalStyles.hidden :
                                indexes.selected == idx && hover.index == idx ? styles.imageHoverSelected :
                                indexes.selected == idx ? styles.imageSelected :
                                hover.index == idx ? styles.imageHover :
                                styles.image
                            )}
                            onClick={() => setIndexes({selected: idx})}
                        />
                    </div>;
                })}
            </div>
            <button type='button'
                {...(
                    hiddenFirst && !mounted ? internalStyles.hidden :
                    isLast && hover.on ? styles.buttonHoverAtLast :
                    isLast ? styles.buttonAtLast :
                    hover.on ? styles.buttonHover :
                    styles.button
                )}
                disabled={isLast}
                onClick={() => setIndexes({start: indexes.start + 1})}
            >
                {rightButtonContent}
            </button>
        </div>;
    }, (prevProps, nextProps) => {
        if (
            prevProps.$ref != nextProps.$ref ||
            prevProps.baseSrc?.toString() != nextProps.baseSrc?.toString() ||
            prevProps.onChange != nextProps.onChange ||
            prevProps.selectedIndex != nextProps.selectedIndex ||
            prevProps.images.length != nextProps.images.length
        ) return false;
        for (let i = 0; i < prevProps.images.length; i++) {
            const img1 = prevProps.images[i], img2 = nextProps.images[i];
            if (typeof(img1) == 'object') {
                if (typeof(img2) == 'object') {
                    if (img1.src != img2.src || img1.alt != img2.alt) return false;
                }
                else {
                    if (img1.alt || img1.src != img2) return false;
                }
            }
            else if (typeof(img2) == 'object') {
                if (img2.alt || img2.src != img1) return false;
            }
            else if (img1 != img2) return false;
        }
        return true;
    });

    const ImagesSlider = React.forwardRef(function ImagesSlider(
        props: React.PropsWithoutRef<Props>,
        ref: React.Ref<RefInstance>
    ) {
        return <InternalImageSlider {...props} $ref={ref} />;
    });
    ImagesSlider.displayName = 'SimpleImagesSlider';

    return ImagesSlider;
}

const SimpleImagesSlider = createComponent(emptyObject);
export default SimpleImagesSlider;