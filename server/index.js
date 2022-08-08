const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const path = require('path');
const { FileHandler } = require('../services/FileHandlerClass');

const { LevenshteinDistance, WordRatioCaller, JaroCaller } = require('../services/FileComparator');
const fs = require('fs').promises;

const app = express();

app.use(fileUpload({
    createParentPath: true
}))

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname,`../data/`)));

const ReadFile = async (...paths) => {
    
    const newFiles = paths.map(el => new FileHandler(el));
    
    const results = newFiles.map(async (el) => {
        await el.read();
        return el;
    });
    
    return results;
}

const RatioWord = async (word, ...files) => {
    
    if(files.length === 0) throw ('Files not found...');

    const wordRatio = WordRatioCaller((await files[0]).streams, [word]);
   
    return wordRatio;
}

const CompareTwoFiles = async (...files) => {
    
    if(files.length === 0) throw ('Files not found...');

    // const lev = LevenshteinDistance((await files[0]).streams, (await files[1]).streams);
    const jaroWrinkerNumber = JaroCaller((await files[0]).streams, (await files[1]).streams)
  
    return jaroWrinkerNumber;
}

async function walk(dir) {
    let files = await fs.readdir(dir);
    files = await Promise.all(files.map(async file => {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()) return walk(filePath);
        else if(stats.isFile()) return file;
    }));

    return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

app.get('/files', async(req, res) => {
   try{
    const files = await walk('./data');

    res.send({
        status: true,
        message: 'These are files',
        data: files,
        
    })}
    catch(err)
    {
        res.status(500).send({
            status: false,
            err: err.message,
            error: err
        });
    }
});


app.get('/file1/:filename1/word/:word', async (req, res) => {

    try
    {
     
     const { filename1, word } = req.params;
 
     const files = await ReadFile(path.join(__dirname,`../data/${filename1}`));
 
     const data = await Promise.all(files);
 
     const numbers = await RatioWord(word, data[0])
    
     res.send({
         status: true,
         message: 'These are files',
         data: data,
         numbers: numbers
     })
    }
    catch(err)
    {
         res.status(500).send({
             status: false,
             err: err.message,
             error: err
         });
    }
 })
 

app.get('/file1/:filename1/file2/:filename2', async (req, res) => {

   try
   {
    
    const { filename1, filename2 } = req.params;

    const files = await ReadFile(path.join(__dirname,`../data/${filename1}`), path.join(__dirname,`../data/${filename2}`));

    const data = await Promise.all(files);

    const numbers = await CompareTwoFiles(data[0], data[1])

    res.send({
        status: true,
        message: 'These are files',
        data: data,
        numbers: numbers
    })
   }
   catch(err)
   {
        res.status(500).send({
            status: false,
            err: err.message,
            error: err
        });
   }
})

app.post('/upload', async(req, res) => {

    try
    {
        if(!req.files)
            res.send({status: false, message: 'No file uploaded'});
        else
        {
            let file = req.files.file;
            file.mv('./data/'+ file.name);

            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            })
        }
    
    } 
    catch(err)
    {
        res.status(500).send(err)
    }

});

app.listen(port, () => {
    console.log('App is listening on port: ' + port);
})

