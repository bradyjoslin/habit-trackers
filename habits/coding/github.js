const puppeteer = require("puppeteer");

const generateExport = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 800, height: 600, deviceScaleFactor: 1 });
  
  try {
    await page._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: process.cwd()
    });

    await page.goto("https://github.com/bradyjoslin");

    const el = await page.$(
      "#js-pjax-container > div > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div > div.position-relative > div.mt-4.position-relative > div.js-yearly-contributions"
    );
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
