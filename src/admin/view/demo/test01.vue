<template>
    <div class="hello">
        <div class="body">项目月考核</div>
        <a @click="showMessage" href="javascript:;">MintUI</a>
        <br>
        <a @click="setUser" href="javascript:;">button</a>
        <h1 class="title">{{ userName }}</h1>
        <p>
            For guide and recipes on how to configure / customize this project,
            <br>check out the
            <a
                href="https://cli.vuejs.org"
                target="_blank"
                rel="noopener"
            >vue-cli documentation</a>.
        </p>
        <img alt="Vue logo" src="@/assets/logo.png">
        <h3>Installed CLI Plugins</h3>
        <ul>
            <li>
                <a
                    href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
                    target="_blank"
                    rel="noopener"
                >babel</a>
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
                    target="_blank"
                    rel="noopener"
                >eslint</a>
            </li>
        </ul>
        <h3>Essential Links</h3>
        <ul>
            <li>
                <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
            </li>
            <li>
                <a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a>
            </li>
            <li>
                <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a>
            </li>
            <li>
                <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a>
            </li>
            <li>
                <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
            </li>
        </ul>
        <h3>Ecosystem</h3>
        <ul>
            <li>
                <a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a>
            </li>
            <li>
                <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/vue-devtools#vue-devtools"
                    target="_blank"
                    rel="noopener"
                >vue-devtools</a>
            </li>
            <li>
                <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a>
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/awesome-vue"
                    target="_blank"
                    rel="noopener"
                >awesome-vue</a>
            </li>
        </ul>
        <Button @click="openvideo">打开视频</Button>
        <myvideo :videoParams="videoParams" v-model="videoModel"></myvideo>
    </div>
</template>

<script>
import { getCalssChildData } from "@/api/class";
import { MessageBox } from "mint-ui";
import { formatTime } from "@/libs/util/time";
import { mapState, mapActions } from "vuex";
import myvideo from "_c/public/video";
export default {
	data() {
		return {
			videoModel: false,
			videoParams: {
				src: "",
				type: "video/mp4"
			}
		};
	},
	computed: {
		...mapState({
			userName: state => state.user.userName
		})
	},
	components: {
		myvideo
	},
	methods: {
		...mapActions(["setUser"]),
		showMessage() {
			// Mint UI demo
			MessageBox({
				title: "提示",
				message: "确定执行此操作?",
				showCancelButton: true
			});
		},
		openvideo() {
			this.videoParams = {
				src:
					"http://video.pearvideo.com/mp4/adshort/20181115/cont-1476862-13242020_adpkg-ad_hd.mp4",
				type: "video/mp4"
			};
			this.videoModel = true;
		}
	},
	async mounted() {
		// 调用 API 接口
		let result = await getCalssChildData();
		console.log(result);
		// time 工具类调用 demo 其他 cookie 、session 等 相同
		console.log(formatTime());
		console.log("-----------------*****************------------");
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@body-color: blue;

.pad {
	padding: 30px;
	margin: 30px;
	text-align: center;
	border: 1px solid @body-color;
}

.body {
	color: @body-color;
	.pad;
}
</style>
<style scoped>
.hello {
	width: 750px;
}
.title {
	height: 750px;
	width: 748px;
	font-size: 24px;
	border: 1px solid red;
}
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
