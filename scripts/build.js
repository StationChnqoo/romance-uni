const inquirer = require('inquirer')
const shelljs = require('shelljs')

async function getModel() {
  const { productModel } = await inquirer.prompt([
    {
      type: 'list',
      name: 'productModel',
      message: '请选择构建模式:',
      choices: [
        { name: '微信小程序', value: ' -p mp-weixin' },
        { name: 'H5', value: '' },
        // { name: 'H5-SSR', value: ' --ssr' },
        // { name: 'APP', value: ' -p app' },
        // { name: '安卓APP', value: ' -p app-android' },
        // { name: '苹果APP', value: ' -p app-ios' },
        // { name: '支付宝小程序', value: ' -p mp-alipay' },
        // { name: '百度小程序', value: ' -p mp-baidu' },
        // { name: '京东小程序', value: ' -p mp-jd' },
        // { name: 'QQ小程序', value: ' -p mp-qq' },
      ]
    }
  ])
  return productModel
}

async function getEnv() {
  const { env } = await inquirer.prompt([
    {
      type: 'list',
      name: 'env',
      message: '请选择构建环境:',
      choices: [
        { name: '联调环境(Trunk)', value: 'development' },
        { name: '测试环境(Sit)', value: 'sit' },
        { name: '生产环境(Prod)', value: 'production' }
      ]
    }
  ])
  return env
}

async function run() {
  const model = await getModel()
  const env = await getEnv()
  const cmd = shelljs.exec(`uni build ${model} --mode ${env}`, {
    async: true,
    silent: true
  })
  cmd.stdout.on('data', function(data) {
    console.log(data)
  })
  cmd.stderr.on('data', function(data) {
    const log = data.toString()
    console.log(log)
  })
}

run()
