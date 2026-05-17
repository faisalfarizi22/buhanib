const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\b472ac7f-239a-4825-a2ed-906152419314\\indonesian_office_team_1779005134845.png';
const dest = path.join(__dirname, 'public', 'indonesian_office_team.png');

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Successfully copied image to ' + dest);
  } else {
    console.error('Source file does not exist: ' + src);
  }
} catch (err) {
  console.error('Error copying image:', err);
}
