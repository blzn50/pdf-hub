/**
 * The solution was extracted from https://github.com/testing-library/jest-dom/issues/439.
 */
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
// To fix the missing methods of File in test
// https://github.com/jsdom/jsdom/issues/2555
import 'blob-polyfill';

afterEach(() => {
  cleanup();
});
