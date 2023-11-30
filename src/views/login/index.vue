<template>
  <div class="login flex flex-items-center justify-center">
    <a-form
     class="w300px"
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="账号"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item label="验证码" name="code">
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item> -->
      <img class="w-100px h-40px ml-90px mb-10px" :src="codeUrl" alt="" />

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" @click="submit"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { message } from 'ant-design-vue';
interface FormState {
  username: string;
  password: string;
  code: string;
  // remember: boolean;
}

const router = useRouter()
const codeUrl = ref<string>("/api/wangxin/getCode");

const formState = reactive<FormState>({
  username: "",
  password: "",
  code: "",
  // remember: true,
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const submit = async () => {
  //   console.log(formState);
  const res = await fetch("/api/wangxin/checkCode", {
    method: "POST",
    body: JSON.stringify(formState),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  if(res.code == 200){
    router.push('/curd')
  }else{
    message.error('验证错误');
  }
  
};
</script>

<style lang="less" scoped>
.login{
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/login.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>