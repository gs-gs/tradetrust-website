import expect from "expect-puppeteer";

export const surrenderAccept = async (metamask, browser) => {
  // force process to exit if any assertion fail
  try {
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");

    const inputUploadHandle = await page.$("input[type=file]");
    inputUploadHandle.uploadFile("./integration/local/ebl-surrender.json"); // use back the same ebl

    await page.waitForSelector("[data-testid='connectToWallet']", { visible: true });
    await page.click("[data-testid='connectToWallet']");

    await page.waitFor(1500);
    await page.waitForSelector("[data-testid='manageAssetDropdown']", { visible: true });
    await page.click("[data-testid='manageAssetDropdown']");

    await page.waitForSelector("[data-testid='acceptSurrenderDropdown']", { visible: true });
    await page.click("[data-testid='acceptSurrenderDropdown']");

    await page.waitForSelector("[data-testid='acceptSurrenderBtn']", { visible: true });
    await page.click("[data-testid='acceptSurrenderBtn']");

    await page.waitFor(1500);
    await metamask.confirmTransaction();
    await page.bringToFront();
    await page.waitFor(1500);

    await expect(page).toMatchElement(".overlay h3", {
      text: "Surrender Accepted",
      visible: true,
    });

    await page.close();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
