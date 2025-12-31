# @react-packages/image-thumbnail
React component to create a thumbnail of an exisiting `<img/>` element without creating a new
`<img/>` with the same `src`. It's useful if the image is a non-cached/dynamic resource and the
thumbnail is created asynchronously. If we use another `<img/>` with the same `src` but smaller
size then it will trigger another request to the server for the same resouce.

Please see this [documentation](https://atmulyana.github.io/react-packages/thumbnail/) and this
[example](https://github.com/atmulyana/react-packages/tree/main/example/app/routes/thumbnail.tsx).