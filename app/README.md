# MagicBook 3.0 — App（Task 1 基礎骨架）

本目錄為 MagicBook 3.0 的前端專案（React + Vite），依 `/docs/11_MVP_Task_List.md` v2.3 Task 1 建立。

## 目前狀態（Task 1）

- [x] React + Vite 專案骨架
- [x] 基本專案結構（`src/modules`、`src/shared`）
- [x] 共用 Layout 基礎（`src/shared/layout/Layout.jsx`）
- [x] Supabase 基礎連接程式碼（`src/shared/lib/supabaseClient.js`）
- [ ] **Supabase Authentication 實際連線 — Blocked，見下方**
- [x] GitHub Pages 部署基礎（`.github/workflows/deploy.yml`）

## 本機開發

```bash
cd app
npm install
cp .env.example .env.local   # 填入 Supabase 連線資訊後才能實際登入
npm run dev
```

## 部署

由 `.github/workflows/deploy.yml` 自動建置並部署到：

https://teresa-momochi.github.io/magicbook03/

部署所需的 `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` 需在
GitHub Repository → Settings → Secrets and variables → Actions 中設定（不寫入程式碼）。

## ⚠️ Blocker — Supabase Project

目前尚未取得可使用的 Supabase Project 連線資訊，因此：

- Supabase Authentication 只完成程式碼基礎（`authService.js` / `AuthContext.jsx`），
  尚未能實際完成登入測試。
- `.env.local` 需要 Teresa 提供 Project URL 與 anon key 後才能啟用。

詳見 PM 回報訊息中的 Blocker 說明。

## Scope 邊界（依 11_MVP_Task_List.md）

本目錄目前只包含 Task 1 範圍內容。以下功能尚未建立，將於對應 Task 完成：

- Email Verification 完整流程、User Account 建立、Trial Used、Access Status → Task 2
- Home 畫面 → Task 3
- Book Library → Task 4
- 其餘功能 → Task 5 以降
