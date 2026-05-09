/**
 * 用户信息判断方法使用示例
 * 这个文件展示了如何使用 src/utils/user.js 中的各种方法
 */

import {
  isUserLoggedIn,
  isUserInfoExists,
  isBasicUserInfoExists,
  isDetailedUserInfoExists,
  isUserAccountExists,
  isNewUser,
  isUserVerified,
  isUserVIP,
  getUserInfoStatus,
  checkUserInfoConditions,
  getCurrentUserInfo,
  getCurrentAuthInfo,
  clearUserInfo,
  updateUserInfo,
  updateUserAccountInfo,
  userInfoComputed,
  authInfoComputed,
  isLoggedInComputed,
  userInfoStatusComputed
} from './user.js'

// 示例1: 基本判断方法
export function exampleBasicChecks() {
  console.log('=== 基本判断方法示例 ===')
  
  // 判断用户是否已登录
  const loggedIn = isUserLoggedIn()
  console.log('用户是否已登录:', loggedIn)
  
  // 判断用户信息是否存在
  const userExists = isUserInfoExists()
  console.log('用户信息是否存在:', userExists)
  
  // 判断基本信息是否存在
  const basicInfoExists = isBasicUserInfoExists()
  console.log('基本信息是否存在:', basicInfoExists)
  
  // 判断详细信息是否存在
  const detailedInfoExists = isDetailedUserInfoExists()
  console.log('详细信息是否存在:', detailedInfoExists)
}

// 示例2: 高级判断方法
export function exampleAdvancedChecks() {
  console.log('=== 高级判断方法示例 ===')
  
  // 判断用户账户信息是否存在
  const accountExists = isUserAccountExists()
  console.log('账户信息是否存在:', accountExists)
  
  // 判断是否为新用户
  const isNew = isNewUser()
  console.log('是否为新用户:', isNew)
  
  // 判断是否已实名认证
  const isVerified = isUserVerified()
  console.log('是否已实名认证:', isVerified)
  
  // 判断是否为VIP
  const isVIP = isUserVIP()
  console.log('是否为VIP:', isVIP)
}

// 示例3: 获取用户信息状态
export function exampleGetUserStatus() {
  console.log('=== 获取用户信息状态示例 ===')
  
  const status = getUserInfoStatus()
  console.log('用户信息状态:', status)
  
  // 使用状态信息进行判断
  if (status.isLoggedIn && status.hasBasicInfo) {
    console.log('用户可以正常使用应用')
  } else if (!status.isLoggedIn) {
    console.log('用户需要登录')
  } else if (!status.hasBasicInfo) {
    console.log('用户信息不完整，需要完善信息')
  }
}

// 示例4: 条件检查
export function exampleConditionCheck() {
  console.log('=== 条件检查示例 ===')
  
  // 检查用户是否满足游戏所需条件
  const gameConditions = {
    requireLogin: true,
    requireBasicInfo: true,
    requireAccount: true
  }
  
  const gameCheck = checkUserInfoConditions(gameConditions)
  console.log('游戏条件检查结果:', gameCheck)
  
  if (gameCheck.passed) {
    console.log('用户可以开始游戏')
  } else {
    console.log('用户不满足游戏条件:', gameCheck.failedConditions)
  }
  
  // 检查用户是否满足VIP功能所需条件
  const vipConditions = {
    requireLogin: true,
    requireBasicInfo: true,
    requireVIP: true
  }
  
  const vipCheck = checkUserInfoConditions(vipConditions)
  console.log('VIP功能条件检查结果:', vipCheck)
}

// 示例5: 获取和更新用户信息
export function exampleUserInfoManagement() {
  console.log('=== 用户信息管理示例 ===')
  
  // 获取当前用户信息
  const currentUser = getCurrentUserInfo()
  console.log('当前用户信息:', currentUser)
  
  // 获取当前认证信息
  const currentAuth = getCurrentAuthInfo()
  console.log('当前认证信息:', currentAuth)
  
  // 更新用户信息
  const newUserInfo = {
    nickname: '新昵称',
    avatar: 'new-avatar.jpg'
  }
  updateUserInfo(newUserInfo)
  console.log('已更新用户信息')
  
  // 更新账户信息
  const newAccountInfo = {
    user_money: 1000,
    bet_amount: 500
  }
  updateUserAccountInfo(newAccountInfo)
  console.log('已更新账户信息')
}

// 示例6: 在Vue组件中使用计算属性
export function exampleVueComputedUsage() {
  console.log('=== Vue计算属性使用示例 ===')
  
  // 这些计算属性可以在Vue组件的setup函数中使用
  console.log('用户信息计算属性:', userInfoComputed.value)
  console.log('认证信息计算属性:', authInfoComputed.value)
  console.log('登录状态计算属性:', isLoggedInComputed.value)
  console.log('用户状态计算属性:', userInfoStatusComputed.value)
}

// 示例7: 实际应用场景
export function exampleRealWorldUsage() {
  console.log('=== 实际应用场景示例 ===')
  
  // 场景1: 检查用户是否可以访问某个页面
  function canAccessPage(pageName) {
    const conditions = {
      requireLogin: true,
      requireBasicInfo: true
    }
    
    if (pageName === 'vip') {
      conditions.requireVIP = true
    }
    
    const check = checkUserInfoConditions(conditions)
    return check.passed
  }
  
  console.log('是否可以访问普通页面:', canAccessPage('profile'))
  console.log('是否可以访问VIP页面:', canAccessPage('vip'))
  
  // 场景2: 根据用户状态显示不同的UI
  function getUIState() {
    const status = getUserInfoStatus()
    
    if (!status.isLoggedIn) {
      return 'showLogin'
    } else if (!status.hasBasicInfo) {
      return 'showCompleteProfile'
    } else if (status.isNewUser) {
      return 'showWelcome'
    } else {
      return 'showNormal'
    }
  }
  
  console.log('当前UI状态:', getUIState())
  
  // 场景3: 用户权限检查
  function checkUserPermission(permission) {
    const status = getUserInfoStatus()
    
    switch (permission) {
      case 'basic':
        return status.isLoggedIn && status.hasBasicInfo
      case 'vip':
        return status.isLoggedIn && status.hasBasicInfo && status.isVIP
      case 'verified':
        return status.isLoggedIn && status.hasBasicInfo && status.isVerified
      default:
        return false
    }
  }
  
  console.log('基础权限:', checkUserPermission('basic'))
  console.log('VIP权限:', checkUserPermission('vip'))
  console.log('实名认证权限:', checkUserPermission('verified'))
}

// 运行所有示例
export function runAllExamples() {
  exampleBasicChecks()
  exampleAdvancedChecks()
  exampleGetUserStatus()
  exampleConditionCheck()
  exampleUserInfoManagement()
  exampleVueComputedUsage()
  exampleRealWorldUsage()
} 