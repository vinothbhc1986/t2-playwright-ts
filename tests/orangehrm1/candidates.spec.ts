import { test, expect } from '@playwright/test';
import { CandidatesPage } from './CandidatesPage';

test.describe('Candidates Page Tests', () => {
  let candidatesPage: CandidatesPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/dashboard/index');

    //Navigate to Recruitment → Candidates
    await page.click('a[href*="recruitment"]');
    await page.waitForURL('**/recruitment/viewCandidates');
    await page.waitForSelector('form');

    // Initialize Page Object AFTER navigation
    candidatesPage = new CandidatesPage(page);
  });

  test('Select job title', async ({ page }) => {
    await candidatesPage.selectJobTitle('Software Engineer');
    const value = await candidatesPage.getSelectedValue('Job Title');
    await expect(value).toContain('Software Engineer');
  });

  test('Select vacancy', async ({ page }) => {
    await candidatesPage.selectVacancy('Senior QA Lead');
    const value = await candidatesPage.getSelectedValue('Vacancy');
    await expect(value).toContain('Senior QA Lead');
  });

  test('Select hiring manager', async ({ page }) => {
    await candidatesPage.selectHiringManager('Rahul Patil');
    const value = await candidatesPage.getSelectedValue('Hiring Manager');
    await expect(value).toContain('Rahul Patil');
  });


  test('Reset clears fields', async ({ page }) => {
    await candidatesPage.fillCandidateName('Jane Doe');
    await candidatesPage.fillKeywords('developer, tester');

    await candidatesPage.resetForm();

    await expect(
      page.getByPlaceholder('Type for hints...')
    ).toHaveValue('');
  });
});
