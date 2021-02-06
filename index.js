const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const upload = require("express-fileupload")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload());
const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {

    app.post("/upload", async (req, res, next) => {
        let file1 = req.files.file1;
        let file2 = req.files.file2;
        let file3 = req.files.file3;
        let file4 = req.files.file4;
        let file5 = req.files.file5;

        let count = 0;
        let resultObj = {};
        let resultArray = [];

        const worker1 = new Worker(__filename, {
            workerData: {
                name: 'file1',
                file: file1.data.toString('utf8')
            }
          });
        const worker2 = new Worker(__filename, {
            workerData: {
                name: 'file2',
                file: file2.data.toString('utf8')
            }
          });
        const worker3 = new Worker(__filename, {
            workerData: {
                name: 'file3',
                file: file3.data.toString('utf8')
            }
          });
        const worker4 = new Worker(__filename, {
            workerData: {
                name: 'file4',
                file: file4.data.toString('utf8')
            }
          });
        const worker5 = new Worker(__filename, {
            workerData: {
                name: 'file5',
                file: file5.data.toString('utf8')
            }
          });

          worker1.on('message', (o)=>{
            //   count++;
            //   console.log(o);
            //   resultObj[o.name]["count"] = o.count;
            //   if(count == 5)res.send(JSON.stringify(resultObj));
            //   resultObj = {};
            //   count = 0;
            resultArray.push(o);
            if(resultArray.length == 5)res.send(JSON.stringify(resultArray));
          });

          worker2.on('message', (o)=>{
            // count++;
            // console.log(o);
            // resultObj[o.name]["count"] = o.count;
            // if(count == 5)res.send(JSON.stringify(resultObj));
            // resultObj = {};
            // count = 0;
            resultArray.push(o);
            if(resultArray.length == 5)res.send(JSON.stringify(resultArray));
        });

        worker3.on('message', (o)=>{
            // count++;
            // console.log(o);
            // resultObj[o.name]["count"] = o.count;
            // if(count == 5)res.send(JSON.stringify(resultObj));
            // resultObj = {};
            // count = 0;
            resultArray.push(o);
            if(resultArray.length == 5)res.send(JSON.stringify(resultArray));
        });

        worker4.on('message', (o)=>{
            // count++;
            // console.log(o);
            // resultObj[o.name+""]["count"] = o.count;
            // if(count == 5)res.send(JSON.stringify(resultObj));
            // resultObj = {};
            // count = 0;
            resultArray.push(o);
            if(resultArray.length == 5)res.send(JSON.stringify(resultArray));
        });

        worker5.on('message', (o)=>{
            // count++;
            // console.log(o);
            // resultObj[o.name]["count"] = o.count;
            // if(count == 5)res.send(JSON.stringify(resultObj));
            // resultObj = {};
            // count = 0;
            resultArray.push(o);
            if(resultArray.length == 5)res.send(JSON.stringify(resultArray));
        });
    });

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });

    app.get("/index",async(req,res,next)=>{
        res.sendFile('index.html', {root: __dirname })
    });

} else {
    const countUniqueWords = text => {
        const words = new Set();
        text.toLowerCase().replace(/\w+/g, word => words.add(word));
        return words.size;        
    };
    parentPort.postMessage({
        name: workerData.name,
        count: countUniqueWords(workerData.file)
    });
}

