# react-staged (WIP)

This is a slider component (carousel, slideshow, you name it).
It's currently in a very early stage and there will be added
additional functionalities.

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

What's planned:
- configurable amounts of entries per slide
- configurable paging amount
- configurable transition animation (or even disabled)
- configurable infinity sliding behaviour
- performance optimization (speaking of bundle size and computational costs)
- `flow` support
- better README
- host docs example
- and a lot more

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
