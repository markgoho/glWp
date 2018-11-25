const HCCrawler = require('headless-chrome-crawler');
const CSVExporter = require('headless-chrome-crawler/exporter/csv');
const FILE = './result.csv';

const exporter = new CSVExporter({
  file: FILE,
  fields: ['response.url', 'response.status', 'links.length'],
});

(async () => {
  const crawler = await HCCrawler.launch({
    maxDepth: 4,
    exporter,
  });
  await crawler.queue('https://www.doulacooperative.com/the-doulas');
  await crawler.onIdle();
  await crawler.close();
})();
