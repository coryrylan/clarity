export function getId() {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

export function getNextCellCoordinate(e: any, gridContent: any) {
  const currentCell = gridContent.querySelector('cds-grid-cell[active]');
  const numOfRows = gridContent.querySelectorAll('cds-grid-row').length - 1;
  const numOfColumns = gridContent.querySelectorAll('cds-grid-column').length - 1;
  let x = currentCell.col;
  let y = currentCell.row;

  if (e.code === 'ArrowUp' && y !== 0) {
    y = y - 1;
  } else if (e.code === 'ArrowDown' && y < numOfRows) {
    y = y + 1;
  } else if (e.code === 'ArrowLeft' && x !== 0) {
    x = x - 1;
  } else if (e.code === 'ArrowRight' && x < numOfColumns) {
    x = x + 1;
  } else if (e.code === 'End') {
    x = numOfColumns;

    if (e.ctrlKey || e.metaKey) {
      y = numOfRows;
    }
  } else if (e.code === 'Home') {
    x = 0;

    if (e.ctrlKey || e.metaKey) {
      y = 0;
    }
  } else if (e.code === 'PageUp') {
    y = y - 5 > 0 ? y - 5 : 0;
  } else if (e.code === 'PageDown') {
    y = y + 5 < numOfRows ? y + 5 : numOfRows;
  }

  return { x, y };
}

export function getTabableItems(el: HTMLElement) {
  const tabableSelector = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'button:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[tabindex]',
    '*[contenteditable=true]',
    '[role=button]:not([disabled])',
  ].join(',');
  return Array.from(el.querySelectorAll(tabableSelector)) as HTMLElement[];
}
