import { promises as fs } from 'fs';

async function generateSpecFiles(
  templatePath: string,
  jsonFilePath: string,
  outputFolderPath: string
) {
  // Read the template file
  const templateContent = await fs.readFile(templatePath, 'utf-8');

  // Read the JSON file containing the URLs
  const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
  const urls = JSON.parse(jsonData);

  // Generate a spec.ts file for each URL
  for (const url of urls) {
    // Replace the `#{url}` placeholder with the actual URL
    const specContent = templateContent.replace(/#{url}/g, url);

    // Generate the file name based on the URL
    const fileName = `${url.replace(/[^a-zA-Z0-9]/g, '_')}.spec.ts`;

    // Write the modified template to the output folder
    await fs.writeFile(`${outputFolderPath}/${fileName}`, specContent);
  }
}

// Usage example
const templatePath = './templates/spec.ts';
const jsonFilePath = './urls.json';
const outputFolderPath = './tests';

generateSpecFiles(templatePath, jsonFilePath, outputFolderPath)
  .then(() => console.log('Spec files generated successfully'))
  .catch((error) => console.error('Error generating spec files:', error));
