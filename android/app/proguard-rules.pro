# ========== uni-app 核心保持规则 ==========
-keep class io.dcloud.** { *; }
-keep class com.dcloud.** { *; }
-keep class org.apache.** { *; }
-keep class com.alibaba.** { *; }
-keep class com.taobao.** { *; }
-keep class com.uc.** { *; }
-keep class com.nineoldandroids.** { *; }

# ========== fastjson 相关保持规则 ==========
-keep class com.alibaba.fastjson.** { *; }
-keep class * implements com.alibaba.fastjson.serializer.ObjectSerializer { *; }
-keep class * implements com.alibaba.fastjson.parser.deserializer.ObjectDeserializer { *; }

# fastjson 对 Guava、AWT、JodaTime 等库的依赖
-dontwarn com.google.common.**
-dontwarn java.awt.**
-dontwarn javax.money.**
-dontwarn org.javamoney.**
-dontwarn org.joda.time.**
-dontwarn springfox.documentation.**

# 特殊保持规则
-keep class com.getkeepsafe.relinker.ReLinker { *; }
-keep class com.google.common.collect.** { *; }
-keep class org.joda.time.** { *; }

# ========== WebView 和 JS 引擎 ==========
-keep class com.eclipsesource.v8.** { *; }
-keep class com.tencent.smtt.** { *; }
-keep class org.chromium.** { *; }

# ========== 资源文件 ==========
-keepclassmembers class **.R$* {
    public static <fields>;
}

# ========== 序列化/反序列化 ==========
-keepattributes Signature
-keepattributes *Annotation*
-keepattributes EnclosingMethod
-keepattributes InnerClasses
-keep class * extends java.util.ListResourceBundle {
    protected Object[][] getContents();
}

# ========== 反射相关 ==========
-keepclasseswithmembers class * {
    public <init>(android.content.Context, android.util.AttributeSet);
}
-keepclasseswithmembers class * {
    public <init>(android.content.Context, android.util.AttributeSet, int);
}

# ========== Javax WS 相关（警告中提到的） ==========
-dontwarn javax.ws.rs.**
-keep class javax.ws.rs.** { *; }

# ========== Gif 库相关 ==========
-keep class pl.droidsonroids.gif.** { *; }
-dontwarn pl.droidsonroids.gif.**

# ========== 网络相关 ==========
-keep class okhttp3.** { *; }
-keep class okio.** { *; }
-keep class retrofit2.** { *; }

# ========== 其他 uni-app 可能用到的库 ==========
-keep class com.facebook.** { *; }
-keep class com.google.android.gms.** { *; }
-keep class com.google.zxing.** { *; }
-keep class com.amap.api.** { *; }
-keep class com.baidu.** { *; }
-keep class com.tencent.** { *; }
-keep class com.qq.** { *; }
-keep class com.sina.** { *; }
-keep class com.alipay.** { *; }
-keep class com.wechat.** { *; }

# ========== 保留 Native 方法 ==========
-keepclasseswithmembernames class * {
    native <methods>;
}

# ========== 保留 Parcelable 序列化 ==========
-keep class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}

# ========== 保留枚举 ==========
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# ========== 保留自定义 View ==========
-keep public class * extends android.view.View {
    public <init>(android.content.Context);
    public <init>(android.content.Context, android.util.AttributeSet);
    public <init>(android.content.Context, android.util.AttributeSet, int);
    public void set*(...);
}

# Please add these rules to your existing keep rules in order to suppress warnings.
# This is generated automatically by the Android Gradle plugin.
-dontwarn com.google.android.material.appbar.AppBarLayout$OnOffsetChangedListener
-dontwarn com.google.android.material.appbar.AppBarLayout
-dontwarn io.dcloud.feature.audio.mp3.SimpleLame
-dontwarn javax.servlet.ServletOutputStream
-dontwarn javax.servlet.http.HttpServletRequest
-dontwarn javax.servlet.http.HttpServletResponse
-dontwarn org.glassfish.jersey.CommonProperties
-dontwarn org.glassfish.jersey.internal.spi.AutoDiscoverable
-dontwarn org.glassfish.jersey.internal.util.PropertiesHelper
-dontwarn org.springframework.core.MethodParameter
-dontwarn org.springframework.core.ResolvableType
-dontwarn org.springframework.core.annotation.Order
-dontwarn org.springframework.data.redis.serializer.RedisSerializer
-dontwarn org.springframework.data.redis.serializer.SerializationException
-dontwarn org.springframework.http.HttpHeaders
-dontwarn org.springframework.http.HttpInputMessage
-dontwarn org.springframework.http.HttpOutputMessage
-dontwarn org.springframework.http.MediaType
-dontwarn org.springframework.http.converter.AbstractHttpMessageConverter
-dontwarn org.springframework.http.converter.GenericHttpMessageConverter
-dontwarn org.springframework.http.converter.HttpMessageNotReadableException
-dontwarn org.springframework.http.converter.HttpMessageNotWritableException
-dontwarn org.springframework.http.server.ServerHttpRequest
-dontwarn org.springframework.http.server.ServerHttpResponse
-dontwarn org.springframework.http.server.ServletServerHttpRequest
-dontwarn org.springframework.messaging.Message
-dontwarn org.springframework.messaging.MessageHeaders
-dontwarn org.springframework.messaging.converter.AbstractMessageConverter
-dontwarn org.springframework.util.Assert
-dontwarn org.springframework.util.CollectionUtils
-dontwarn org.springframework.util.MimeType
-dontwarn org.springframework.util.ObjectUtils
-dontwarn org.springframework.util.StringUtils
-dontwarn org.springframework.validation.BindingResult
-dontwarn org.springframework.web.bind.annotation.ControllerAdvice
-dontwarn org.springframework.web.bind.annotation.ResponseBody
-dontwarn org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice
-dontwarn org.springframework.web.servlet.view.AbstractView
-dontwarn org.springframework.web.socket.sockjs.frame.AbstractSockJsMessageCodec
-dontwarn retrofit2.Converter$Factory
-dontwarn retrofit2.Converter
-dontwarn retrofit2.Retrofit

# ========== VideoPlayer 模块（media-release.aar / weex_videoplayer-release.aar）==========
# 播放器内核走反射调用，不 keep 的话 release 包一播放视频就崩
-keep class simijkplayer.** { public *; }
-keep class tv.danmaku.ijk.media.** { *; }