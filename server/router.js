const express = require('express')
const router = express.Router()
const { CompareTwoFiles, RatioWord, walk } = require('./helpers');
const { ReadFile } = require('../services/FileHandlerClass');

const path = require('path');



router.get('/files', async (req, res) => {

    try {
        const files = await walk('./data');
        if(files.length === 0) throw ('Nothing uploaded...');
        res.send({
            status: true,
            message: 'These are files',
            data: files,

        })
    }
    catch (err) {
        res.status(500).send({
            status: false,
            err: err.message,
            error: err
        });
    }
});


router.get('/compareOne', async (req, res) => {

    try {

        const { filename1, word } = req.query;
        
        if(filename1 === undefined) throw ('No file chosen...');
        if(word === undefined || word === '') throw ('Word not found...');

        const files = await ReadFile(path.join(__dirname, `../data/${filename1}`));

        const data = await Promise.all(files);

        const numbers = await RatioWord(word, data[0])

        res.send({
            status: true,
            message: 'These are files',
            data: data,
            numbers: numbers
        })
    }
    catch (err) {
        res.status(500).send({
            status: false,
            err: err.message,
            error: err
        });
    }
})


router.get('/compare', async (req, res) => {

    try {

        const { filename1, filename2 } = req.query;
        
        if(filename1 === undefined || filename2 === undefined) throw ('No file chosen...');

        const files = await ReadFile(path.join(__dirname, `../data/${filename1}`), path.join(__dirname, `../data/${filename2}`));

        const data = await Promise.all(files);

        const numbers = await CompareTwoFiles(data[0], data[1])

        res.send({
            status: true,
            message: 'These are files',
            data: data,
            numbers: numbers
        })
    }
    catch (err) {
        res.status(500).send({
            status: false,
            err: err.message,
            error: err
        });
    }
})

router.post('/upload', async (req, res) => {

    try {
        if (!req.files)
            res.send({ status: false, message: 'No file uploaded' });
        else {
            let file = req.files.file;
            file.mv('./data/' + file.name);

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
    catch (err) {
        res.status(500).send(err)
    }

});

module.exports = {
    router
}