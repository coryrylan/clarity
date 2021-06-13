import { html } from 'lit';

export const getData = () => {
  (window as any)._sideEffectTest = '';
  const data: any[] = [
    { id: 'TSLA', value: 0, average: 400, about: 'Lorem ipsum dolor sit amet' },
    { id: 'MSFT', value: 0, average: 500, about: 'Lorem ipsum dolor sit amet' },
    { id: 'AAPL', value: 0, average: 1000, about: '...' },
    { id: 'VMW', value: 0, average: 200, about: 'Lorem ipsum dolor sit amet' },
    { id: 'AMAN', value: 0, average: 2000, about: '...' },
    { id: 'AMD', value: 0, average: 50, about: 'Lorem ipsum dolor sit amet' },
    { id: 'GOOG', value: 0, average: 2000, about: 'Lorem ipsum dolor sit amet' },
    { id: 'INTC', value: 0, average: 50, about: 'Lorem ipsum dolor sit amet' },
    { id: 'DELL', value: 0, average: 100, about: 'Lorem ipsum dolor sit amet' },
    { id: 'IBM', value: 0, average: 100, about: '...' },
    { id: 'TWTR', value: 0, average: 100, about: 'Lorem ipsum dolor sit amet' },
    { id: 'NDAQ', value: 0, average: 150, about: 'Lorem ipsum dolor sit amet' },
    { id: 'SDY', value: 0, average: 400, about: 'Lorem ipsum dolor sit amet' },
    { id: 'DIS', value: 0, average: 200, about: '...' },
    { id: 'NVDA', value: 0, average: 600, about: 'Lorem ipsum dolor sit amet' },
    { id: 'NFLX', value: 0, average: 500, about: 'Lorem ipsum dolor sit amet' },
    { id: 'DELL', value: 0, average: 100, about: 'Lorem ipsum dolor sit amet' },
    { id: 'SPYG', value: 0, average: 50, about: '...' },
    { id: 'VNQ', value: 0, average: 100, about: 'Lorem ipsum dolor sit amet' },
    { id: 'SPYV', value: 0, average: 50, about: 'Lorem ipsum dolor sit amet' },
  ];

  return [...data];
};

export function filter(list: any[], key: string, term: string) {
  return [...list].filter(i => i[key].toLocaleLowerCase().includes(term.toLocaleLowerCase()));
}

export function sort(list: any[], key: string, sortType: 'none' | 'ascending' | 'descending') {
  if (sortType === 'ascending') {
    return list.sort((a, b) => a[key].localeCompare(b[key]));
  }

  if (sortType === 'descending') {
    return list.sort((a, b) => a[key].localeCompare(b[key])).reverse();
  }

  return list;
}

export function paginate(arr: any[], size: number) {
  return [...arr].reduce((acc, val, i) => {
    let idx = Math.floor(i / size);
    let page = acc[idx] || (acc[idx] = []);
    page.push(val);

    return acc;
  }, []);
}

export function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function setRandomValues(valueList: { value: any }[]) {
  return [
    ...valueList.map(d => {
      d.value = randomNum(0, 999);
      return d;
    }),
  ];
}

export function sortList(target: { id: any }, src: { id: any }, list: { id: any }[]) {
  const data = [...list];
  const srcIndex = data.findIndex(i => i.id === src.id);
  let targetIndex = data.findIndex(i => i.id === target.id);
  targetIndex = targetIndex > srcIndex ? targetIndex - 1 : targetIndex;

  const srcItem = data.splice(srcIndex, 1)[0];
  targetIndex === -1 ? data.push(srcItem) : data.splice(targetIndex, 0, srcItem);
  return data;
}

export const columnIcon = html`<svg
  aria-hidden="true"
  version="1.1"
  width="36"
  height="36"
  viewBox="0 0 36 36"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <path
    class="clr-i-outline clr-i-outline-path-1"
    d="M31,5H5A2,2,0,0,0,3,7V29a2,2,0,0,0,2,2H31a2,2,0,0,0,2-2V7A2,2,0,0,0,31,5ZM13,29H5V7h8Zm10,0H15V7h8Z"
  ></path>
  <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
</svg>`;
