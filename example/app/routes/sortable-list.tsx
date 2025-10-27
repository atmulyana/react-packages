/**
 * Example of how to use `SortableList` component
 * https://github.com/atmulyana/react-packages
 */
import React from 'react';
import SortableList, {type SortableChildren} from '@react-packages/sortable-list';

export function meta() {
    return [
        {title: "SortableList Component Demo"}
    ];
}

function SortableList1() {
    const [itemELms, setItemElms] = React.useState<SortableChildren>([
        <span className='items-stretch border border-gray-500 px-2 py-1'>
            Item 1
        </span>,
        <span className='items-stretch border border-gray-500 px-2 py-1'>
            Item 2
        </span>,
        <span className='items-stretch border border-gray-500 px-2 py-1'>
            Item 3
        </span>,
        <span className='items-stretch border border-gray-500 px-2 py-1'>
            Item 4
        </span>,
        <span className='items-stretch border border-gray-500 px-2 py-1'>
            Item 5
        </span>
    ]);

    return <SortableList onOrderChange={elms => setItemElms(elms)}>
        {itemELms}
    </SortableList>;
}

export default function SortableListDemo() {
    
    const [, setFlag] = React.useState(false);
    const forceRefresh = React.useCallback(() => {
        setFlag(flag => !flag);
    }, []);

    return <div className='p-4'>
        <div className='mb-4'>
            <div className='mb-1'>Vertical list with "state" variable</div>
            <div className='flex flex-col border border-blue-500 w-24 p-2 gap-2'>
                <SortableList1 />
            </div>
        </div>

        <div className='mb-4'>
            <div className='mb-1'>Horizontal list without "state" variable</div>
            <div className='flex border border-blue-500 w-120 p-2 gap-2'>
            <SortableList>
                <span className='flex-1 border border-gray-500 px-2 py-1'>
                    Item 1
                </span>
                <span className='flex-1 border border-gray-500 px-2 py-1'>
                    Item 2
                </span>
                <span className='flex-1 border border-gray-500 px-2 py-1 !cursor-crosshair'>
                    Item 3
                </span>
                <span className='flex-1 border border-gray-500 px-2 py-1'>
                    Item 4
                </span>
                <span className='flex-1 border border-gray-500 px-2 py-1'>
                    Item 5
                </span>
            </SortableList>
            </div>
        </div>

        <div className='mb-4'>
            <div className='mb-1'>
                If you want to see the difference between using "state" and not, please click the button below.
                The order in the second list will be reverted to the beginning.
            </div>
            <button type='button' className='bg-blue-500 border-gray-500 cursor-pointer text-white px-4 py-2' onClick={forceRefresh}>
                Re-render the page
            </button>
        </div>
    </div>;
}
