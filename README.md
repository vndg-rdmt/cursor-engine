Current stable version: 1.0.0
Licence: Apache 2.0


# User Cursor global object engine

Constantly predefined, lazy calculated and fully on stack abstract object controller.
> Actual module interface can always be found within this package or later in the `Docs` section.

## Usage

**Import** cursor controller

```ts
import { UserCursor } from 'cursor-controller'
```

Cursor, as an UI element, is already predefined and 'lazy calculated' due to JS/TS features, only when it's used first time.

Cursor has inner render cycle, where it's state is can be dynamically changed. `Render` method call starts it.
To make cursor visible, call `Display` method

```ts
UserCursor.Render();
UserCursor.Display();
```

Now cursor is rendered on a screen, but you wount be able to see it, because now it's just a defaut styled div node.
Cursor behavior, apperience and etc is changed within `REFERENCE_CURSOR` method call. It recevies a callback, which can
accept a HTMLElement. Within this callback you can directly access a UserCursor node.

```ts
UserCursor.REFERENCE_CURSOR((e) => {
    e.className = 'my-cursor';
});
```

If method named with only uppercase leters, this means that this method can change its signature, naming, behavior and etc,
or its current realisation is not suitable at some moments, maybe.


## Features

- [x] Position serialisation

> Cursor will stay in the same place even after reloading

## Docs

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


#### Remove cursor from the screen
```ts
Remove(): void
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


#### Set shift between real user pointer and UserCursor UI positions
```ts
SetShift(xDifferencePX?: number, yDifferencePX?: number): void
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


#### Reference a user pointer node withing a callback
```ts
REFERENCE_CURSOR(accessFunction: (cursor: HTMLDivElement) => undefined): void
```
@returns a cursor node