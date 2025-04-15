import { act, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { createCounter } from 'yummies/complex/counter';

import { PageViewModelBaseMock } from '../page-view-model/page-view-model.base.test';

import { PageViewModelProps, withPageViewModel } from './with-page-view-model';

const createIdGenerator = (prefix?: string) => {
  const counter = createCounter();
  return () => (prefix ?? '') + counter().toString();
};

describe('withPageViewModel', () => {
  test('renders (required path param)', async () => {
    class VM extends PageViewModelBaseMock<{ foo: string }> {
      mount() {
        super.mount();
      }
    }
    const View = ({ model }: PageViewModelProps<VM>) => {
      return <div data-testid={'view'}>{`hello ${model.id}`}</div>;
    };
    const Component = withPageViewModel(VM, {
      generateId: createIdGenerator(),
    })(View);

    await act(async () => render(<Component params={{ foo: 'bar' }} />));
    expect(screen.getByText('hello VM_0')).toBeDefined();
  });
  test('renders (optional path param)', async () => {
    class VM extends PageViewModelBaseMock<{ foo?: string }> {
      mount() {
        super.mount();
      }
    }
    const View = ({ model }: PageViewModelProps<VM>) => {
      return <div data-testid={'view'}>{`hello ${model.id}`}</div>;
    };
    const Component = withPageViewModel(VM, {
      generateId: createIdGenerator(),
    })(View);

    await act(async () => render(<Component />));
    expect(screen.getByText('hello VM_0')).toBeDefined();
  });
  test('renders (no path params)', async () => {
    class VM extends PageViewModelBaseMock {
      mount() {
        super.mount();
      }
    }
    const View = ({ model }: PageViewModelProps<VM>) => {
      return <div data-testid={'view'}>{`hello ${model.id}`}</div>;
    };
    const Component = withPageViewModel(VM, {
      generateId: createIdGenerator(),
    })(View);

    await act(async () => render(<Component />));
    expect(screen.getByText('hello VM_0')).toBeDefined();
  });
});
