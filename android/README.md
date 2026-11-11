## 证书

### 生成证书

使用keytool -genkey命令生成证书：

```bash
keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore
```

### 查看证书

```bash
keytool -list -v -keystore test.keystore
```

## 启动屏

配置应用图标和启动界面，图标名称

- icon.png -> 应用的图标。

- push.png -> 推送消息的图标。

- splash.png -> 应用启动页的图标。

将`icon.png`、`push.png`、`splash.png`放置到`drawable`

---

## 已修复：图片预览 / 相册选择一点就闪退（Glide 的 support ↔ androidx 错配）

> **状态：已修复（2026-10-03）。**
> 修复 = `android/gradle.properties` 加 `android.enableJetifier=true`（提交 `97da883`）。
> 图片预览与相册选择**是同一个根因、由同一处修复一并解决**——改好后图片预览正常，
> 相册选择也随之正常，无需再动其它地方。

### 一、现象

本地离线打包（AGP 8.5 / compileSdk 35，`media-release.aar` + `weex_videoplayer-release.aar` 已补齐、
权限与 activity 已补全）后，以下两条路径**一点就闪退，进程直接消失**（无 ANR、无弹窗）：

1. **图片预览** —— 点开大图预览时；
2. **相册选择** —— 调起相册、相册宫格出图时。

### 二、崩溃栈

**① 图片预览 → `NoSuchMethodError`**

```
java.lang.NoSuchMethodError: No static method with(Landroidx/fragment/app/FragmentActivity;)
    Lcom/bumptech/glide/RequestManager; in class Lcom/bumptech/glide/Glide;
    at io.dcloud.feature.nativeObj.photoview.PhotoActivity$2.displayImage(...)
    at io.dcloud.feature.nativeObj.BannerLayout$LoopPagerAdapter.instantiateItem(...)
```

**② 相册选择 → `NoClassDefFoundError`**

```
java.lang.NoClassDefFoundError: Failed resolution of: Landroid/support/v4/util/ArrayMap;
    at com.bumptech.glide.GlideBuilder.<init>(GlideBuilder.java:40)
    at com.bumptech.glide.Glide.with(Glide.java:716)
    at com.dmcbig.mediapicker.adapter.MediaGridAdapter.onBindViewHolder(...)
Caused by: java.lang.ClassNotFoundException: Didn't find class "android.support.v4.util.ArrayMap"
```

### 三、根因

**DCloud 的 aar 是按 AndroidX 编译的，而项目引的 `glide:4.9.0` 是编译在旧 support 库上的，
两边方法签名对不上。**

- `lib.5plus.base-release.aar` 里的 `PhotoActivity` / `BannerLayout`（照片预览），
  以及同一个 aar 内的 `com.dmcbig.mediapicker`（相册）都调 `Glide.with(FragmentActivity)`，
  传进去的是 **`androidx.fragment.app.FragmentActivity`**；
- 而 `com.github.bumptech.glide:glide:4.9.0` 的 `Glide.class` 里，`with` 重载只有旧 support 版：

  ```
  with(android.app.Activity)                     -> RequestManager
  with(android.app.Fragment)                     -> RequestManager
  with(android.content.Context)                  -> RequestManager
  with(android.support.v4.app.Fragment)          -> RequestManager   ← 旧 support
  with(android.support.v4.app.FragmentActivity)  -> RequestManager   ← 旧 support
  with(android.view.View)                        -> RequestManager
  ```

  **没有 `with(androidx.fragment.app.FragmentActivity)`** → 图片预览 `NoSuchMethodError`。
- 且 `GlideBuilder` 内部引用 `android.support.v4.util.ArrayMap`，而 `app/build.gradle` 里有
  `configurations.all { exclude group: 'com.android.support' }`，旧 support 类压根不在包里
  → 相册 `NoClassDefFoundError`。

一句话：**DCloud 用的是「被 Jetifier 改写过的 Glide」，项目用的是「原始 Glide」。**

### 四、修复：开启 Jetifier

官方参考工程 `Android-SDK/HBuilder-HelloUniApp/gradle.properties` 里有两条：

```properties
android.useAndroidX=true
android.enableJetifier=true
```

本项目**只抄了第一条，漏了 `android.enableJetifier=true`** —— 已补上（`android/gradle.properties`）。
Jetifier 会把依赖字节码里的 `android.support.*` 引用整体改写为 `androidx.*`，
签名对齐后上面两个崩溃点同时命中。

### 五、验证（修复前 → 修复后，均为 dex 实测）

**① 直接 dump 新包 `Lcom/bumptech/glide/Glide;` 类块的 `with` 重载签名：**

```
修复前：with(android.support.v4.app.Fragment)          -> RequestManager
        with(android.support.v4.app.FragmentActivity)  -> RequestManager   ← 旧 support

修复后：with(androidx.fragment.app.Fragment)           -> RequestManager   ← 原预览崩溃点已命中
        with(androidx.fragment.app.FragmentActivity)   -> RequestManager   ← 原预览崩溃点已命中
```

**② 相册崩溃点的那两个类：**

| 类 | 修复前 | 修复后 |
|---|---|---|
| `android/support/v4/util/ArrayMap` | 有引用（类不在包里 → 必定崩） | **0 处** |
| `androidx/collection/ArrayMap` | — | **28 处** |

**③ dex 里 `Landroid/support/` 引用总数：51 → 2。**
残留那 2 处是 `INotificationSideChannel` / `IResultReceiver` / `RemoteActionCompatParcelizer`
这类 aidl / Parcelizer 辅助类，与 Glide、相册、预览都无关。

**④ 实机**：重编 → x86 模拟器装机 → **图片预览、相册选择两条路径均不再闪退**（已复验）。

> ⚠️ **踩过的坑**：`app/build/intermediates/apk/debug/app-x86-debug.apk` 是**旧包**，
> 只有 `app/build/outputs/apk/debug/app-x86-debug.apk` 才是本次构建的新包。
> 验证 Jetifier 是否生效时若 dump 到 intermediates 那个，会得到「support 引用一处没改」
> 的假象，从而误判「Jetifier 没跑」。**看产物前先 `ls -la` 对 mtime。**

### 六、复现与抓栈方法

```bash
ADB=~/Library/Android/sdk/platform-tools/adb
$ADB logcat -c
$ADB shell am start -n cn.xiaopacai.romance/io.dcloud.PandoraEntry
# 手动点到闪退的那一步，然后：
$ADB logcat -d | grep -A45 "FATAL EXCEPTION"
```

### 七、备选方案（未采用，留档）

若日后依赖升级导致 Jetifier 失效，可直接把 Glide 换成 AndroidX 原生版（不需要 Jetifier）：

```gradle
implementation 'com.github.bumptech.glide:glide:4.16.0'
annotationProcessor 'com.github.bumptech.glide:compiler:4.16.0'
```

4.16.0 的 `Glide.with(androidx.fragment.app.FragmentActivity)` 原生存在、
`GlideBuilder` 用的是 `androidx.collection.ArrayMap`，两个崩溃点都直接消掉。
注意两处版本要一起改（`app/build.gradle` 里 `glide` 与 `glide:compiler` 各出现两次）。
风险是 DCloud 侧若用到 4.9 → 4.16 之间被移除的 API，需实测。
