const {
    By,
    Key,
    Builder,
    WebElementCondition,
    until,
  } = require("selenium-webdriver");
  const assert = require("assert");
  
  (async function test_google() {
    let driver = await new Builder().forBrowser("chrome").build();
  
    try {
      await driver.get("https://www.google.com/");
  
      let searchBox = await driver.findElement(By.name("q"));
      await searchBox.sendKeys("Selenium WebDriver");
  
      await searchBox.sendKeys(Key.RETURN);
  
      let results = await driver.wait(until.elementsLocated(By.css(".g")), 10000);
  
      assert.ok(results.length > 0, "Aucun résultat de recherche trouvé");
    } catch (e) {
      console.log(e);
    } finally {
      await driver.quit();
    }
  })();