import fs from 'fs';
import { parseStringPromise } from 'xml2js';

const url = 'https://www.veracode.com/sitemap.xml';
const filePath = 'urls.json';
const generateJSON = async () => {
  const response = await fetch(url);
  const xmlData = await response.text();
  const xmlDoc = await parseStringPromise(xmlData);

  const urlList = xmlDoc.urlset.url
    .filter(Boolean)
    .map((url: any) => url.loc[0]);
  fs.writeFileSync(filePath, JSON.stringify(urlList));
};

generateJSON().then(() => console.log('JSON file generated successfully'));
