window.__ModuleLoader__.load({
  id: 'dsh-deepseek-web',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'dsh-deepseek-web';
    const TARGET = 'https://chat.deepseek.com/';
    const WORKSPACE_KEY = 'plugin:dsh-deepseek-web';
    const PANEL_ID = 'deepseek-web';
    const SNAPSHOT_KEY = 'dsh-deepseek-web:snapshot:v1';

    const ZH = {
      'panel.label': 'DeepSeek 网页版',
      'panel.title': 'DeepSeek 网页版',
      'panel.subtitle': 'chat.deepseek.com',
      'panel.reload': '刷新',
      'panel.openExternal': '在浏览器中打开',
      'panel.retry': '重试',
      'status.starting': '正在连接',
      'status.loading': '加载中',
      'status.restoring': '正在恢复登录',
      'status.ready': '已就绪',
      'status.error': '加载失败',
      'status.unsupported': '仅桌面版',
      'failed.title': '网页没有加载出来',
      'failed.hint': '可以重试，或者直接在系统浏览器里打开。',
      'unsupported.title': '这里嵌不了网页',
      'unsupported.body': 'DSH 网页版拿不到桌面端的浏览器能力。请在 DeepSeek Harness 桌面应用里打开这个面板，或者直接在新标签页里访问 chat.deepseek.com。',
      'unsupported.hint': '桌面版里首次打开可能需要登录 DeepSeek 账号，登录状态会保留。',
    };

    const EN = {
      'panel.label': 'DeepSeek Web',
      'panel.title': 'DeepSeek Web',
      'panel.subtitle': 'chat.deepseek.com',
      'panel.reload': 'Reload',
      'panel.openExternal': 'Open in browser',
      'panel.retry': 'Retry',
      'status.starting': 'Connecting',
      'status.loading': 'Loading',
      'status.restoring': 'Restoring sign-in',
      'status.ready': 'Ready',
      'status.error': 'Failed',
      'status.unsupported': 'Desktop only',
      'failed.title': 'The page did not load',
      'failed.hint': 'Retry here, or open it in your system browser instead.',
      'unsupported.title': 'Cannot embed the page here',
      'unsupported.body': 'The DSH web page has no desktop browser bridge. Open this panel in the DeepSeek Harness desktop app, or visit chat.deepseek.com in a new tab.',
      'unsupported.hint': 'The desktop app may ask you to sign in to DeepSeek once; the session is kept for later visits.',
    };

    const CSS = [
      '.dsw-root{position:relative;display:flex;flex:1 1 auto;flex-direction:column;height:100%;min-height:0;overflow:hidden;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:var(--dsw-font-xs-13)}',
      '.dsw-toolbar{display:flex;flex:none;align-items:center;gap:8px;height:48px;padding:0 10px;border-bottom:.5px solid var(--dsw-alias-border-l1)}',
      '.dsw-brand{display:flex;flex-direction:column;min-width:0;line-height:1.2}',
      '.dsw-title{overflow:hidden;font-weight:600;white-space:nowrap;text-overflow:ellipsis}',
      '.dsw-sub{font:var(--dsw-font-xxxs-11);color:var(--dsw-alias-label-secondary)}',
      '.dsw-status{display:inline-flex;flex:none;align-items:center;gap:5px;margin-left:6px;font:var(--dsw-font-xxxs-11);color:var(--dsw-alias-label-secondary)}',
      '.dsw-dot{width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-state-idle-primary)}',
      '.dsw-status[data-phase=loading] .dsw-dot,.dsw-status[data-phase=starting] .dsw-dot,.dsw-status[data-phase=restoring] .dsw-dot{background:var(--dsw-alias-state-warn-primary)}',
      '.dsw-status[data-phase=ready] .dsw-dot{background:var(--dsw-alias-state-success-primary)}',
      '.dsw-status[data-phase=error] .dsw-dot{background:var(--dsw-alias-state-error-primary)}',
      '.dsw-spacer{flex:auto}',
      '.dsw-btn{display:inline-flex;flex:none;align-items:center;justify-content:center;width:28px;height:28px;padding:0;border:0;border-radius:var(--dsw-radius-sm,6px);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}',
      '.dsw-btn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}',
      '.dsw-body{position:relative;display:flex;flex:auto;min-width:0;min-height:0}',
      '.dsw-host{display:flex;flex:auto;min-width:0;min-height:0}',
      '.dsw-host[hidden]{display:none}',
      '.dsw-host[data-veiled=true] .dsw-webview{visibility:hidden}',
      '.dsw-webview{display:flex;flex:auto;width:100%;height:100%;min-width:0;min-height:0;border:0;background:var(--dsw-alias-bg-base);-webkit-app-region:no-drag}',
      '.dsw-veil{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary);font:var(--dsw-font-xs-13)}',
      '.dsw-spin{width:16px;height:16px;border:1.5px solid var(--dsw-alias-border-l2);border-top-color:var(--dsw-alias-brand-primary);border-radius:50%;animation:dsw-spin .8s linear infinite}',
      '@keyframes dsw-spin{to{transform:rotate(360deg)}}',
      '.dsw-note{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;max-width:460px;margin:auto;padding:32px;text-align:center}',
      '.dsw-note h3{margin:0;font:var(--dsw-font-xs-13);font-weight:600}',
      '.dsw-note p{margin:0;font:var(--dsw-font-xs-13);line-height:1.6;color:var(--dsw-alias-label-secondary)}',
      '.dsw-note p.dsw-error{color:var(--dsw-alias-state-error-primary);overflow-wrap:anywhere}',
      '.dsw-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:6px}',
      '.dsw-action{height:30px;padding:0 14px;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-sm,6px);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:var(--dsw-font-xs-13);cursor:pointer}',
      '.dsw-action:hover{background:var(--dsw-alias-bg-layer-2)}',
      '.dsw-action[data-primary=true]{border-color:transparent;background:var(--dsw-alias-brand-primary);color:#fff}',
    ].join('');

    function messageOf(reason) {
      if (reason === null || reason === undefined) return '';
      if (typeof reason === 'string') return reason;
      if (typeof reason.message === 'string' && reason.message !== '') return reason.message;
      return String(reason);
    }

    function isAborted(reason) {
      if (!reason) return false;
      if (reason.code === 'ERR_ABORTED' || reason.errorCode === -3) return true;
      return /ERR_ABORTED|\(-3\)/.test(messageOf(reason));
    }

    function useTranslator(ctx) {
      const [, bump] = React.useState(0);
      React.useEffect(
        () => ctx.locale.subscribe(() => bump((value) => value + 1)),
        []
      );
      const active = String(ctx.locale.getLocale().active || 'en').toLowerCase();
      const dictionary = active.indexOf('zh') === 0 ? ZH : EN;
      return (key) => (Object.prototype.hasOwnProperty.call(dictionary, key) ? dictionary[key] : key);
    }

    function icon(paths) {
      return h(
        'svg',
        {
          viewBox: '0 0 16 16',
          width: 15,
          height: 15,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
        },
        paths
      );
    }

    function reloadIcon() {
      return icon(h('path', { d: 'M13 8a5 5 0 1 1-1.6-3.7M13 2.5V5h-2.5' }));
    }

    function externalIcon() {
      return icon(h('path', { d: 'M6.5 3.5h-3v9h9v-3M9 3h4v4M13 3 7.5 8.5' }));
    }

    const READ_STORAGE_SCRIPT = [
      '(function () {',
      '  var items = {};',
      '  try {',
      '    for (var i = 0; i < localStorage.length; i += 1) {',
      '      var key = localStorage.key(i);',
      '      if (key === null) continue;',
      '      items[key] = localStorage.getItem(key) || "";',
      '    }',
      '  } catch (error) { return { error: String(error) }; }',
      '  return { items: items };',
      '})()',
    ].join('\n');

    const SIGNED_IN_SCRIPT = [
      '(function () {',
      '  try {',
      '    var token = localStorage.getItem("userToken");',
      '    if (!token) return "signed-out";',
      '    if (document.querySelector(\'input[type="password"]\')) return "signed-out";',
      '    return "signed-in";',
      '  } catch (error) { return "unknown"; }',
      '})()',
    ].join('\n');

    function writeStorageScript(items) {
      return [
        '(function (items) {',
        '  var written = 0;',
        '  try {',
        '    Object.keys(items).forEach(function (key) {',
        '      localStorage.setItem(key, items[key]);',
        '      written += 1;',
        '    });',
        '  } catch (error) { return { error: String(error), written: written }; }',
        '  return { written: written };',
        '})(',
        JSON.stringify(items),
        ')',
      ].join('');
    }

    function loadSnapshot() {
      try {
        const raw = window.localStorage.getItem(SNAPSHOT_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || parsed.version !== 1 || typeof parsed.items !== 'object') return null;
        return parsed;
      } catch (error) {
        return null;
      }
    }

    function saveSnapshot(items) {
      try {
        window.localStorage.setItem(
          SNAPSHOT_KEY,
          JSON.stringify({ version: 1, savedAt: Date.now(), items: items })
        );
      } catch (error) {
        // Quota exceeded: keep the previous snapshot rather than failing the panel.
      }
    }

    function WhaleMark(props) {
      const size = typeof props.size === 'number' ? props.size : 22;
      const parts = [
        h('rect', { key: 'bg', x: 2, y: 2, width: 44, height: 44, rx: 12, fill: '#4d6bfe' }),
      ];
      if (props.active) {
        parts.push(
          h('rect', {
            key: 'ring',
            x: 2.9,
            y: 2.9,
            width: 42.2,
            height: 42.2,
            rx: 11.3,
            fill: 'none',
            stroke: '#ffffff',
            strokeOpacity: 0.85,
            strokeWidth: 1.4,
          })
        );
      }
      parts.push(
        h('ellipse', { key: 'body', cx: 21, cy: 28, rx: 10.5, ry: 7, fill: '#ffffff' }),
        h('path', { key: 'tail', d: 'M30.5 24.5 37 20.5v11l-6.5-4z', fill: '#ffffff' }),
        h('path', {
          key: 'mouth',
          d: 'M17.5 28.6c1.1 1.6 3 2.4 5 2.4',
          fill: 'none',
          stroke: '#4d6bfe',
          strokeWidth: 1.2,
          strokeLinecap: 'round',
        }),
        h('circle', { key: 'eye', cx: 15.8, cy: 26.2, r: 1.2, fill: '#4d6bfe' }),
        h('path', {
          key: 'spout',
          d: 'M20 21.5c0-2.8 1.1-4.6 3.1-5.6M20 21.5c-1.3-1.7-3.1-2.5-5.3-2.5',
          fill: 'none',
          stroke: '#c9d8ff',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
        })
      );
      return h(
        'svg',
        {
          viewBox: '0 0 48 48',
          width: size,
          height: size,
          'aria-hidden': true,
          className: props.className,
          style: { display: 'block', flex: 'none' },
        },
        parts
      );
    }

    function SidebarEntry(props) {
      const size = typeof props.size === 'number' ? props.size : 24;
      return h(WhaleMark, { size: size, active: props.active === true });
    }

    let activeContext;

    function DeepSeekPanel() {
      const ctx = activeContext;
      const t = useTranslator(ctx);
      const hostRef = React.useRef(null);
      const viewRef = React.useRef(null);
      const [phase, setPhase] = React.useState('starting');
      const [failure, setFailure] = React.useState('');
      const [attempt, setAttempt] = React.useState(0);

      React.useEffect(() => {
        const carrier = globalThis.dshDesktop;
        const browser = carrier && carrier.protocolVersion === 1 ? carrier.browser : undefined;
        if (!browser) {
          setPhase('unsupported');
          return undefined;
        }

        const controller = new AbortController();
        const signal = controller.signal;
        const host = hostRef.current;
        let lease;
        let guest;

        const stop = (reason) => {
          if (signal.aborted) return;
          setFailure(messageOf(reason));
          setPhase('error');
        };

        let restored = false;
        let saving = false;
        let restoreGuard;
        const snapshot = loadSnapshot();
        const savedItems = snapshot && snapshot.items ? snapshot.items : null;
        const hasSnapshot = Boolean(
          savedItems && typeof savedItems.userToken === 'string' && savedItems.userToken !== ''
        );
        let veiled = hasSnapshot;

        const restore = () => {
          if (restored || !hasSnapshot || !guest) return Promise.resolve(false);
          restored = true;
          return guest
            .executeJavaScript(writeStorageScript(savedItems), false)
            .then((result) => Boolean(result && result.written > 0))
            .catch(() => false);
        };

        // The reload boots the app with the token in place, but the signed-out
        // shell can still paint before the client-side router settles. Keep the
        // veil until the guest reports an actual signed-in document.
        const liftVeilWhenReady = () => {
          let tries = 0;
          let signedOut = 0;
          const reveal = () => {
            veiled = false;
            setPhase((current) => (current === 'error' ? current : 'ready'));
          };
          const tick = () => {
            if (signal.aborted || !guest) return;
            guest
              .executeJavaScript(SIGNED_IN_SCRIPT, false)
              .then((state) => {
                if (signal.aborted) return;
                if (state === 'signed-in') {
                  reveal();
                  return;
                }
                if (state === 'signed-out') {
                  signedOut += 1;
                  if (signedOut >= 12) {
                    reveal();
                    return;
                  }
                }
                tries += 1;
                if (tries >= 48) {
                  reveal();
                  return;
                }
                setTimeout(tick, 250);
              })
              .catch(() => {
                if (signal.aborted) return;
                tries += 1;
                if (tries >= 48) {
                  reveal();
                  return;
                }
                setTimeout(tick, 250);
              });
          };
          setTimeout(tick, 200);
        };

        const persist = () => {
          if (signal.aborted || !guest || saving) return;
          saving = true;
          guest
            .executeJavaScript(READ_STORAGE_SCRIPT, false)
            .then((result) => {
              const items = result && result.items;
              if (!items || typeof items.userToken !== 'string' || items.userToken === '') return;
              saveSnapshot(items);
            })
            .catch(() => {})
            .finally(() => {
              saving = false;
            });
        };

        const persistTimer = setInterval(persist, 20000);
        signal.addEventListener('abort', () => clearInterval(persistTimer), { once: true });

        (async () => {
          try {
            const reservation = await browser.acquire(WORKSPACE_KEY);
            if (signal.aborted) {
              browser.release(reservation.lease).catch(() => {});
              return;
            }
            lease = reservation.lease;
            guest = document.createElement('webview');
            guest.className = 'dsw-webview';
            guest.setAttribute('name', reservation.lease);
            guest.setAttribute('partition', reservation.partition);
            guest.setAttribute('allowpopups', '');
            guest.setAttribute('data-sidebar-browser-frame', 'webview');
            guest.setAttribute('src', 'about:blank#' + reservation.lease);
            viewRef.current = guest;

            const unsubscribe = browser.onOpenRequested(reservation.lease, (url) => {
              window.open(url, '_blank', 'noopener');
            });
            signal.addEventListener('abort', unsubscribe, { once: true });

            let started = false;
            guest.addEventListener(
              'dom-ready',
              () => {
                if (signal.aborted) return;
                if (!started) {
                  started = true;
                  setPhase(hasSnapshot ? 'restoring' : 'loading');
                  guest.loadURL(TARGET).catch((reason) => {
                    if (signal.aborted) return;
                    // Chromium aborts the pending about:blank navigation when the
                    // real one starts; the real page usually keeps loading.
                    if (isAborted(reason)) return;
                    stop(reason);
                  });
                  if (hasSnapshot) {
                    restoreGuard = setTimeout(() => {
                      if (signal.aborted) return;
                      veiled = false;
                      setPhase((current) => (current === 'restoring' ? 'ready' : current));
                    }, 12000);
                  }
                  return;
                }
                // The real document is ready: write the saved session in before
                // the page can paint its signed-out surface, then reload once so
                // the app boots with the token already in place.
                if (!hasSnapshot || restored) return;
                restore().then((applied) => {
                  if (signal.aborted) return;
                  if (!applied) {
                    veiled = false;
                    setPhase((current) => (current === 'error' ? current : 'ready'));
                    return;
                  }
                  try {
                    guest.reload();
                    liftVeilWhenReady();
                  } catch (error) {
                    veiled = false;
                    setPhase((current) => (current === 'error' ? current : 'ready'));
                  }
                });
              },
              { signal }
            );
            guest.addEventListener(
              'did-start-loading',
              () => {
                if (signal.aborted) return;
                setPhase((current) =>
                  current === 'error' || current === 'restoring' ? current : 'loading'
                );
              },
              { signal }
            );
            guest.addEventListener(
              'did-stop-loading',
              () => {
                if (signal.aborted) return;
                if (!veiled) {
                  setPhase((current) => (current === 'error' ? current : 'ready'));
                }
                setTimeout(persist, 1500);
              },
              { signal }
            );
            guest.addEventListener(
              'did-fail-load',
              (event) => {
                if (!event.isMainFrame || event.errorCode === -3) return;
                stop(event.errorDescription || 'ERR ' + event.errorCode);
              },
              { signal }
            );

            guest.addEventListener(
              'did-finish-load',
              () => {
                if (signal.aborted) return;
                if (!veiled) {
                  setPhase((current) => (current === 'error' ? current : 'ready'));
                }
              },
              { signal }
            );

            guest.addEventListener(
              'did-navigate',
              () => {
                if (signal.aborted) return;
                setTimeout(persist, 1200);
              },
              { signal }
            );

            if (host) host.appendChild(guest);
            else stop('panel container is not mounted');
          } catch (reason) {
            stop(reason);
          }
        })();

        return () => {
          controller.abort();
          clearTimeout(restoreGuard);
          const current = viewRef.current;
          viewRef.current = null;
          if (current && current.parentNode) current.parentNode.removeChild(current);
          if (lease) browser.release(lease).catch(() => {});
        };
      }, [attempt]);

      const openExternal = () => {
        window.open(TARGET, '_blank', 'noopener');
      };

      const reload = () => {
        if (phase === 'restoring') return;
        const current = viewRef.current;
        if (!current || phase === 'error' || phase === 'unsupported') {
          setFailure('');
          setPhase('starting');
          setAttempt((value) => value + 1);
          return;
        }
        try {
          current.reload();
          setPhase('loading');
        } catch (reason) {
          setFailure(messageOf(reason));
          setPhase('error');
        }
      };

      const buttons = h(
        'div',
        { className: 'dsw-actions' },
        h(
          'button',
          { type: 'button', className: 'dsw-action', 'data-primary': 'true', onClick: reload },
          t('panel.retry')
        ),
        h('button', { type: 'button', className: 'dsw-action', onClick: openExternal }, t('panel.openExternal'))
      );

      let body;
      if (phase === 'unsupported') {
        body = h(
          'div',
          { className: 'dsw-note' },
          h('h3', null, t('unsupported.title')),
          h('p', null, t('unsupported.body')),
          h('p', null, t('unsupported.hint')),
          h(
            'div',
            { className: 'dsw-actions' },
            h(
              'button',
              { type: 'button', className: 'dsw-action', 'data-primary': 'true', onClick: openExternal },
              t('panel.openExternal')
            )
          )
        );
      } else {
        body = h(
          'div',
          { className: 'dsw-body' },
          h('div', {
            className: 'dsw-host',
            ref: hostRef,
            hidden: phase === 'error',
            'data-veiled': phase === 'restoring',
          }),
          phase === 'restoring'
            ? h(
                'div',
                { className: 'dsw-veil' },
                h(WhaleMark, { size: 34 }),
                h('div', { className: 'dsw-spin' }),
                h('span', null, t('status.restoring'))
              )
            : null,
          phase === 'error'
            ? h(
                'div',
                { className: 'dsw-note' },
                h('h3', null, t('failed.title')),
                failure ? h('p', { className: 'dsw-error' }, failure) : null,
                h('p', null, t('failed.hint')),
                buttons
              )
            : null
        );
      }

      return h(
        'div',
        { className: 'dsw-root' },
        h(
          'div',
          { className: 'dsw-toolbar' },
          h(WhaleMark, { size: 26 }),
          h(
            'div',
            { className: 'dsw-brand' },
            h('span', { className: 'dsw-title' }, t('panel.title')),
            h('span', { className: 'dsw-sub' }, t('panel.subtitle'))
          ),
          h('span', { className: 'dsw-status', 'data-phase': phase }, h('i', { className: 'dsw-dot' }), t('status.' + phase)),
          h('span', { className: 'dsw-spacer' }),
          h(
            'button',
            {
              type: 'button',
              className: 'dsw-btn',
              title: t('panel.reload'),
              'aria-label': t('panel.reload'),
              disabled: phase === 'restoring',
              onClick: reload,
            },
            reloadIcon()
          ),
          h(
            'button',
            {
              type: 'button',
              className: 'dsw-btn',
              title: t('panel.openExternal'),
              'aria-label': t('panel.openExternal'),
              onClick: openExternal,
            },
            externalIcon()
          )
        ),
        body
      );
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        activeContext = ctx;

        ctx.effect(() => ctx.locale.register(NS, 'zh', ZH), 'dsh-deepseek-web.locale.zh');
        ctx.effect(() => ctx.locale.register(NS, 'zh-CN', ZH), 'dsh-deepseek-web.locale.zh-cn');
        ctx.effect(() => ctx.locale.register(NS, 'en', EN), 'dsh-deepseek-web.locale.en');

        ctx.effect(() => {
          const style = document.createElement('style');
          style.dataset.dshPlugin = NS;
          style.textContent = CSS;
          document.head.appendChild(style);
          return () => style.remove();
        }, 'dsh-deepseek-web.styles');

        const t = ctx.locale.bind(NS);

        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            {
              name: 'sidebar.panellist',
              id: PANEL_ID,
              order: 2,
              label: () => t('panel.label'),
              locale: NS,
            },
            SidebarEntry
          )
        );

        ctx.slots.inject('main', () =>
          ctx.slots.register(
            {
              name: 'main',
              key: PANEL_ID,
              locale: NS,
            },
            DeepSeekPanel
          )
        );
      },
    };
  },
});
