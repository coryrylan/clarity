import { ReactiveControllerHost } from 'lit';

let dragSrcEl: HTMLElement | null = null;

export type DraggableItem = HTMLElement & { cdsDraggableItem?: 'item' | 'dropzone' };

export class DraggableListController {
  private get items() {
    return Array.from(this.hostRoot.querySelectorAll<DraggableItem>('[draggable=true]'));
  }

  private get dropZones() {
    return Array.from(this.hostRoot.querySelectorAll<DraggableItem>('[draggable=false]'));
  }

  private get hostRoot() {
    return this.config.shadowRoot ? this.host.shadowRoot : this.host;
  }

  protected host: ReactiveControllerHost & HTMLElement;

  private observer: MutationObserver;

  constructor(
    host: ReactiveControllerHost,
    private config: { shadowRoot?: boolean; axis?: 'both' | 'cross' | 'main' } = { shadowRoot: false, axis: 'both' }
  ) {
    this.host = host as any;
    host.addController(this as any);
  }

  async hostConnected() {
    await this.host.updateComplete;

    // if (this.items) {
    this.addDragEventListeners();
    this.addKeyboardEventListeners();

    this.observer = new MutationObserver(mutations => {
      for (let mutation of mutations) {
        if (mutation.type === 'childList') {
          this.addDragEventListeners();
        }
      }
    });

    this.observer.observe(this.host, { childList: true });
    // }
  }

  hostDisconnected() {
    this.observer.disconnect();
  }

  private addKeyboardEventListeners() {
    this.host.addEventListener('keydown', (e: any) => {
      const handle: HTMLElement = e.path.find(
        (el: any) => el.hasAttribute && el.getAttribute('cds-draggable') === 'handle'
      );
      if (handle && this.getControlKey(e)) {
        e.preventDefault();
        const items = [...this.items, ...this.dropZones];
        const from = handle.closest('[draggable]');
        const fromIndex = items.findIndex(i => i === from);
        const targetIndex =
          this.getControlKey(e) === 'ArrowUp' ? Math.max(0, fromIndex - 1) : Math.min(items.length - 1, fromIndex + 2);
        const target = items[targetIndex];
        handle.dispatchEvent(
          new CustomEvent('draggableChange', { detail: { from, target, type: 'keydown' }, bubbles: true })
        );

        if (this.getControlKey(e) === 'ArrowUp') {
          target.querySelector<HTMLElement>('[cds-draggable=handle]')?.focus();
        } else {
          items[targetIndex - 1].querySelector<HTMLElement>('[cds-draggable=handle]')?.focus();
        }
      }
    });
  }

  private getControlKey(e: KeyboardEvent) {
    const keys: any = {
      ArrowUp: 'ArrowUp',
      ArrowDown: 'ArrowDown',
      ArrowLeft: this.config.axis !== 'main' ? 'ArrowUp' : null,
      ArrowRight: this.config.axis !== 'main' ? 'ArrowDown' : null,
    };

    return e.ctrlKey || e.metaKey ? keys[e.code] : null;
  }

  private addDragEventListeners() {
    this.items.filter(i => !i.cdsDraggableItem).forEach(item => addHandlers(item));
    this.dropZones
      .filter(i => !i.cdsDraggableItem)
      .forEach(elem => {
        elem.addEventListener('dragover', handleDragOver, false);
        elem.addEventListener('dragleave', handleDragLeave, false);
        elem.addEventListener('drop', handleDrop, false);
        elem.cdsDraggableItem = 'dropzone';
      });
  }
}

function handleDragStart(e: any) {
  dragSrcEl = e.currentTarget;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
  e.currentTarget.setAttribute('cds-draggable', 'active');
}

function handleDragOver(e: any) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';

  if (dragSrcEl !== e.currentTarget) {
    e.currentTarget.setAttribute('cds-draggable', 'target');
  }

  return false;
}

function handleDrop(e: any) {
  const items: DraggableItem[] = Array.from(e.currentTarget.parentElement.querySelectorAll('[draggable]'));
  const fromIndex = items.findIndex(i => i === dragSrcEl);
  let targetIndex = items.findIndex(i => i === e.currentTarget);
  targetIndex = targetIndex > fromIndex ? targetIndex - 1 : targetIndex;

  const from = dragSrcEl;
  const target = items.find(i => i === e.currentTarget);
  from.removeAttribute('cds-draggable');
  target.removeAttribute('cds-draggable');

  e.currentTarget.dispatchEvent(
    new CustomEvent('draggableChange', { detail: { from, target, type: 'drop' }, bubbles: true })
  );
  return false;
}

function handleDragLeave(e: any) {
  if (e.currentTarget.getAttribute('cds-draggable') === 'target') {
    e.currentTarget.removeAttribute('cds-draggable');
  }
}

function addHandlers(elem: any) {
  elem.cdsDraggableItem = 'item';
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('dragend', (e: any) => e.currentTarget.removeAttribute('cds-draggable'), false);
}
