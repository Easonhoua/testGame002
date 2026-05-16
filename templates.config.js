/**
 * 模板组件配置
 * 定义所有模板的组件路径映射
 */

const TEMPLATES_CONFIG = {
  template_one: { num: 'One', path: 'template_one' },
  template_two: { num: 'Two', path: 'template_two' },
  template_three: { num: 'Three', path: 'template_three' },
  template_four: { num: 'Four', path: 'template_four' },
  template_five: { num: 'Five', path: 'template_five' },
}

// 组件名称列表
const COMPONENT_NAMES = {
  Home: (num, path) => `/src/components/templates/${path}/Home${num}.vue`,
  Footer: (num, path) => `/src/components/templates/${path}/Footer${num}.vue`,
  Aside: (num, path) => `/src/components/templates/${path}/Aside${num}.vue`,
  Mine: (num, path) => `/src/components/templates/${path}/Mine${num}.vue`,
  membersGift: (num) => `/src/components/templates/membersGift/Template${num}.vue`
}

// 生成模板组件映射
const TEMPLATE_COMPONENTS = Object.entries(TEMPLATES_CONFIG).reduce((acc, [key, { num, path }]) => {
  acc[key] = Object.entries(COMPONENT_NAMES).reduce((obj, [name, pathFn]) => {
    obj[name] = pathFn(num, path)
    return obj
  }, {})
  return acc
}, {})

export { TEMPLATE_COMPONENTS, TEMPLATES_CONFIG, COMPONENT_NAMES }
