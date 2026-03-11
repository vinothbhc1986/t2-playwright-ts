import { Page, Locator } from '@playwright/test';

export class CandidatesPage {
  constructor(private page: Page) {}

  // Scope by input group label (stable)
  private dropdownByLabel(label: string): Locator {
    return this.page
      .locator('.oxd-input-group')
      .filter({ hasText: label })
      .locator('.oxd-select-text');
  }

  async selectJobTitle(title: string): Promise<void> {
    const dropdown = this.dropdownByLabel('Job Title');
    await dropdown.click();

    const option = this.page
    .locator('.oxd-select-dropdown')
    .getByRole('option', { name: title });
    await option.waitFor();
    await option.click();
  }

  async selectVacancy(vacancy: string) {
    const dropdown = this.dropdownByLabel('Vacancy');
    await dropdown.click();
    const option = this.page
    .locator('.oxd-select-dropdown')
    .getByRole('option', { name: vacancy });
    await option.waitFor();
    await option.click();
  }

  async selectHiringManager(manager: string) {
    const dropdown = this.dropdownByLabel('Hiring Manager');
    await dropdown.click();
    const option = this.page
    .locator('.oxd-select-dropdown')
    .getByRole('option', { name: manager });
    await option.waitFor();
    await option.click();
  }

  async getSelectedValue(label: string) {
    return this.dropdownByLabel(label).innerText();
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async resetForm() {
    await this.page.getByRole('button', { name: 'Reset' }).click();
  }

  async fillCandidateName(name: string) {
    await this.page.getByPlaceholder('Type for hints...').fill(name);
  }

  async fillKeywords(keywords: string) {
    await this.page
      .getByPlaceholder('Enter comma seperated words...')
      .fill(keywords);
  }

  async getErrorMessage() {
    return this.page.locator('.oxd-alert-content').innerText();
  }
}
