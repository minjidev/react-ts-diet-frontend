/* eslint-disable import/no-extraneous-dependencies */

import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from './server';

const mockedIntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserver: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', mockedIntersectionObserver);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
