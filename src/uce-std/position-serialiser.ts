/*------------------------------------------------------------------------------------------------
 *  RDMT STUDIOS 1986. All rights reserved.
 *  Licensed under the Apache 2.0 License. See LICENSE in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/


import { ToolsCollisionPreventer } from "./collision-preventer";

/**
 * A UserCursor serialiser tool.
 * Object-like state serialisation is not used due to overhead
 * and erialisation/derialisation available time amount.
 */
export abstract class PositionSerializer extends ToolsCollisionPreventer {

    /**
     * Attaches nodes position autosaving and loading
     * @param cursor HTML node
     * @returns 
     */
    public static Use(cursor: HTMLElement): void {
        return PositionSerializer.loadCursor(cursor) ? PositionSerializer.attachAutosave(cursor) : undefined
    };
    /**
     * Makes UserCursor essential properties to be saved during
     * window unloading event.
     * @param cursor UserCursor node
     */
    private static attachAutosave(cursor: HTMLElement): void {
        function saving(): void {
            try {
                sessionStorage.setItem(PositionSerializer.identifier + "@x", cursor.style.left);
                sessionStorage.setItem(PositionSerializer.identifier + "@y", cursor.style.top);
                window.removeEventListener('beforeunload', saving);
            } catch {}
        };
        window.addEventListener('beforeunload', saving);
        return;
    };

    /** 
     * Restores object state if it's been saved previously
     * @param cursor UserCursor node
    */
    private static loadCursor(cursor: HTMLElement): boolean {
        try {
            const x = sessionStorage.getItem(PositionSerializer.identifier + "@x");
            if (x != null) {
                sessionStorage.removeItem(PositionSerializer.identifier + "@x");
                cursor.style.left = x;
            };
            const y = sessionStorage.getItem(PositionSerializer.identifier + "@y");
            if (y != null) {
                sessionStorage.removeItem(PositionSerializer.identifier + "@y");
                cursor.style.top = y;
            };
            return true;
        } catch {
            return false;
        };
    };
}
