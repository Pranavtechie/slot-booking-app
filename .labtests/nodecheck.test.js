// !! Boilerplate code starts
const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
  // results is a boolean[] that maps challenge results shown to user
  const results = [];

  // launch the headless browser for testing
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu",
    ],
  });
  page = await browser.newPage();

  // wait for server to come online
  await page.goto("http://localhost:" + process.env.PUBLIC_PORT);

  // add jQuery and chai for unit testing support if you want
  await Promise.all([
    page.addScriptTag({
      url: "https://code.jquery.com/jquery-3.5.1.slim.min.js",
    }),
    page.addScriptTag({
      url: "https://cdnjs.cloudflare.com/ajax/libs/chai/4.2.0/chai.min.js",
    }),
  ]);

  page.on('console', msg => {
    for (let i = 0; i < msg._args.length; ++i)
    console.log(`${i}: ${msg._args[i]}`);
    });

  // !! Boilerplate code ends

  // Start your tests here in individual try-catch block

  try {
    await page.evaluate(async () => {
      const assert = window.chai.assert;
      assert(!!$("#booked-lists-container"));
    });

    console.log("Test #1 passed!");
    results.push(true);
  } catch (error) {
    console.log("Test #1 failed! Did you do <this>?");
    results.push(false);
  }

  try {
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

    // add jQuery and chai for unit testing support if you want
    await Promise.all([
    page.addScriptTag({
        url: "https://code.jquery.com/jquery-3.5.1.slim.min.js",
    }),
    page.addScriptTag({
        url: "https://cdnjs.cloudflare.com/ajax/libs/chai/4.2.0/chai.min.js",
    }),
    ]);

    page.on('console', msg => {
    for (let i = 0; i < msg._args.length; ++i)
    console.log(`${i}: ${msg._args[i]}`);
    });

    await page.focus("input[name=reason]");
    await page.keyboard.type("product meeting");
    await page.focus("input[name=date]");
    await page.keyboard.type("13012100");
    await page.focus("#startTime");
    await page.keyboard.type("1200pm");
    await page.focus("#endTime");
    await page.keyboard.type("0200pm");
    await page.click("button");
    await page.waitForTimeout(2000)

    await page.evaluate(async () => {
      const assert = window.chai.assert;

      console.log('number of booked lists container',$("#booked-lists-container").children())
      assert($("#booked-lists-container").children().length >= 1);
    });
    console.log("Test #2 passed!");
    results.push(true);
  } catch (error) {
      console.log(error)
    console.log("Test #2 failed! Is a new <section> created on submitting the form ");
    results.push(false);
  }

  // End your tests here
  fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results));
  await browser.close().catch((err) => {});

  // Exit the process
  process.exit(0);
}
run();
// !! Boilerplate code ends
