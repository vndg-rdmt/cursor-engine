/*------------------------------------------------------------------------------------------------
 *  Copyright (c) RDMT STUDIOS 1986. All rights reserved.
 *  Licensed under the Apache 2.0 License. See LICENSE in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/


import { UserCursorController } from "./interface/index.js";
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
        AccessCursorUI(accessCallback: (cursorNode: HTMLDivElement) => void): void {
            accessCallback(CURSOR);
            return;
        },
    }
}();
