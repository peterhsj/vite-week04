<script setup>
import axios from 'axios';
import { RouterLink, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();
const api = 'https://todolist-api.hexschool.io';
const token = ref('');
const user = ref({});

// 驗證登入
const checkoutToken = async () => {
  token.value = document.cookie.replace(/(?:(?:^|.*;\s*)customTodoToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
  try {
    const res = await axios.get(`${api}/users/checkout`, {
      headers: {
        Authorization: token.value,
      }
    });
    user.value = res.data;
    fetchTodo();
  } catch (err) {
    console.error(err);
    router.push('/');
  }
};

// 取得Todo 列表
const todoList = ref([]);
const fetchTodo = async () => {
  try {
    const res = await axios.get(`${api}/todos`, {
      headers: {
        Authorization: token.value,
      }
    });
    todoList.value = res.data.data;
  } catch (err) {
    console.error({err})
  }
};

const currentTab = ref('1');
const changeTab = (tab) => {
  currentTab.value = tab;
};

// Add Todo
const addForm = ref({
  content: null
});

const addTodo = async () => {
  const payload = { ...addForm.value  };
  try {
    const res = await axios.post(`${api}/todos`, payload, {
      headers: {
        Authorization: token.value,
      }
    });
    fetchTodo();
    addForm.value.content = null;
  } catch (err) {
    console.log({err})
  }
};

onMounted(() => {
  checkoutToken();
});

</script>

<template>
  <!-- ToDo List -->
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <RouterLink to="/todoList"><span>{{ user.nickname }} 的代辦</span></RouterLink>
        </li>
        <li><a href="#loginPage">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項" v-model="addForm.content">
          <a href="#" @click.prevent="addTodo">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li>
              <a href="#" :class="{active: currentTab === '1'}" @click.prevent="changeTab('1')">全部</a>
            </li>
            <li>
              <a href="#" :class="{active: currentTab === '2'}" @click.prevent="changeTab('2')">待完成</a>
            </li>
            <li>
              <a href="#" :class="{active: currentTab === '3'}" @click.prevent="changeTab('3')">已完成</a>
            </li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="todo in todoList" :key="todo.id">
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true" v-model="todo.status">
                  <span>{{ todo.content }}</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li>
              <!-- <li>
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true">
                  <span>打電話叫媽媽匯款給我</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li>
              <li>
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true">
                  <span>整理電腦資料夾</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li>
              <li>
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true">
                  <span>繳電費水費瓦斯費</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li>
              <li>
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true">
                  <span>約vicky禮拜三泡溫泉</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li>
              <li>
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true">
                  <span>約ada禮拜四吃晚餐</span>
                </label>
                <a href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li> -->
            </ul>
            <div class="todoList_statistics">
              <p> 5 個已完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>