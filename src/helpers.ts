/*------------------------------------------------------------------------------------------------
 *  RDMT STUDIOS 1986. All rights reserved.
 *  Licensed under the Apache 2.0 License. See LICENSE in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/


/**
 * Creates cursor root node for UI,
 * which is handled by engine.
 */
export function createCursorNode(): HTMLDivElement {
    const cursor = document.createElement('div');
    cursor.style.position       = 'fixed';
    cursor.style.pointerEvents  = 'none';
    cursor.style.userSelect     = 'none';
    cursor.style.display        = 'flex';
    cursor.style.justifyContent = 'center';
    cursor.style.alignItems     = 'center';
    cursor.style.width          = '0px';
    cursor.style.height         = '0px';
    cursor.style.overflow       = 'visible';
    return cursor;
};
