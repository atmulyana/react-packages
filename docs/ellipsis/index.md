# @react-packages/ellipsis
It's React component that gives an ellipsis mark on an overflow text without needing to set a fixed
length. It can comportably be used in a responsive design.

### Why `Ellipsis` component is needed
In CSS, we can define the following property:
```css
text-overflow: ellipsis;
```
This property defines that if a text exceeds one line then truncate it to be fit one line and gives
ellipsis mark (three dots) at the end of text. However, this property must be combined with the
following properties:
```css
overflow: hidden;
white-space: nowrap;
```
Beside that, the element must be able to determine the exact width of itself. If not, we must set
`width` property to a fixed length, not in percentage. But, setting `width` property to a fixed
length is a little bit forbidden in a responsive design. To resolve this problem, we can use
`Ellipsis` element. The use of this element is very simple, just wrap the text using this element,
for example:
```typescript
import Ellipsis from '@react-packages/ellipsis';

...

<h5><Ellipsis>The long text that can exceeds one line</Ellipsis></h5>
```

**`Ellipsis` element works well if:**  
- It's the only child element of its parent.
- The parent element may not be collapse (the width becomes zero) if it's empty. On the other words,
  it may not be an inline element (has CSS property `display: inline`).