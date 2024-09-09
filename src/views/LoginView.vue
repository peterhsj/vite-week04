<script setup> 
  import axios from 'axios';
  import { RouterLink, useRouter } from 'vue-router';
  import { ref } from "vue";

  const router = useRouter();
  const api = 'https://todolist-api.hexschool.io';
  // 登入
  const signInField = ref({
    email: '',
    password: '',
  });
  const isEmail = ref(false);
  const isPassword = ref(false);

  const signin = async () => {    
    const payload = { ...signInField.value };
    const { email, password } = payload;

    isEmail.value = !email;
    isPassword.value = !password;

    // 欄位檢核
    const status = isEmail.value || isPassword.value;
    
    if (status) return;
    try {
      const res = await axios.post(`${api}/users/sign_in`, signInField.value);
      // API 的 exp 時間是錯的，改用日期加一天
      document.cookie = `customTodoToken=${res.data.token}; expires=${new Date() + 1}; path=/`;
      router.push('/todoList');
    } catch (err) {
      const errMessage = `${err.response.data.message}`;
      alert(errMessage);
    }
  };
</script>

<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer ">
      <div class="side">
        <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
        <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" v-model="signInField.email" required>
          <span v-if="isEmail">請輸入 email</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" v-model="signInField.password" autocomplete=""off required>
          <span v-if="isPassword">請輸入密碼</span>
          <input class="formControls_btnSubmit" type="button" @click="signin" value="登入">
          <RouterLink class="formControls_btnLink" to="/signUp">註冊帳號</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>