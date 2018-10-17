let http = require("http")
let fs = require("fs");
let path = require("path");
let iconv = require("iconv-lite");
let cheerio = require("cheerio");
let imgpath = "imgTag";
let page = 1;
class GirlSpider extends events {
    DownloadHtml(page) {
        console.log(page)
        http.get("http://www.27270.com/ent/meinvtupian/list_11_" + `${page}` + ".html", (res) => {
            let chunks = [];
            let Html = ''
            res.on("data", (chunk) => {
                chunks.push(chunk);
            });
            res.on("end", () => {
                Html = iconv.decode(Buffer.concat(chunks), 'gb2312');
                this.emit("downloadSuccess", Html);
            });
        });
    }

    parsingHtml(Html) {
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
        this.emit("parsingsuccess", downloadarr);
    }

    Download(downloadarr) {
        for (let i = 0; i < downloadarr.length; i++) {
            let srcarr = downloadarr[i].src;
            let downloadpath = downloadarr[i].pathNamen;
            let existsname = path.extname(srcarr);
            let dewnloadpath = path.join(imgpath, downloadpath + existsname);
            //  console.log(dewnloadpath)
            http.get(srcarr, (res) => {
                let writeStream = fs.createWriteStream(dewnloadpath);
                res.pipe(writeStream);
            })
        }
    }
    init() {
        this.on("downloadSuccess", (Html) => {
            this.parsingHtml(Html);
        })
        this.on("parsingsuccess", (downloadarr) => {
            this.Download(downloadarr);
        })
        this.DownloadHtml(page)
       let timeout = setInterval(() => {
           page++;
            this.DownloadHtml(page)
        },2000);
        if (page> 5) {
            clearInterval(timeout);
            console.log("停止下载");
            return;
        }

    }}
        let girlSpider = new GirlSpider();
        girlSpider.init();
