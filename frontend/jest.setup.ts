

jest.mock('react-native-worklets', () => {
  return {
    makeShareableCloneRecursive: jest.fn(),
    makeShareableCloneDeep: jest.fn(),
    makeShareable: jest.fn(),
    createSerializable: jest.fn(),
    createRunInContextFn: jest.fn(),
    runOnJS: jest.fn(),
    runOnUI: jest.fn(),
    isConfigured: jest.fn(() => true),
    serializableMappingCache: new Map(),
    RuntimeKind: { ReactNative: 1, Worklet: 2 },
    isWorkletFunction: jest.fn(() => true),
    scheduleOnUI: jest.fn(),
    default: {
      isConfigured: jest.fn(() => true),
      createSerializable: jest.fn(),
      serializableMappingCache: new Map(),
    }
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock react-native-fs
jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/mock/documents',
  DownloadDirectoryPath: '/mock/downloads',
  ExternalDirectoryPath: '/mock/external',
  ExternalStorageDirectoryPath: '/mock/external-storage',
  TemporaryDirectoryPath: '/mock/temp',
  CachesDirectoryPath: '/mock/caches',
  readDir: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
  unlink: jest.fn(),
  exists: jest.fn(),
  mkdir: jest.fn(),
  moveFile: jest.fn(),
  copyFile: jest.fn(),
  downloadFile: jest.fn(() => ({
    promise: Promise.resolve(),
    jobId: 1,
  })),
}));

// Mock removed as NativeAnimatedHelper is not present in newer React Native versions

// Mock expo modules that might fail in test environment
jest.mock('expo-font', () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  isLoading: jest.fn().mockReturnValue(false),
  loadAsync: jest.fn().mockResolvedValue(true),
}));

jest.mock('expo-constants', () => ({
  manifest: {
    extra: {},
  },
  expoConfig: {
    extra: {},
  },
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));


jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  wrap: jest.fn((component) => component),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  setUser: jest.fn(),
}));

jest.mock('tamagui', () => {
  const React = require('react');
  const { Text: RNText, View: RNView, ScrollView: RNScrollView, TextInput: RNTextInput } = require('react-native');
  
  const createMockComponent = (name: string, BaseComp: any) => {
    const Comp = ({ children, ...props }: any) => React.createElement(BaseComp, props, children);
    Comp.displayName = name;
    return Comp;
  };

  return {
    Theme: createMockComponent('Theme', React.Fragment),
    XStack: createMockComponent('XStack', RNView),
    YStack: createMockComponent('YStack', RNView),
    Text: createMockComponent('Text', RNText),
    ScrollView: createMockComponent('ScrollView', RNScrollView),
    Button: createMockComponent('Button', RNView),
    Card: createMockComponent('Card', RNView),
    Paragraph: createMockComponent('Paragraph', RNText),
    Input: createMockComponent('Input', RNTextInput),
    Separator: createMockComponent('Separator', RNView),
    useTheme: () => ({
      background: { val: '#ffffff' },
      backgroundStrong: { val: '#ffffff' },
      backgroundHover: { val: '#ffffff' },
      borderColor: { val: '#cccccc' },
      color: { val: '#000000' },
      colorMuted: { val: '#888888' },
    }),
  };
});

jest.mock('@testing-library/react-native', () => {
  const actual = jest.requireActual('@testing-library/react-native');
  const React = require('react');
  const { createRoot } = require('test-renderer');

  function syncRender(element: any, options: any = {}) {
    const { wrapper: Wrapper } = options || {};
    const rendererOptions = {
      textComponentTypes: ['Text', 'TextInput'],
      publicTextComponentTypes: ['Text'],
    };
    const wrap = (el: any) => (Wrapper ? React.createElement(Wrapper, null, el) : el);
    const renderer = createRoot(rendererOptions);
    React.act(() => {
      renderer.render(wrap(element));
    });
    const rerender = (component: any) => {
      React.act(() => {
        renderer.render(wrap(component));
      });
    };
    const unmount = () => {
      React.act(() => {
        renderer.unmount();
      });
    };
    const toJSON = () => {
      const json = renderer.container.toJSON();
      if (!json || json?.children?.length === 0) return null;
      if (json?.children?.length === 1 && typeof json.children[0] !== 'string') return json.children[0];
      return json;
    };

    // Build a proxy so every query always reads the CURRENT container.
    // actual.within() captures a snapshot of the container at call time,
    // so we must defer the call until each query is actually invoked.
    const liveQuery = (name: string) => (...args: any[]) => {
      const q = actual.within ? actual.within(renderer.container) : {};
      return (q as any)[name]?.(...args);
    };

    // Collect all query method names from a sample within() call
    const sampleQueries = actual.within ? actual.within(renderer.container) : {};
    const queryMethods: Record<string, any> = {};
    for (const key of Object.keys(sampleQueries)) {
      if (typeof (sampleQueries as any)[key] === 'function') {
        queryMethods[key] = liveQuery(key);
      }
    }

    const result: any = {
      ...queryMethods,
      rerender,
      unmount,
      toJSON,
      get container() { return renderer.container; },
      get root() { return renderer.container.children[0]; },
    };
    try {
      require('@testing-library/react-native/dist/screen').setRenderResult(result);
    } catch (e) {}
    return result;
  }

  function syncRenderHook(hookToRender: any, options: any = {}) {
    const result = React.createRef();
    function HookContainer({ hookProps }: any) {
      const renderResult = hookToRender(hookProps);
      result.current = renderResult;
      return null;
    }
    const { initialProps, wrapper } = options || {};
    const renderOptions = wrapper ? { wrapper } : {};
    const { rerender: rerenderComponent, unmount } = syncRender(
      React.createElement(HookContainer, { hookProps: initialProps }),
      renderOptions
    );
    return {
      result,
      rerender: (hookProps: any) => rerenderComponent(React.createElement(HookContainer, { hookProps })),
      unmount,
    };
  }

  // Use actual RNTL fireEvent but replace its internal async `act` with React.act
  // so state updates flush synchronously before the next test line runs.
  const fireEventModule = require('@testing-library/react-native/dist/fire-event');
  const actModule = require('@testing-library/react-native/dist/act');

  function callWithSyncAct(fn: () => any) {
    // Temporarily replace RNTL's act with React.act (synchronous for sync callbacks)
    const originalAct = actModule.act;
    (actModule as any).act = (cb: any) => React.act(cb);
    try {
      // fireEvent is async but the Promise resolves synchronously for sync callbacks
      // when using React.act. We call it and ignore the returned Promise.
      fn();
    } finally {
      (actModule as any).act = originalAct;
    }
  }

  const syncFireEvent: any = (element: any, eventName: string, ...args: any[]) => {
    callWithSyncAct(() => {
      fireEventModule.fireEvent(element, eventName, ...args);
    });
  };
  syncFireEvent.press = (element: any, ...args: any[]) => {
    callWithSyncAct(() => {
      fireEventModule.fireEvent.press(element, ...args);
    });
  };
  syncFireEvent.changeText = (element: any, text: string) => {
    callWithSyncAct(() => {
      fireEventModule.fireEvent.changeText(element, text);
    });
  };
  syncFireEvent.scroll = (element: any, ...args: any[]) => {
    callWithSyncAct(() => {
      fireEventModule.fireEvent.scroll(element, ...args);
    });
  };

  return {
    ...actual,
    act: React.act,
    fireEvent: syncFireEvent,
    render: syncRender,
    renderHook: syncRenderHook,
  };
});

jest.mock('react-native-tts', () => ({
  getInitStatus: jest.fn(() => Promise.resolve()),
  setDefaultLanguage: jest.fn(() => Promise.resolve()),
  setDefaultRate: jest.fn(),
  setDefaultPitch: jest.fn(),
  speak: jest.fn(() => Promise.resolve()),
  stop: jest.fn(() => Promise.resolve()),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));
