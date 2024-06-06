const {By, Key, Builder, until} = require("selenium-webdriver");
const assert = require("assert");
const credentials = require('./credentials.json');

(
    async function test_simplonline(){
        let driver = await new Builder().forBrowser("chrome").build();

        try {
            await driver.get("https://simplonline.co/login");

            await driver.findElement(By.linkText("Connexion")).click();
            await driver.findElement(By.id("user_email")).sendKeys("fakeuser@simplon.co");
            await driver.findElement(By.id("user_password")).sendKeys("fakepassword", Key.RETURN);

            await driver.wait(until.elementLocated(By.css(".alert.alert-danger")), 10000);
            let errorMessage = await driver.findElement(By.css(".alert.alert-danger")).getText();
            assert.ok(errorMessage.includes("Invalid Email or password."));

            console.log("Test d'échec de connexion réussi!");

            await driver.findElement(By.id("user_email")).clear();
            await driver.findElement(By.id("user_email")).sendKeys(credentials.email);
            await driver.findElement(By.id("user_password")).clear();
            await driver.findElement(By.id("user_password")).sendKeys(credentials.password, Key.RETURN);

            await driver.wait(until.elementLocated(By.css(".dashboard")), 10000);
            console.log("Connexion réussie!");

        } catch(e) {
            console.log(e);

        } finally {
            await driver.quit();
        }
    }
    ()
)
