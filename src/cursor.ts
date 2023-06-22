/*------------------------------------------------------------------------------------------------
 *  Copyright (c) RDMT STUDIOS 1986. All rights reserved.
 *  Licensed under the Apache 2.0 License. See LICENSE in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/


import { UserCursorController } from "./inteface";
import { Serializer } from "./tools.package";

/**
 * A hidden cursor pointer reference, which get self initiated
 * through anonymous function. That makes pointer an
 * abstract object, which consist of a stack variables,
 * so it's lighter, faster, ease to maintain and
 * truly incapsulated through a local scope.
 * 
 * A `UserPointer` interface represents a functions,
 * which interact with the cursor by referencing local variables
 * through interface, created and assigned during class initialisation
 * when it's referenced firstly.
 * 
 * Anything out of scope doesn't know anything about cursor and cannot
 * affect on anything by their own, cause they can't. This `callback
 * properties` are assigned withing a local scope, so the local scope,
 * which is a UserCursor true hidden abstract object, decides what to do.
 * UserCursor interface is a set of mutating functions to affect
 * on hidden abstract object variables.
 */
export const UserCursor = function(): UserCursorController {
    const CURSOR = document.createElement('div');
    CURSOR.style.position = 'absolute';

    Serializer.Autosave(CURSOR);
    Serializer.LoadCursor(CURSOR);
    
    let x: number = +CURSOR.style.left.replace('px', '');
    let y: number = +CURSOR.style.top.replace('px', '');
    let dif_x: number = 0;
    let dif_y: number = 0;
    let handle: number|undefined = undefined;
    
    function __move__(this: Document, e: MouseEvent): void {
        x = e.clientX - dif_x;
        y = e.clientY - dif_y;
    };
    
    function __draw__(): void {
        CURSOR.style.left = `${x}px`;
        CURSOR.style.top = `${y}px`;
        handle = requestAnimationFrame(__draw__);
    };
    
    
    return {
        Display(customMountPoint: HTMLElement = document.body): void {
            customMountPoint.append(CURSOR);
            return;
        },
        Remove(): void {
            CURSOR.remove();
            return;
        },
        Render(): void {
            if (handle == undefined) {
                handle = requestAnimationFrame(__draw__);
                document.addEventListener('mousemove', __move__);
            };
            return;
        },
        Freeze(): void {
            if (handle != undefined) {
                cancelAnimationFrame(handle);
                document.removeEventListener('mousemove', __move__);
            };
            return;
        },
        SetShift(xDifferencePX: number = 0, yDifferencePX: number = 0): void {
            dif_x -= dif_x + xDifferencePX;
            dif_y -= dif_y + yDifferencePX;
            return;
        },
        REFERENCE_CURSOR(accessFunction: (cursor: HTMLDivElement) => void): void {
            accessFunction(CURSOR);
            return;
        },
    }
}();



/**
 * ### For example how it wound look like if you want to do it with Classes
 * 
 * Looks:
 * - OOP, ofc :3
 * - clean, no <:(
 * - has a lot of fancy words :3, before your compilation to JS <:(
 * - but you're breaking your own rules apart (using ts-ignore) <:(

 * What not just set props to Class/Object fields and make them private?
 * cause accessing this values requires more time and makes
 * it less efficient, where your goal is to catch values fast as you can and then render it.
 */

// abstract class __deprcated__ {
//     private constructor() {};
//     public static readonly Rescale: () => void;
//     public static readonly Render: () => void;
//     public static readonly Freeze: () => void;

//     public static Display() {
//         return document.body.appendChild(__deprcated__.cursor);
//     };
//     public static Hide() {
//         return __deprcated__.cursor.remove();
//     };
    
//     public static GetCursorElement(): HTMLDivElement {
//         return __deprcated__.cursor
//     };
//     private static readonly cursor: HTMLDivElement = function() {
//         const cursor = document.createElement('div');
//         cursor.style.position = 'absolute';

//         let x: number = 0;
//         let y: number = 0;
//         let dif_x: number = 0;
//         let dif_y: number = 0;
//         let handle: number|undefined = undefined;

//         function __move__(this: Document, e: MouseEvent): void {
//             x = e.clientX - dif_x;
//             y = e.clientY - dif_y;
//         };

//         function __draw__(): void {
//             cursor.style.left = `${x}px`;
//             cursor.style.top = `${y}px`;
//             handle = requestAnimationFrame(__draw__);
//         };

//         // @ts-ignore
//         __deprcated__.Render = function(): void {
//             if (handle == undefined) {
//                 handle = requestAnimationFrame(__draw__);
//                 document.addEventListener('mousemove', __move__);
//             };
//             return;
//         };
//         // @ts-ignore
//         __deprcated__.Freeze = function(): void {
//             if (handle != undefined) {
//                 cancelAnimationFrame(handle);
//                 document.removeEventListener('mousemove', __move__);
//             };
//             return;
//         };
//         // @ts-ignore
//         __deprcated__.SetShift = function(xDifferencePX?: number, yDifferencePX?: number): void {
//             dif_x = xDifferencePX ? xDifferencePX : dif_x;
//             dif_y = yDifferencePX ? yDifferencePX : dif_y;
//             return;
//         };

//         return cursor;
//     }();
// };

// UserCursor.Display()