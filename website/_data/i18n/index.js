const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

function parseYaml() {
  // get all .yml files in the i18n directory
  const files = fs.readdirSync(path.join(__dirname, './')).filter(file => file.endsWith('.yml'));

  const parsed = [];
  // read each file and parse it with yaml
  files.forEach(file => {
    const data = fs.readFileSync(path.join(__dirname, file), 'utf8', (err, data) => {
      if (err) throw err;
      return data
    })
    parsed.push(yaml.parse(data));
  });
  return parsed;
}

function recursiveLang(translations, lang) {
  for (const key in translations) {
    if (translations.hasOwnProperty(key)) {
      if (typeof translations[key] === "string") {
        const wrapped = {};
        wrapped[lang] = translations[key];
        translations[key] = wrapped;
      } else if (typeof translations[key] === "object") {
        recursiveLang(translations[key], lang); // Recursively process nested objects
      }
    }
  }
}

function mergeObjects(obj1, obj2) {
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (
        obj1.hasOwnProperty(key) &&
        typeof obj1[key] === "object" &&
        typeof obj2[key] === "object"
      ) {
        mergeObjects(obj1[key], obj2[key]); // Recursively merge child objects
      } else {
        obj1[key] = obj2[key]; // Merge properties with duplicate keys
      }
    }
  }
}

const parsedTranslations = parseYaml();

// for each parsedTranslation data set, recursively add the language key to each string
parsedTranslations.forEach(dataset => {
  recursiveLang(dataset.translations, dataset.lang);
});

const datasets = [];
parsedTranslations.forEach(dataset => {
  datasets.push(dataset.translations);
});

const merged = datasets.reduce((result, obj) => {
  const foundObj = result.find(item => item.id === obj.id);
  if (foundObj) {
    mergeObjects(foundObj, obj);
  } else {
    result.push(obj);
  }
  return result;
}, []);

const translations = {
  'translations': merged[0]
}

module.exports = translations;