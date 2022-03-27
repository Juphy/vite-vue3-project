<template>
  <div class="box">
    <img src="@/assets/analysis.svg" />
    <Descriptions title="系统信息" bordered>
      <DescriptionsItem key="IP" label="IP"></DescriptionsItem>
      <DescriptionsItem v-for="(value, key) in browserInfo" :key="key" :label="key">
        {{ value }}
      </DescriptionsItem>
      <DescriptionsItem label="网络状态">
        <Badge
          :status="online ? 'processing' : 'default'"
          :text="online ? '在线' : '离线'"
        />
      </DescriptionsItem>
    </Descriptions>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import BrowserType from "@/utils/browser-type";
import { useBattery } from "@/hooks/useBattery";
import { useOnline } from "@/hooks/useOnline";
import { useUserStore } from "@/store/modules/user";
defineOptions({
  name: "DashboardWelcome",
});
// 登录IP
const loginIp = useUserStore().userInfo?.loginIp;
// 是否联网
const { online } = useOnline();
console.log(loginIp, online.value);
// 获取电池信息
const { battery, batteryStatus, calcDischargingTime } = useBattery();
// 获取浏览器信息
const browserInfo = ref(BrowserType("zh-cn"));
watchEffect(() => {
  Object.assign(browserInfo.value, {
    距离电池充满需要:
      Number.isFinite(battery.value.chargingTime) && battery.value.chargingTime != 0
        ? calcDischargingTime.value
        : "未知",
    剩余可使用时间:
      Number.isFinite(battery.value.dischargingTime) && battery.value.dischargingTime != 0
        ? calcDischargingTime.value
        : "未知",
    电池状态: batteryStatus.value,
    当前电量: `${battery.value.level}%`,
  });
});
</script>

<style lang="less" scoped>
  .box {
    display: flex;
    padding: 12px;
    width: 100%;
    height: calc(100vh - 280px);
    flex-direction: column;
    background-color: white;

    img {
      min-height: 0;
      flex: 1;
    }

    .ant-form {
      flex: 2;
    }
  }
</style>
