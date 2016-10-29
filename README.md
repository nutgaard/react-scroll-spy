# react-spy-scroll
Scrollspy components for react

[![circleci.com](https://circleci.com/gh/nutgaard/react-scroll-spy/tree/master.svg?style=shield&circle-token=05a159f51aa45260e4ed1f74ddbdc2ff896bc8ab)](https://circleci.com/gh/nutgaard/react-scroll-spy/tree/master)
[![codecov.io](https://codecov.io/github/nutgaard/react-scroll-spy/coverage.svg?branch=master)](https://codecov.io/github/nutgaard/react-scroll-spy?branch=master)
[![Dependency Status](https://david-dm.org/nutgaard/react-scroll-spy.svg)](https://david-dm.org/nutgaard/react-scroll-spy)
[![devDependency Status](https://david-dm.org/nutgaard/react-scroll-spy/dev-status.svg)](https://david-dm.org/nutgaard/react-scroll-spy#info=devDependencies)
[![peerDependency Status](https://david-dm.org/nutgaard/react-scroll-spy/peer-status.svg)](https://david-dm.org/nutgaard/react-scroll-spy#info=peerDependencies)

## How to install
```
npm install react-spy-scroll --save
```

## How to use it
TODO

### The most basic setup
TODO

### The default behaviour

The library introduces four components; `AnchorLink`, `AnchorButton`, `AnchorElement` and `ScrollPanel`.
The link and button are simple `a` and `button` tags wrapped in the `Anchor` component for ease of use.

To get startet you only need some `AnchorXXXX`s and `AnchorElements` with matching `href` and `id` props.
If you want a scrolling area within your page, e.g. not a page-scroll, you can wrap your `AnhorElements` in a `ScrollPanel`.

`AnchorElements` have useful defaults by them self, but will inherit configuration from its parent `ScrollPanel` if one exists.
If by change a `AnchorElement` defines a props which is also present at its parent `ScrollPanel` then the `AnchorElements` config will be used.


#### Anchor

|    PropName   |    PropType           |    Default            |  Description      |
| ------------- | --------------------- | --------------------- | ----------------- |
| `href`        | `PT.string.isRequired`| None                  | Reference to AnchorElement's `id`  |
| `onClick`     | `PT.func`             | None                  | `onClick` handler  |
| `activeClass` | `PT.string`           | `scroll-spy-active`   | The class given to an `Anchor` when its `AnchorElement` is active  |

#### AnchorElement

|    PropName   |    PropType               |    Default    |  Description                      |
| ------------- | ------------------------- | ------------- | --------------------------------- |
| `id`          | `PT.string.isRequired`    | None          | An elements `id`                  |
| `offset`      | `PT.number`               | None          | Scroll offset                     |
| `children`    | `PT.element.isRequired`   | None          | React children                    |
| `isInside`    | `PT.func`                 | See below     | Checking if element is in view    |

```javascript
isInside: (scrollOffset, elemTopBound, elemBottomBound) =>
        (scrollOffset >= elemTopBound && scrollOffset <= elemBottomBound)
```

#### ScrollPanel

|    PropName   |    PropType               |    Default    |  Description                      |
| ------------- | ------------------------- | ------------- | --------------------------------- |
| `offset`      | `PT.number`               | `0`           | Scroll offset                     |
| `events`      | `PT.object`               | `{}`          | Callbacks for start/end of scroll |
| `animate`     | `PT.bool`                 | `true`        | Animated scroll                   |
| `tag`         | `PT.string`               | `div`         | DOM-tag                           |
| `className`   | `PT.string`               | `scroll-panel`| Classname                         |
| `children`    | `PT.arrayOf(PT.element)`  | None          | React-children                    |


## Peer dependencies
This component has the newest react and react-router as peerdependenies, but will most likely work with lower version.
If you test the component with lower versions of react and/or react-router please let me know so that the dependencies can be adjusted.

```
"react": "^0.14.7 || ^15.0.1"
"react-dom": "^0.14.7 || ^15.0.1"
```
