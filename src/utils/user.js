import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

// 从localStorage获取用户认证信息
const authRef = useLocalStorage('authInfo', {})
// 从localStorage获取用户会员信息
const memberLocal = useLocalStorage('member', {})

/**
 * 判断用户是否已登录
 * @returns {boolean} 是否已登录
 */
export const isUserLoggedIn = () => {
  return !!(authRef.value && authRef.value.access_token)
}

/**
 * 判断用户信息是否存在且完整
 * @returns {boolean} 用户信息是否存在且完整
 */
export const isUserInfoExists = () => {
  return !!(memberLocal.value && memberLocal.value.id && memberLocal.value.username)
}

/**
 * 判断用户基本信息是否存在
 * @param {Object} userInfo - 用户信息对象，可选，默认使用localStorage中的信息
 * @returns {boolean} 基本信息是否存在
 */
export const isBasicUserInfoExists = (userInfo = null) => {
  const info = userInfo || memberLocal.value
  return !!(info && info.id && info.username)
}

/**
 * 判断用户详细信息是否存在
 * @param {Object} userInfo - 用户信息对象，可选，默认使用localStorage中的信息
 * @returns {boolean} 详细信息是否存在
 */
export const isDetailedUserInfoExists = (userInfo = null) => {
  const info = userInfo || memberLocal.value
  return !!(
    info && 
    info.id && 
    info.username && 
    info.account && 
    info.account.user_money !== undefined
  )
}

/**
 * 判断用户账户信息是否存在
 * @param {Object} userInfo - 用户信息对象，可选，默认使用localStorage中的信息
 * @returns {boolean} 账户信息是否存在
 */
export const isUserAccountExists = (userInfo = null) => {
  const info = userInfo || memberLocal.value
  return !!(info && info.account && typeof info.account === 'object')
}

/**
 * 判断用户是否为新用户（首次充值金额为0）
 * @param {Object} userInfo - 用户信息对象，可选，默认使用localStorage中的信息
 * @returns {boolean} 是否为新用户
 */
export const isNewUser = (userInfo = null) => {
  const info = userInfo || memberLocal.value
  return !!(info && info.first_recharge_amount === 0)
}

/**
 * 判断用户是否已实名认证
 * @param {Object} userInfo - 用户信息对象，可选，默认使用localStorage中的信息
 * @returns {boolean} 是否已实名认证
 */
export const isUserVerified = (userInfo = null) => {
  const info = userInfo || memberLocal.value
  return !!(info && info.is_verified === 1)
}

/**
 * 判断用户是否为VIP
 * @param {Object} userInfo - 用户信息对象，可选，默认使用localStorage中的信息
 * @returns {boolean} 是否为VIP
 */
export const isUserVIP = (userInfo = null) => {
  const info = userInfo || memberLocal.value
  return !!(info && info.level && info.level > 0)
}

/**
 * 获取用户信息状态
 * @param {Object} userInfo - 用户信息对象，可选，默认使用localStorage中的信息
 * @returns {Object} 用户信息状态对象
 */
export const getUserInfoStatus = (userInfo = null) => {
  const info = userInfo || memberLocal.value
  
  return {
    isLoggedIn: isUserLoggedIn(),
    hasBasicInfo: isBasicUserInfoExists(info),
    hasDetailedInfo: isDetailedUserInfoExists(info),
    hasAccount: isUserAccountExists(info),
    isNewUser: isNewUser(info),
    isVerified: isUserVerified(info),
    isVIP: isUserVIP(info),
    userId: info?.id || null,
    username: info?.username || null,
    level: info?.level || 0,
    userMoney: info?.account?.user_money || 0
  }
}

/**
 * 检查用户信息是否满足特定条件
 * @param {Object} conditions - 检查条件对象
 * @param {boolean} conditions.requireLogin - 是否需要登录
 * @param {boolean} conditions.requireBasicInfo - 是否需要基本信息
 * @param {boolean} conditions.requireDetailedInfo - 是否需要详细信息
 * @param {boolean} conditions.requireAccount - 是否需要账户信息
 * @param {boolean} conditions.requireVerified - 是否需要实名认证
 * @param {boolean} conditions.requireVIP - 是否需要VIP
 * @param {Object} userInfo - 用户信息对象，可选，默认使用localStorage中的信息
 * @returns {Object} 检查结果对象
 */
export const checkUserInfoConditions = (conditions = {}, userInfo = null) => {
  const info = userInfo || memberLocal.value
  const status = getUserInfoStatus(info)
  
  const result = {
    passed: true,
    failedConditions: [],
    status
  }
  
  if (conditions.requireLogin && !status.isLoggedIn) {
    result.passed = false
    result.failedConditions.push('requireLogin')
  }
  
  if (conditions.requireBasicInfo && !status.hasBasicInfo) {
    result.passed = false
    result.failedConditions.push('requireBasicInfo')
  }
  
  if (conditions.requireDetailedInfo && !status.hasDetailedInfo) {
    result.passed = false
    result.failedConditions.push('requireDetailedInfo')
  }
  
  if (conditions.requireAccount && !status.hasAccount) {
    result.passed = false
    result.failedConditions.push('requireAccount')
  }
  
  if (conditions.requireVerified && !status.isVerified) {
    result.passed = false
    result.failedConditions.push('requireVerified')
  }
  
  if (conditions.requireVIP && !status.isVIP) {
    result.passed = false
    result.failedConditions.push('requireVIP')
  }
  
  return result
}

/**
 * 获取当前用户信息
 * @returns {Object} 当前用户信息
 */
export const getCurrentUserInfo = () => {
  return memberLocal.value || {}
}

/**
 * 获取当前用户认证信息
 * @returns {Object} 当前用户认证信息
 */
export const getCurrentAuthInfo = () => {
  return authRef.value || {}
}

/**
 * 清除用户信息
 */
export const clearUserInfo = () => {
  authRef.value = {}
  memberLocal.value = {}
}

/**
 * 更新用户信息
 * @param {Object} newUserInfo - 新的用户信息
 */
export const updateUserInfo = (newUserInfo) => {
  if (newUserInfo && typeof newUserInfo === 'object') {
    memberLocal.value = { ...memberLocal.value, ...newUserInfo }
  }
}

/**
 * 更新用户账户信息
 * @param {Object} newAccountInfo - 新的账户信息
 */
export const updateUserAccountInfo = (newAccountInfo) => {
  if (newAccountInfo && typeof newAccountInfo === 'object') {
    if (!memberLocal.value.account) {
      memberLocal.value.account = {}
    }
    memberLocal.value.account = { ...memberLocal.value.account, ...newAccountInfo }
  }
}

// 导出计算属性，方便在Vue组件中使用
export const userInfoComputed = computed(() => memberLocal.value || {})
export const authInfoComputed = computed(() => authRef.value || {})
export const isLoggedInComputed = computed(() => isUserLoggedIn())
export const userInfoStatusComputed = computed(() => getUserInfoStatus()) 