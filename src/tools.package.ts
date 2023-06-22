/*------------------------------------------------------------------------------------------------
 *  Copyright (c) RDMT STUDIOS 1986. All rights reserved.
 *  Licensed under the Apache 2.0 License. See LICENSE in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/


/**
 * Base abstract class for storing meta information
 * within package for tools and to also prevent naming collisions
 * during dealing with web global objects, constants and etc.
 */
abstract class PackageTools {
    protected static readonly PACKAGE_ID = "RDMT-WD-TS-00003" + this.name
};

/**
 * A UserCursor serialiser tool.
 * Object-like state serialisation is not used due to overhead
 * and erialisation/derialisation available time amount.
 */
export abstract class Serializer extends PackageTools {

    /**
     * Makes UserCursor essential properties to be saved during
     * user tab, history events.
     * @param cursor a UserCursor node
     * @returns 
     */
    public static Autosave(cursor: HTMLDivElement): void {
        function saving(): void {
            try {
            sessionStorage.setItem(Serializer.PACKAGE_ID + "@x", cursor.style.left)
            sessionStorage.setItem(Serializer.PACKAGE_ID + "@y", cursor.style.top)
            } catch {};
            window.removeEventListener('beforeunload', saving);
            return;
        };
        window.addEventListener('beforeunload', saving);
        return;
    };

    /** 
     * Restores object state if it's been saved previously
    */
    public static LoadCursor(cursor: HTMLDivElement): void {
        const x = sessionStorage.getItem(Serializer.PACKAGE_ID + "@x");
        if (x != null) {
            sessionStorage.removeItem(Serializer.PACKAGE_ID + "@x")
            cursor.style.left = x;
        };
        const y = sessionStorage.getItem(Serializer.PACKAGE_ID + "@y");
        if (y != null) {
            sessionStorage.removeItem(Serializer.PACKAGE_ID + "@y")
            cursor.style.top = y;
        };
        return;
    };
}