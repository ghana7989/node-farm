const fs = require("fs")

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//     if (err) return console.log(err)
//     fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//         console.log(data2);
//         fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//             console.log(data3);
//             fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//                 console.log("Written successfully");
//             })
//         })
//     })
// })

// ----------------------------------------------------------------------------//

// Server
const http = require("http")
const url = require("url")


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObject = JSON.parse(data)

const server = http.createServer((req, res) => {
    const pathname = req.url
    if (pathname === "/overview" || pathname === "/") {
        res.end("This is an OVERVIEW")
    } else if (pathname === "/product") {
        res.end("These are the Products");
    } else if (pathname === "/api") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        res.end(data)
    } else {
        res.end("Hello From the Server")
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Server is Up");
})

