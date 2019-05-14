/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ChangeDetectionStrategy, Optional, Input, EventEmitter, Output } from '@angular/core';
import { FormGroupName, NgModelGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AccordionService } from './providers/accordion.service';
import { AccordionStatus } from './enums/accordion-status.enum';
import { AccordionPanelModel } from './models/accordion-panel.model';
import { panelAnimation } from './utils/animation';
import { triggerAllFormControlValidation } from '../utils/forms/validation';
import { IfExpandService } from '../utils/conditional/if-expanded.service';
import { ClrAccordionStrategy } from './enums/accordion-strategy.enum';

let panelCount = 0;

@Component({
  selector: 'clr-accordion-panel, clr-step',
  templateUrl: './accordion-panel.html',
  host: { '[class.clr-accordion-panel]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: panelAnimation,
  providers: [IfExpandService],
})
export class ClrAccordionPanel {
  @Input('name') defaultName = `${panelCount++}`;
  @Input('clrAccordionPanelOpen') panelOpen = false;
  @Output('clrAccordionPanelOpenChange') panelOpenChange = new EventEmitter<boolean>();

  panel: Observable<AccordionPanelModel>;
  ClrAccordionStrategy = ClrAccordionStrategy;
  readonly AccordionStatus = AccordionStatus;

  get formGroup() {
    return this.formGroupName ? this.formGroupName.control : this.ngModelGroup.control;
  }

  get name() {
    if (this.formGroupName) {
      return this.formGroupName.name;
    } else if (this.ngModelGroup) {
      return this.ngModelGroup.name;
    } else {
      return this.defaultName;
    }
  }

  get strategy() {
    return this.accordionService.strategy;
  }

  constructor(
    @Optional() private formGroupName: FormGroupName,
    @Optional() private ngModelGroup: NgModelGroup,
    private accordionService: AccordionService,
    private ifExpandService: IfExpandService
  ) {}

  ngOnInit() {
    this.panel = this.accordionService
      .getPanelChanges(this.name)
      .pipe(tap(panel => this.expandPanel(panel)), tap(panel => this.triggerAllFormControlValidationIfError(panel)));

    this.accordionService.addPanel(this.name, this.panelOpen);
  }

  selectPanel() {
    this.accordionService.navigateToPanel(this.name);
  }

  collapsePanel(panel: AccordionPanelModel) {
    if (!panel.open) {
      this.togglePanel(false);
    }
  }

  private expandPanel(panel: AccordionPanelModel) {
    if (panel.open) {
      this.togglePanel(true);
    }
  }

  private togglePanel(open: boolean) {
    this.ifExpandService.expanded = open;
    this.panelOpen = open;
    this.panelOpenChange.emit(open);
  }

  private triggerAllFormControlValidationIfError(panel: AccordionPanelModel) {
    if (panel.status === AccordionStatus.Error) {
      triggerAllFormControlValidation(this.formGroup);
    }
  }
}
