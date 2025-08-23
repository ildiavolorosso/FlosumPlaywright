import { test, expect } from '@playwright/test';
import { org } from '../constants/orgs';
import { constants } from 'buffer';

test.describe( 'Salesforce Tests', () => {
  /**
   * Items to execute before each test.
   */
  test.beforeEach(async ({ page }) => {
    // insert anything that should execute before each test
  });
  
  /**
   * ORG LOGIN TEST
   */
  test('Org UI Login', async ({ page }) => {
    // open the login page
    await page.goto(org.url);
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    
    // log in to the org and test for lightning experience 
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill(org.username);

    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(org.password);

    await page.getByRole('button', { name: 'Log In to Sandbox' }).click();

    // Check for the app launcher
    await expect(page.getByRole('button', { name: 'App Launcher' })).toBeVisible({ timeout: 15_000 });

    // navigate to the Sales lightning app
    await page.getByRole('button', { name: 'App Launcher' }).click({ timeout: 10_000 });
    await page.getByRole('combobox', { name: 'Search apps and items...' }).click();
    await page.getByRole('combobox', { name: 'Search apps and items...' }).fill('Sales');
    await page.getByRole('option', { name: 'Sales', exact: true }).click();

    // check for the presence of expected tabs
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole('link', { name: 'Opportunities' })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole('link', { name: 'Accounts' })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole('link', { name: 'Leads' })).toBeVisible({ timeout: 15_000 });

    // click the New Lead link
  //  await page.getByRole('button', { name: 'Leads List' }).click({ timeout: 15_000 });
  //  await page.getByRole('menuitem', { name: 'New Lead' }).click({ timeout: 15_000 });
  //  await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible({ timeout: 15_000 });
  //  await expect(page.getByRole('textbox', { name: '*Last Name' })).toBeVisible({ timeout: 15_000 });
  //  await expect(page.getByRole('textbox', { name: '*Company' })).toBeVisible({ timeout: 15_000 });
  });

});