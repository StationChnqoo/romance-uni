<template>
	<view class="lime-echart" :style="customStyle" v-if="canvasId" ref="limeEchart">
		<!-- #ifndef APP-NVUE -->
		<canvas
			class="lime-echart__canvas"
			v-if="use2dCanvas"
			type="2d"
			:id="canvasId"
			:style="canvasStyle"
			:disable-scroll="isDisableScroll"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
		/>
		<canvas
			class="lime-echart__canvas"
			v-else-if="isPc"
			:style="canvasStyle"
			:id="canvasId"
			:canvas-id="canvasId"
			:disable-scroll="isDisableScroll"
			@mousedown="touchStart"
			@mousemove="touchMove"
			@mouseup="touchEnd"
		/>
		<canvas
			class="lime-echart__canvas"
			v-else
			:width="nodeWidth"
			:height="nodeHeight"
			:style="canvasStyle"
			:canvas-id="canvasId"
			:id="canvasId"
			:disable-scroll="isDisableScroll"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
		/>
		<canvas v-if="isOffscreenCanvas" :style="offscreenStyle" :canvas-id="offscreenCanvasId"></canvas>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<web-view
			class="lime-echart__canvas"
			:id="canvasId"
			:style="canvasStyle"
			:webview-styles="webviewStyles"
			ref="webview"
			src="/uni_modules/lime-echart/static/index.html"
			@pagefinish="finished = true"
			@onPostMessage="onMessage"
		></web-view>
		<!-- #endif -->
	</view>
</template>

<script>
// #ifdef VUE3
// #ifdef APP-PLUS
global = {}
// #endif
// #endif
// #ifndef APP-NVUE
import {Canvas, setCanvasCreator, dispatch} from './canvas';
import { compareVersion, wrapTouch, devicePixelRatio ,sleep} from './utils';
// #endif
// #ifdef APP-NVUE
import { base64ToPath, sleep } from './utils';
// #endif
const charts = {}
const echartsObj = {}
export default {
	name: 'lime-echart',
	props: {
		// #ifdef MP-WEIXIN || MP-TOUTIAO
		type: {
			type: String,
			default: '2d'
		},
		// #endif
		// #ifdef APP-NVUE
		webviewStyles: Object,
		// hybrid: Boolean,
		// #endif
		customStyle: String,
		isDisableScroll: Boolean,
		isClickable: {
			type: Boolean,
			default: true
		},
		enableHover: Boolean,
		beforeDelay: {
			type: Number,
			default: 30
		}
	},
	data() {
		return {
			// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-ALIPAY
			use2dCanvas: true,
			// #endif
			// #ifndef MP-WEIXIN || MP-TOUTIAO || MP-ALIPAY
			use2dCanvas: false,
			// #endif
			width: null,
			height: null,
			nodeWidth: null,
			nodeHeight: null,
			canvasNode: null,
			config: {},
			inited: false,
			finished: false,
			file: '',
			platform: '',
			isPc: false,
			isDown: false,
			isOffscreenCanvas: false,
			offscreenWidth: 0,
			offscreenHeight: 0
		};
	},
	computed: {
		canvasId() {
			return `lime-echart${this._ && this._.uid || this._uid}`
		},
		offscreenCanvasId() {
			return `${this.canvasId}_offscreen`
		},
		offscreenStyle() {
			return `width:${this.offscreenWidth}px;height: ${this.offscreenHeight}px; position: fixed; left: 99999px; background: red`
		},
		canvasStyle() {
			return  this.width && this.height ? ('width:' + this.width + 'px;height:' + this.height + 'px') : ''
		}
	},
	beforeDestroy() {
		this.clear()
		this.dispose()
		// #ifdef H5
		if(this.isPc) {			
			document.removeEventListener('mousewheel',()=>{})
		}
		// #endif
	},
	created() {
		// #ifdef H5
		if(!('ontouchstart' in window)) {
			this.isPc = true
			document.addEventListener('mousewheel', (e) => {
				if(this.chart) {
					const touch = this.getTouch(e)
					const handler = this.chart.getZr().handler;
					dispatch.call(handler, 'mousewheel', touch)
				}
			})
		}
		// #endif
		// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-ALIPAY
		const { SDKVersion, version, platform, environment } = uni.getSystemInfoSync();
		// #endif
		// #ifdef MP-WEIXIN
		this.isPC = /windows/i.test(platform)
		this.use2dCanvas = this.type === '2d' && compareVersion(SDKVersion, '2.9.2') >= 0 && !((/ios/i.test(platform) && /7.0.20/.test(version)) || /wxwork/i.test(environment)) && !this.isPC;
		// #endif
		// #ifdef MP-TOUTIAO
		this.isPC = /devtools/i.test(platform)
		this.use2dCanvas = this.type === '2d' && compareVersion(SDKVersion, '1.78.0') >= 0;
		// #endif
		// #ifdef MP-ALIPAY
		this.use2dCanvas = this.type === '2d' && compareVersion(my.SDKVersion, '2.7.0') >= 0;
		// #endif
	},
	mounted() {
		this.$nextTick(() => {
			this.$emit('finished')
		})
	},
	methods: {
		// #ifdef APP-NVUE
		onMessage(e) {
			const res = e?.detail?.data[0] || null;
			if (res?.event) {
				if(res.event === 'inited') {
					this.inited = true
				}
				this.$emit(res.event, JSON.parse(res.data));
			} else if(res?.file){
				this.file = res.data
			} else if(!res[0] && JSON.stringify(res[0]) != '{}'){
				console.error(res);
			} else {
				console.log(...res)
			}
		},
		// #endif
		setChart(callback) {
			if(!this.chart) {
				console.warn(`组件还未初始化，请先使用 init`)
				return
			}
			if(typeof callback === 'function' && this.chart) {
				callback(this.chart);
			}
			// #ifdef APP-NVUE
			if(typeof callback === 'function') {
				this.$refs.webview.evalJs(`setChart(${JSON.stringify(callback.toString())}, ${JSON.stringify(this.roptions)})`);
			}
			// #endif
		},
		setOption() {
			if (!this.chart || !this.chart.setOption) {
				console.warn(`组件还未初始化，请先使用 init`)
				return
			}
			// #ifndef APP-NVUE
			this.chart.setOption(...arguments);
			// #endif
			// #ifdef APP-NVUE
			this.$refs.webview.evalJs(`setOption(${JSON.stringify(arguments)})`);
			// #endif
		},
		showLoading() {
			if(this.chart) {
				// #ifndef APP-NVUE
				this.chart.showLoading(...arguments)
				// #endif
				// #ifdef APP-NVUE
				this.$refs.webview.evalJs(`showLoading(${JSON.stringify(arguments)})`);
				// #endif
			}
		},
		hideLoading() {
			if(this.chart) {
				// #ifndef APP-NVUE
				this.chart.hideLoading()
				// #endif
				// #ifdef APP-NVUE
				this.$refs.webview.evalJs(`hideLoading()`);
				// #endif
			}
		},
		clear() {
			if(this.chart) {
				// #ifndef APP-NVUE
				this.chart.clear()
				// #endif
				// #ifdef APP-NVUE
				this.$refs.webview.evalJs(`clear()`);
				// #endif
			}
		},
		dispose() {
			if(this.chart) {
				// #ifndef APP-NVUE
				this.chart.dispose()
				// #endif
				// #ifdef APP-NVUE
				this.$refs.webview.evalJs(`dispose()`);
				// #endif
			}
		},
		resize(size) {
			if(size && size.width && size.height) {
				this.height = size.height
				this.width = size.width
				if(this.chart) {this.chart.resize(size)}
				// #ifdef APP-NVUE
				this.$refs.webview.evalJs(`resize(${size})`);
				// #endif
			} else {
				this.$nextTick(() => {
					// #ifndef APP-NVUE
					uni.createSelectorQuery()
						.in(this)
						.select(`.lime-echart`)
						.boundingClientRect()
						.exec(res => {
							if (res) {
								let { width, height } = res[0];
								this.width = width = width || 300;
								this.height = height = height || 300;
								this.chart.resize({width, height})
							}
						});
					// #endif
					// #ifdef APP-NVUE
					this.$refs.webview.evalJs(`resize()`);
					// #endif
				})
				
			}
			
		},
		canvasToTempFilePath(args = {}) {
			// #ifndef APP-NVUE
			const { use2dCanvas, canvasId, canvasNode } = this;
			return new Promise((resolve, reject) => {
				const copyArgs = Object.assign({
					canvasId,
					success: resolve,
					fail: reject
				}, args);
				if (use2dCanvas) {
					delete copyArgs.canvasId;
					copyArgs.canvas = canvasNode;
				}
				uni.canvasToTempFilePath(copyArgs, this);
			});
			// #endif
			// #ifdef APP-NVUE
			this.file = ''
			this.$refs.webview.evalJs(`canvasToTempFilePath()`);
			return new Promise((resolve, reject) => {
				this.$watch('file', async (file) => {
					if(file) {
						const tempFilePath = await base64ToPath(file)
						resolve(args.success({tempFilePath}))
					} else {
						reject(args.fail({error: ``}))
					}
				})
			})
			// #endif
		},
		/**
		 * init(echarts, theme?, opts?, callback)
		 *
		 * ★ 形参一律具名、参数校验改用真值判断，**不要改回 `arguments` + `arguments.length`**。
		 *   微信小程序 `manifest.mp-weixin.setting.es6 = true` 会把产物再做一次 ES6→ES5 转译
		 *   （babel regenerator 路径），`async` 方法被降级成包装函数后 `arguments` 不再指向
		 *   本方法的实参列表：压缩产物里形参已重写成 `init(e, ...n)`，`arguments.length` 会在
		 *   运行时算错，误触下面那条 `console.error('缺少参数：init(...)')` 并**提前 return**，
		 *   导致 `echarts.init()` 根本没执行 —— 表现为图表全白但无任何渲染异常。
		 *   （已用 dist/dev/mp-weixin/components/l-echart/l-echart.js 的真实产物核对过。）
		 */
		async init(echarts, theme, opts, callback) {
			// 具名形参已足够承载全部信息：theme 缺省 null、opts 缺省 {}、callback 必填。
			// 兼容旧的无名调用（init(echarts, cb) / init(echarts, theme, cb) 等混合形态）：
			// 这里做一次重排，把落在 theme/opts 槽位上的实际类型归位。
			let realTheme = typeof theme === 'string' ? theme : null
			let realOpts = (opts && typeof opts === 'object') ? opts : {}
			let realCallback = typeof callback === 'function' ? callback : undefined
			// 形态 A：init(echarts, callback) —— 第二个实参是函数，被赋给了 theme 槽位
			if(!realCallback && typeof theme === 'function') {
				realCallback = theme
			}
			// 形态 B：init(echarts, theme, callback) —— 第三个实参是函数，被赋给了 opts 槽位
			if(!realCallback && typeof opts === 'function') {
				realCallback = opts
			}
			// 形态 C：init(echarts, null, {}, callback) —— null 主题 + 空 opts，本项目调用点用的就是这个
			theme = realTheme
			opts = realOpts
			callback = realCallback

			// 参数校验只看真实入参，**不碰 arguments**（微信端 es6 转译会毁掉它的语义，详见上方注释）。
			// 两端共用 callback 判空：非 nvue 端 callback 缺失时后续 echarts.init 也无从执行。
			if(typeof callback !== 'function') {
				// #ifdef APP-NVUE
				console.error('缺少参数：init(theme?:string, opts?: object, callback: function)')
				// #endif
				// #ifndef APP-NVUE
				console.error('缺少参数：init(echarts, theme?:string, opts?: object, callback: function)')
				// #endif
				return
			}
			
			if(this.beforeDelay) {
				await sleep(this.beforeDelay)
			}
			let config = await this.getContext();
			// #ifndef APP-NVUE
			if(typeof callback === 'function') {
				setCanvasCreator(echarts, config)
				this.chart = echarts.init(config.canvas, theme, Object.assign({}, config, opts))
				callback(this.chart)
			} else {
				console.error('callback 非 function')
			}
			// #endif
			// #ifdef APP-NVUE
			if(callback) {
				this.chart = {
					setOption: (options) => {
						this.roptions = options
					}
				}
				callback(this.chart)
				this.$refs.webview.evalJs(`init(${JSON.stringify(callback.toString())}, ${JSON.stringify(this.roptions)}, ${JSON.stringify(opts)}, ${theme})`)
			} else {
				console.error('callback 非 function')
			}
			// #endif
		},
		getContext() {
			// #ifdef APP-NVUE
			if(this.finished) {
				return Promise.resolve(this.finished)
			}
			return new Promise(resolve => {
				this.$watch('finished', (val) => {
					if(val) {
						resolve(this.finished)
					}
				})
			})
			// #endif
			// #ifndef APP-NVUE
			const { use2dCanvas} = this;
			let dpr = devicePixelRatio
			if (use2dCanvas) {
				return new Promise(resolve => {
					uni.createSelectorQuery()
						.in(this)
						.select(`#${this.canvasId}`)
						.fields({
							node: true,
							size: true
						})
						.exec(res => {
							let { node, width, height } = res[0];
							this.width = width = width || 300;
							this.height = height = height || 300;
							const ctx = node.getContext('2d');
							const canvas = new Canvas(ctx, this, true, node);
							this.canvasNode = node
							resolve({ canvas, width, height, devicePixelRatio: dpr, node });
						});
				});
			}
			return new Promise(resolve => {
				uni.createSelectorQuery()
					.in(this)
					.select(`#${this.canvasId}`)
					.boundingClientRect()
					.exec(res => {
						if (res) {
							let { width, height } = res[0];
							this.width = width = width || 300;
							this.height = height = height || 300;
							// #ifdef MP-TOUTIAO
							dpr = !this.isPC ? devicePixelRatio : 1// 1.25
							// #endif
							// #ifdef MP-ALIPAY
							dpr = devicePixelRatio
							// #endif
							// #ifndef MP-ALIPAY || MP-TOUTIAO
							dpr = this.isPC ? devicePixelRatio : 1
							// #endif
							this.rect = res[0]
							this.nodeWidth = width * dpr;
							this.nodeHeight = height * dpr;
							const ctx = uni.createCanvasContext(this.canvasId, this);
							const canvas =  new Canvas(ctx, this, false);
							resolve({ canvas, width, height, devicePixelRatio: dpr });
						}
					});
			});
			// #endif
		},
		// #ifndef APP-NVUE
		getRelative(e) {
			return {x: e.pageX - this.rect.left, y: e.pageY - this.rect.top, wheelDelta: e.wheelDelta}
		},
		getTouch(e) {
			return e.touches && e.touches[0] && e.touches[0].x ? e.touches[0] : this.getRelative(e);
		},
		touchStart(e) {
			this.isDown = true
			if (this.chart && (e.touches.length > 0 && e.type != 'mousemove' || e.type == 'mousedown')) {
				const touch = this.getTouch(e)
				const handler = this.chart.getZr().handler;
				dispatch.call(handler, 'mousedown', touch)
				dispatch.call(handler, 'mousemove', touch)
				handler.processGesture(wrapTouch(e), 'start');
			}
		},
		touchMove(e) {
			if(this.isPc && this.enableHover && !this.isDown) {this.isDown = true}
			if (this.chart && (e.touches.length > 0 && e.type != 'mousemove' || e.type == 'mousemove' && this.isDown)) {
				const handler = this.chart.getZr().handler;
				dispatch.call(handler, 'mousemove', this.getTouch(e))
				handler.processGesture(wrapTouch(e), 'change');
			}
		},
		touchEnd(e) {
			this.isDown = false
			if (this.chart) {
				const {x} = e.changedTouches && e.changedTouches[0] || {}
				const touch = (x ? e.changedTouches[0] : this.getRelative(e)) || {};
				const handler = this.chart.getZr().handler;
				dispatch.call(handler, 'mouseup', touch)
				if(this.isClickable) {
					dispatch.call(handler, 'click', touch)
				}
				handler.processGesture(wrapTouch(e), 'end');
				setTimeout(() => {
					dispatch.call(handler, 'mousemove', {x: -1,y: -1})
					dispatch.call(handler, 'mouseup', {x: -1,y: -1})
				},500)
			}
		}
		// #endif
	}
};
</script>
<style scoped>
.lime-echart {
	position: relative;
	/* #ifndef APP-NVUE */
	width: 100%;
	height: 100%;
	/* #endif */
	/* #ifdef APP-NVUE */
	flex: 1;
	/* #endif */
}
.lime-echart__canvas {
	/* #ifndef APP-NVUE */
	width: 100%;
	height: 100%;
	/* #endif */
	/* #ifdef APP-NVUE */
	flex: 1;
	/* #endif */
}
</style>
