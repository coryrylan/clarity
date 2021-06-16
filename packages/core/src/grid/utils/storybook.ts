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

export function sortStrings(list: any[], key: string, sortType: 'none' | 'ascending' | 'descending') {
  if (sortType === 'ascending') {
    return list.sort((a, b) => a[key].localeCompare(b[key]));
  }

  if (sortType === 'descending') {
    return list.sort((a, b) => a[key].localeCompare(b[key])).reverse();
  }

  return list;
}

export function sortNumbers(list: any[], key: string, sortType: 'none' | 'ascending' | 'descending') {
  if (sortType === 'ascending') {
    return list.sort((a, b) => a[key] - b[key]);
  }

  if (sortType === 'descending') {
    return list.sort((a, b) => b[key] - a[key]);
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
