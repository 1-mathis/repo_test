const {
    By,
    Key,
    Builder,
    WebElementCondition,
    until,
  } = require("selenium-webdriver");
  const assert = require("assert");
  
  (async function test_airbnb() {
    let driver = await new Builder().forBrowser("chrome").build();
  
    try {
      await driver.get("https://www.airbnb.fr/s/Grenoble--France/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2024-07-01&monthly_length=3&monthly_end_date=2024-10-01&price_filter_input_type=0&channel=EXPLORE&location_bb=QjTbdkC4GTZCNJ3ZQLWyMg%3D%3D&place_id=ChIJb76J1ov0ikcRmFOZbs0QjGE&query=Grenoble%2C%20France&date_picker_type=calendar&checkin=2024-06-07&checkout=2024-06-09&adults=3&search_type=unknown");
  
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