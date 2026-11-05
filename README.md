# dsh-deepseek-web

给 [DeepSeek Harness](https://github.com/deepseek-ai)（DSH）桌面端加一个 **DeepSeek 网页版** 入口：左侧栏多一个鲸鱼图标，点开就能在中部面板里直接使用 `https://chat.deepseek.com/` 的免费网页对话，不用切浏览器。

> 非官方插件，与 DeepSeek 官方无关。

## 功能

- **左侧栏入口**：DeepSeek 蓝底鲸鱼图标，放在「插件市场」之后。
- **内嵌面板**：顶部工具条（刷新 / 在浏览器中打开）+ 内嵌网页。
- **外链收口**：网页里 `target="_blank"` 的链接交给系统默认浏览器，不会在面板里乱跳。
- **登录态记忆**：登录一次后自动打快照，重启 DSH 也能直接回到对话页，不用重新登录。
- **桌面端专用**：浏览器标签页里打开的 DSH 网页版没有桌面桥，面板会显示说明和一个外链按钮，不会假装能用。

## 安装

要求：**DeepSeek Harness 桌面端**（Electron）。网页版 DSH 没有 `dshDesktop` 桥，装上也只会看到提示。

1. 把本仓库放到本机任意目录（路径不要带奇怪的引号）。
2. 在 DSH 里通过插件管理安装这个目录（bundle 安装），或直接调用：

   ```
   plugin_manager install_bundle target=<本仓库绝对路径>
   ```

3. 安装完成后重启 DSH（客户端插件需要重启才加载），左侧栏就会出现 **DeepSeek 网页版**。

## 使用

1. 点左侧栏鲸鱼图标。
2. 首次打开在面板里登录 DeepSeek 账号。登录成功后插件会自动把登录信息打快照，之后重启 DSH 打开面板会自动恢复，不用再登录。
3. 想刷新页面用工具条上的刷新按钮；想换到系统浏览器用旁边的外链按钮。

## 工作原理

- 面板通过 `window.dshDesktop.browser.acquire(workspaceKey)` 向主进程申请一个 webview 租约，拿到 `{ lease, partition }`。
- 然后创建 `<webview name=lease partition=partition src="about:blank#lease">`；主进程的 `will-attach-webview` 校验租约、分区和来源后才会放行，并强制 `nodeIntegration:false`、`contextIsolation:true`、`sandbox:true`。
- `chat.deepseek.com` 的 CSP 里有 `frame-ancestors 'none'`，普通 `<iframe>` 嵌不进来；但 `<webview>` 是独立的 renderer guest，不受 `frame-ancestors` 约束，所以能正常显示。
- 插件不注入脚本、不改 User-Agent、不拦截或伪造请求，页面里就是一次普通的人工浏览。

## 登录态记忆

DSH 分配给侧栏 webview 的 session 分区是“进程级”的（分区名不带 `persist:` 前缀，且每次启动重新生成），所以进程一退，cookie 和 localStorage 一起没了，重启必然要重新登录。

这个插件用一个折中的办法绕开：登录成功后，把 webview 里 `localStorage` 的键值快照到 DSH 自己页面的 `localStorage`（键名 `dsh-deepseek-web:snapshot:v1`）；下次启动时先把快照写回 webview，再 reload 一次。`chat.deepseek.com` 的登录凭证（`userToken`）就放在 localStorage 里，所以这一步就够恢复登录。

快照是**明文**存在本机的，和浏览器保存登录状态同一个级别；共用电脑时请注意。如果站点以后改了存储方式导致恢复失败，重新登录一次就会生成新快照。

## 自定义

想换成别的站点（比如别的 AI 网页端），改 `client.js` 顶部的：

```js
const TARGET = 'https://chat.deepseek.com/';
```

同时建议把 `PANEL_ID`、`NS`、`WORKSPACE_KEY` 和 `locale/*.json` 里的文案一起改掉。

## 已知限制

- 只支持 DSH 桌面端；网页版没有桌面桥。
- 登录快照是明文保存在本机 DSH 的 `localStorage` 里，和浏览器保存登录状态同级；共用电脑时注意。
- 页面由远端站点提供，它自己改版、改 CSP、改风控都可能影响内嵌表现；真出问题时用工具条上的「在浏览器中打开」兜底。

## License

[MIT](./LICENSE)
