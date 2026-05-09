# 主题图片目录说明

此目录包含不同主题的图片资源。每个子文件夹代表一个主题。

## 目录结构

```
imgs/
├── default/     # 默认主题（红色）
├── blue/        # 蓝色主题
├── green/       # 绿色主题
├── purple/      # 紫色主题
└── home/        # 通用图片（不区分主题）
```

## 使用说明

### 1. 添加主题图片

在对应的主题文件夹中放置图片，确保**所有主题文件夹中的图片名称保持一致**：

```
imgs/
├── default/
│   ├── logo.png
│   ├── banner.png
│   └── icon-home.png
├── blue/
│   ├── logo.png        # 名称相同
│   ├── banner.png      # 名称相同
│   └── icon-home.png   # 名称相同
└── green/
    ├── logo.png        # 名称相同
    ├── banner.png      # 名称相同
    └── icon-home.png   # 名称相同
```

### 2. 在代码中使用

```javascript
import { getThemeImage } from '@/utils/theme'

// 会根据当前域名自动选择对应主题文件夹中的图片
const logoUrl = getThemeImage('logo.png')
// 默认主题: /imgs/default/logo.png
// 蓝色主题: /imgs/blue/logo.png
```

### 3. 通用图片

对于不需要区分主题的图片（如游戏图标、固定资源等），可以直接放在 `imgs/` 根目录或其他非主题子目录中：

```
imgs/
├── home/          # 通用首页图片
├── games/         # 游戏图标
├── icons/         # 固定图标
└── default/       # 主题图片
```

## 图片命名规范

建议使用以下命名规范：

- **Logo**: `logo.png`, `logo-small.png`
- **Banner**: `banner.png`, `banner-home.png`
- **背景**: `bg-main.png`, `bg-body.png`
- **图标**: `icon-*.png`
- **按钮**: `btn-*.png`

## 注意事项

1. **尺寸一致**: 同一图片在不同主题中应保持相同的尺寸
2. **格式统一**: 建议使用 PNG/WebP 格式，支持透明背景
3. **优化大小**: 使用图片压缩工具优化文件大小
4. **命名规则**: 使用小写字母和连字符，避免空格和特殊字符
5. **备用方案**: 确保 `default/` 文件夹包含所有必需的图片作为后备

## 示例

创建一个新主题 "orange" 的步骤：

1. 在 `src/utils/theme.js` 中添加配置
2. 创建文件夹 `imgs/orange/`
3. 复制 `default/` 中的所有图片到 `orange/`
4. 使用图片编辑软件调整图片的颜色风格
5. 测试确保所有图片正确显示

