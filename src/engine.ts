/*------------------------------------------------------------------------------------------------
 *  RDMT STUDIOS 1986. All rights reserved.
 *  Licensed under the Apache 2.0 License. See LICENSE in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/


import { UCEDefaultScreen } from "./default-screen";
import { createCursorNode } from "./helpers";
import { UCECursorController } from "./typing.i";
import { PositionSerializer } from "./uce-std/position-serialiser";
import { UCEEvent, UCEEventHandler } from './typing.i'

export abstract class UCECursorEngine implements UCECursorController {
    protected constructor() {
        const cursor = createCursorNode();
        const ctx = this;

        PositionSerializer.Use(cursor);

        let x: number = +cursor.style.left.replace('px', '');
        let y: number = +cursor.style.top.replace('px', '');
        let dif_x: number = 0;
        let dif_y: number = 0;
        
        let draw_flag:      boolean = false;
        let pointer_target: Element|null = null;
        let pointer_tag:    string|null = null;

        /**
         * Creates dump of the pointer's runtime values
         * @returns events details
         */
        const dumpState = (() => {
            const stateObject: UCEEvent = {x: x, y: y, target: pointer_target, tag: pointer_tag};
            return (): UCEEvent => {
                stateObject.x       = x;
                stateObject.y       = y;
                stateObject.target  = pointer_target;
                stateObject.tag     = pointer_tag;
                return stateObject
            };
        })();

        /**
         * Catches user cursor movement
         */
        function __move__(e: MouseEvent): void {
            x = e.clientX;
            y = e.clientY;
        };

        /**
         * Moves cursor around the surface
         */
        function __draw__(): void {
            cursor.style.left = `${x - dif_x}px`;
            cursor.style.top = `${y - dif_y}px`;
            if (draw_flag) requestAnimationFrame(__draw__);
        };

        /**
         * Parses pointer's target element
         * under the cursor
         */
        function __parseTarget__(): void {
            const target = document.elementFromPoint(x, y);
            if (target !== pointer_target) {
                pointer_target = target;
                ctx.onTargetChange(dumpState());
            };
            if (pointer_target !== null) {
                const tag = pointer_target.getAttribute(ctx.attributeTag);
                if (tag !== pointer_tag) {
                    pointer_tag = tag;
                    ctx.onTagChange(dumpState());
                };
            } else {
                if (pointer_tag !== null) {
                    pointer_tag = null;
                    ctx.onTagChange(dumpState());
                };
            }
            if (draw_flag) requestAnimationFrame(__parseTarget__);
        };

        this.Display = () => {
            ctx.cursorScreen.append(cursor);
            ctx.onCursorDisplay(dumpState());
            return;
        };

        this.Remove = (): void => {
            ctx.onCursorRemove(dumpState());
            cursor.remove();
            return;
        };

        this.Render = (): void => {
            draw_flag = true;
            __draw__();
            __parseTarget__();
            document.addEventListener('mousemove', __move__);
            return;
        };

        this.Freeze = (): void => {
            draw_flag = false;
            document.removeEventListener('mousemove', __move__);
            return;
        };

        this.SetShift = (xDifferencePX: number = 0, yDifferencePX: number = 0): void => {
            dif_x -= dif_x + xDifferencePX;
            dif_y -= dif_y + yDifferencePX;
            return;
        };

        this.InsertElements = (...elements: HTMLElement[]) => {
            cursor.append(...elements);
            return;
        };

        this.dumpState = dumpState;
    };

    /**
     * Hidden layer element, which acts like a container screen
     * for cursor element and holds it within.
     * 
     * Cursor is mounted on {@link Display} to this element
     */
    protected cursorScreen: HTMLElement = UCEDefaultScreen;

    /**
     * HTMLElement's custom attribute name, which must be
     * used to make cursor interactive and
     * customise its behaviour.
     * 
     * This tag name can be used whatever you want,
     * engine gives you access to it and determines its changes,
     * so, for example, can be used to set custom styling to cursor,
     * like css cursor do.
     * 
     * This approach gives to ability to hide cursor interface
     * at all to interact with it, just set custom attribute
     * on HTMLElement, like classname or style attribute works.
     */
    protected abstract attributeTag: string;
    
    /**
     * Used to retrive cursor's state.
     * 
     * Method is exposed because of overhead of attaching additional
     * methods to handle all variaty of possible events, more like when
     * they don't event used, so feel free to use it as:
     * `window.addEventListener('event-type', (e) => {
     *  ev = cursor.dumpState();
     * })`
     * 
     * Subscribing to events within cursor interface will require
     * additional struct to contain created UCEEventHandlers and
     * deleting unsused handlers.
     * 
     * Maybe will be solved with WeakMap in future releases, but,
     * due to possibility to use window eventlistening, which will
     * be more efficient, it's not the feature which is being worked on.
     */
    protected readonly dumpState: () => UCEEvent;
    
    protected onTagChange:     UCEEventHandler = () => undefined;
    protected onTargetChange:  UCEEventHandler = () => undefined;
    protected onCursorDisplay: UCEEventHandler = () => undefined;
    protected onCursorRemove:  UCEEventHandler = () => undefined;

    protected readonly InsertElements: (...elements: HTMLElement[]) => void;
    protected readonly SetShift:       (xDifferencePX: number, yDifferencePX: number) => void;
    
    public readonly Display:        () => void;
    public readonly Remove:         () => void;
    public readonly Render:         () => void;
    public readonly Freeze:         () => void;
};