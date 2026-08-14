import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// MagicBook 3.0 — Task 1 Project Setup
//
// base 路徑對應 GitHub Pages 專案頁面：
// https://teresa-momochi.github.io/magicbook03/
//
// 若未來部署方式改變（例如自訂網域），請一併更新此設定。
export default defineConfig({
  plugins: [react()],
  base: '/magicbook03/',
})
