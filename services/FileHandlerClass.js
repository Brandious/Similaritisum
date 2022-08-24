const fs = require('fs');

const ReadFile = async (...paths) => {

    const newFiles = paths.map(el => new FileHandler(el));

    const results = newFiles.map(async (el) => {
        await el.read();
        if(el.streams === 0 ) throw ('Prazan file...');
        if(el.err.length > 0) throw ('Greska u citanju...');
        return el;
    });


    
    return Promise.all(results);
}


class FileHandler {

    constructor(path) {
        this.path = path;
        this.streams = [];
        this.err = [];

    }

    async read(readLength = 64) {
        try {

            this.readFile = fs.createReadStream(this.path, { highWaterMark: readLength });
            for await (const c of this.readFile) {
                this.streams.push(`${c.toString()}`);
            }
        }
        catch (err) {
            this.err.push(err);
            return 0;
        }
        finally {
            this.readFile.close();
        }


        return 1;
    }

   
}

module.exports = {
    FileHandler,
    ReadFile
}