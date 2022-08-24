const { WordRatioCaller, JaroCaller } = require('../services/FileComparator');

const fs = require('fs').promises;
const path = require('path');

async function walk(dir) {

   
    let files = await fs.readdir(dir);
    files = await Promise.all(files.map(async file => {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) return walk(filePath);
        else if (stats.isFile()) return file;
        
    }));
    
    
    return files.flatMap(file => file);
}


const RatioWord = async (word, ...files) => {
    
    if(files.length === 0) throw ('Files not found...');

    const wordRatio = WordRatioCaller((await files[0]).streams, [word]);
   
    return wordRatio;
}

const CompareTwoFiles = async (...files) => {
    
    if(files.length === 0) throw ('Files not found...');

    const jaroWrinkerNumber = JaroCaller((await files[0]).streams, (await files[1]).streams)
  
    return jaroWrinkerNumber;
}

module.exports = {
    RatioWord,
    CompareTwoFiles,
    walk
}