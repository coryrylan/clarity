/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

'use strict';

const fs = require('fs');
const theo = require('theo');

function getPropValue(prop) {
  // if value is px and can be converted then convert to rem
  if (prop.type === 'px' && !prop['absolute-value']) {
    return `${(parseInt(prop.value.slice(0, -2)) / 20).toFixed(2)}rem`;
  }

  return prop.value;
}

theo.registerFormat(
  'core-tokens-public',
  result => `
:root {
${result
    .get('props')
    .filter(prop => prop.get('private') !== true)
    .map(prop => `  --cds-token-${prop.get('category')}-${prop.get('name')}: ${getPropValue(prop.toJS())};\n`)
    .toJS()
    .sort()
    .reduce((props, next) => `${props}${next}`, '')}
}`
);

theo.registerFormat('core-tokens-scss', result => {
  return `${result
    .get('props')
    .map(prop => {
      const value = getPropValue(prop.toJS());
      const name = `$cds-token-${prop.get('category')}-${prop.get('name')}`;
      const staticVariableName = `${name}-static`;
      const staticVariable = `${staticVariableName}: ${value};`;
      const cssProp = `var(--cds-token-${prop.get('category')}-${prop.get('name')}, ${value});`;
      const variable = prop.get('private') !== true ? `${name}: ${cssProp}` : `${name}: ${value};`;

      return `${staticVariable}\n${variable}`;
    })
    .toJS()
    .sort()
    .reduce((props, next) => `${props}\n${next}`, '')}`;
});

fs.mkdir('./src/clr-core/styles/tokens/', { recursive: true }, () => {});

theo
  .convert({
    transform: {
      type: 'web',
      file: './src/clr-core/tokens/tokens.yml',
    },
    format: {
      type: 'core-tokens-public',
    },
  })
  .then(scss => fs.writeFileSync('./src/clr-core/styles/tokens/_public.generated.scss', scss));

theo
  .convert({
    transform: {
      type: 'web',
      file: './src/clr-core/tokens/tokens.yml',
    },
    format: {
      type: 'core-tokens-scss',
    },
  })
  .then(scss => fs.writeFileSync('./src/clr-core/styles/tokens/_index.generated.scss', scss));

theo
  .convert({
    transform: {
      type: 'web',
      file: './src/clr-core/tokens/tokens.yml',
    },
    format: {
      type: 'raw.json',
    },
  })
  .then(json => {
    const data = JSON.parse(json);
    Object.keys(data.props)
      .filter(propName => data.props[propName].type === 'px')
      .map(propName => {
        data.props[propName].base20Rem = getPropValue(data.props[propName]);
      });

    fs.writeFileSync('./src/clr-core/styles/tokens/index.json', JSON.stringify(data, {}, 2));
  });
