import { History, To } from 'mobx-location-history';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { Router } from './router.js';
import {
  RouterNavigateParams,
  RouterToConfig,
  RouterType,
} from './router.types.js';

export class HistoryMock extends History {
  spies = {
    push: vi.fn((to: To, state?: any) => super.push(to, state)),
    replace: vi.fn((to: To, state?: any) => super.replace(to, state)),
  };

  push(to: To, state?: any): void {
    return this.spies.push(to, state);
  }

  replace(to: To, state?: any): void {
    return this.spies.replace(to, state);
  }
}

describe('router', () => {
  const mockHistory = new HistoryMock();

  beforeEach(() => {
    history.replaceState(null, '', '/');
    location.hash = '';
    mockHistory.spies.push.mockClear();
    mockHistory.spies.replace.mockClear();
  });

  type NavigateTestConfig = {
    type: RouterType;
    title?: string;
    args: [to: RouterToConfig, options?: RouterNavigateParams];
    expectedHref: string;
    expectedSearch?: string;
    pushCalls?: number;
    replaceCalls?: number;
  };

  const navigateTests: NavigateTestConfig[] = [
    {
      type: 'browser',
      args: ['/path/a/b/c'],
      expectedHref: 'http://localhost:3000/path/a/b/c',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/a/1?param1=value1#section1'],
      expectedHref: 'http://localhost:3000/path/a/1?param1=value1#section1',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/b/2?param2=value2#section2'],
      expectedHref: 'http://localhost:3000/path/b/2?param2=value2#section2',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/c/3?param3=value3&param4=value4#section3'],
      expectedHref:
        'http://localhost:3000/path/c/3?param3=value3&param4=value4#section3',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/d/4#section4'],
      expectedHref: 'http://localhost:3000/path/d/4#section4',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/e/5?param5=value5#section5'],
      expectedHref: 'http://localhost:3000/path/e/5?param5=value5#section5',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/f/6?param6=value6&param7=value7#section6'],
      expectedHref:
        'http://localhost:3000/path/f/6?param6=value6&param7=value7#section6',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/g/7?param8=value8#section7'],
      expectedHref: 'http://localhost:3000/path/g/7?param8=value8#section7',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/h/8?param9=value9&param10=value10#section8'],
      expectedHref:
        'http://localhost:3000/path/h/8?param9=value9&param10=value10#section8',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/i/9#section9'],
      expectedHref: 'http://localhost:3000/path/i/9#section9',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/j/10?param11=value11#section10'],
      expectedHref: 'http://localhost:3000/path/j/10?param11=value11#section10',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/k/11?param12=value12&param13=value13#section11'],
      expectedHref:
        'http://localhost:3000/path/k/11?param12=value12&param13=value13#section11',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/l/12?param14=value14#section12'],
      expectedHref: 'http://localhost:3000/path/l/12?param14=value14#section12',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/m/13?param15=value15&param16=value16#section13'],
      expectedHref:
        'http://localhost:3000/path/m/13?param15=value15&param16=value16#section13',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/n/14#section14'],
      expectedHref: 'http://localhost:3000/path/n/14#section14',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/o/15?param17=value17&param18=value18#section15'],
      expectedHref:
        'http://localhost:3000/path/o/15?param17=value17&param18=value18#section15',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/p/16?param19=value19#section16'],
      expectedHref: 'http://localhost:3000/path/p/16?param19=value19#section16',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/q/17?param20=value20&param21=value21#section17'],
      expectedHref:
        'http://localhost:3000/path/q/17?param20=value20&param21=value21#section17',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/r/18#section18'],
      expectedHref: 'http://localhost:3000/path/r/18#section18',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/s/19?param22=value22&param23=value23#section19'],
      expectedHref:
        'http://localhost:3000/path/s/19?param22=value22&param23=value23#section19',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/t/20?param24=value24#section20'],
      expectedHref: 'http://localhost:3000/path/t/20?param24=value24#section20',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/u/21?param25=value25&param26=value26#section21'],
      expectedHref:
        'http://localhost:3000/path/u/21?param25=value25&param26=value26#section21',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/v/22#section22'],
      expectedHref: 'http://localhost:3000/path/v/22#section22',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/w/23?param27=value27&param28=value28#section23'],
      expectedHref:
        'http://localhost:3000/path/w/23?param27=value27&param28=value28#section23',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/x/24?param29=value29#section24'],
      expectedHref: 'http://localhost:3000/path/x/24?param29=value29#section24',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/path/y/25?param30=value30&param31=value31#section25'],
      expectedHref:
        'http://localhost:3000/path/y/25?param30=value30&param31=value31#section25',
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'browser',
      args: ['/another/path/z/?query=example&hash=hashValue'],
      expectedHref:
        'http://localhost:3000/another/path/z/?query=example&hash=hashValue',
      pushCalls: 1,
      replaceCalls: 0,
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
      pushCalls: 1,
      replaceCalls: 0,
    },
    {
      type: 'hash',
      args: ['/app/users'],
      expectedHref: 'http://localhost:3000/#/app/users',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/a/b/c'],
      expectedHref: 'http://localhost:3000/#/path/a/b/c',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/a/1?param1=value1#section1'],
      expectedHref: 'http://localhost:3000/#/path/a/1?param1=value1#section1',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/b/2?param2=value2#section2'],
      expectedHref: 'http://localhost:3000/#/path/b/2?param2=value2#section2',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/c/3?param3=value3&param4=value4#section3'],
      expectedHref:
        'http://localhost:3000/#/path/c/3?param3=value3&param4=value4#section3',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/d/4#section4'],
      expectedHref: 'http://localhost:3000/#/path/d/4#section4',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/e/5?param5=value5#section5'],
      expectedHref: 'http://localhost:3000/#/path/e/5?param5=value5#section5',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/f/6?param6=value6&param7=value7#section6'],
      expectedHref:
        'http://localhost:3000/#/path/f/6?param6=value6&param7=value7#section6',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/g/7?param8=value8#section7'],
      expectedHref: 'http://localhost:3000/#/path/g/7?param8=value8#section7',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/h/8?param9=value9&param10=value10#section8'],
      expectedHref:
        'http://localhost:3000/#/path/h/8?param9=value9&param10=value10#section8',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/i/9#section9'],
      expectedHref: 'http://localhost:3000/#/path/i/9#section9',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/j/10?param11=value11#section10'],
      expectedHref:
        'http://localhost:3000/#/path/j/10?param11=value11#section10',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/k/11?param12=value12&param13=value13#section11'],
      expectedHref:
        'http://localhost:3000/#/path/k/11?param12=value12&param13=value13#section11',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/l/12?param14=value14#section12'],
      expectedHref:
        'http://localhost:3000/#/path/l/12?param14=value14#section12',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/m/13?param15=value15&param16=value16#section13'],
      expectedHref:
        'http://localhost:3000/#/path/m/13?param15=value15&param16=value16#section13',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/n/14#section14'],
      expectedHref: 'http://localhost:3000/#/path/n/14#section14',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/o/15?param17=value17&param18=value18#section15'],
      expectedHref:
        'http://localhost:3000/#/path/o/15?param17=value17&param18=value18#section15',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/p/16?param19=value19#section16'],
      expectedHref:
        'http://localhost:3000/#/path/p/16?param19=value19#section16',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/q/17?param20=value20&param21=value21#section17'],
      expectedHref:
        'http://localhost:3000/#/path/q/17?param20=value20&param21=value21#section17',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/r/18#section18'],
      expectedHref: 'http://localhost:3000/#/path/r/18#section18',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/s/19?param22=value22&param23=value23#section19'],
      expectedHref:
        'http://localhost:3000/#/path/s/19?param22=value22&param23=value23#section19',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/t/20?param24=value24#section20'],
      expectedHref:
        'http://localhost:3000/#/path/t/20?param24=value24#section20',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/u/21?param25=value25&param26=value26#section21'],
      expectedHref:
        'http://localhost:3000/#/path/u/21?param25=value25&param26=value26#section21',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/v/22#section22'],
      expectedHref: 'http://localhost:3000/#/path/v/22#section22',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/w/23?param27=value27&param28=value28#section23'],
      expectedHref:
        'http://localhost:3000/#/path/w/23?param27=value27&param28=value28#section23',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/x/24?param29=value29#section24'],
      expectedHref:
        'http://localhost:3000/#/path/x/24?param29=value29#section24',
      pushCalls: 0,
      replaceCalls: 1,
    },
    {
      type: 'hash',
      args: ['/path/y/25?param30=value30&param31=value31#section25'],
      expectedHref:
        'http://localhost:3000/#/path/y/25?param30=value30&param31=value31#section25',
      pushCalls: 0,
      replaceCalls: 1,
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
      pushCalls: 0,
      replaceCalls: 1,
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
    pushCalls: pushStateCalls,
    replaceCalls: replaceStateCalls,
    expectedSearch,
  }: NavigateTestConfig) => {
    const testName =
      title ??
      `to:${JSON.stringify(args[0])}, options?: ${args[1] == null ? args[1] : JSON.stringify(args[1])} -> ${expectedHref}`;

    test(testName, () => {
      const mockRouter = new Router({
        history: mockHistory,
        type,
      });

      mockRouter.navigate(...args);

      expect(location.href).toBe(expectedHref);

      if (pushStateCalls != null) {
        expect(mockHistory.spies.push).toHaveBeenCalledTimes(pushStateCalls);
      }
      if (replaceStateCalls != null) {
        expect(mockHistory.spies.replace).toHaveBeenCalledTimes(
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
