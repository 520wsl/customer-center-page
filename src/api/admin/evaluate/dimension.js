import api from "@/libs/api.request";
const baseUrl = "/evaluate";
function post(url, params) {
	return api.post(baseUrl + url, params);
}
function get(url, params) {
	return api.get(baseUrl + url, params);
}
// 维度列表
export const getDimensionListData = () => {
	return post("/dimension/list");
};