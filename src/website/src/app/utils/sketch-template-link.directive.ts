import { Directive, Input, HostBinding } from '@angular/core';
import { environment } from '../../environments/environment';

const LATEST = require('../../settings/global.json')['latest_sketch_template'];

@Directive({
  selector: '[sketchTemplateLink]',
  host: {
    '[attr.target]': "'_blank'",
  },
})
export class SketchTemplateLinkDirective {
  @Input() version = LATEST;
  @Input() type: 'light' | 'dark' = 'light';

  @HostBinding('attr.href')
  get href() {
    return `${environment.sketch_base_url}/${this.type}/clarity-library-${this.type}-${this.version}.sketch`;
  }
}
