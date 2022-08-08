const { FileHandler } = require('../services/FileHandlerClass');

const { LevenshteinDistance, WordRatioCaller, JaroCaller } = require('../services/FileComparator');

const ReadFile = async (...paths) => {
    const newFiles = paths.map(el => new FileHandler(el, 1234567));
    const results = newFiles.map(async (el) => {
        await el.read();
        return el;
    });
    

    return results;
}

const ReadMultiple = async () => {
    

    const files = process.argv.slice(2);
    if(files.length === 0) throw ('Files not found...');

    const res = await ReadFile(...files);
  
    const lev = LevenshteinDistance((await res[0]).streams, ['Pekle']);
    const wordRatio = WordRatioCaller((await res[0]).streams, (await res[1]).streams);
    const jaroWrinkerNumber = JaroCaller((await res[0]).streams, (await res[1]).streams)
  

    return [lev, wordRatio, jaroWrinkerNumber];
}

const main = async () => {try{console.log(await ReadMultiple())} catch(err){console.log(err)}};

main();
