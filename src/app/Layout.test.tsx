import React from 'react';
import { render } from '@testing-library/react';

jest.mock('next/font/google', () => ({
  Geist: ({ variable }: { variable: string }) => ({ variable }),
  Geist_Mono: ({ variable }: { variable: string }) => ({ variable }),
}));

jest.mock('@/providers', () => ({
  ReduxProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="redux-provider">{children}</div>
  ),
}));
import RootLayout from './layout';

describe('RootLayout', () => {
  it('оборачивает детей в ReduxProvider', () => {
    const { getByTestId, getByText } = render(
      <RootLayout>
        <div>Inner child</div>
      </RootLayout>
    );
    // Проверяем, что наш моковый ReduxProvider есть
    const prov = getByTestId('redux-provider');
    expect(prov).toBeInTheDocument();
    // и что внутри него наш контент
    expect(getByText('Inner child')).toBeInTheDocument();
  });
});
