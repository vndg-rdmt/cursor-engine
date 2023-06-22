/*------------------------------------------------------------------------------------------------
 *  Copyright (c) RDMT STUDIOS 1986. All rights reserved.
 *  Licensed under the Apache 2.0 License. See LICENSE in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/


export interface UserCursorController {
    /**
     * ### Show cursor on a screen 
     * @param customMountPoint change default (document.body) node to mount cursor on
     * @returns void
     */
    Display(customMountPoint?: HTMLElement): void
    /**
     * ### Remove cursor from the screen
     * @returns void
     */
    Remove(): void
    /**
     * ### Start cursor inner rendering loop
     * Render loop is responsible for cursor inner logic processing,
     * which changes its state and UI.
     * @returns void
     */
    Render(): void
    /**
     * ### Stop cursor inner render loop
     * Render loop is responsible for cursor inner logic processing,
     * which changes its state and UI.
     * @returns void
     */
    Freeze(): void
    /**
     * ### Set shift between real user pointer and UserCursor UI positions
     * How it works - for example user is holding his mouse pointer on a x: 10 and y: 20
     * coordinates. So, by default, cursor position wound be changed to x: 10 and y: 20,
     * but cursor width and height are, for example, 5px and 5px respectively. On a screen
     * it wound look like cursor triggers events when it's only his left upper corner hits a html node.
     * 
     * So to 'fix' that, you can set xDifferencePX and yDifferencePX. In this situatuation, after
     * you set this values to 5 and 5, cursor will look proper and trigger events when its center
     * hits a node.
     * @param xDifferencePX difference between user real pointer on a screen and a cursor ui position for X coordinate
     * @param yDifferencePX difference between user real pointer on a screen and a cursor ui position for Y coordinate
     * @returns void
     */
    SetShift(xDifferencePX?: number, yDifferencePX?: number): void
    /**
     * ### Reference a user pointer node withing a callback
     * @returns a cursor node
     */
    REFERENCE_CURSOR(accessFunction: (cursor: HTMLDivElement) => undefined): void
}

