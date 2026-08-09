# MagicBook 3.0 MVP Task List

Version: 2.0

Status: In Progress

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-09

---

# Purpose

本文件為 MagicBook 3.0 MVP 執行清單。

阿德請依照順序完成。

不要自行新增功能。

若規格未定義，請停止並提出問題。

本文件以以下正式文件為開發依據：

- 00_Brand_Philosophy.md
- 01_Product_Specification.md
- 02_MVP_Development.md
- 04_Development_Guidelines.md
- 05_Database_Design.md
- 06_API_Design.md
- 09_UI_Design.md

不要自行修改產品規格。

---

# Task 1 — Project Setup

完成專案初始化。

- [ ] 建立 React + Vite 專案
- [ ] 建立 GitHub 專案
- [ ] 建立基本資料夾結構
- [ ] 建立共用 Layout
- [ ] 建立 Supabase Project
- [ ] 完成 Supabase Authentication（登入）
- [ ] 建立 GitHub Pages 部署

---

# Task 2 — User Account / Authentication

完成使用者帳號與登入基礎。

- [ ] Email Verification（Email 驗證）
- [ ] 建立 User Account（使用者帳號）
- [ ] User ID
- [ ] Login
- [ ] Logout
- [ ] Session Management（工作階段管理）
- [ ] Access Status（使用權狀態）
- [ ] Trial Used（試用狀態）

規則：

- 每個 User Account 一生一次免費試用。
- User Account 不使用 Workspace。
- User 自行使用不同 Email 重新註冊時，視為新的 User Account。
- 不做自動帳號合併或資料搬移。

---

# Task 3 — Home

完成首頁。

- [ ] Login
- [ ] MagicBook 首頁
- [ ] 免費試用入口
- [ ] 購買產品入口
- [ ] Start Editing Button
- [ ] 進入 Book Editor

首次使用流程：

加入主畫面／桌面／書籤
↓
Email Verification
↓
User Account
↓
Home

---

# Task 4 — Book Library

完成教材庫。

資料層級：

User Account
↓
Book Library
↓
Folder
↓
Book
↓
Lesson
↓
Page

完成：

- [ ] Book List
- [ ] Create Book
- [ ] Edit Book
- [ ] Delete Book
- [ ] Search Book
- [ ] Recently Used
- [ ] Folder
- [ ] Open Book（Book Editor）
- [ ] Open Reading（Reading Mode）

不要加入：

- [ ] Workspace
- [ ] Organization Mode
- [ ] Multi-user Collaboration
- [ ] Group Entity
- [ ] Group ID
- [ ] 團主／團員資料模型

---

# Task 5 — Book Editor

完成教材編輯畫面。

- [ ] 建立 Book Editor
- [ ] 建立 Lesson / Page Manager
- [ ] Add Lesson
- [ ] Add Page
- [ ] Delete Page
- [ ] Reorder Page
- [ ] Page Navigation
- [ ] 左右雙工作區
- [ ] Image Area
- [ ] Text Area

注意：

Image Area 與 Text Area 同屬於同一個 Page。

兩者共同組成一頁教材。

兩個工作區可各自獨立作業（Independent Operation）。

彼此：

- 功能獨立
- 資料獨立
- 操作獨立

不得自行假設：

- 一張圖片對應一段文字
- 圖片控制文字
- 文字控制圖片
- 自動同步
- 自動切換
- 其他未定義流程

除共同隸屬於同一個 Page 外，Image Area 與 Text Area 應保持互不干擾。

---

# Task 6 — Image Area

完成 Image Area。

- [ ] Add Image
- [ ] Add PDF
- [ ] Replace Image / PDF
- [ ] Delete Image / PDF
- [ ] Reorder Image / PDF

第一版支援：

- PNG
- JPG
- JPEG
- PDF

Image Area 負責圖片與 PDF 相關功能。

不要將 Text Area 功能混入 Image Area。

---

# Task 7 — Text Area

完成 Text Area。

- [ ] Add Text
- [ ] Edit Text
- [ ] Delete Text
- [ ] Basic Text Input

Text Area 為文字編輯區域。

不要將 PDF 功能放入 Text Area。

第一版不要自行增加未核定的 Rich Text、AI 或其他功能。

---

# Task 8 — Save Book / Data Persistence

完成教材儲存。

- [ ] Save Dialog
- [ ] Book Name
- [ ] Save Book
- [ ] Unsaved Changes Warning
- [ ] User ID Ownership
- [ ] Data Persistence（資料持久化）

所有教材資料直接歸屬於 User Account。

不使用 Workspace 作為資料所有權層級。

---

# Task 9 — Reading Mode

完成閱讀模式。

- [ ] Reading Mode
- [ ] Hide Header
- [ ] Hide Toolbar
- [ ] Back to Edit
- [ ] Edit Button

Reading Mode 與 Editor Mode 使用同一份教材資料。

Inactive User 不可使用 MagicBook。

不要自行增加：

- Read Only
- Archive Mode
- Temporary Access

---

# Task 10 — Trial / Access

完成 MVP 的使用權流程。

Trial：

- [ ] Trial Used 狀態
- [ ] 每個 User Account 一生一次
- [ ] 一張圖片
- [ ] Image Area 互動
- [ ] Text Area 輸入文字

Access：

- [ ] Active → 可使用 MagicBook
- [ ] Inactive → 不可使用 MagicBook

資料保留：

- [ ] 使用權到期後保留資料 90 天
- [ ] 90 天內重新取得使用權 → 原資料仍存在
- [ ] 90 天後未恢復使用權 → 清除資料

---

# Task 11 — Billing Integration Boundary

Billing System（計費系統）與 Supabase 必須保持責任分離。

Billing System 負責：

- 個人方案
- 團體方案
- 付款
- 續約
- 到期
- 團體邀請
- 團體人數
- 價格
- 付款週期
- 付款來源

Supabase 負責：

- User Account
- Authentication
- Session
- User ID
- 個人教材資料
- Access Status
- Trial Used

Billing → Supabase：

- [ ] Webhook
- [ ] User ID → Active / Inactive

不要在 Supabase 建立：

- [ ] Group Entity
- [ ] Group ID
- [ ] 團主
- [ ] 團員
- [ ] 邀請
- [ ] 價格
- [ ] 付款資料
- [ ] 付款週期
- [ ] 付款來源

價格尚未決定，禁止寫死任何金額。

---

# Task 12 — Billing Webhook Error Handling

完成 Billing → Supabase 的錯誤處理。

- [ ] 第一次 Webhook 無回應
- [ ] 10 分鐘後 Retry
- [ ] 第二次仍無回應 → 通知管理者／PM
- [ ] 使用者顯示：
  「工程忙線中，系統正在處理中，請稍候再試。」

如果是 Database Internal Error：

- 不要求使用者重新付款
- 不要求使用者重新輸入 Email
- 視為系統異常並依錯誤流程處理

如果是 User / Email 對應問題：

- [ ] 請使用者重新輸入購買時使用的 Email

---

# MVP Complete Checklist

完成以下完整流程：

Login
↓
Email Verification
↓
User Account
↓
Home
↓
免費試用一次 / 購買產品
↓
Create Book
↓
Book Editor
↓
Add Lesson / Page
↓
Add Image / PDF
↓
Add Text
↓
Save Book
↓
Book Library
↓
Open Book（Book Editor）
↓
Open Reading（Reading Mode）
↓
Back to Edit

---

# Development Rules

若規格未定義：

停止開發。

不要自行設計。

請提出問題。

GitHub `main` 上最新正式文件為開發依據。

在產品規格與相關設計文件完成同步、確認並 Commit 到 `main` 前，不得自行依新規則修改程式或資料庫。

---

# Progress

| Task | Status |
|---|---|
| Project Setup | ⬜ |
| User Account / Authentication | ⬜ |
| Home | ⬜ |
| Book Library | ⬜ |
| Book Editor | ⬜ |
| Image Area | ⬜ |
| Text Area | ⬜ |
| Save Book / Data Persistence | ⬜ |
| Reading Mode | ⬜ |
| Trial / Access | ⬜ |
| Billing Integration Boundary | ⬜ |
| Billing Webhook Error Handling | ⬜ |
| MVP Complete | ⬜ |

---

# Change Log

| Version | Date | Description |
|---|---|---|
| 2.0 | 2026-08-09 | 同步 01 Product Specification v3.4、02 MVP Development v3.0、04 Development Guidelines v4.4、05 Database Design v2.0、06 API Design v2.0、09 UI Design v2.0；移除 Workspace 作為有效架構，新增 User Account、Trial、Access Status、Billing Boundary、Webhook Error Handling 與 90 天資料保留規則。 |
| Draft | 2026-08-01 | Initial MVP Task List |
