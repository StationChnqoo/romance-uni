/**
 * 同步 uni-app 的 appid 到 Android 离线打包壳（assets）。
 *
 * 背景：纯离线打包时，DCloud 引擎在启动时读 assets/data/dcloud_control.xml 里的
 * <app appid="...">，再用它去 assets/apps/<appid>/www/manifest.json 找 "id" 字段比对，
 * 三者不一致（或 appid 是 __UNI__C 这类占位符）就报「未配置 appkey 或配置错误」。
 * 该校验是**本地静态**的，不联网、不依赖 DCloud 服务器。
 *
 * 本脚本把三处统一成 src/manifest.json 里的 appid，build 后跑一次即可。
 *
 * 用法：
 *   node scripts/sync-appid.js
 * 或在 build 脚本里 `uni build -p app` 之后调用。
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')

// 1. 读 src/manifest.json 里的 appid（唯一事实来源）
const srcManifestPath = path.join(ROOT, 'src/manifest.json')
const srcManifest = JSON.parse(fs.readFileSync(srcManifestPath, 'utf8'))
const appid = srcManifest.appid

if (!appid || !/^__UNI__[A-Za-z0-9]{1,}$/.test(appid)) {
  console.error(`[sync-appid] 非法 appid："${appid}"（src/manifest.json），应为 __UNI__ 开头`)
  process.exit(1)
}

console.log(`[sync-appid] 目标 appid = ${appid}`)

// 2. 同步 assets/data/dcloud_control.xml
const controlPath = path.join(ROOT, 'android/app/src/main/assets/data/dcloud_control.xml')
let control = fs.readFileSync(controlPath, 'utf8')
control = control.replace(/<app\s+appid="[^"]*"/, `<app appid="${appid}"`)
fs.writeFileSync(controlPath, control)
console.log(`[sync-appid] 已同步 dcloud_control.xml`)

// 3. 同步 assets/apps/<appid>/ 目录名（旧的目录名可能是占位符或别的 appid）
const appsDir = path.join(ROOT, 'android/app/src/main/assets/apps')
if (fs.existsSync(appsDir)) {
  const oldDirs = fs.readdirSync(appsDir).filter(name => name !== '.DS_Store' && name.startsWith('__UNI__'))
  const targetDir = path.join(appsDir, appid)
  for (const name of oldDirs) {
    const srcDir = path.join(appsDir, name)
    if (name === appid) continue // 已经是目标名
    if (fs.existsSync(targetDir)) {
      console.warn(`[sync-appid] 目标目录 ${appid} 已存在，跳过重命名 ${name}（请手动清理）`)
      continue
    }
    fs.renameSync(srcDir, targetDir)
    console.log(`[sync-appid] 目录重命名：${name} -> ${appid}`)
  }

  // 4. 同步 www/manifest.json 里的 "id" 字段
  const wwwManifestPath = path.join(targetDir, 'www/manifest.json')
  if (fs.existsSync(wwwManifestPath)) {
    const wwwManifest = JSON.parse(fs.readFileSync(wwwManifestPath, 'utf8'))
    if (wwwManifest.id !== appid) {
      wwwManifest.id = appid
      fs.writeFileSync(wwwManifestPath, JSON.stringify(wwwManifest, null, 2))
      console.log(`[sync-appid] 已同步 www/manifest.json 的 id`)
    }
  } else {
    console.warn(`[sync-appid] 未找到 ${wwwManifestPath}，跳过（可能还没 build app 产物）`)
  }
} else {
  console.warn(`[sync-appid] 未找到 apps 目录：${appsDir}`)
}

console.log('[sync-appid] 完成')
