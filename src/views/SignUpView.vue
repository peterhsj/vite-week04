<script setup>
  import axios from 'axios';
  import { RouterLink } from 'vue-router';
  import { ref } from 'vue';

  const api = 'https://todolist-api.hexschool.io';  
  const setupField = ref({
    email: null,
    nickname: null,
    password: null
  });

  const password2 = ref(null);
  const isEmail = ref(false);
  const isNickname = ref(false);
  const isPassword = ref(false);
  const isPwdVaild = ref(false);
  
  // 註冊
  const signUp = async () => {
    const payload = { ...setupField.value };
    const { email, nickname, password } = payload;

    isEmail.value = !email;
    isNickname.value = !nickname;
    isPassword.value = !password;
    // 檢查密碼是否一致
    isPwdVaild.value = payload.password !== password2.value;

    // 欄位檢核
    const status = isEmail.value || isNickname.value || isPassword.value || isPwdVaild.value;
    
    if (status) return;

    try {
      const res = await axios.post(`${api}/users/sign_up`, setupField.value);
      if (res.data.status) {
        alert('帳號註冊成功，請點選 登入 進入本系統');
      }
    } catch (err) {
      const errMessage = `${err.response.data.message}`;
      alert(errMessage);
    }
  };

</script>

<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
        <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input class="formControls_input" type="email" id="email" name="email" placeholder="請輸入 email" v-model="setupField.email" required>
          <span v-if="isEmail">請輸入 email</span>
          <label class="formControls_label" for="name">您的暱稱</label>
          <input class="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" v-model="setupField.nickname">
          <span v-if="isNickname">請輸入您的暱稱</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" v-model="setupField.password" autocomplete="off" required>
          <span v-if="isPassword">請輸入密碼</span>
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd2" placeholder="請再次輸入密碼" v-model="password2" autocomplete="off" required>
          <span v-if="isPwdVaild">欄位密碼不一致</span>
          <input class="formControls_btnSubmit" type="button" @click="signUp" value="註冊帳號">
          <RouterLink class="formControls_btnLink" to="/">登入</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>