import { test, expect } from '@playwright/test';

  let cartItemCount = 0;

  test.describe('Parallel mode (default)', () => {
      test('@smoke Add item', () => {
          cartItemCount++;
          console.log('Add:', cartItemCount);
      });
      test('@smoke Check count', () => {
          console.log('Check:', cartItemCount);
          expect(cartItemCount).toBe(1);
      });
  });

  test.describe('Serial mode', () => {
      test.describe.configure({ mode: 'serial' });

      test('@smoke Add item serial', () => { cartItemCount++; });
      test('@smoke Check count serial', () => { expect(cartItemCount).toBe(1); });
  });

  //Then break the first serial test to verify skipping:
  test('@smoke Add item serial', () => {
      cartItemCount++;
      expect(true).toBe(false); // force fail
  });