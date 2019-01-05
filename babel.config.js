module.exports = {
  // 脚手架把所有的presets处理情况都考虑到了
  presets: [
    '@vue/app'
  ],
  // plugins，就是按需加载iview中的组件
  "plugins": [["import", {
    "libraryName": "iview",
    "libraryDirectory": "src/components"
  }],[
    "component",
    {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }
  ]]
};
