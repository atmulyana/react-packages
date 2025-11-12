# @react-packages/rect
It's React component to render a flex box that keeps the aspect ratio between its height and width
even when it's resized. For example:
```jsx
import Rect from '@react-packages/rect';

...

<div
    style={{
        display: 'flex',
        gap: '8px',
        width: '25%',
    }}
>
    <Rect
        style={{
            borderStyle: 'solid',
            borderWidth: '1px',
            flex: 1,
            paddingInline: '8px',
            paddingBlock: '4px',
        }}
    />
    <Rect
        style={{
            borderStyle: 'solid',
            borderWidth: '1px',
            flex: 1,
            paddingInline: '8px',
            paddingBlock: '4px',
        }}
    />
    <Rect
        style={{
            borderStyle: 'solid',
            borderWidth: '1px',
            flex: 1,
            paddingInline: '8px',
            paddingBlock: '4px',
        }}
    />
</div>
```
The JSX code part above will render three square boxes (height and width have ratio 1:1). If we want
different ratio, we can define `ratioX` and/or `ratioY` prop.

**Rect component works well if**  
`className` and/or `style` props produce only one side (height/width) which has the length greater
than 0 (excluding border and padding) and another side has zero length (excluding border and
padding). By default, `Rect` is a block element. The zero length side will be recalculated based on
another side so that the ratio between sides is fulfilled.

### The usage
For example, we want to render an image centered inside a box. We can use the following example:
```jsx
import Rect, {styles} from '@react-packages/rect';

...

<Rect ...>
    <img ...
        style={styles.centeredImage}
    />
</Rect>
```
where `styles.centeredImage` is `{height:'100%', objectFit:'contain', objectPosition:'center', width:'100%'}`.

> The previous example can be replaced by `FlexImage` component which is included in this package.

### `Rect` component props
All props are optional.
- `className`  
  CSS class name(s).
- `onRendered`   
  It's a function whose type of `(isRendered: boolean) => void`. This function is invoked when the
  component is mounted and when `children` is rendered. At mounted stage, `children` may not be
  rendered yet because the component must probe which side (height/width) that must be recalculated.
  After clear, `children` will be rendered and this function is invoked again. `isRendered` is
  `true` if `childrem` has been rendered. To avoid probing, please define `vertical` prop.
- `ratioX`  
  is a ratio number for width side. Along with `ratioY` prop, it will produce the width as long as
  `ratioX / ratioY` of height.  
  *Default value:* 1
- `ratioY`  
  is a ratio number for height side. Along with `ratioX` prop, it will produce the height as long
  as `ratioY / ratioX` of width.   
  *Default value:* 1
- `style`  
  is inline style.
- `vertical`  
  If this prop is defined and `true` then the width will be calculated based on the height. If it's
  `false` then the height that will be calculated. If not defined, the component will probe which
  side to be calculated (the zero length side that will be calculated).