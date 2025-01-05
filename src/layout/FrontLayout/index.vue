<template>
  <div class="front-container">
    <!-- 头部导航 -->
    <header class="front-header">
      <div class="container">
        <nav class="nav-menu">
          <router-link to="/" class="logo">
            <img src="@/assets/logo/logo.png" alt="Logo" class="logo-img">
            <span class="logo-text">RuoYi-Vue3</span>
          </router-link>
          <router-link to="/" class="nav-item" :class="{ active: route.path === '/' }">
            <el-icon><home-filled /></el-icon>首页
          </router-link>
          <router-link to="/mock" class="nav-item" :class="{ active: route.path === '/mock' }">
            <el-icon><document-copy /></el-icon>真题测试
          </router-link>
          <router-link to="/news" class="nav-item" :class="{ active: route.path === '/news' }">
            <el-icon><goods /></el-icon>新闻动态
          </router-link>
          <router-link to="/products" class="nav-item" :class="{ active: route.path === '/products' }">
            <el-icon><goods /></el-icon>产品展示
          </router-link>
          <router-link to="/about" class="nav-item" :class="{ active: route.path === '/about' }">
            <el-icon><info-filled /></el-icon>关于我们
          </router-link>
          <router-link to="/contact" class="nav-item" :class="{ active: route.path === '/contact' }">
            <el-icon><message /></el-icon>联系我们
          </router-link>
          <div class="auth-buttons" v-if="!userStore.token">
            <a href="javascript:;" class="nav-button" @click="showLoginDialog">登录</a>
            <a href="javascript:;" class="nav-button register" @click="showRegisterDialog">注册</a>
          </div>
          <div class="user-info" v-else>
            <el-dropdown trigger="click">
              <div class="user-avatar">
                <el-avatar :size="32" :src="userStore.avatar || '/avatar.jpg'" />
                <span class="nickname">{{ userStore.name }}</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goUserCenter">
                    <el-icon><user /></el-icon>个人中心
                  </el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">
                    <el-icon><switch-button /></el-icon>退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </nav>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="front-main">
      <router-view></router-view>
    </main>

    <!-- 页脚 -->
    <footer class="front-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>联系我们</h3>
          <p>电话：400-xxx-xxxx</p>
          <p>邮箱：contact@example.com</p>
          <p>地址：某某市某某区某某街道</p>
        </div>
        <div class="footer-section">
          <h3>快速链接</h3>
          <router-link to="/">首页</router-link>
          <router-link to="/news">新闻动态</router-link>
          <router-link to="/about">关于我们</router-link>
        </div>
        <div class="footer-section">
          <h3>关注我们</h3>
          <div class="social-links">
            <i class="fab fa-weixin"></i>
            <i class="fab fa-weibo"></i>
          </div>
        </div>
      </div>
      <div class="copyright">
        <p>Copyright 2024 RuoYi Portal. All Rights Reserved.</p>
      </div>
    </footer>

    <!-- 登录弹窗 -->
    <el-dialog
      v-model="userStore.loginVisible"
      title="欢迎登录"
      width="400px"
      :show-close="true"
      :close-on-click-modal="false"
      :modal="false"
      :append-to-body="true"
      :lock-scroll="false"
      class="custom-dialog"
      @open="handleDialogOpen"
      destroy-on-close
    >
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
        <div class="welcome-text">
          <h2>欢迎回来</h2>
          <p>请登录您的账号以继续访问</p>
        </div>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            size="large"
            auto-complete="off"
            placeholder="请输入账号"
          >
            <template #prefix><el-icon><User /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            auto-complete="off"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix><el-icon><Lock /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaEnabled">
          <div class="captcha-container">
            <el-input
              v-model="loginForm.code"
              size="large"
              auto-complete="off"
              placeholder="请输入验证码"
            >
              <template #prefix><el-icon><Picture /></el-icon></template>
            </el-input>
            <div class="captcha-wrapper">
              <img :src="codeUrl" @click="getCode" class="captcha-img" alt="验证码"/>
            </div>
          </div>
        </el-form-item>
        <div class="form-footer">
          <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
          <a href="javascript:;" class="forget-link">忘记密码？</a>
        </div>
        <el-button type="primary" :loading="loading" class="submit-btn" @click="handleLogin">
          {{ loading ? '登录中...' : '登录' }}
        </el-button>
        <div class="register-link">
          还没有账号？<a href="javascript:;" @click="showRegisterDialog">立即注册</a>
        </div>
      </el-form>
    </el-dialog>

    <!-- 注册弹窗 -->
    <el-dialog
      v-model="registerVisible"
      title="用户注册"
      width="400px"
      :show-close="true"
      :modal="false"
      :append-to-body="true"
      :lock-scroll="false"
      :close-on-click-modal="false"
      class="custom-dialog"
      destroy-on-close
    >
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" class="register-form">
        <div class="welcome-text">
          <h2>欢迎加入</h2>
          <p>创建一个账号开始您的旅程</p>
        </div>
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            type="text"
            size="large"
            auto-complete="off"
            placeholder="请输入用户名"
          >
            <template #prefix><el-icon><User /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            size="large"
            auto-complete="off"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix><el-icon><Lock /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            size="large"
            auto-complete="off"
            placeholder="请确认密码"
            show-password
          >
            <template #prefix><el-icon><Lock /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaEnabled">
          <div class="captcha-container">
            <el-input
              v-model="registerForm.code"
              size="large"
              auto-complete="off"
              placeholder="请输入验证码"
            >
              <template #prefix><el-icon><Picture /></el-icon></template>
            </el-input>
            <div class="captcha-wrapper">
              <img :src="codeUrl" @click="getCode" class="captcha-img" alt="验证码"/>
            </div>
          </div>
        </el-form-item>
        <el-button type="primary" :loading="registerLoading" class="submit-btn" @click="handleRegister">
          {{ registerLoading ? '注册中...' : '立即注册' }}
        </el-button>
        <div class="login-link">
          已有账号？<a href="javascript:;" @click="showLoginDialog">立即登录</a>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, watch, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { User, Lock, Picture, ArrowDown, SwitchButton, HomeFilled, Goods, InfoFilled, Message, DocumentCopy } from '@element-plus/icons-vue'
import { getCodeImg, login, register, logout } from "@/api/login"
import useUserStore from '@/store/modules/user'
import Cookies from "js-cookie"
import { encrypt, decrypt } from "@/utils/jsencrypt"
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const { proxy } = getCurrentInstance()
const userStore = useUserStore()

// 登录相关
const loginFormRef = ref()
const loading = ref(false)
const captchaEnabled = ref(true)
const codeUrl = ref("")

const loginForm = ref({
  username: "",
  password: "",
  rememberMe: false,
  code: "",
  uuid: ""
})

const loginRules = {
  username: [
    { required: true, trigger: "blur", message: "请输入您的账号" }
  ],
  password: [
    { required: true, trigger: "blur", message: "请输入您的密码" }
  ],
  code: [
    { required: true, trigger: "change", message: "请输入验证码" }
  ]
}

// 注册相关
const registerVisible = ref(false)
const registerFormRef = ref()
const registerLoading = ref(false)

const registerForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
  code: "",
  uuid: ""
})

const registerRules = {
  username: [
    { required: true, trigger: "blur", message: "请输入您的账号" },
    { min: 2, max: 20, message: "用户账号长度必须介于 2 和 20 之间", trigger: "blur" }
  ],
  password: [
    { required: true, trigger: "blur", message: "请输入您的密码" },
    { min: 6, max: 20, message: "用户密码长度必须介于 6 和 20 之间", trigger: "blur" }
  ],
  confirmPassword: [
    { required: true, trigger: "blur", message: "请再次输入您的密码" },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) {
          callback(new Error("两次输入的密码不一致"))
        } else {
          callback()
        }
      },
      trigger: "blur"
    }
  ],
  code: [
    { required: true, trigger: "change", message: "请输入验证码" }
  ]
}

const showLoginDialog = () => {
  userStore.loginVisible = true
}

const showRegisterDialog = () => {
  registerVisible.value = true
}

const handleDialogOpen = () => {
  // 重置表单
  loginForm.value = {
    username: "",
    password: "",
    rememberMe: false,
    code: "",
    uuid: ""
  }
  // 获取cookie
  getCookie()
  // 延迟获取验证码，确保DOM已经渲染完成
  nextTick(() => {
    setTimeout(() => {
      getCode()
    }, 200)
  })
}

const getCode = () => {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img
      loginForm.value.uuid = res.uuid
      registerForm.value.uuid = res.uuid
    }
  })
}

const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (valid) {
      loading.value = true
      // 记住密码处理
      if (loginForm.value.rememberMe) {
        Cookies.set("username", loginForm.value.username, { expires: 30 })
        Cookies.set("password", encrypt(loginForm.value.password), { expires: 30 })
        Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 })
      } else {
        Cookies.remove("username")
        Cookies.remove("password")
        Cookies.remove("rememberMe")
      }
      
      // 调用store的登录方法
      userStore.login(loginForm.value).then(() => {
        // 登录成功后获取用户信息
        return userStore.getInfo()
      }).then(() => {
        ElMessage.success('登录成功')
        userStore.loginVisible = false
        // 重置表单
        loginForm.value = {
          username: "",
          password: "",
          rememberMe: false,
          code: "",
          uuid: ""
        }
      }).catch(() => {
        if (captchaEnabled.value) {
          getCode()
        }
      }).finally(() => {
        loading.value = false
      })
    }
  })
}

const handleRegister = () => {
  proxy.$refs.registerFormRef.validate(valid => {
    if (valid) {
      registerLoading.value = true
      register(registerForm.value).then(res => {
        registerLoading.value = false
        registerVisible.value = false
        ElMessage.success("注册成功")
      }).catch(() => {
        registerLoading.value = false
      })
    }
  })
}

function getCookie() {
  const username = Cookies.get("username")
  const password = Cookies.get("password")
  const rememberMe = Cookies.get("rememberMe")
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
    code: "",
    uuid: ""
  }
}

const goUserCenter = () => {
  router.push('/user/profile')
}

const handleLogout = () => {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logOut().then(() => {
      ElMessage.success('退出成功')
    })
  })
}

watch(() => userStore.token, (newVal) => {
  if (newVal) {
    userStore.getInfo()
  }
})
</script>

<style lang="scss" scoped>
.front-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.front-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  z-index: 100;
  
  .container {
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .nav-menu {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 8px;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    margin-right: 32px;
    
    .logo-img {
      height: 32px;
      width: auto;
    }
    
    .logo-text {
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 64px;
    padding: 0 16px;
    font-size: 15px;
    color: #666;
    text-decoration: none;
    transition: all 0.3s;
    position: relative;
    
    .el-icon {
      font-size: 16px;
    }
    
    &:hover {
      color: #409eff;
      background-color: rgba(64, 158, 255, 0.08);
    }
    
    &.active {
      color: #409eff;
      font-weight: 500;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 16px;
        right: 16px;
        height: 2px;
        background-color: #409eff;
        border-radius: 1px;
      }
    }
  }

  .auth-buttons {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 12px;
    
    .nav-button {
      padding: 8px 16px;
      font-size: 14px;
      border-radius: 4px;
      text-decoration: none;
      transition: all 0.3s;
      cursor: pointer;
      
      &:not(.register) {
        color: #409eff;
        border: 1px solid #409eff;
        
        &:hover {
          background-color: #ecf5ff;
        }
      }
      
      &.register {
        color: #fff;
        background-color: #409eff;
        border: 1px solid #409eff;
        
        &:hover {
          background-color: #66b1ff;
          border-color: #66b1ff;
        }
      }
    }
  }
}

.front-main {
  flex: 1;
  margin-top: 64px;
}

.front-footer {
  background: #2c3e50;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-section h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.footer-section a {
  display: block;
  color: #fff;
  text-decoration: none;
  margin-bottom: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.footer-section a:hover {
  opacity: 1;
}

.social-links {
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
}

.copyright {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.custom-dialog {
  :deep(.el-dialog) {
    position: fixed;
    margin: 0;
    right: 20px;
    top: 80px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 12px 32px 4px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.08);
    
    .el-dialog__header {
      margin: 0;
      padding: 20px;
      text-align: center;
      border-bottom: 1px solid #f0f0f0;
      
      .el-dialog__title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }
    }
    
    .el-dialog__body {
      padding: 30px;
    }

    .el-dialog__headerbtn {
      top: 20px;
    }
  }
}

.welcome-text {
  text-align: center;
  margin-bottom: 30px;
  
  h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
}

.login-form,
.register-form {
  .el-form-item {
    margin-bottom: 24px;
  }

  .el-input {
    :deep(.el-input__wrapper) {
      background-color: #f5f7fa;
      border: 1px solid transparent;
      transition: all 0.3s;
      
      &:hover {
        border-color: #dcdfe6;
      }
      
      &.is-focus {
        background-color: #fff;
        border-color: #409eff;
        box-shadow: 0 0 0 1px #409eff;
      }
    }
    
    :deep(.el-input__prefix) {
      color: #909399;
    }
  }
}

.captcha-container {
  display: flex;
  align-items: center;
  gap: 12px;
  
  .el-input {
    width: calc(100% - 122px);
  }
}

.captcha-wrapper {
  flex-shrink: 0;
  width: 110px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
}

.captcha-img {
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
  transition: opacity 0.3s;
  object-fit: cover;
  
  &:hover {
    opacity: 0.8;
  }
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  :deep(.el-checkbox__label) {
    color: #606266;
  }
  
  .forget-link {
    font-size: 14px;
    color: #409eff;
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: #66b1ff;
    }
  }
}

.submit-btn {
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px 4px rgba(64, 158, 255, 0.3), 0 0 6px rgba(64, 158, 255, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.register-link,
.login-link {
  text-align: center;
  font-size: 14px;
  color: #606266;
  
  a {
    color: #409eff;
    text-decoration: none;
    margin-left: 4px;
    transition: color 0.3s;
    
    &:hover {
      color: #66b1ff;
    }
  }
}

.user-info {
  margin-left: auto;
  
  .user-avatar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    .nickname {
      font-size: 14px;
      color: #333;
    }
    
    .el-icon--right {
      font-size: 12px;
      color: #909399;
      margin-left: 4px;
    }
  }
}

:deep(.el-dropdown-menu) {
  padding: 4px 0;
  
  .el-dropdown-menu__item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    
    .el-icon {
      font-size: 16px;
    }
    
    &:hover {
      background-color: #f5f7fa;
    }
  }
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .header-content {
    padding: 0.5rem 1rem;
  }
  
  .title {
    font-size: 1.2rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
