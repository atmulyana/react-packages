'use client';
/**
 * https://github.com/atmulyana/react-packages
 */
import React, {type CSSProperties} from 'react';

const defaultStyle: CSSProperties = {
    display: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

export default function Ellipsis({children}: {children: string}) {
    const ref = React.useRef<HTMLSpanElement>(null);
    const [style, setStyle] = React.useState<CSSProperties>(defaultStyle);
    
    React.useEffect(() => {
        function hideText() {
            //`Ellipsis` has an absolute width (in 'px'). Hiding it is to make container resizes to fit the new size of window.
            setStyle(style => ({...style, display: 'none', width: '0px'}));
        }

        window.addEventListener('resize', hideText);
        return () => window.removeEventListener('resize', hideText);
    }, []);

    React.useLayoutEffect(() => {
        if (!ref.current?.parentElement) return;
        if (style.display == 'none') {
            const pElm = ref.current.parentElement;
            const compStyle = window.getComputedStyle(pElm);
            const width = pElm.offsetWidth
                - (parseInt(compStyle.getPropertyValue('border-left-width')) || 0)
                - (parseInt(compStyle.getPropertyValue('border-right-width')) || 0)
                - (parseInt(compStyle.getPropertyValue('padding-left')) || 0)
                - (parseInt(compStyle.getPropertyValue('padding-right')) || 0)
                - 1 /*subtracted by 1 to make sure not overflow*/;
            setStyle(style => ({
                ...style,
                display: 'inline-block',
                width: width + 'px'
            }));
        }
    }, [style.display]);

    return <span ref={ref} style={style}>{children}</span>;
}