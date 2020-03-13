
const puppeteer = require("puppeteer");

const generateExport = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage();

  try {
    await page._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: process.cwd()
    });

    await page.goto("https://github.com/bradyjoslin");

    const el = await page.$('#js-pjax-container > div > div.col-lg-9.col-md-8.col-12.float-md-left.pl-md-2 > div.position-relative > div.mt-4.position-relative > div.js-yearly-contributions > div > div');
    console.log("Loading site");
    await el.screenshot({ path: "img/github.png" });
    await browser.close();
  } catch (err) {
    console.error("Something went wrong!");
    console.error(err);
  }
};

const main = async function() {
  await generateExport();
};

main();
