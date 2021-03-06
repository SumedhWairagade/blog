const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { sync } = require('glob');

const defaultMessages = sync('./lang/.messages/**/*.json')
  .map(filename => readFileSync(filename, 'utf8'))
  .map(file => JSON.parse(file))
  .reduce((messages, descriptors) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      if (messages.id) {
        throw new Error(`Duplicate message id: ${id}`);
      }
      messages[id.toLowerCase()] = defaultMessage;
    });
    return messages;
  }, {});

writeFileSync('./lang/en.json', JSON.stringify(defaultMessages, null, 2));
console.log(`> Wrote default messages to: "${resolve('./lang/en.json')}"`);
