<template>
    <div>
        <!-- <Poptip confirm placement="bottom-end" title="解绑不可撤销，请谨慎操作！是否确认解绑？" @on-ok="cancelBind()">
      <Button type="primary" size="small" class="mar-l" ghost>解绑</Button>
    </Poptip> -->
        <Button type="primary" size="small" class="mar-l" v-if="isXuKai" @click="modal = true" ghost>编辑联系人</Button>
        <Button type="primary" size="small" class="mar-l" v-if="isXuKai && row.customerSixiId" @click="delContacts()" ghost>解绑微信</Button>
        <Button type="primary" size="small" class="mar-l" v-if="isShow" @click="getMobilePhone()" ghost>采集电话</Button>
        <Button type="primary" size="small" class="mar-l" v-if="isShow" @click="getAccountPassword()" ghost>采集账号密码</Button>
        <!-- <Button type="primary" size="small" class="mar-l" @click="getStartWorkorder()" ghost>发起工单</Button> -->
        <!-- <Button type="primary" size="small" class="mar-l" v-if="!row.wechatNickname" @click="bindAccount()" ghost>绑定微信</Button> -->
        <Modal v-model="modal" @on-ok="edit()" :loading="loading" :mask-closable="false" title="编辑">
            <Card class="md-card">
                <table class="tab">
                    <tbody>
                        <tr>
                            <td class="title">微信昵称:</td>
                            <td>
                                <img v-if="row.wechatAvatar" :src="row.wechatAvatar" class="acatar" alt="404">&emsp;{{row.wechatNickname}}
                            </td>
                        </tr>
                        <tr>
                            <td class="title">绑定时间:</td>
                            <td>{{ getTime(row.bindTime)}}</td>
                        </tr>
                        <tr>
                            <td class="title">称呼:</td>
                            <td>
                                <Input class="wid" v-model="callName"><span></span></Input>
                            </td>
                        </tr>
                        <tr>
                            <td class="title">性别:</td>
                            <td>

                                <RadioGroup v-model="sex">
                                    <Radio :label="1">{{getSexValue(1)}}</Radio>
                                    <Radio :label="2">{{getSexValue(2)}}</Radio>
                                </RadioGroup>
                            </td>
                        </tr>
                        <tr>
                            <td class="title">角色:</td>
                            <td>
                                <Select class="wid" v-model="role">
                                    <Option :value="1">老板</Option>
                                    <Option :value="2">老板娘</Option>
                                    <Option :value="3">经理</Option>
                                    <Option :value="4">业务员</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td class="title">手机号:</td>
                            <td>
                                <Input class="wid" v-model="phoneNumber"><span></span></Input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </Modal>
    </div>
</template>
<script>
import { setWechatUntied, updateBindInfo } from "@/api/admin/custom/custom";
// import { callPhoneAction } from "@/api/admin/callPhone/callPhone";
import { addItemTalkNewsData } from "@/api/admin/workSheet/talkNews";
import { getSexValue } from "@/libs/util";
import { formatTime } from "@/libs/util/time";
import "./index.less";
export default {
    props: ["row", "companySixiId", "isXuKai", "isShow"],
    data() {
        return {
            modal: false,
            loading: true,
            sex: 0,
            // 客户角色: 0:未知;1:老板;2:老板娘;3:经理;4:业务员;
            role: 1,
            phoneNumber: "",
            callName: ""
        };
    },
    computed:{
        operator:function() {
            return this.$store.state.user.userInfo.sixiId;
        }
    },
    created() {
        // 赋值
        this.sex = this.row.sex;
        this.role = this.row.role;
        this.phoneNumber = this.row.mobile;
        this.callName = this.row.callName;
    },
    methods: {
        getSexValue(type) {
            return getSexValue(type);
        },
        // 微信解绑
        cancelBind() {
            let id = this.row.id;
            setWechatUntied({ id }).then(res => {
                if (res.status !== 200) {
                    this.$Modal.error({ title: "提示", content: res.msg });
                    return;
                }
                this.$emit("callFun");
            });
        },
        bindAccount() {
            this.$emit("bindAccount", { customerSixiId: this.row.customerSixiId });
        },
        // 编辑联系人
        edit() {
            let params = {
                sex: this.sex,
                customerSixiId: this.row.customerSixiId,
                callName: this.callName,
                mobile: this.phoneNumber,
                role: this.role,
                id: this.row.id || '',
                deletedAt: "",
                operator: this.operator,
                companySixiId: this.companySixiId
            };
            updateBindInfo(params).then(
                res => {
                    if (res.status !== 200) {
                        this.$Modal.error({
                            title: "提示",
                            content: res.msg
                        });
                        return;
                    }
                    this.loading = false;
                    this.modal = false;
                    this.$emit("callFun");
                },
                error => {
                    this.loading = false;
                    this.modal = false;
                }
            );
        },
        // 删除联系人
        delContacts() {
            this.$Modal.confirm({
                title: "删除联系人",
                content: "<p>" + "删除之后不可恢复，请谨慎操作" + "</p>",
                onOk: () => {
                    // let params = {
                    //     sex: this.row.sex || "",
                    //     customerSixiId: this.row.customerSixiId || "",
                    //     callName: this.row.callName || "",
                    //     mobile: this.row.mobile || "",
                    //     role: this.row.role || "",
                    //     id: this.row.id || "",
                    //     deletedAt: (new Date()).getTime(),
                    //     operator: this.operator,
                    //     companySixiId: this.companySixiId || ""
                    // };
                    // console.log(params)
                    // updateBindInfo(params).then(res => {
                    //     if (res.status !== 200) {
                    //         this.$Modal.error({
                    //             title: "提示",
                    //             content: res.msg
                    //         });
                    //         return;
                    //     }
                    //     this.$emit("callFun");
                    // },
                    // error => { });
                    this.cancelBind();
                },
                onCancel: () => { }
            });
        },
        // 发起工单
        // getStartWorkorder() {
        //     this.$Modal.confirm({
        //         title: "发起工单",
        //         content: "<p>" + "即将发起工单通知，请确认" + "</p>",
        //         onOk: () => {
        //             console.log(123)
        //         },
        //         onCancel: () => { }
        //     });
        // },
        // 采集手机
        getMobilePhone() {
            this.$Modal.confirm({
                title: "电话号码采集",
                content: "<p>" + "即将发送客户采集电话号码通知，请确认" + "</p>",
                onOk: () => {
                    addItemTalkNewsData({
                        eventType: 2,
                        userSixiId: this.row.customerSixiId,
                        companySixiId: this.companySixiId
                    }).then(res => {
                        if (res.status !== 200) {
                            this.$Modal.error({
                                title: "提示",
                                content: res.msg
                            });
                            return;
                        }
                        this.$emit("callFun");
                    });
                },
                onCancel: () => { }
            });
        },
        // 采集账号密码
        getAccountPassword() {
            this.$Modal.confirm({
                title: "账号密码采集",
                content: "<p>" + "即将发送客户采集账号密码通知，请确认" + "</p>",
                onOk: () => {
                    addItemTalkNewsData({
                        eventType: 3,
                        userSixiId: this.row.customerSixiId,
                        companySixiId: this.companySixiId
                    }).then(res => {
                        if (res.status !== 200) {
                            this.$Modal.error({
                                title: "提示",
                                content: res.msg
                            });
                            return;
                        }
                        this.$emit("callFun");
                    });
                },
                onCancel: () => { }
            });
        },
        getTime(val) {
            return formatTime(val, "YYYY-MM-DD H:mm:ss");
        }
    }
};
</script>
<style lang="less" scoped>
.mar-l {
  margin-left: 10px !important;
  margin: 5px 0;
}
.wid {
  width: 150px;
}
.tab .title {
  width: 100px;
}

.md-card .tab td {
  border-bottom: 0;
}
.md-card .tab tr:nth-last-child(1) td {
  border-bottom: 1px solid #e8eaec;
}
.acatar {
  width: 40px;
  // 表格居中
  vertical-align: middle;
}
</style>

