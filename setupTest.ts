/**
 * The solution was extracted from https://github.com/testing-library/jest-dom/issues/439.
 */
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
// To fix the missing methods of File in test
// https://github.com/jsdom/jsdom/issues/2555
import 'blob-polyfill';

afterEach(() => {
  cleanup();
});

// https://github.com/jsdom/jsdom/issues/1721
function noOp() {}

if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: noOp });
}
