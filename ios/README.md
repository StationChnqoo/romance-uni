# iOS 离线打包壳（uni-app）

> 从 `tianshan_cpi/Uni-tianshan-ios` 搬过来的原生壳，已按本项目改过身份信息：
>
> | 项             | 值                                                         | 来源                                                                              |
> | ------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------- |
> | Bundle Id     | `cn.xiaopacai.romance`                                  | 与 `android/app/build.gradle` 的 `applicationId` 对齐                               |
> | 产品名 / 桌面显示名   | `Romance`                                                   | 与 `android/.../values/strings.xml` 的 `app_name`、`src/manifest.json` 的 `name` 对齐 |
> | uni-app appid | `__UNI__0D72BA3`                                          | `src/manifest.json`                                                             |
> | 版本            | `1.0.0`（MARKETING_VERSION）/ `49`（CURRENT_PROJECT_VERSION） | manifest 的 `versionName` / `versionCode`                                        |

## 工程结构

```
ios/
├── Uni.xcodeproj/          Xcode 工程
├── Uni/                    主 target 源码 + Info.plist + control.xml
│   └── Pandora/apps/       ⬅ uni 前端资源产物放这里（已 gitignore）
├── HBuilder/               entitlements / AppIcon
├── Profiles/               证书与描述文件（已 gitignore，本地自备）
└── SDK/                    ⬅ 原生 SDK，不入库，手动放（见下）
```

## 跑起来之前要做的事

1. **放 SDK**：只用 `SDK 5.06.2026033105`（原生 SDK 整包 3.4GB）里工程真正引用的那一小部分，  
   **已放进 `ios/SDK/`，共 212MB，不入库（`.gitignore` 已忽略 `SDK/`）**。构成如下：


   | 目录                                                        | 内容                                                                                                                                                                                                                           | 体积     |
   | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
   | `SDK/Libs/`                                               | `project.pbxproj` 引用的库/framework（libPDRCore、libWeex、各 liblibXxx、KSCrash、DCUniRecord、storage，以及视频播放所需的 `liblibVideo.a` + `IJKMediaFrameworkWithSSL.framework` + `DCUniVideoPublic.framework`）                                 | ~420MB |
   | `SDK/inc/`                                                | 头文件（`HEADER_SEARCH_PATHS` 取 `$(SRCROOT)/SDK/inc/**`）                                                                                                                                                                         | 2.8MB  |
   | `SDK/Bundles/`                                            | 仅 9 个被引用的资源：`PandoraApi.bundle` / `DCPGVideo.bundle` / `DCTZImagePickerController.bundle` / `uni-jsframework.js` / `uni-jsframework-vue3.js` / `weex-polyfill.js` / `weexUniJs.js` / `__uniappes6.js` / `unincomponents.ttf` | 2.8MB  |
   | `SDK/UTS/`、 `SDK/PrivacyInfo.xcprivacy`、`SDK/control.xml` | UTS 插件支持、隐私清单、SDK 版本标识                                                                                                                                                                                                       | 32KB   |
   未拷贝的是 225 个三方广告/地图/推送库（穿山甲 369M、广点通 306M、高德/百度地图等），  
   本项目不引用，需要时再从 `/Users/mac/SDK iOS 5.06.2026033105/SDK/Libs/` 按同名补拷即可。

   ⚠️ **视频播放（VideoPlayer 模块）依赖**：`manifest.json` 已开 `"VideoPlayer": {}`，但原生 runtime 不在这"基础 39 库"里——  
   必须额外拷 `liblibVideo.a`（VideoPlayer 模块本体，`<video>` 原生实现）+ `IJKMediaFrameworkWithSSL.framework`（ijkplayer，liblibVideo.a 链接依赖）
   - `DCUniVideoPublic.framework`（弹幕/进度 HUD，liblibVideo.a 链接依赖）。三者均为**静态**库，只进 "Link Binary With Libraries"，**不用** Embed Frameworks。  
     缺任何一个，App 运行到 `<video>` 会报「没有视频播放的 runtime」。换 SDK 版本重拷时务必带上这三个。
   ⚠️ 若哪天换了 SDK 版本：清掉 `ios/SDK/` 重新按上表拷，别整包解压（工程没引用的库白白占几个 G）。
2. **模拟器运行（Apple Silicon）**：DCloud 这套静态库的 arm64 slice 是真机平台（`LC_VERSION_MIN_IPHONEOS`），  
   没有 arm64-simulator slice，模拟器默认编 arm64 会报 `built for 'iOS'` 链接错误。  
   已在 target 的 Debug/Release 里加了 `"EXCLUDED_ARCHS[sdk=iphonesimulator*]" = arm64;`——  
   模拟器强制走 x86_64（Rosetta 转译），**首次运行 Xcode 会提示安装 Rosetta，同意即可**。  
   真机不受影响（正常 arm64）。性能敏感的功能建议仍以真机为准。  
   ⚠️ 改 pbxproj 的教训：OpenStep plist 里含 `=` / `*` 的键**必须整体加引号**，裸写会把工程改坏。
3. **换签名**：现在的签名相关配置已被清空待填（原来挂在 tianshan 团队名下）：  
   `CODE_SIGN_IDENTITY`、`DEVELOPMENT_TEAM`、`PROVISIONING_PROFILE(_SPECIFIER)`  
   均为空，`CODE_SIGN_STYLE = Manual`。在 Xcode → Signing & Capabilities 里选自己的团队与描述文件即可。  
   `Profiles/` 里现存的是 tianshan 的 cer / mobileprovision，直接用会签不过，建议替换或删除。
4. **放前端资源**：本地打资源后得到 `__UNI__0D72BA3/www`，整个 `__UNI__0D72BA3` 目录拷到  
   `Uni/Pandora/apps/` 下；`Uni/control.xml` 里的 appid 必须和它一致（已是 `__UNI__0D72BA3`）。

## 待清理

- `Uni.xcodeproj/project.pbxproj.bak-camera2`：随壳一起搬过来的旧 pbxproj 备份，内容还是 tianshan 的配置，  
  不影响编译，确认无用后可删。
- `Uni/Uni-Info.plist` 里 `CFBundleURLSchemes` 还留着 tianshan 的微信 / QQ / 微博 scheme  
  （`wxbe7f03382358338d` 等），用到三方登录 / 分享时要换成自己的。
