<style>
  pre.structure a[href] {
    text-decoration: underline;
  }
</style>

# @react-packages/image-thumbnail
React component to create a thumbnail of an exisiting `<img/>` element without creating a new
`<img/>` with the same `src`. It's useful if the image is a non-cached/dynamic resource and the
thumbnail is created asynchronously. If we use another `<img/>` with the same `src` but smaller
size then it will trigger another request to the server for the same resouce.

### Basic usage
The following example shows how to use the component with default options:
```typescript
import Thumbnail from '@react-packages/image-thumbnail';

...

const imgRef = React.useRef<HTMLImageElement>(null);
...
<img id="imageId" ref={imgRef} ... />
...
<Thumbnail image={imgRef.current /*or `document.getElementById("imageId")`*/} ... />
```

### The component props
- `image`<a name="props-image"></a>  
  It's the reference of `img` element that the thumbnail will reflect the image from it.
- `classNamee`<a name="props-classname"></a>  
  CSS class name(s).
- `style`<a name="props-style"></a>   
  Inline CSS style.

### More options
To change some options, we must use `createComponent` function as the following example:
```typescript
import {createComponent} from '@react-packages/image-thumbnail';
const Thumbnail = createComponent({
    ...
});

...

<Thumbnail image={imgRef.current /*or `document.getElementById("imageId")`*/} ... />
```
`createComponent` function takes one parameter whose type of object. The object is defined as
follows:
```typescript
type Params = {
    noImage?: React.ReactNode,
    ratioX?: number,
    ratioY?: number,
    styles?: {
        background?: TStyle,
        content?: TStyle,
    },
};
```
where `TStyle` is 
```typescript
{
    className?: string,
    style?: CSSProperties,
}
```
- `noImage`<a name="options-noimage"></a>   
  It will be rendered when [`image`](#props-image) prop is `null` or the thumbnail image is failed
  to create.  
  *Default value*: an `svg` element which depicts an "no image" icon.

- `ratioX` <a name="options-ratiox"></a>   
  Along with [`ratioY`](#options-ratioy), it determines the ratio between width and height of the
  thumbnail area.   
  *Default value*: 1

- `ratioY` <a name="options-ratioy"></a>   
  Along with [`ratioX`](#options-ratiox), it determines the ratio between height and width of the
  thumbnail area.   
  *Default value*: 1

- `styles` <a name="options-styles"></a>   
  It defines CSS styles for the elements rendered by the thumnail component. It will be clear if we
  show the structure of elements rendered by the thumbnail component and how `styles` is applied.
  The following code is the elements:
  <pre class="structure">
  &lt;div
    className={props.<a href="#props-classname">className</a>}
    style={props.<a href="#props-style">style</a>}
  &gt;
    &lt;<a href='https://atmulyana.github.io/react-packages/rect/'>Rect</a>
        {...<a href="#options-styles">styles</a>.background}
        ratioX={<a href="#options-ratiox">ratioX</a>}
        ratioY={<a href="#options-ratioy">ratioY</a>}
    &gt;
        {props.<a href="#props-image">image</a> ? (
            &lt;div {...<a href="#options-styles">styles</a>.content}>
                &lt;canvas ... /> {/* This `canvas` element displays the thumbnail image */}
            &lt;/div>
        ) : <a href="#options-noimage">noImage</a>}
    &lt;/<a href='https://atmulyana.github.io/react-packages/rect/'>Rect</a>&gt;
  &lt;/div>
  </pre> 