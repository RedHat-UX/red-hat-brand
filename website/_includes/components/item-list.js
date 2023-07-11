const { RetrieveGlobals } = require("node-retrieve-globals");

function chunkArray(array, chunkSize) {
  const subArrays = [];
  const arrayLen = array.length;
  let i = 0;
  while (i < arrayLen) {
    subArrays.push(array.slice(i, i + chunkSize));
    i += chunkSize;
  }
  return subArrays;
}

function buildHTMLLists(arrays) {
  const lists = arrays.map(array => {
    const items = array.map(item => {
      return `<li><a href="${item.data.page.url}">${item.data.title}</a></li>`;
    }).join('');
    return `<rh-navigation-secondary-menu-section><ul slot="links">${items}</ul></rh-navigation-secondary-menu-section>`;
  });
  return lists.join('');  
}

exports.getItemList = async function($data, tag, limit=0, sort="alpha", link="false") {
  const collectionCopy = [...$data.collections[tag]];
  const filteredByLanguageCopy = [...collectionCopy.filter(a => {
    // return only pages from the collection that are of the current pages language
    return a.data.page.lang === $data.page.lang
  })];
  let result = filteredByLanguageCopy.reverse().sort(function(a, b) {
    if (sort === "alpha") {
      if (a.data.title < b.data.title) return -1;
      if (a.data.title > b.data.title) return 1;
    } else if (sort === "date") {
      return b.data.date - a.data.date;
    } else if (sort === "order") {
      return a.data.order - b.data.order;
    }
  });
  return limit ? result.slice(0, limit) : result;
}

exports.splitList = function($data, tag, chunkSize, sort) {
  console.log('hi', $data.page);
  const list = getItemList($data.collections, tag, 0, sort);
  const chunked = chunkArray(list, chunkSize);
  return buildHTMLLists(chunked);
}