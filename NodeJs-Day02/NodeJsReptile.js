let http = require("http")
let fs = require("fs");
let path = require("path");
let iconv = require("iconv-lite");
let cheerio = require("cheerio");
let imgpath = "imgTag";
let page=1;
const mongoose = require("mongoose");
const User = require("./model/User");
mongoose.connect("mongodb://127.0.0.1/test",{ useNewUrlParser: true })
let mdb = mongoose.connection;
mdb.on("error",err=>{
    if(err){
        throw err
    }
})
mdb.once("open",()=>{
    console.log("mongodb连接成功")
    DownloadHtml(page)
})
function DownloadHtml(page){ http.get("http://www.27270.com/ent/meinvtupian/list_11_"+`${page}`+".html", function (res) {
            console.log(page)
    let chunks = [];
            let Html = '';
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                Html = iconv.decode(Buffer.concat(chunks), 'gb2312');
                parsingHtml(Html)
            });
        });}
   function parsingHtml(Html) {
        let $ = cheerio.load(Html);
        let downloadarr = [];
        let arr = $("div.MeinvTuPianBox>ul>li>a>i>img").toArray();
        arr.forEach(data => {
            let src = $(data).attr('src')
            let pathNamen = $(data).attr('alt')
            downloadarr.push({
                src,
                pathNamen
            })
        })
        Download(downloadarr)
      // console.log(downloadarr)
    }
  function  Download(downloadarr){
   // console.log(downloadarr.length)
      let srcarr=[]
      let downloadpath=[]
        for (let i = 0; i < downloadarr.length; i++) {
         srcarr = downloadarr[i].src;
         downloadpath = downloadarr[i].pathNamen;
            dwd(srcarr,downloadpath)
            // let existsname = path.extname(srcarr);
            // let dewnloadpath = path.join(imgpath, downloadpath + existsname);
            // http.get(srcarr, (res)=> {
            //     let writeStream = fs.createWriteStream(dewnloadpath);
            //     res.pipe(writeStream);
            // })
        }
      page++;
      if(page>=50){
      }else{
          DownloadHtml(page)
      }
      return "下载停止";

}
function dwd(name,path){
    console.log(`name:${name}  path:${path}`)
       let res=User.insertMany({
           name:name,
           path:path
       })
}