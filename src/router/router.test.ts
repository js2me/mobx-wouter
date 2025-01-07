import { MobxHistory } from 'mobx-location-history';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { MobxRouter } from './router';
import {
  RouterNavigateParams,
  RouterToConfig,
  RouterType,
} from './router.types';

export class HistoryMock extends MobxHistory {
  spies = {
    pushState: vi.fn(
      (data: any, unused: string, url?: string | URL | null | undefined) =>
        super.pushState(data, unused, url),
    ),
    replaceState: vi.fn(
      (data: any, unused: string, url?: string | URL | null | undefined) =>
        super.replaceState(data, unused, url),
    ),
  };

  pushState(
    data: any,
    unused: string,
    url?: string | URL | null | undefined,
  ): void {
    return this.spies.pushState(data, unused, url);
  }

  replaceState(
    data: any,
    unused: string,
    url?: string | URL | null | undefined,
  ): void {
    return this.spies.replaceState(data, unused, url);
  }
}

describe('router', () => {
  const mockHistory = new HistoryMock();

  beforeEach(() => {
    history.replaceState(null, '', '/');
    location.hash = '';
    mockHistory.spies.pushState.mockClear();
    mockHistory.spies.replaceState.mockClear();
  });

  type NavigateTestConfig = {
    type: RouterType;
    title?: string;
    args: [to: RouterToConfig, options?: RouterNavigateParams];
    expectedHref: string;
    expectedSearch?: string;
    pushStateCalls?: number;
    replaceStateCalls?: number;
  };

  const navigateTests: NavigateTestConfig[] = [
    {
      type: 'browser',
      args: ['/path/a/b/c'],
      expectedHref: 'http://localhost:3000/path/a/b/c',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/a/1?param1=value1#section1'],
      expectedHref: 'http://localhost:3000/path/a/1?param1=value1#section1',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/b/2?param2=value2#section2'],
      expectedHref: 'http://localhost:3000/path/b/2?param2=value2#section2',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/c/3?param3=value3&param4=value4#section3'],
      expectedHref:
        'http://localhost:3000/path/c/3?param3=value3&param4=value4#section3',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/d/4#section4'],
      expectedHref: 'http://localhost:3000/path/d/4#section4',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/e/5?param5=value5#section5'],
      expectedHref: 'http://localhost:3000/path/e/5?param5=value5#section5',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/f/6?param6=value6&param7=value7#section6'],
      expectedHref:
        'http://localhost:3000/path/f/6?param6=value6&param7=value7#section6',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/g/7?param8=value8#section7'],
      expectedHref: 'http://localhost:3000/path/g/7?param8=value8#section7',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/h/8?param9=value9&param10=value10#section8'],
      expectedHref:
        'http://localhost:3000/path/h/8?param9=value9&param10=value10#section8',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/i/9#section9'],
      expectedHref: 'http://localhost:3000/path/i/9#section9',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/j/10?param11=value11#section10'],
      expectedHref: 'http://localhost:3000/path/j/10?param11=value11#section10',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/k/11?param12=value12&param13=value13#section11'],
      expectedHref:
        'http://localhost:3000/path/k/11?param12=value12&param13=value13#section11',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/l/12?param14=value14#section12'],
      expectedHref: 'http://localhost:3000/path/l/12?param14=value14#section12',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/m/13?param15=value15&param16=value16#section13'],
      expectedHref:
        'http://localhost:3000/path/m/13?param15=value15&param16=value16#section13',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/n/14#section14'],
      expectedHref: 'http://localhost:3000/path/n/14#section14',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/o/15?param17=value17&param18=value18#section15'],
      expectedHref:
        'http://localhost:3000/path/o/15?param17=value17&param18=value18#section15',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/p/16?param19=value19#section16'],
      expectedHref: 'http://localhost:3000/path/p/16?param19=value19#section16',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/q/17?param20=value20&param21=value21#section17'],
      expectedHref:
        'http://localhost:3000/path/q/17?param20=value20&param21=value21#section17',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/r/18#section18'],
      expectedHref: 'http://localhost:3000/path/r/18#section18',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/s/19?param22=value22&param23=value23#section19'],
      expectedHref:
        'http://localhost:3000/path/s/19?param22=value22&param23=value23#section19',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/t/20?param24=value24#section20'],
      expectedHref: 'http://localhost:3000/path/t/20?param24=value24#section20',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/u/21?param25=value25&param26=value26#section21'],
      expectedHref:
        'http://localhost:3000/path/u/21?param25=value25&param26=value26#section21',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/v/22#section22'],
      expectedHref: 'http://localhost:3000/path/v/22#section22',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/w/23?param27=value27&param28=value28#section23'],
      expectedHref:
        'http://localhost:3000/path/w/23?param27=value27&param28=value28#section23',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/x/24?param29=value29#section24'],
      expectedHref: 'http://localhost:3000/path/x/24?param29=value29#section24',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/y/25?param30=value30&param31=value31#section25'],
      expectedHref:
        'http://localhost:3000/path/y/25?param30=value30&param31=value31#section25',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'browser',
      args: ['/another/path/z/?query=example&hash=hashValue'],
      expectedHref:
        'http://localhost:3000/another/path/z/?query=example&hash=hashValue',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      title: 'state test',
      type: 'browser',
      args: [
        '/another/path/z/?query=example&hash=hashValue',
        {
          state: { foo: 1, bar: '1' },
        },
      ],
      expectedHref:
        'http://localhost:3000/another/path/z/?query=example&hash=hashValue',
      pushStateCalls: 1,
      replaceStateCalls: 0,
    },
    {
      type: 'hash',
      args: ['/app/users'],
      expectedHref: 'http://localhost:3000/#/app/users',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/a/b/c'],
      expectedHref: 'http://localhost:3000/#/path/a/b/c',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/a/1?param1=value1#section1'],
      expectedHref: 'http://localhost:3000/#/path/a/1?param1=value1#section1',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/b/2?param2=value2#section2'],
      expectedHref: 'http://localhost:3000/#/path/b/2?param2=value2#section2',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/c/3?param3=value3&param4=value4#section3'],
      expectedHref:
        'http://localhost:3000/#/path/c/3?param3=value3&param4=value4#section3',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/d/4#section4'],
      expectedHref: 'http://localhost:3000/#/path/d/4#section4',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/e/5?param5=value5#section5'],
      expectedHref: 'http://localhost:3000/#/path/e/5?param5=value5#section5',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/f/6?param6=value6&param7=value7#section6'],
      expectedHref:
        'http://localhost:3000/#/path/f/6?param6=value6&param7=value7#section6',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/g/7?param8=value8#section7'],
      expectedHref: 'http://localhost:3000/#/path/g/7?param8=value8#section7',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/h/8?param9=value9&param10=value10#section8'],
      expectedHref:
        'http://localhost:3000/#/path/h/8?param9=value9&param10=value10#section8',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/i/9#section9'],
      expectedHref: 'http://localhost:3000/#/path/i/9#section9',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/j/10?param11=value11#section10'],
      expectedHref:
        'http://localhost:3000/#/path/j/10?param11=value11#section10',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/k/11?param12=value12&param13=value13#section11'],
      expectedHref:
        'http://localhost:3000/#/path/k/11?param12=value12&param13=value13#section11',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/l/12?param14=value14#section12'],
      expectedHref:
        'http://localhost:3000/#/path/l/12?param14=value14#section12',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/m/13?param15=value15&param16=value16#section13'],
      expectedHref:
        'http://localhost:3000/#/path/m/13?param15=value15&param16=value16#section13',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/n/14#section14'],
      expectedHref: 'http://localhost:3000/#/path/n/14#section14',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/o/15?param17=value17&param18=value18#section15'],
      expectedHref:
        'http://localhost:3000/#/path/o/15?param17=value17&param18=value18#section15',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/p/16?param19=value19#section16'],
      expectedHref:
        'http://localhost:3000/#/path/p/16?param19=value19#section16',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/q/17?param20=value20&param21=value21#section17'],
      expectedHref:
        'http://localhost:3000/#/path/q/17?param20=value20&param21=value21#section17',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/r/18#section18'],
      expectedHref: 'http://localhost:3000/#/path/r/18#section18',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/s/19?param22=value22&param23=value23#section19'],
      expectedHref:
        'http://localhost:3000/#/path/s/19?param22=value22&param23=value23#section19',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/t/20?param24=value24#section20'],
      expectedHref:
        'http://localhost:3000/#/path/t/20?param24=value24#section20',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/u/21?param25=value25&param26=value26#section21'],
      expectedHref:
        'http://localhost:3000/#/path/u/21?param25=value25&param26=value26#section21',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/v/22#section22'],
      expectedHref: 'http://localhost:3000/#/path/v/22#section22',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/w/23?param27=value27&param28=value28#section23'],
      expectedHref:
        'http://localhost:3000/#/path/w/23?param27=value27&param28=value28#section23',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/x/24?param29=value29#section24'],
      expectedHref:
        'http://localhost:3000/#/path/x/24?param29=value29#section24',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/y/25?param30=value30&param31=value31#section25'],
      expectedHref:
        'http://localhost:3000/#/path/y/25?param30=value30&param31=value31#section25',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
    {
      title: 'state test',
      type: 'hash',
      args: [
        '/another/path/z/?query=example&hash=hashValue',
        {
          state: { foo: 1, bar: '1' },
        },
      ],
      expectedHref:
        'http://localhost:3000/#/another/path/z/?query=example&hash=hashValue',
      pushStateCalls: 0,
      replaceStateCalls: 1,
    },
  ];

  const hashRouterTests = navigateTests.filter((it) => it.type === 'hash');
  const browserRouterTests = navigateTests.filter(
    (it) => it.type === 'browser',
  );

  const executeTest = ({
    args,
    expectedHref,
    title,
    type,
    pushStateCalls,
    replaceStateCalls,
    expectedSearch,
  }: NavigateTestConfig) => {
    const testName =
      title ??
      `to:${JSON.stringify(args[0])}, options?: ${args[1] == null ? args[1] : JSON.stringify(args[1])} -> ${expectedHref}`;

    test(testName, () => {
      const mockRouter = new MobxRouter({
        history: mockHistory,
        type,
      });

      mockRouter.navigate(...args);

      expect(location.href).toBe(expectedHref);

      if (pushStateCalls != null) {
        expect(mockHistory.spies.pushState).toHaveBeenCalledTimes(
          pushStateCalls,
        );
      }
      if (replaceStateCalls != null) {
        expect(mockHistory.spies.replaceState).toHaveBeenCalledTimes(
          replaceStateCalls,
        );
      }
      if (expectedSearch != null) {
        expect(location.search).toBe(expectedSearch);
      }
      if (args?.[1]?.state != null) {
        expect(mockHistory.state).toStrictEqual(args[1].state);
        expect(history.state).toStrictEqual(args[1].state);
      }
    });
  };

  describe('hash router', () => {
    hashRouterTests.forEach(executeTest);
  });

  describe('browser router', () => {
    browserRouterTests.forEach(executeTest);
  });
});
