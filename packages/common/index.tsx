/** 
 * https://github.com/atmulyana/react-packages
 **/
import type {CSSProperties} from 'react';

export type TStyle = {
    className?: string,
    style?: CSSProperties,
};
export type RCSS = Readonly<CSSProperties>;

export function extendStyle(base: TStyle, ...exts: Array<TStyle | undefined | null>): TStyle {
    let {className, style} = base;
    for (let ext of exts) {
        className = (
            className && ext?.className
            && `${className} ${ext.className}`
        )
        || className 
        || ext?.className;

        style = (
            style && ext?.style
            && {...style, ...ext.style}
        )
        || style
        || ext?.style;
    }

    return {
        className,
        style,
    };
}

export function cancelEventHandler(ev: {preventDefault: () => void}) {
    //In "mousedown" event, it prevents target to get focus when clicking it (no double trigger of focus event if `focus` method is also invoked).
    //In "selectstart" event, it prevents text selection by dragging mouse.
    ev.preventDefault();
}