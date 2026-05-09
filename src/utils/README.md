# 用户信息判断工具

这个工具提供了一套完整的用户信息判断方法，用于检查用户登录状态、信息完整性、权限等。

## 文件结构

- `user.js` - 主要的用户信息判断工具
- `user-example.js` - 使用示例
- `UserInfoExample.vue` - Vue组件示例
- `README.md` - 本文档

## 主要功能

### 1. 基本判断方法

#### `isUserLoggedIn()`
判断用户是否已登录
```javascript
import { isUserLoggedIn } from '@/utils/user.js'

const loggedIn = isUserLoggedIn()
console.log('用户是否已登录:', loggedIn) // true/false
```

#### `isUserInfoExists()`
判断用户信息是否存在且完整
```javascript
import { isUserInfoExists } from '@/utils/user.js'

const exists = isUserInfoExists()
console.log('用户信息是否存在:', exists) // true/false
```

#### `isBasicUserInfoExists(userInfo)`
判断用户基本信息是否存在
```javascript
import { isBasicUserInfoExists } from '@/utils/user.js'

// 使用默认用户信息
const basicExists = isBasicUserInfoExists()

// 使用指定的用户信息
const customUserInfo = { id: 1, username: 'test' }
const customBasicExists = isBasicUserInfoExists(customUserInfo)
```

#### `isDetailedUserInfoExists(userInfo)`
判断用户详细信息是否存在
```javascript
import { isDetailedUserInfoExists } from '@/utils/user.js'

const detailedExists = isDetailedUserInfoExists()
```

### 2. 高级判断方法

#### `isUserAccountExists(userInfo)`
判断用户账户信息是否存在
```javascript
import { isUserAccountExists } from '@/utils/user.js'

const accountExists = isUserAccountExists()
```

#### `isNewUser(userInfo)`
判断用户是否为新用户（首次充值金额为0）
```javascript
import { isNewUser } from '@/utils/user.js'

const isNew = isNewUser()
```

#### `isUserVerified(userInfo)`
判断用户是否已实名认证
```javascript
import { isUserVerified } from '@/utils/user.js'

const isVerified = isUserVerified()
```

#### `isUserVIP(userInfo)`
判断用户是否为VIP
```javascript
import { isUserVIP } from '@/utils/user.js'

const isVIP = isUserVIP()
```

### 3. 状态获取方法

#### `getUserInfoStatus(userInfo)`
获取用户信息的完整状态
```javascript
import { getUserInfoStatus } from '@/utils/user.js'

const status = getUserInfoStatus()
console.log('用户状态:', status)
// 返回对象包含：
// {
//   isLoggedIn: boolean,
//   hasBasicInfo: boolean,
//   hasDetailedInfo: boolean,
//   hasAccount: boolean,
//   isNewUser: boolean,
//   isVerified: boolean,
//   isVIP: boolean,
//   userId: number|null,
//   username: string|null,
//   level: number,
//   userMoney: number
// }
```

### 4. 条件检查方法

#### `checkUserInfoConditions(conditions, userInfo)`
检查用户信息是否满足特定条件
```javascript
import { checkUserInfoConditions } from '@/utils/user.js'

// 检查游戏所需条件
const gameConditions = {
  requireLogin: true,
  requireBasicInfo: true,
  requireAccount: true
}

const result = checkUserInfoConditions(gameConditions)
console.log('检查结果:', result)
// 返回对象包含：
// {
//   passed: boolean,
//   failedConditions: string[],
//   status: object
// }
```

### 5. 信息管理方法

#### `getCurrentUserInfo()`
获取当前用户信息
```javascript
import { getCurrentUserInfo } from '@/utils/user.js'

const userInfo = getCurrentUserInfo()
```

#### `getCurrentAuthInfo()`
获取当前用户认证信息
```javascript
import { getCurrentAuthInfo } from '@/utils/user.js'

const authInfo = getCurrentAuthInfo()
```

#### `updateUserInfo(newUserInfo)`
更新用户信息
```javascript
import { updateUserInfo } from '@/utils/user.js'

const newInfo = {
  nickname: '新昵称',
  avatar: 'new-avatar.jpg'
}
updateUserInfo(newInfo)
```

#### `updateUserAccountInfo(newAccountInfo)`
更新用户账户信息
```javascript
import { updateUserAccountInfo } from '@/utils/user.js'

const newAccountInfo = {
  user_money: 1000,
  bet_amount: 500
}
updateUserAccountInfo(newAccountInfo)
```

#### `clearUserInfo()`
清除用户信息
```javascript
import { clearUserInfo } from '@/utils/user.js'

clearUserInfo()
```

### 6. Vue计算属性

#### `userInfoComputed`
用户信息的响应式计算属性
```javascript
import { userInfoComputed } from '@/utils/user.js'

// 在Vue组件的setup中使用
const userInfo = userInfoComputed
```

#### `authInfoComputed`
认证信息的响应式计算属性
```javascript
import { authInfoComputed } from '@/utils/user.js'

const authInfo = authInfoComputed
```

#### `isLoggedInComputed`
登录状态的响应式计算属性
```javascript
import { isLoggedInComputed } from '@/utils/user.js'

const isLoggedIn = isLoggedInComputed
```

#### `userInfoStatusComputed`
用户状态的响应式计算属性
```javascript
import { userInfoStatusComputed } from '@/utils/user.js'

const userStatus = userInfoStatusComputed
```

## 在Vue组件中使用

### 基本使用
```vue
<template>
  <div>
    <div v-if="isLoggedIn">欢迎回来，{{ userInfo.username }}</div>
    <div v-else>请先登录</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  isLoggedInComputed, 
  userInfoComputed,
  getUserInfoStatus 
} from '@/utils/user.js'

const isLoggedIn = isLoggedInComputed
const userInfo = userInfoComputed
const userStatus = computed(() => getUserInfoStatus())
</script>
```

### 权限检查
```vue
<template>
  <div>
    <button v-if="canAccessVIP" @click="accessVIPFeature">
      VIP功能
    </button>
    <div v-if="!canAccessVIP" class="vip-required">
      需要VIP才能使用此功能
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  userInfoStatusComputed,
  checkUserInfoConditions 
} from '@/utils/user.js'

const userStatus = userInfoStatusComputed

const canAccessVIP = computed(() => {
  const conditions = {
    requireLogin: true,
    requireBasicInfo: true,
    requireVIP: true
  }
  return checkUserInfoConditions(conditions).passed
})

const accessVIPFeature = () => {
  // VIP功能逻辑
}
</script>
```

## 实际应用场景

### 1. 页面访问控制
```javascript
// 检查用户是否可以访问某个页面
function canAccessPage(pageName) {
  const conditions = {
    requireLogin: true,
    requireBasicInfo: true
  }
  
  if (pageName === 'vip') {
    conditions.requireVIP = true
  }
  
  return checkUserInfoConditions(conditions).passed
}
```

### 2. 功能权限控制
```javascript
// 根据用户状态显示不同的UI
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
```

### 3. 用户权限检查
```javascript
// 检查用户是否有特定权限
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
```

## 注意事项

1. **数据来源**: 所有方法默认从localStorage中读取用户信息，使用`authInfo`和`member`作为键名
2. **响应式**: 在Vue组件中建议使用计算属性版本，以获得响应式效果
3. **参数传递**: 所有方法都支持传入自定义的用户信息对象，如果不传则使用默认的localStorage数据
4. **错误处理**: 方法内部已处理了数据不存在的情况，返回安全的默认值
5. **性能**: 计算属性会自动缓存结果，避免重复计算

## 扩展

如果需要添加新的判断条件，可以在`checkUserInfoConditions`方法中添加新的条件检查，并在`getUserInfoStatus`方法中添加对应的状态字段。 