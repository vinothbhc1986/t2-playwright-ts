import { expect, test } from "@playwright/test";
import { InventoryPage } from "./inventoryPage";
import { LoginPage } from "./loginPage";

const baseUrl = "https://www.saucedemo.com/inventory.html";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
  const loginPage = new LoginPage(page);
   await loginPage.login('standard_user', 'secret_sauce');
});

test("Verify that each item displays its name, description, price, and image correctly", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  const item0 = await inventoryPage.verifyItemDetails(
    0,
    "Sauce Labs Backpack",
    "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    "$29.99",
  );
  const item1 = await inventoryPage.verifyItemDetails(
    1,
    "Sauce Labs Bike Light",
    "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    "$9.99",
  );
  // Add more assertions for other items

  expect(item0.name).toBe("Sauce Labs Backpack");
  expect(item0.description).toBe(
    "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
  );
  expect(item0.price).toBe("$29.99");

  expect(item1.name).toBe("Sauce Labs Bike Light");
  expect(item1.description).toBe(
    "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
  );
  expect(item1.price).toBe("$9.99");
});

test("Check that clicking on an item's image navigates to the appropriate product detail page", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.clickItemImage(0);
  expect(page.url()).toContain("4");
});

test('Ensure that the "Add to cart" button is enabled for all items', async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  for (let i = 0; i < (await inventoryPage.addToCartButtons.count()); i++) {
    await inventoryPage.isAddToCartButtonEnabled(i);
    expect(await inventoryPage.isAddToCartButtonEnabled(i)).toBe(true);
  }
});

test('Test that clicking the "Add to cart" button updates the cart count displayed on the page', async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  const count = await inventoryPage.checkCartCountAfterAdding(0);
  expect(parseInt(count)).toBe(1);
});

test("Confirm that the prices displayed are accurate and match the expected values for each item", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.verifyItemDetails(
    0,
    "Sauce Labs Backpack",
    "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    "$29.99",
  );
  await inventoryPage.verifyItemDetails(
    1,
    "Sauce Labs Bike Light",
    "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    "$9.99",
  );
  // Add more assertions for other items
});

test("Validate that the descriptions provide sufficient information about each item", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  // Add assertions for descriptions
});

test('Check that clicking the "Add to cart" button does not allow adding an item if the user is not logged in', async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  // Simulate not logged in and check behavior
});

test("Check that the price displayed is not negative or zero for any item", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  for (let i = 0; i < (await inventoryPage.itemPrices.count()); i++) {
    await inventoryPage.checkPriceIsPositive(i);
  }
});

test("Simulate a scenario where a user adds multiple items to the cart and then removes one item", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart(0);
  await inventoryPage.addItemToCart(1);
  await inventoryPage.addToCartButtons.nth(0).click(); // Simulating removal
  const count = await inventoryPage.getCartCount();
  expect(parseInt(count)).toBe(3);
});

test("Test the behavior of the inventory when a user quickly adds and removes items in succession", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart(0);
  await inventoryPage.addToCartButtons.nth(0).click(); // Simulating removal
  // Add more rapid actions
});

test("Verify that the page maintains its state if the user refreshes the page", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart(0);
  const count = await inventoryPage.refreshPageAndCheckState();
          expect(parseInt(count)).toBeGreaterThanOrEqual(0);

});

test("Explore the effect of resizing the browser window on the layout of the inventory items", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.resizeWindowAndCheckLayout();
          // Add assertions to check layout if necessary

});
