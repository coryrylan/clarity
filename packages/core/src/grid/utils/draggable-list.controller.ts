import { ReactiveControllerHost } from 'lit';

let dragSrcEl: HTMLElement | null = null;

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
  e.currentTarget.parentElement.querySelector('[cds-draggable*="target"]').setAttribute('cds-draggable', '');
  e.currentTarget.setAttribute('cds-draggable', '');

  const items = Array.from(e.currentTarget.parentElement.querySelectorAll('[draggable]'));
  const fromIndex = items.findIndex(i => i === dragSrcEl);
  let targetIndex = items.findIndex(i => i === e.currentTarget);
  targetIndex = targetIndex > fromIndex ? targetIndex - 1 : targetIndex;

  const from = dragSrcEl;
  const target = items.find(i => i === e.currentTarget);

  e.currentTarget.dispatchEvent(
    new CustomEvent('draggableChange', { detail: { from, target, type: 'drop' }, bubbles: true })
  );
  return false;
}

function handleDragLeave(e: any) {
  e.currentTarget.setAttribute('cds-draggable', e.currentTarget.getAttribute('cds-draggable').replace('target', ''));
}

function addHandlers(elem: any) {
  elem.setAttribute('cds-draggable', '');
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener(
    'dragend',
    (e: any) =>
      e.currentTarget.setAttribute(
        'cds-draggable',
        e.currentTarget.getAttribute('cds-draggable').replace('active', '')
      ),
    false
  );
}

export class DraggableListController {
  private get items() {
    const list = this.config.shadowRoot ? this.host.shadowRoot : this.host;
    return Array.from(list.querySelectorAll('[draggable=true]'));
  }

  private get dropZones() {
    const list = this.config.shadowRoot ? this.host.shadowRoot : this.host;
    return Array.from(list.querySelectorAll('[draggable=false]'));
  }

  protected host: ReactiveControllerHost & HTMLElement;

  private observer: MutationObserver;

  constructor(host: ReactiveControllerHost, private config = { shadowRoot: false }) {
    this.host = host as any;
    host.addController(this as any);
  }

  async hostConnected() {
    await this.host.updateComplete;

    if (this.items) {
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
    }
  }

  hostDisconnected() {
    this.observer.disconnect();
  }

  private addKeyboardEventListeners() {
    this.host.addEventListener('keydown', (e: any) => {
      const handle: HTMLElement = e.path.find(
        (el: any) => el.hasAttribute && el.getAttribute('cds-draggable') === 'handle'
      );
      if ((handle && e.ctrlKey) || (e.metaKey && (e.code === 'ArrowUp' || e.code === 'ArrowDown'))) {
        const items = [...this.items, ...this.dropZones];
        const from = handle.closest('[draggable]');
        const fromIndex = items.findIndex(i => i === from);
        const targetIndex =
          e.code === 'ArrowUp' ? Math.max(0, fromIndex - 1) : Math.min(items.length - 1, fromIndex + 2);
        const target = items[targetIndex];
        handle.dispatchEvent(
          new CustomEvent('draggableChange', { detail: { from, target, type: 'keydown' }, bubbles: true })
        );

        if (e.code === 'ArrowUp') {
          target.querySelector<HTMLElement>('[cds-draggable=handle')?.focus();
        } else {
          items[targetIndex - 1].querySelector<HTMLElement>('[cds-draggable=handle')?.focus();
        }
      }
    });
  }

  private addDragEventListeners() {
    this.items.filter(i => i.hasAttribute('cds-draggable')).forEach(i => i.setAttribute('cds-draggable', ''));
    this.items.filter(i => !i.hasAttribute('cds-draggable')).forEach(item => addHandlers(item));
    this.dropZones
      .filter(i => !i.hasAttribute('cds-draggable'))
      .forEach(elem => {
        elem.addEventListener('dragover', handleDragOver, false);
        elem.addEventListener('dragleave', handleDragLeave, false);
        elem.addEventListener('drop', handleDrop, false);
      });
  }
}
