import { test, expect } from "@playwright/test";
import { LeavePage } from "./leavePage";
import { LoginPage } from "./loginPage";

test.describe("Leave List Tests", () => {
  let leavePage: LeavePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.enterUsername("Admin");
    await loginPage.enterPassword("admin123");
    await loginPage.clickLogin();

    await page.waitForURL(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")

    leavePage = new LeavePage(page);
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList",
    );
  });

  test('Verify that the "From Date" input accepts valid date formats', async () => {
    await leavePage.fillFromDate("2026-01-01");
    const value = await leavePage.fromDateInput.inputValue();
    expect(value).toBe("2026-01-01");
  });

  test('Verify that the "To Date" input accepts valid date formats', async () => {
    await leavePage.fillToDate("2026-31-12");
    const value = await leavePage.toDateInput.inputValue();
    expect(value).toBe("2026-31-12");
  });

  test('Confirm that selecting a leave status from the "Show Leave with Status" dropdown displays relevant leave records', async () => {
    await leavePage.selectLeaveStatus("Rejected");
    // Add assertion to check that relevant leave records are displayed
  });

  test('Check that selecting a leave type from the "Leave Type" dropdown filters the leave records correctly', async () => {
    await leavePage.selectLeaveType("CAN - Vacation");
    // Add assertion to check that relevant leave records are displayed
  });

  test("Validate that entering a valid employee name in the autocomplete field provides suggestions based on existing employee records", async () => {
    await leavePage.enterEmployeeName("John Doe");
    expect(await leavePage.employeeNameInput.inputValue()).toBe("John Doe");
  });

  

  test('Verify that clicking the "Search" button displays the filtered leave records based on the selected criteria', async () => {
    await leavePage.clickSearchButton();
    // Add assertion to check that filtered leave records are displayed
  });

  test('Confirm that clicking the "Reset" button clears all input fields and selections', async () => {
    await leavePage.clickResetButton();
    const fromDateValue = await leavePage.fromDateInput.inputValue();
    const toDateValue = await leavePage.toDateInput.inputValue();
    expect(fromDateValue).toBe("");
    expect(toDateValue).toBe("");
  });
});
