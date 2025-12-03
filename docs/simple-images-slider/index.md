# @react-packages/simple-images-slider
It's React component to show an images slider. The images slider displays the list of images but
we can only see some few number of all images at a time. To see the other images, we do sliding.
This kind of component is also called "carousel".

`@react-packages/simple-images-slider` is named "simple" because of without animation when sliding
the images. This component provides two buttons for sliding the images.

The following video shows how it works:  
![Slider Video](./slider.gif)

### How to use it
To use it with the default options, follow the example below:
```javascript
import SimpleImagesSlider from '@react-packages/simple-images-slider';
...
<SimpleImagesSlider iamges={imageSrcArray}  ... />
...
```

If you want change some options, follow the example below:
```javascript
import {createComponent} from '@react-packages/simple-images-slider';
const SimpleImagesSlider = createComponent({
    //options
});
...
<SimpleImagesSlider iamges={imageSrcArray}  ... />
...
```

The complete example, you can find
[here](https://github.com/atmulyana/react-packages/tree/main/example/app/routes/simple-images-slider.tsx).

#### `createComponent` options
`createComponent` has one parameter whose object type. The object has some properties which define
the options for the component. The properties are (all properties are optional):

- `leftButtonContent`<a name="params-leftButtonContent"></a>  
  It's the content for the left button that is the button for showing the previous image. The
  content is `ReactNode` object.  
  *The default value:*  
  ```javascript
  <div style={ {
    borderColor: 'white',
    borderWidth: '3px',
    borderRightWidth: '0px',
    borderTopWidth: '0px',
    boxSizing: 'border-box',
    height: '11px',
    rotate: '45deg',
    width: '11px',
  } }></div>
  ```
  The element above shows a left arrow.

- `maxVisibleCount`<a name="params-maxVisibleCount"></a>  
  The maximum count of visible images. This component does not only support one visible image at
  a time. You may set the value between 1 to 6. By using `maxVisibleCount` is higher than 1, it can
  act as the list of thumbnails for the primary carousel. You may see in the
  [example](https://github.com/atmulyana/react-packages/tree/main/example/app/routes/simple-images-slider.tsx)
  how to implement it.  
  *The default value:* 6

- `ratioX`<a name="params-ratioX"></a>  
  Along with `ratioY`, it defines the ratio between width and height of each image in the slider.  
  *The default value:* 1

- `ratioY`<a name="params-ratioY"></a>  
  Along with `ratioX`, it defines the ratio between height and width of each image in the slider.  
  *The default value:* 1

- `rightButtonContent`<a name="params-rightButtonContent"></a>  
  It's the content for the right button that is the button for showing the next image. The content
  is `ReactNode` object.  
  *The default value:*  
  ```javascript
  <div style={ {
    borderColor: 'white',
    borderWidth: '3px',
    borderBottomWidth: '0px',
    borderLeftWidth: '0px',
    boxSizing: 'border-box',
    height: '11px',
    rotate: '45deg',
    width: '11px',
  } }></div>
  ```
  The element above shows a right arrow.

- `styles`  
  Defines the CSS style for the elements inside the slider component. It is an object whose some
  properties which each defines the CSS style for specific element. `styles` has the following
  structure:
  ```typescript
  {
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
  }
  ```
  which `TStyle` is
  ```typescript
  {
    className?: string,
    style?: CSSProperties,
  }
  ```
  `className` is CSS class name(s) and `style` is the inline style.

  To explain which element that applies which property, we must know HTML structure of the slider
  component. HTML code below depicts the slider HTML structure and where each `styles` property is
  used:
  <pre>
  &lt;div {...styles.container}>
    &lt;button type='button' {...styles.button} >
        {<a href='#params-leftButtonContent' style='text-decoration:underline'>leftButtonContent</a>}
    &lt;/button>
    &lt;div {...styles.imagesBox}>
        &lt;Image key={1} />
        &lt;Image key={2} />
        &lt;Image key={3} />
        ...
    &lt;/div>
    &lt;button type='button' {...styles.button}>
        {<a href='#params-rightButtonContent' style='text-decoration:underline'>rightButtonContent</a>}
    &lt;/button>
  &lt;/div>
  </pre>
  which `Image` consists of the following elements:
  <pre>
  &lt;div {...styles.bgImage}>
    &lt;<a href='https://atmulyana.github.io/react-packages/rect/' style='text-decoration:underline'>Rect</a>
        ratioX={<a href='#params-ratioX' style='text-decoration:underline'>ratioX</a>}
        ratioY={<a href='#params-ratioY' style='text-decoration:underline'>ratioY</a>}
    >
        &lt;img {...styles.image} />
    &lt;/<a href='https://atmulyana.github.io/react-packages/rect/' style='text-decoration:underline'>Rect</a>&gt;
  &lt;/div>
  </pre>

  Some `styles` properties don't show up in HTML above. They apply at a certain condition:

  + `buttonAtFirst` is applied when the slider reaches the first image. It affects to the left
     button. It will be merged with `button` (Therefore, you only need to define what those differs
     from `button`).
  
  + `buttonAtLast` is applied when the slider reaches the last image. It affects to the right
     button. It will be merged with `button`.

  + `buttonHover` is applied when the mouse over the slider.  It affects to both buttons. It will
    be merged with `button`. You must consider the device with *touch-screen* that may not be
    equipped by a mouse.
  
  + `imageHover` is applied to the image when the mouse over it. It will be merged with `image`.
    You must consider the device with *touch-screen* that may not be equipped by a mouse.

  + `imageSelected` is applied to the selected image (when the user clicks/touches it). It will be
    merged with `image`.

  + `imagesBoxAtFirst` is applied to the `div` element which applies `imagesBox` when the slider
    reaches the first images. It will be merged with `imagesBox`.

  + `imagesBoxAtLast` is applied to the `div` element which applies `imagesBox` when the slider
    reaches the last images. It will be merged with `imagesBox`.

    > If the slider reaches the first image and also the last one
    > ([`maxVisibleCount`](#params-maxVisibleCount) is less or equals to the count of images) then
    > `imagesBox`, `imagesBoxAtFirst` and `imagesBoxAtLast` will be merged.

  <blockquote>
  <code>bgImage</code> and <code>imagesBox</code> have the required CSS properties.
  <code>bgImage</code> always has the following properties:
  <pre>
  align-self: center;
  box-sizing: border-box;
  flex: none;
  flex-basis: calc(1/<a href='#params-maxVisibleCount' style='text-decoration:underline'>maxVisibleCount</a> * 100%);
  </pre>
  <code>imagesBox</code> always has property:
  <pre>
  display: flex;
  </pre>
  You don't need to define the required properties, they will be set automatically.
  </blockquote>

### `SimpleImagesSlider` props
Only `images` is required, the other ones are optional.

- `baseSrc`  
  It's the base URL for all images inside the slider. Those images usually comes from the same
  source. Therefore, they usually have the same URL prefix.

- `images`    
  It's an array of image URL and optionally the value for `alt` attribute of `img` element. Each
  item in the array has type:

        string | {src: string, alt?: string}

  If it's a string then it's for `src` attribute.

- `onChange`   
  It's a function whose type of

        ({selected: number, start: number}) => any
  
  `selected` is the index number of selected image (when the user clicks/touches the image).
  `start` is the start index number of the visible images. There may be more than one visible
  images. This function is invoked every time any change to selected index and/or start index.

- `ref`  
  As the other *React* components, this prop is get the instance object of the component. This `ref`
  prop will return an object whose properties:
  + `startIndex` is to get/set the start index of visible images. Setting this property will slide
    the visible images.
  + `selectedIndex` is to get/set the selected image index. If the new selected image won't be
    visible because its index is not between start and end index of visible images then it will
    also set the start visible index so that the new selected index will be visible.   
    This property returns `-1` if no selected image. Setting it to the value less than zero or
    greater than or equal to the count of images will cause no selected image.
  
  Example:
  ```typescript
  import SimpleImagesSlider, {type RefInstance} from '@react-packages/simple-images-slider';

  ...

  const slider = React.useRef<RefInstance>(null);
  ...
  <SimpleImagesSlider ref={slider} ... />
  ...
  <button onClick={() => { if (slider.current) slider.current.selectedIndex = 0; } }>Select First Image</button>
  ...
  ```

- `selectedIndex`   
  is the index number of the selected image. After this prop is set to a new value, the image at
  the `selectedIndex`-th position will be selected. But after that, the user can still change the
  selected image by clicking/touching another image. Because of this, the current selected image
  index may be different from the current value of `selectedIndex` prop. If after that, we try to
  set `selectedIndex` prop to the same number, in order to select the image at the
  `selectedIndex`-th position, it won't work because we set the same value for `selectedIndex` prop
  that won't trigger re-rendering. To cope with this problem, we can use `new Number(selectedIndex)`
  for the new value as shown in the following example:
  ```typescript
  const [index, setIndex] = React.useState<number| Number>(0);
  
  ...

  <SimpleImagesSlider selectedIndex={index} ...  />

  ...

  <button
    onClick={ () => {
       /* Always selects the first image even if the user has selected another image */
      setIndex(new Number(0)) 
    } }
  >Select First Image</button>
  ```
  > Please update to version 1.0.1 for this example works