// RsBuild 全局配置

import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  html: {
    template: 'index.html'
  },
  source: {
    // 设置别名
    alias: {
      '@': './src',
      "@components": "@/components"
    }
  },
  // 注册插件
  plugins: [pluginReact()],
});
