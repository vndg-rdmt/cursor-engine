/*------------------------------------------------------------------------------------------------
 *  RDMT STUDIOS 1986. All rights reserved.
 *  Licensed under the Apache 2.0 License. See LICENSE in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/


export class UCEScreenNode extends HTMLElement {
    public constructor() {
        super();
        this.restoreDefault();
        document.body.append(this);
    };

    public restoreDefault(): void {
        this.style.width            = '100vw';
        this.style.height           = '100vh';
        this.style.position         = 'fixed';
        this.style.zIndex           = '111111';
        this.style.pointerEvents    = 'none';
        this.style.userSelect       = 'none';
    };
};
customElements.define('uce-default-screen-node', UCEScreenNode);

export const UCEDefaultScreen = new UCEScreenNode();