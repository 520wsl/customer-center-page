/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-16 18:48:22
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-17 16:16:23
 * @explanatory:  工单模块
 */
import { getWorkSheetInfoData } from "@/api/admin/workSheet/workSheet";
export default {
	state: {
		workSheetBaseInfo: {},
		workSheetType: [
			{
				key: 0,
				value: "未知资源类型"
			},
			{
				key: 2,
				value: "(xk)找续开工单"
			},
			{
				key: 3,
				value: "(mg)找美工工单"
			},
			{
				key: 4,
				value: "(sdyy)找深度运营"
			},
			{
				key: 5,
				value: "(yy)找运营"
			}
		],
		workSheetHandleType: [
			{
				key: 0,
				value: "待处理"
			},
			{
				key: 1,
				value: "已超时"
			},  
			{
				key: 2,
				value: "处理中"
			},
			{
				key: 3,
				value: "已完结"
			},
			{
				key: 4,
				value: "已评价"
			}
		],
		workSheetEventType:[
			{
				key: 0,
				value: "普通消息"
			},
			{
				key: 1,
				value: "电话沟通"
			},  
			{
				key: 2,
				value: "电话号码采集"
			},
			{
				key: 3,
				value: "账号密码采集"
			}
		]
	},
	mutations: {
		setWorkSheetBaseInfo(state, workSheetBaseInfo) {
			state.workSheetBaseInfo = workSheetBaseInfo;
		}
	},
	actions: {}
};
