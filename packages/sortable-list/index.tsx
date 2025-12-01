'use client';
/** 
 * https://github.com/atmulyana/react-packages
 **/
import React from 'react';
import {cancelEventHandler} from '@react-packages/common';
import {emptyArray} from 'javascript-common';

const Item = React.memo(function Item({
    $ref,
    children,
    idx,
    overIdx,
    setIndex,
}: {
    $ref: HTMLElement | null,
    children: React.ReactElement,
    idx: number,
    overIdx: number,
    setIndex: (idx: number, type: number) => any,
}) {
    const $overIdx = React.useRef(overIdx);
    $overIdx.current = overIdx;

    React.useEffect(() => {
        if ($ref) {
            const onDrag = () => {
                $ref.style.opacity = '0';
            };
            const onDragEnd = () => {
                if ($ref.dataset['opacity']) $ref.style.opacity = $ref.dataset['opacity']; else $ref.style.removeProperty('opacity');
                setIndex(-1, 1);
            };
            const onDragLeave = (ev: DragEvent) => {
                const toNode = ev.relatedTarget as Node;
                if (toNode == null) {
                    /**
                     * On Safari (AppleWebKit/605.1.15), `relatedTarget` is always `null`. It causes flicker when dragging an item.
                     * On Chrome (AppleWebKit/537.36), the same layout engine with older version, `relatedTarget` has a value as expected.
                     */
                    ev.stopPropagation();
                }
                else if (
                    toNode != $ref.parentElement &&
                    !$ref.contains(toNode) &&
                    !$ref.parentElement?.contains(toNode)
                ) {
                    ev.stopPropagation();
                    setIndex(-1, 2);
                }
            };
            const onDragOver = (ev: Event) => {
                ev.preventDefault();
                setIndex($overIdx.current, 2);
            };
            const onDrop = (ev: Event) => {
                ev.preventDefault();
                setIndex($overIdx.current, 3);
            };

            $ref.draggable = true;
            $ref.style.cursor = 'move';
            $ref.addEventListener('drag', onDrag);
            $ref.addEventListener('dragend', onDragEnd);
            $ref.addEventListener('dragleave', onDragLeave);
            $ref.addEventListener('dragover', onDragOver);
            $ref.addEventListener('drop', onDrop);

            return () => {
                $ref.draggable = $ref.dataset['draggable'] == 'true';
                if ($ref.dataset['cursor']) $ref.style.cursor = $ref.dataset['cursor']; else $ref.style.removeProperty('cursor');
                $ref.removeEventListener('drag', onDrag);
                $ref.removeEventListener('dragend', onDragEnd);
                $ref.removeEventListener('dragleave', onDragLeave);
                $ref.removeEventListener('dragover', onDragOver);
                $ref.removeEventListener('drop', onDrop);
            };
        }
    }, [$ref]);

    React.useEffect(() => {
        if ($ref) {
            const onDragStart = (ev: DragEvent) => {
                if (ev.dataTransfer) ev.dataTransfer.setDragImage(
                    $ref,
                    ev.offsetX,
                    ev.offsetY,
                );
                // $ref.style.opacity = '0';
                setIndex(idx, 1);
            };
            $ref.addEventListener('dragstart', onDragStart);
        
            return () => {
                $ref.removeEventListener('dragstart', onDragStart);
            };
        }
    }, [$ref, idx]);
    
    return children;
});

type Item = {
    elm: React.ReactElement,
    key: number,
    ref: HTMLElement | null,
};
export type SortableChildren = React.ReactElement | Array<React.ReactElement>;

export default function SortableList({
    children,
    onOrderChange,
}: {
    children: SortableChildren,
    onOrderChange?: (items: SortableChildren) => any,
}) {
    const firstItem = React.useRef<HTMLInputElement>(null);
    const lastItem = React.useRef<HTMLInputElement>(null);
    const {current: flag} = React.useRef({
        dropIdx: -1,
        lastDraggedIdx: -1,
    });
    const [items, setItems] = React.useState<{list: Item[], cause?: 1|2}>({list: emptyArray});
    const [draggedIdx, setDraggedIdx] = React.useState(-1);
    const [overIdx, setOverIdx] = React.useState(-1);

    let _draggedIdx = draggedIdx, _overIdx = overIdx,
        isReindexed = draggedIdx >= 0 && overIdx >= 0 && draggedIdx != overIdx;
    const getMappedIdx = (idx: number) => {
        if (idx == _overIdx) idx = _draggedIdx;
        else if (_overIdx < idx && idx < _draggedIdx) idx--;
        else if (_overIdx > idx && idx > _draggedIdx) idx++;
        else if (_draggedIdx == idx) {
            if (idx < _overIdx) idx++;
            else if (idx > _overIdx) idx--;
        }
        return idx;
    }

    React.useEffect(() => {
        if (firstItem.current?.parentElement) {
            const listElm = firstItem.current.parentElement;
            const onDragLeave = (ev: DragEvent) => {
                if (!listElm.contains(ev.relatedTarget as Node)) setIndex(-1, 2);
            };
            listElm.addEventListener('dragover', cancelEventHandler);
            listElm.addEventListener('dragleave', onDragLeave);
            listElm.addEventListener('drop', cancelEventHandler);
           return () => {
                listElm.removeEventListener('dragover', cancelEventHandler);
                listElm.removeEventListener('dragleave', onDragLeave);
                listElm.removeEventListener('drop', cancelEventHandler);
            };
        }
    }, emptyArray);

    React.useEffect(() => {
        if (items.cause == 1) { //order just changed
            if (onOrderChange) {
                const elms = items.list.map(item => item.elm);
                const newChildren = elms.length < 1 ? emptyArray :
                                    elms.length == 1 && elms[0] === children ? elms[0] :
                                    elms;
                onOrderChange(newChildren);
            }
        }
        else if (items.cause == 2) { //children just updated
            if (!firstItem.current || !lastItem.current) throw new Error('`SortableList` mounting error');
            
            const newItems: Item[] = [];
            for (
                let i = 0, elm: ChildNode | null = firstItem.current.nextSibling;
                i < items.list.length && elm != lastItem.current;
                i++, elm = elm?.nextSibling ?? null
            ) {
                if (elm?.nodeType == Node.ELEMENT_NODE) {
                    const ref = elm as HTMLElement;
                    ref.dataset['draggable'] = ref.draggable.toString();
                    ref.dataset['cursor'] = ref.style.cursor;
                    ref.dataset['opacity'] = ref.style.opacity;
                    newItems.push({...items.list[i], ref});
                }
            }
            setItems({
                list: newItems.length > 0 ? newItems : emptyArray,
            });
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    React.useEffect(() => {
        let key = new Date().getTime();
        const newItems = (Array.isArray(children) ? children : [children]).map(child => ({
            elm: child,
            key: key++,
            ref: null,
        }));
        setItems({
            list: newItems.length > 0 ? newItems : emptyArray,
            cause: 2,
        });

        return () => {
            for (let {ref} of items.list ?? emptyArray) {
                if (ref) {
                    delete ref.dataset['draggable'];
                    delete ref.dataset['cursor'];
                    delete ref.dataset['opacity'];
                }
            }
        };
    }, [children]);

    React.useEffect(() => {
        if (flag.lastDraggedIdx >= 0 && draggedIdx < 0) { //end of dragging
            if (flag.dropIdx >= 0 && flag.dropIdx != flag.lastDraggedIdx) { //update list
                //eslint-disable-next-line react-hooks/exhaustive-deps
                _draggedIdx = flag.lastDraggedIdx;
                //eslint-disable-next-line react-hooks/exhaustive-deps
                _overIdx = flag.dropIdx;
                const newItems: Item[] = [];
                for (let i = 0; i < items.list.length; i++) {
                    const oldIdx = getMappedIdx(i);
                    newItems[i] = items.list[oldIdx];
                }
                setItems({
                    list: newItems,
                    cause: 1,
                });
            }

            flag.dropIdx = -1;
            flag.lastDraggedIdx = -1;
            setOverIdx(-1);
        }
        flag.lastDraggedIdx = draggedIdx;
    }, [draggedIdx]);

    const setIndex = React.useCallback((idx: number, type: number) => {
        switch (type) {
            case 1:
                setDraggedIdx(idx);
                break;
            case 2:
                setOverIdx(idx);
                break;
            case 3:
                flag.dropIdx = idx;
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, emptyArray);

    return <>
        <input ref={firstItem} type='hidden' />
        {items.list.map((_, index) => {
            let idx = index;
            if (isReindexed) idx = getMappedIdx(idx);
            const item = items.list[idx];
            return <Item
                $ref={item.ref}
                idx={idx}
                key={item.key}
                overIdx={index}
                setIndex={setIndex}
            >
                {item.elm}
            </Item>;
        })}
        <input ref={lastItem} type='hidden' />
    </>;
}