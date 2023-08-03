/*------------------------------------------------------------------------------------------------
 *  RDMT STUDIOS 1986. All rights reserved.
 *  Licensed under the Apache 2.0 License. See LICENSE in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/


/**
 * Base abstract class for storing meta information
 * within package for tools and to also prevent naming collisions
 * during dealing with web global objects, constants and etc.
 */
export abstract class ToolsCollisionPreventer {
    protected static readonly identifier = "rmdt-uce-" + this.name;
};