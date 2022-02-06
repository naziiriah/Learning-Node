// // fs.rmdir/fs.mkdir/unlink/existsSync 
// const fs = require("fs")
// const http = require("http")

// const server = http.createServer((req: any, res: any) => {
//     console.log(req.url, req.method)

//     res.setHeader("Content-type", "text/html")

//     let path: string = "./views/"

//     switch(req.url){
//         case "/": 
//             path += "index.html";
//             res.statusCode = 200
            
//             break;
//         case "/about": 
//             path += "about.html";
//             res.statusCode = 200
            
//             break;
//         default:
//             path += "404.html";
//             res.statusCode = 404
//             break;
//     }

//     fs.readFile(path, (err: any, data: any) =>{
//             if(err){
// //                 console.log(err)
// //                 res.end()
//             } else {
//                 res.end(data)
//             }
//     })
 
//     // set headerr 

// })

// server.listen(4000, () => {
//     console.log("listening on port 4000")
// })

const express = require("express")

const app = express()

// register view
app.set("view engines", "ejs")

app.listen(4000);

app.get("/", (req: any, res: any) => {
    res.sendFile("./views/index.html",  { root : __dirname});
})
  

app.get("/about", (req: any, res: any) => {
    res.sendFile("./views/about.html",  { root : __dirname});
})
  

