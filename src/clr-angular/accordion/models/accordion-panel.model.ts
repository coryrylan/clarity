/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/

import { AccordionStatus } from '../enums/accordion-status.enum';
import { ClrAccordionStrategy } from '../enums/accordion-strategy.enum';

export class AccordionPanelModel {
  get index() {
    return this._index;
  }
  get isOpen() {
    return this._open;
  }
  get status() {
    return this._status;
  }
  get disabled() {
    return this._disabled;
  }

  private _index: number = null;
  private _status = AccordionStatus.Inactive;
  private _disabled = false;

  constructor(
    public id: string,
    public accordionId: number,
    public strategy: ClrAccordionStrategy,
    private _open = false
  ) {
    if (this.strategy === ClrAccordionStrategy.Forms) {
      this._disabled = true;
    }
  }

  complete() {
    this._status = AccordionStatus.Complete;
    this._disabled = false;
    this._open = false;
  }

  reset() {
    this._status = AccordionStatus.Inactive;
    this._open = this.index === 0; // if first panel set to be open
  }

  open() {
    this._open = true;
  }

  close() {
    this._open = false;
  }

  toggle() {
    this._open = !this.isOpen;
  }

  setError() {
    this._open = true;
    this._status = AccordionStatus.Error;
  }

  updateIndex(index: number) {
    this._index = index;

    if (this.strategy === ClrAccordionStrategy.Forms) {
      this._open = this.index === 0;
    }
  }
}
