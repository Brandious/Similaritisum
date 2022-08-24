const { ReadFile } = require('../services/FileHandlerClass');
const { LevenshteinDistance, WordRatioCaller, JaroCaller } = require('../services/FileComparator');

const Compare = async (...files) => {




    if (files.length === 0) throw ('Files not found...');
    if (files.length < 2) throw ('Missing one file...');

    try {
        const res = await ReadFile(...files);


        const jaroWrinkerNumber = JaroCaller((res[0]).streams, (res[1]).streams)


        return [jaroWrinkerNumber];
    }
    catch (err) {
        throw err;
    }
}

const Ratio = async (file, word) => {


    if (file.length === 0) throw ('File not found...');

    try {
        const res = await ReadFile(file);
     
        const wordRatio = WordRatioCaller((res[0]).streams, [word]);



        return [wordRatio];
    }
    catch (err) {
        throw err;
    }



}

const Change = (text1, text2) => {

    if(!text1 || !text2) throw ('Pogresan Unos...');

    const lev = LevenshteinDistance([text1], [text2]);



    return [lev];
}


const main = async () => {
    try {
        const type = process.argv.slice(2)[0];

        switch (type) {
            case 'compare':
                console.log(await Compare(...process.argv.slice(3)));
                break;
            case 'ratio':
                console.log(await Ratio(process.argv.slice(3)[0], process.argv.slice(3)[1]));
                break;
            case 'change':
                console.log(Change(process.argv.slice(3)[0], process.argv.slice(3)[1]));
                break;
            default:
                console.log('This should be Help Text');
                break;

        }
    }
    catch (err) {
        console.error(err)
    }
};

main();
