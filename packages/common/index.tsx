/** 
 * https://github.com/atmulyana/react-packages
 **/
import type {CSSProperties} from 'react';

export type TStyle = {
    className?: string,
    style?: CSSProperties,
};
export type RCSS = Readonly<CSSProperties>;

export function extendStyle(base: TStyle, ext?: TStyle): TStyle {
    return {
        className: (
            base.className && ext?.className
            && `${base.className} ${ext.className}`
        )
        || base.className 
        || ext?.className,
        style: (
            base.style && ext?.style
            && {...base.style, ...ext.style}
        )
        || base.style
        || ext?.style,
    }
}

export function cancelEventHandler(ev: {preventDefault: () => void}) {
    //In "mousedown" event, it prevents target to get focus when clicking it (no double trigger of focus).
    //In "selectstart" event, it prevents text selection by dragging mouse.
    ev.preventDefault();
}