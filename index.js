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
// Functions 
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{@PRODUCTNAME@}/g, product.productName)
    output = output.replace(/{@IMAGE@}/g, product.image)
    output = output.replace(/{@PRICE@}/g, product.price)
    output = output.replace(/{@DESCRIPTION@}/g, product.description)
    output = output.replace(/{@QUANTITY@}/g, product.quantity)
    output = output.replace(/{@NUTRIENTS@}/g, product.nutrients)
    output = output.replace(/{@ID@}/g, product.id)
    output = output.replace(/{@FROM@}/g, product.from)
    !product.organic ?
        output = output.replace(/{@NOT_ORGANIC@}/g, "not-organic") : output = output.replace(/{@NOT_ORGANIC@}/g, "organic")

    return output;

}

// Server
const http = require("http")
const url = require("url")

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8")
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8")
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8")

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObject = JSON.parse(data)

const server = http.createServer((req, res) => {
    // console.log(url.parse(req.url,true))
    const { query, pathname } = url.parse(req.url, true)
    if (pathname === "/overview" || pathname === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        const cardHTML = dataObject.map(el => replaceTemplate(templateCard, el)).join("")
        const output = templateOverview.replace("{@PRODUCT_CARD@}", cardHTML)
        res.end(output)
    } else if (pathname === "/product") {
        res.writeHead(200,{
            "Content-Type": "text/html"
        })
        const product = dataObject[+query.id]
        const output = replaceTemplate(templateProduct,product)
        res.end(output);
    } else if (pathname === "/api") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        res.end(data)
    } else {
        res.end("Hello From the Server")
    }
});

server.listen(8002, "127.0.0.1", () => {
    console.log("Server is Up");
})

