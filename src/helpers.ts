import { UCECursorEventsRegistry, UCEEvent } from "./typing.i"

/**
 * Creates cursor root node for UI,
 * which is handled by engine.
 */
export function createCursorNode(): HTMLDivElement {
    const cursor = document.createElement('div');
    cursor.style.position       = 'absolute';
    cursor.style.pointerEvents  = 'none';
    cursor.style.userSelect     = 'none';
    cursor.style.display        = 'flex';
    cursor.style.justifyContent = 'center';
    cursor.style.alignItems     = 'center';
    cursor.style.width          = '0px'
    cursor.style.height         = '0px'
    return cursor;
};

/**
 * Creates struct for holding cursor-events
 * handlers data.
*/
export function createEventsRegistery(): UCECursorEventsRegistry {
    return new Map([
        ['click',           []],
        ['contextmenu',     []],
        ['mousedown',       []],
        ['mouseup',         []],
        ['tagChange',       []],
        ['targetChange',    []],
        ['cursorDisplayd',  []],
        ['cursorWillRemove',[]],
    ]);
};

// /**
//  * 
//  * @param eventConstructor 
//  * @param eventsRegistry 
//  */
// export function createEventsSwitch(eventConstructor: () => UCEEvent, eventsRegistry: UCECursorEventsRegistry) {
//     // define true hidden event handlers
//     for (const [_, handlersBuffer] of eventsRegistry) {
//         for (const [callback, _] of handlersBuffer) {
//             handlersBuffer.set(callback, () => callback(eventConstructor()));
//         };
//     };

//     function switchFuncConstructor() {
        
//     };
// };

// export function createTagParser(valuesMapping: string, tagValue: string) {
    
// };