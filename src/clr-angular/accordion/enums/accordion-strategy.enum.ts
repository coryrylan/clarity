/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

export enum ClrAccordionStrategy {
  Default = 'default', // only one panel at a time
  Multi = 'multi', // can have multiple panels open at a time
  Forms = 'forms', // linear step progression for forms
}
