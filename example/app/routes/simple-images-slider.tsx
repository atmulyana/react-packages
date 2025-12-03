/**
 * Example of how to use `SimpleImagesSlider` component
 * https://github.com/atmulyana/react-packages
 */
import React from 'react';
import SimpleImagesSlider, {createComponent, type RefInstance} from '@react-packages/simple-images-slider';
const ImagesSlider = createComponent({
    maxVisibleCount: 1,
    ratioX: 3,
    ratioY: 2,
    styles: {
        bgImage: {
            className: 'bg-gray-500',
        },
        button: {
            className: `flex items-center justify-center cursor-pointer disabled:cursor-default h-8 w-8
            bg-black border border-gray-500 rounded-full opacity-70 disabled:opacity-30
            absolute bottom-2 first:right-12 last:right-2 z-10`,
        },
        container: {
            className: 'relative',
        },
        imagesBox: {
            className: 'flex-1 overflow-x-hidden',
        },
    }
})

export function meta() {
    return [
        {title: "SimpleImagesSlider Component Demo"}
    ];
}

export default function SimpleImagesSliderDemo() {
    const thumbnails = React.useRef<RefInstance>(null);
    const [index, setIndex] = React.useState<number| Number>(0);
    const [desc, setDesc] = React.useState('');

    return <div className='p-4'>
        <div className='flex flex-wrap md:flex-nowrap items-start gap-8'>
            <div className='basis-full md:basis-1/3 flex-none md:ml-[calc(16.66667%-2rem)]'>
                <div className='mb-4'>
                    <ImagesSlider 
                        baseSrc='https://ichef.bbci.co.uk/images/ic/976x549_b/'
                        images={srcSet}
                        onChange={({start}) => {
                            setIndex(start);
                            setDesc(descriptions[start]);
                        }}
                        selectedIndex={index}
                    />
                </div>
                <SimpleImagesSlider
                    ref={thumbnails}
                    baseSrc='https://ichef.bbci.co.uk/images/ic/976x549_b/'
                    images={srcSet}
                    onChange={({selected}) => setIndex(selected)}
                    selectedIndex={index}
                />
            </div>
            <pre className='basis-full md:basis-1/3 flex-none font-sans'>{desc}</pre>
        </div>
        <div className='flex gap-4 mt-4 md:ml-[calc(16.66667%-2rem)]'>
            <button
                className='bg-blue-500 cursor-pointer text-white px-4 py-2'
                onClick={() => {
                    if (thumbnails.current) thumbnails.current.selectedIndex = 0;
                    //setIndex(0);
                    //setIndex(new Number(0));
                }}
            >Select First Image</button>
            <button
                className='bg-blue-500 cursor-pointer text-white px-4 py-2'
                onClick={() => {
                    if (thumbnails.current) thumbnails.current.selectedIndex = srcSet.length - 1;
                }}
            >Select Last Image</button>
        </div>
    </div>;
}

const srcSet = [
    'p0493g9v.jpg',
    'p0493gpj.jpg',
    'p0493gtx.jpg',
    'p0493j1d.jpg',
    'p049jknr.jpg',
    'p049jkt5.jpg',
    'p049jkvt.jpg',
    'p049jkzx.jpg',
    'p049jl2w.jpg',
    'p049jl7c.jpg',
    'p049jlc7.jpg',
    'p04bkzwf.jpg',
    'p04bkzyl.jpg',
    'p04bl05c.jpg',
    'p04bl09v.jpg',
    'p04bl0h4.jpg',
];

const descriptions = [
    'A newly born Wildebeest calf has a moment of bonding with its mother.\nBlue Wildebeest (Connochaetes taurinus) South Africa',
    'A serval kitten hides from predators in the short grass.\nServal (Leptailurus serval) Masai Mara National Reserve, Kenya',
    'A young cheetah cub waits for mum to return.\nCheetah (Acinonyx jubatus)',
    'Young lion amongst its pride.\nLion (Felis leo) Masai Mara National Reserve, Kenya',
    'Baby harp seal perfectly camouflaged on the white ice.\nHarp Seal (Pagophilus groenlandicus) The White Sea, Russian Arctic',
    'A green turtle hatchling makes it safely to the open sea.\nGreen turtle (Chelonia mydas) Anano Island, Indonesia',
    'A newborn hippo takes a break on a riverbank.\nHippopotamus (Hippopotamus amphibius), South Luangwa',
    'Capybara babies huddle close to mum.\nCapybara (Hydrochoerus hydrochaeris) Pantanal, Brazil',
    'A freshly hatched Gentoo Penguin chick get’s a feed.\nGentoo Penguin (Pygoscelis papua) Antarctica',
    'A giant river otter family head down to the river.\nGiant river otter (Pteronura brasiliensis) Pantanal, Brazil',
    'Cute little duckling on grass.\nMallard (Anas platyrhynchos)',
    'A guanaco calf, wild ancestor of the llama.\nGuanaco (Lama guanicoe) Torres del Paine National Park, Patagonia, Chile',
    'A baby capuchin monkey gets a free ride from an adult.\nTufted capuchin (Sapajus paella)',
    'Two mountain goat kids make their way down a precipitous slope.\nMountain goat (Oreamnos americanus) Glacier National Park, Montana, USA',
    'Hyrax babies jostle for the best position.\nRock hyrax (Procavia capensis) Serengeti NP, Tanzania',
    'A pair of musk ox calves keep an eye out for danger.\nMusk ox (Ovibos moschatus)',
];