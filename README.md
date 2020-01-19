# react-staged

This is a slider component (carousel, slideshow, you name it). Here's the [demo](https://fdc-viktor-luft.github.io/react-staged/).

What's already possible:
- providing an array of nodes to the `<Staged />` component where
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

What's still planned:
- performance optimization (speaking of bundle size and computational costs)
- `flow` support
- 100% test coverage

# Usage
```js
import { Staged } from 'react-staged';

const App = () => (
    <div>
        <Staged>
            {arrayFullOfSlides}
        </Staged>
    </div>
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
`autoSlide`        | `number` (optional natural number > 0)         | undefined      | The milliseconds until the sliding automatically.
`noDrag`           | `boolean` (optional)                           | false          | You can disable the draggable slider.
`infinity`         | `boolean` (optional)                           | [depends](#infinity-sliding-behaviour)        | You can enforce the infinity sliding behaviour.
`animation`        | `string` (optional valid CSS animation string) | ease-out       | You can configure the transition animation yourself. Or disable it by setting `animation` to "none".

### Infinity sliding behaviour
The infinity slider will always show both sliding buttons, since it has no real beginning or end.
You can enforce this behaviour by setting `infinity` to `true` but in some cases this behavior will
automatically apply. E.g. auto-sliding enables the infinity mode to avoid strange animations when
reaching the end of the staged elements. But also if your supplied elements count is not dividable
by the configured `amount` without any rest. E.g. having 5 staged elements and displaying twice a time
would enable the infinity mode. To overcome this behaviour you should make sure to slice your elements
accordingly. 
