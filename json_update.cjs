/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// URL of the JSON file
const url = 'https://api.hearthstonejson.com/v1/latest';

// Directory to save the JSON file
// eslint-disable-next-line no-undef
const saveDirectory = path.join(__dirname, 'public', 'assets', 'cards');

// Ensure the directory exists
if (!fs.existsSync(saveDirectory)) {
    fs.mkdirSync(saveDirectory, { recursive: true });
}

// Function to fetch and save JSON file
async function fetchAndSaveJson(locale, file) {
    try {
        const response = await axios.get(`${url}/${locale}/${file}.json`);
        const jsonData = response.data;

        // Define the file path
        const filePath = path.join(saveDirectory, `${file}.${locale}.json`);

        // Write the JSON data to the file
        fs.writeFileSync(filePath, JSON.stringify(jsonData));

        console.log(`JSON file has been saved to ${filePath}`);
    } catch (error) {
        console.error('Error fetching or saving JSON file:', error);
    }
}

// Execute the function
fetchAndSaveJson('enUS', 'cards');
fetchAndSaveJson('enUS', 'cards.collectible');
fetchAndSaveJson('zhCN', 'cards');
fetchAndSaveJson('zhCN', 'cards.collectible');