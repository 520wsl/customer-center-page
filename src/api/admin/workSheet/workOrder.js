/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-17 09:49:21
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-18 13:42:37
 * @explanatory:  工单详情 基本信息
 */
import api from "@/libs/api.request";
const baseUrl = "/work-order";

function post(url, params) {
	return api.post(baseUrl + url, params);
}

function get(url, params) {
	return api.get(baseUrl + url, params);
}

// 工单详情详情--客服回复
export const setWorkOrderCustomerServiceStaffReplyData = ({
	content,
	customerSixiId,
	resourceType,
	workSheetId
}) => {
	return post("/workorder/reply", {
			content,
			customerSixiId,
			resourceType,
			workSheetId
	});
};