> Current stable version: 1.0.0
> Licence: Apache 2.0


## User cursor engine

This package provides an ability to create custom cursors and attach custom events handling logic to it. It's just an 'engine', so it's pretty lightweight and fast. It may not provide you an out-of-box ability to define and use it raw, but an ability to respond to varriaty of 'missing events' in couple with dynamic cursor's UI container and so create anything accordingly to your needs.

Usage
-----

#### Creating custom cursor
```ts 

import { UCECursorEngine } from "./cursor-engine";

export class TestCursor extends UCECursorEngine {
    // This tag is used to defined custom attribute name,
    // which will be gathered by the cursor
    protected attributeTag: string = 'cursor-attr';

    public constructor() {
        super();
        // Insert UI to the cursor, because cursor itself node
        // is just an empty container
        this.insertElements(customHTMLElement);
    };
};
```

#### Running cursor
```ts
const userCursor = new TestCursor();

// starts cursor rendering and turns on event responding
userCursor.Render();

// makes visible on screen
userCursor.Display();
```

Cursor does not have any visible styling, so to customize it's UI you need to insert element to it using method:

```ts
userCursor.insertElements()
```

> First uppercase of a cursor property/method means it's public, while lowercase - protected.

`Hide()` method removes it from screen, and `Freeze()` - stops its render cycle, which means the cursor will be freezed according to it's during state on a screen.

Cursor gives you ability to manage custom events, linked with its life cycle, like pointer target or targeted element cursor sattribute changed.

Events fired not only when cursor moves, but something changed under the pointer. This means that it's not neccessary to move cursor to lookup for changes, it will do it under the hood, meaning more proper events handling of a moving elements for example.


Features
--------

- [x] Position serialisation

> Cursor will stay in the same place even after reloading

Interface
----

```ts
import { UserCursorController } from 'CursorController'
interface UserCursorController
```


#### Show cursor on a screen 
```ts
Display(customMountPoint?: HTMLElement): void
```
@param customMountPoint change default (document.body) node to mount cursor on
@returns void


#### Hide cursor
```ts
Hide(): void
```
@returns void


#### Start cursor inner rendering loop
```ts
Render(): void
```
Render loop is responsible for cursor inner logic processing,
which changes its state and UI.
@returns void


#### Stop cursor inner render loop
```ts
Freeze(): void
```
Render loop is responsible for cursor inner logic processing,
which changes its state and UI.
@returns void


## Docs

#### Set shift between real user pointer and UserCursor UI positions
```ts
setShift(xDifferencePX?: number, yDifferencePX?: number): void
```
How it works - for example user is holding his mouse pointer on a x: 10 and y: 20
coordinates. So, by default, cursor position wound be changed to x: 10 and y: 20,
but cursor width and height are, for example, 5px and 5px respectively. On a screen
it wound look like cursor triggers events when it's only his left upper corner hits a html node.

So to 'fix' that, you can set xDifferencePX and yDifferencePX. In this situatuation, after
you set this values to 5 and 5, cursor will look proper and trigger events when its center
hits a node.
@param xDifferencePX difference between user real pointer on a screen and a cursor ui position for X coordinate
@param yDifferencePX difference between user real pointer on a screen and a cursor ui position for Y coordinate
@returns void


#### Add elements
```ts
protected insertElements(...elements: HTMLElement[]): void
```
Insert any elements to cursor.


#### Mounted screen

Hidden layer element, which acts like a container screen
for cursor element and holds it within.

Cursor is mounted on `Display()` to this element, so it
can be changed statically or dynamically.

```ts
protected cursorScreen: HTMLElement = UCEDefaultScreen
```

#### Custom cursor attribute name

HTMLElement's custom attribute name, which must be
used to make cursor interactive and
customise its behaviour.

This tag name can be used whatever you want,
engine gives you access to it and determines its changes,
so, for example, can be used to set custom styling to cursor,
like css cursor do.

This approach gives to ability to hide cursor interface
at all to interact with it, just set custom attribute
on HTMLElement, like classname or style attribute works.

```ts
protected abstract attributeTag: string
```
    
#### Get current cursor state

Used to retrive cursor's state.

Method is exposed because of overhead of attaching additional
methods to handle all variaty of possible events, more like when
they don't event used, so feel free to use it as:
`window.addEventListener('event-type', (e) => {
 ev = cursor.dumpState();
})`

Subscribing to events within cursor interface will require
additional struct to contain created UCEEventHandlers and
deleting unsused handlers.

Maybe will be solved with WeakMap in future releases, but,
due to possibility to use window eventlistening, which will
be more efficient, it's not the feature which is being worked on.

```ts
protected readonly dumpState: () => UCEEvent
```
    
#### Events
```ts
/**
 * Fired when attribute value of a target is changed
 */
protected onTagChange:     UCEEventHandler = () => undefined;
/**
 * Fired when target which cursor is currently
 * pointing to changed.
 */
protected onTargetChange:  UCEEventHandler = () => undefined;
/**
 * Fired when cursor node is being mouted to the screen.
 * Event fired after node was mounted.
 */
protected onCursorDisplay: UCEEventHandler = () => undefined;
/**
 * Fired when cursor is being removed from the screen.
 * Event is fired before node is removed.
 */
protected onCursorRemove:  UCEEventHandler = () => undefined;
```
