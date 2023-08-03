import { UCEDefaultScreen } from "../default-screen";
import { createCursorNode } from "./helpers";
import { UserCursorController } from "./interface";
import { PositionSerializer } from "./package-tools/position-serialiser";
import { UCEEventType, UCEEvent, UCEEventHandler, UCECursorEventsRegistry  } from './typing.i'


export abstract class UCECursorEngine implements UserCursorController {
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
                const tag = pointer_target.getAttribute(ctx.cursorTag);
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
        };

        this.subscribeEvent = (eventType: keyof WindowEventMap, handler: UCEEventHandler) => {
            const globalHandler = () => handler(dumpState());
            ctx.eventHandlersRegistry.set(handler, globalHandler);
            window.addEventListener(eventType, globalHandler);
        };

        this.unSubscribeEvent = (eventType: keyof WindowEventMap, handler: UCEEventHandler) => {
            const globalHandler = () => handler(dumpState());
        };
    };

    private readonly eventHandlersRegistry: Map<UCEEventHandler, VoidFunction> = new Map();
    public readonly subscribeEvent:     (e: keyof WindowEventMap, handler: UCEEventHandler) => void;
    public readonly unSubscribeEvent:   (e: keyof WindowEventMap, handler: UCEEventHandler) => void;

    protected cursorScreen: HTMLElement = UCEDefaultScreen;
    protected abstract cursorTag: string;

    protected onTagChange:      UCEEventHandler = () => undefined;
    protected onTargetChange:   UCEEventHandler = () => undefined;
    protected onCursorDisplay:  UCEEventHandler = () => undefined;
    protected onCursorRemove:   UCEEventHandler = () => undefined;

    public readonly Display:        () => void;
    public readonly Remove:         () => void;
    public readonly Render:         () => void;
    public readonly Freeze:         () => void;
    public readonly SetShift:       (xDifferencePX: number, yDifferencePX: number) => void;
    public readonly InsertElements: (...elements: HTMLElement[]) => void;
};