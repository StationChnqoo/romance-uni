# uni-app 专用混淆规则

# 5+ SDK
-keep class io.dcloud.** { *; }
-keep class com.dcloud.** { *; }
-keep class com.ta.** { *; }

# WebView
-keep class com.tencent.smtt.** { *; }

# 微信分享/支付
-keep class com.tencent.mm.** { *; }
-keep class com.tencent.wxop.** { *; }

# 支付宝
-keep class com.alipay.** { *; }

# 高德地图
-keep class com.amap.api.** { *; }
-keep class com.autonavi.** { *; }

# 百度地图
-keep class com.baidu.** { *; }

# 友盟
-keep class com.umeng.** { *; }

# 个推
-keep class com.igexin.** { *; }

# 小米推送
-keep class com.xiaomi.** { *; }

# 华为推送
-keep class com.huawei.** { *; }