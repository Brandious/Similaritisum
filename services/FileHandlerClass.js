const fs = require('fs');

class FileHandler 
{

    constructor(path, readLength = 64)
    {
        this.path = path;
        this.readFile = fs.createReadStream(path,{ highWaterMark: readLength});
        this.streams = [];
        this.err = [];
        this.read = this.read.bind(this);
        this.print = this.print.bind(this);
    }

    async read()
    {
        try
        {
            for await( const c of this.readFile) {
                this.streams.push(`${c.toString()}`);
            }
        }
        catch(err)
        {
            this.err.push(err);
            return 0;
        }

        return 1; 
    }

    print()
    {
        console.log(this.streams);
    }
}

module.exports = {
    FileHandler
}