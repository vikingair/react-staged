# react-staged

This is a slider component (carousel, slideshow, you name it). Here's the [demo](https://fdc-viktor-luft.github.io/react-staged/).

What's already possible:
- providing an array of nodes to the `<Staged />` or `<InfinityStaged />` components where
  each entry will be treated as one pageable element.
- sliding of a single displayed entry with fixed ease-out transition.
- sliding buttons to slide a single entry
- infinity sliding (e.g. element n + 1 is the first element)
- dragging to slide on both touch and desktop devices
- clicking of the inner slides is possible but automatically 
  prevented when the user is dragging.
- `TypeScript` support
- configurable amounts of entries per slide
- configurable infinity sliding behaviour
- overridable SCSS variables to adjust paging arrows
- configurable transition animation
- lazy loading of all "unreachable" children by default

What's still planned:
- performance optimization (speaking of bundle size and computational costs)
- paging listener 
- 100% test coverage

# Usage
```js
import { Staged } from 'react-staged';

const App = () => (
    <Staged>
        {arrayFullOfSlides}
    </Staged>
);
```
Or alternatively:
```js
import { InfinityStaged } from 'react-staged';

const App = () => (
    <InfinityStaged>
        {arrayFullOfSlides}
    </InfinityStaged>
);
```
Make sure to important the required styles.
```js
import 'react-staged/dist/assets/staged.scss';
```
Or directly import it in your own styles.
```scss
// optional override some default variables
$staged-arrow-color: #000;
$staged-arrow-stroke-width: 3px;
$staged-arrow-size: 1.5em;
$staged-arrow-bg: #fff;
$staged-arrow-border-radius: 1.5 * $staged-arrow-size;

// and afterwards import this single style
@import '<NODE_MODULES>/react-staged/dist/assets/staged.scss';
```
## Props
The `Staged` component offers the following configurable props.

Props              | Type                                           | Default        | Description                                                       
------------------ | ---------------------------------------------- | -------------- | ----------------------------------------------------------------- 
`children`         | `ReactNode[]` (at least 2 elements)            |                | Those are actually the staged elements to slide.
`amount`           | `number` (optional natural number > 0)         | 1              | The amount of elements you want to display at a time.
`hideArrows`       | `boolean` (optional)                           | false          | If you want to hide the sliding arrows completely.
`noDrag`           | `boolean` (optional)                           | false          | You can disable the draggable slider.
`animation`        | `string` (optional valid CSS animation string) | ease-out       | You can configure the transition animation yourself. Or disable it by setting `animation` to "none".

The `InfinityStaged` component has an additional property to configure the automatic sliding.

Props              | Type                                           | Default        | Description                                                       
------------------ | ---------------------------------------------- | -------------- | ----------------------------------------------------------------- 
`autoSlide`        | `number` (optional natural number > 0)         | undefined      | The milliseconds until sliding automatically.

### Infinity sliding behaviour
The `<InfinityStaged />` will never show a single paging button, since it has no real beginning or end.
It will place your first slide to the end of the last slide and vice versa.

### Lazy loading
The slider will render only the "reachable" children. Let's say your slide has a configured paging amount of 2.
This means the infinity slider will render child n - 1, n, 1, 2, 3 and 4, where only 1 and 2 are the only visible slides.
If you want to make sure that your images get lazy loaded, you should consider to add `loading="lazy"` to your images.
