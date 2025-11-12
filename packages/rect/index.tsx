'use client';
/**
 * https://github.com/atmulyana/react-packages
 */
import React, {type CSSProperties} from 'react';
import {setRef} from 'reactjs-common';
import {emptyArray} from 'javascript-common';

type FlexBoxProps = {
    children?: React.ReactNode,
    ratioX: number,
    ratioY: number,
};

type RCSS = Readonly<CSSProperties>;
export const styles: Readonly<{
    absoluteFill: RCSS,
    centeredContent: RCSS,
    centeredImage: RCSS,
    fill: RCSS,
}> = {
    absoluteFill: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    } as CSSProperties,
    centeredContent: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    } as CSSProperties,
    centeredImage: {
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center',
        width: '100%',
    } as CSSProperties,
    fill: {
        height: '100%',
        width: '100%',
    } as CSSProperties
};

const internalStyles = {
    fillHort: {
        height: 'auto',
        width: '100%',
    } as CSSProperties,
    fillVert: {
        height: '100%',
        width: 'auto',
    } as CSSProperties,
    hidden: {
        display: 'none',
    } as CSSProperties,
    rootBox: {
        boxSizing: 'content-box',
        overflow: 'hidden',
    } as CSSProperties,
}

const HortFlex = React.memo(function HortFlex({
    children,
    ratioX,
    ratioY,
}: FlexBoxProps) {
    const height = (ratioY / ratioX * 100) + '%';
    return <div style={{paddingTop: height, position: 'relative'}}>
        <div style={styles.absoluteFill}>
            {children}
        </div>
    </div>;
});

const VertFlex = React.memo(function VertFlex({
    children,
    ratioX,
    ratioY,
}: FlexBoxProps) {
    const $ref = React.useRef<HTMLDivElement>(null);
    const [dim, setDim] = React.useState<CSSProperties>(internalStyles.hidden);

    React.useEffect(() => {
        function clear() {
            setDim(internalStyles.hidden);
        }
        window.addEventListener('resize', clear);
        return () => window.removeEventListener('resize', clear);
    }, emptyArray);

    React.useLayoutEffect(() => {
        if (dim == internalStyles.hidden && $ref.current) {
            const {height} = ($ref.current.parentElement as HTMLDivElement).getBoundingClientRect();
            const width = Math.round(ratioX / ratioY * height);
            setDim({height, width});
        }
    }, [dim]);

    return <div ref={$ref} style={{...dim, position: 'relative'}}>
        {children}
    </div>;
});

const NoWrapper = React.memo(function NoWrapper({
    children,
}: FlexBoxProps) {
    return children;
});

const Rect = React.forwardRef(function Rect(
    {
        children,
        className,
        onRendered,
        ratioX = 1,
        ratioY = 1,
        style,
        vertical,
    }: {
        children?: React.ReactNode,
        className?: string,
        onRendered?: (isRendered: boolean) => void,
        ratioX?: number,
        ratioY?: number,
        style?: CSSProperties,
        vertical?: boolean,
    },
    ref: React.Ref<HTMLDivElement>
) {
    const $ref = React.useRef<HTMLDivElement>(null);
    const [Wrapper, setWrapper] = React.useState<React.ComponentType<FlexBoxProps> | null>(
        vertical === false ? HortFlex :
        vertical === true  ? VertFlex :
                             null
    );

    React.useLayoutEffect(() => {
        if (!$ref.current) return;
        setRef(ref, $ref.current);
    }, emptyArray);

    React.useLayoutEffect(() => {
        if (!$ref.current) return;
        if (vertical === false) {
            setWrapper(HortFlex);
        }
        else if (vertical === true) {
            setWrapper(VertFlex);
        }
        else {
            const areaRef = $ref.current.children[0] as HTMLDivElement;
            const {height, width} = areaRef.getBoundingClientRect();
            if (height < 1 && width < 1) {}
            else if (height < 1) {
                setWrapper(HortFlex);
            }
            else if (width < 1) {
                setWrapper(VertFlex);
            }
            else {
                setWrapper(NoWrapper);
            }
        }
    }, [vertical]);

    React.useEffect(() => {
        if (onRendered) onRendered(!!Wrapper);
    }, [Wrapper]);

    if (ratioX < 1) ratioX = 1;
    if (ratioY < 1) ratioY = 1;

    return <div ref={$ref} className={className} style={{...style, ...internalStyles.rootBox}}>
        <div style={
            Wrapper == HortFlex ? internalStyles.fillHort :
            Wrapper == VertFlex ? internalStyles.fillVert :
            styles.fill
        }>
        {Wrapper && <Wrapper
            ratioX={ratioX}
            ratioY={ratioY}
        >
            {children}
        </Wrapper>}
        </div>
    </div>;
});
export default Rect;

export function FlexImage({
    bg,
    className,
    ratioX,
    ratioY,
    style,
    vertical,
    ...props
}: {
    bg?: {
        className?: string,
        style?: CSSProperties,
    },
    ratioX?: number,
    ratioY?: number,
    vertical?: boolean,
} & React.ComponentProps<'img'>) {
    if (!className && !style) style = styles.centeredImage;
    return <Rect className={bg?.className} ratioX={ratioX} ratioY={ratioY} style={bg?.style} vertical={vertical}>
        <img 
            {...props}
            className={className}
            style={style}
        />
    </Rect>;
}