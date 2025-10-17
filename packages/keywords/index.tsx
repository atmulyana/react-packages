'use client';
/** 
 * https://github.com/atmulyana/react-packages
 **/
import React, {
    type CSSProperties,
    type FocusEventHandler,
    type KeyboardEventHandler,
    type MouseEvent,
    type MouseEventHandler,
    type UIEvent,
} from 'react';
import {emptyArray, emptyObject, emptyString, noop} from 'javascript-common';

type TStyle = {
    className?: string,
    style?: CSSProperties,
};

type TItemStyles = {
    close: TStyle,
    itemsBox: TStyle,
    word?: TStyle,
};

type TStyles = TItemStyles & {
    buzzedItemBox?: TStyle,
    container: TStyle,
    inputText: TStyle,
    highlightItemBox?: TStyle,
};

type BaseProps = {
    name?: string,
    onChange?: (newValue: string[]) => any,
    value?: string[],
};

const defaults = {
    buzzedDuration: 1500,
    Input: ({
        name,
        onChange,
        value
    }: Omit<BaseProps, 'onChange'> & {
        onChange?: React.ChangeEventHandler<any>
    }) => <select
        multiple
        name={name}
        onChange={onChange}
        style={{display: 'none'}}
        value={value}
    >
        {value?.map(word => <option key={word} value={word} />)}
    </select>,
    invalidChars: /[^\w'-]/u,
    nextKeys: ['ArrowRight', 'Right'],
    prevKeys: ['ArrowLeft', 'Left'],
    separators: /[ ,;]/,
    styles: {
        buzzedItemBox: {
            style: {
                borderColor: '#c27803',
                borderWidth: '4px',
                margin: '-2px',
                zIndex: 100,
            },
        },
        close: {
            style: {
                fontWeight: '800',
                marginLeft: '.375rem',
                outlineStyle: 'none',
                outlineWidth: '0px',
                textDecoration: 'none !important',
            },
        },
        container: {
            style: {
                backgroundClip: 'border-box',
                backgroundColor: 'white',
                borderColor: '#475569',
                borderRadius: '.25rem',
                borderStyle: 'solid',
                borderWidth: '1px',
                color: '#475569',
                display: 'flex',
                flexWrap: 'wrap',
                fontSize: '1rem',
                gap: '.25rem',
                height: 'auto !important',
                lineHeight: 1.5,
                paddingBlock: '.375rem',
                paddingInline: '.75rem',
                width: '100%',
            },
        },
        itemsBox: {
            style: {
                backgroundColor: '#E5E7EB',
                borderColor: '#E5E7EB',
                borderRadius: '.25rem', 
                borderStyle: 'solid',
                borderWidth: '2px',
                display: 'flex',
                flex: 'none',
                height: 'auto',
                lineHeight: 1,
                paddingBlock: '.125rem',
                paddingInline: '.25rem',
            },
        },
        highlightItemBox: {
            style: {
                borderColor: '#3F83F8',
            },
        },
        inputText: {
            style: {
                backgroundClip: 'border-box',
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderStyle: 'solid',
                borderWidth: '2px',
                display: 'block',
                flex: 1,
                height: 'auto',
                lineHeight: 1,
                minWidth: '2.25rem',
                outlineStyle: 'none',
                outlineWidth: '0px',
                padding: '.125rem'
            },
        },
        word: {
            style: {
                cursor: 'default',
            },
        }
    } as TStyles,
}

function mouseDownHandler(ev: MouseEvent) {
    ev.preventDefault(); //prevents target to get focus when clicking it (no double trigger of focus)
}
function selectStartHandler(ev: Event) {
    ev.preventDefault();
    return false;
}

function Item({
    arefCallback,
    onBlur,
    onClick,
    onFocus,
    onKeyDown,
    styles,
    word,
}: {
    arefCallback: (aref: HTMLAnchorElement | null) => any,
    buzzed?: boolean,
    onBlur: FocusEventHandler<HTMLAnchorElement>,
    onClick: MouseEventHandler<HTMLDivElement>,
    onFocus: FocusEventHandler<HTMLAnchorElement>,
    onKeyDown: KeyboardEventHandler<HTMLElement>,
    styles: TItemStyles,
    word: string,
}) {
    const a = React.useRef<HTMLAnchorElement>(null);

    React.useEffect(() => {
        if (a.current) a.current.parentElement?.addEventListener('selectstart', selectStartHandler);
        arefCallback(a.current);
        return () => {
            if (a.current) a.current.parentElement?.removeEventListener('selectstart', selectStartHandler);
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, emptyArray);

    return <div
        {...styles.itemsBox}
        aria-label={word}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseDown={mouseDownHandler}
    >
        <span {...styles.word}>{word}</span>
        <a {...styles.close}
            href='#'
            onBlur={onBlur}
            onFocus={onFocus}
            ref={a}
        >x</a>
    </div>;
}

export function createInput<TRef = any, Props extends BaseProps = BaseProps>(parameters?: {
    buzzedDuration?: number,
    Input?: React.ComponentType<
        Omit<Props, 'ref' | 'onChange'>
        & {onChange?: React.ChangeEventHandler<any>}
        & React.RefAttributes<TRef>
    > | null,
    invalidChars?: RegExp,
    nextKeys?: string[],
    prevKeys?: string[],
    separators?: RegExp,
    styles?: TStyles,
}) {
    const {
        buzzedDuration = defaults.buzzedDuration,
        Input = defaults.Input,
        invalidChars = defaults.invalidChars,
        nextKeys = defaults.nextKeys,
        prevKeys = defaults.prevKeys,
        separators = defaults.separators,
        styles = defaults.styles,
    } = parameters ?? (emptyObject as NonNullable<typeof parameters>);
    const highlightItem: TStyle = {
        className: (
            styles.itemsBox.className && styles.highlightItemBox?.className
            && `${styles.itemsBox.className} ${styles.highlightItemBox.className}`
        )
        || styles.itemsBox.className 
        || styles.highlightItemBox?.className,
        style: (
            styles.itemsBox.style && styles.highlightItemBox?.style
            && {...styles.itemsBox.style, ...styles.highlightItemBox.style}
        )
        || styles.itemsBox.style
        || styles.highlightItemBox?.style,
    },
    buzzedItem: TStyle = {
        className: (
            styles.itemsBox.className && styles.buzzedItemBox?.className
            && `${styles.itemsBox.className} ${styles.buzzedItemBox.className}`
        )
        || styles.itemsBox.className 
        || styles.buzzedItemBox?.className,
        style: (
            styles.itemsBox.style && styles.buzzedItemBox?.style
            && {...styles.itemsBox.style, ...styles.buzzedItemBox.style}
        )
        || styles.itemsBox.style
        || styles.buzzedItemBox?.style,
    };

    const itemStyles = {
        close: styles.close,
        itemsBox: styles.itemsBox,
        word: styles.word,
    },
    highlightItemStyles = {
        close: styles.close,
        itemsBox: highlightItem,
        word: styles.word,
    },
    buzzedItemStyles = {
        close: styles.close,
        itemsBox: buzzedItem,
        word: styles.word,
    };

    const InternalKeywords = React.memo(function WordList({
        $ref,
        className,
        onChange,
        style,
        value = emptyArray,
        ...props
    }: React.PropsWithoutRef<Props> & TStyle & {$ref?: React.Ref<TRef>}) {
        const arefs = React.useRef<{[key: string]: HTMLAnchorElement | null}>({});
        const input = React.useRef<HTMLInputElement>(null);
        const {current: words} = React.useRef<{[key: string]: string}>({});
        const [buzzedItems, setBuzzedItems] = React.useState<string[]>(emptyArray);
        const [keys, setKeys] = React.useState<string[]>(emptyArray);
        const [selected, setSelected] = React.useState(emptyString);

        React.useEffect(() => {
            for (let key in words) delete words[key];
            const keys: string[] = [];
            if (value) {
                for (let val of value) {
                    const key = val.toLocaleLowerCase();
                    keys.push(key);
                    words[key] = val;
                }
            }
            setKeys(keys.length > 0 ? keys : emptyArray);
        }, [value]);

        const values = keys.map(key => words[key]);
        React.useEffect(() => {
            if (onChange) onChange(values);
        //eslint-disable-next-line react-hooks/exhaustive-deps
        }, [keys]);

        React.useEffect(() => {
            arefs.current[selected]?.focus();
        });

        const getPrev = (key: string) => {
            if (!key) return getLast();
            const i = keys.indexOf(key);
            if (i < 1) return emptyString;
            return keys[i - 1];
        };
        const getNext = (key: string) => {
            const i = keys.indexOf(key);
            if (i < 0 || i > keys.length - 2) return emptyString;
            return keys[i + 1];
        };
        const getFirst = () => keys[0] ?? emptyString;
        const getLast = () => {
            if (keys.length < 1) return emptyString;
            return keys[keys.length - 1];
        }
        const remove = (key: string) => {
            if (!key) return ;
            delete words[key];
            setKeys(keys => keys.filter(k => k != key));
        };
        const setFocus = (key: string, inputFocus = true) => {
            if (key) setSelected(() => key);
            else if (inputFocus) input.current?.focus();
        };
        const moveFocus = (newKey: string, ev: UIEvent<HTMLElement>) => {
            setFocus(newKey);
            if (selected) { //focus on an item of keywords
                ev.preventDefault();
                if (!newKey && input.current) { //must move focus on `INPUT` element
                    input.current.selectionStart = 0;
                    input.current.selectionEnd = 0;
                }
            }
        }
        const keyDownHandler: KeyboardEventHandler<HTMLElement> = ev => {
            const inp = ev.target as HTMLInputElement; //Not really `input` element, may be `a` element
            const tag = inp.tagName;

            if (prevKeys.includes(ev.key)) {
                if (
                    defaults.prevKeys.includes(ev.key) && tag == 'INPUT'
                    && (inp.selectionStart != inp.selectionEnd || (inp.selectionStart ?? 0) > 0)
                ) {
                    //If arrow key on text input element with cursor not on the beginning
                    //then let the cursor moves on the input
                }
                else {
                    ev.preventDefault();
                    const prev = getPrev(selected);
                    setFocus(prev, false);
                }
            }
            else if (nextKeys.includes(ev.key)) {
                const next = getNext(selected);
                if (defaults.nextKeys.includes(ev.key)) {
                    if (tag != 'INPUT') {
                        moveFocus(next, ev);
                    }
                    else {
                        //If arrow key on text input element then let the cursor moves on the input
                    }
                }
                else {
                    ev.preventDefault();
                    setFocus(next);
                }
            }
            else if (ev.key == 'Backspace') {
                const prev = getPrev(selected);
                if (tag != 'INPUT') {
                    remove(selected);
                }
                else if (inp.selectionStart != inp.selectionEnd || inp.selectionStart != 0) {
                    //if `<input />` with a selection or the cursor position not at the left-most then do nothing
                    return;
                }
                moveFocus(prev, ev);
            }
            else if (ev.key == 'Delete' || ev.key == 'Del') {
                const next = getNext(selected);
                remove(selected);
                moveFocus(next, ev);
            }
            else if (ev.key == 'Enter') {
                 if (tag != 'INPUT') ev.preventDefault(); //Prevent deleting a keyword when it's getting focus
            }
            else if (ev.key == 'End') {
                if (keys.length > 0) {
                    ev.preventDefault();
                    setFocus(getLast());
                }
            }
            else if (ev.key == 'Home') {
                if (keys.length > 0) {
                    ev.preventDefault();
                    setFocus(getFirst());
                }
            }
            else if (tag == 'INPUT' && [...ev.key].length == 1) {
                if (separators.test(ev.key)) {
                    ev.preventDefault();
                    if (inp.selectionEnd ?? 0 > 0) { //the cursor positions after the last char
                        const len = inp.selectionStart ?? inp.value.length;
                        const newWord = inp.value.substring(0, len);
                        if (newWord != emptyString) {
                            const key = newWord.toLocaleLowerCase();
                            if (key in words) {
                                if (buzzedDuration > 0) {
                                    setBuzzedItems(items => [...items, key]);
                                    setTimeout(() => {
                                        setBuzzedItems(items => items.filter(item => item != key));
                                    }, buzzedDuration);
                                }
                            }
                            else {
                                words[key] = newWord;
                                setKeys(keys => [...keys, key]);
                            }
                        }
                        inp.value = inp.value.substring(len);
                        inp.selectionStart = inp.selectionEnd = 0;
                    }
                }
                else if (invalidChars.test(ev.key)) {
                    ev.preventDefault();
                }
            }
        }

        let isBuzzed = false, isSelected = false;
        return <div className={className} style={style}>
            <div {...styles.container}>
                {keys.map(key => (
                isBuzzed = buzzedItems.includes(key),
                isSelected = selected == key,
                <Item
                    key={key}
                    arefCallback={ref => arefs.current[key] = ref}
                    buzzed={isBuzzed}
                    onBlur={() => setSelected(() => emptyString)}
                    onClick={ev => {
                        ev.preventDefault();
                        let _selected = key;
                        if ((ev.target as HTMLElement).tagName == 'A') {
                            _selected = selected == key ? getNext(key) : selected;
                            remove(key);
                        }
                        setFocus(_selected);
                    }}
                    onFocus={() => setSelected(() => key)}
                    onKeyDown={keyDownHandler}
                    styles={isSelected ? highlightItemStyles : isBuzzed ? buzzedItemStyles : itemStyles}
                    word={words[key]}
                />))}
                <input {...styles.inputText} ref={input} type='text' onKeyDown={keyDownHandler} />
            </div>
            {Input && <Input {...props as Omit<Props, 'ref' | 'onChange'>} ref={$ref} onChange={noop} value={values} />}
        </div>;
    });

    const Keywords = React.forwardRef(function Keywords(
        props: React.PropsWithoutRef<Props>,
        ref: React.Ref<TRef>
    ) {
        return <InternalKeywords {...props} $ref={ref} />;
    });
    Keywords.displayName = 'Keywords';

    return Keywords;
}

const Keywords = createInput();
export default Keywords;