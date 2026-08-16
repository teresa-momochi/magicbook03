# MagicBook 3.0 MVP Task List -- Version: 2.4

Version: 2.4

Status: In Progress

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-16

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

   - [x] 建立 React + Vite 專案
   - [x] 建立 GitHub 專案
   - [x] 建立基本資料夾結構
   - [x] 建立共用 Layout
   - [x] 建立 Supabase Project
   - [x] 完成 Supabase Authentication（登入）
   - [x] 建立 GitHub Pages 部署

---

# Task 2 — User Account / Authentication

完成使用者帳號與登入基礎。

   - [x] Email Verification（Email 驗證）
   - [x] 建立 User Account（使用者帳號）
   - [x] User ID
   - [x] Login
   - [x] Logout
   - [x] Session Management（工作階段管理）
   - [x] Access Status（使用權狀態）
   - [x] Trial Used（試用狀態）

規則：

- 每個 User Account 一生一次免費試用。
- User Account 不使用 Workspace。
- User 自行使用不同 Email 重新註冊時，視為新的 User Account。
- 不做自動帳號合併或資料搬移。

---

# Task 3 — Home

   完成首頁（入口體驗）。

   - [x] Login
   - [x] InstallPrompt（裝置加入引導）
   - [x] WelcomeScene（歡迎畫面，含魔法棒微動畫）
   - [x] MagicBookIntro（MagicBook 開書入口）
   - [x] 「體驗」入口
   - [x] 「購買方案」入口
   - [x] PlanSelection（方案選擇頁骨架）
   - [x] BookLibraryPlaceholder（Book Library 佔位畫面）
   - [x] OnboardingFlow（入口體驗導覽狀態機）
   - [x] App.jsx 導覽串接

   首次使用流程：

   Email Verification
   ↓
   User Account
   ↓
   InstallPrompt（加入主畫面／桌面／書籤，可完成或略過）
   ↓
   WelcomeScene（魔法棒微動畫）
   ↓
   MagicBookIntro（MagicBook 開書入口）
   ↓
   「體驗」→ BookLibraryPlaceholder（Book Library 將於 Task 4 開放）
   「購買方案」→ PlanSelection（方案選擇頁骨架，價格與付款屬於後續 Billing Task）

---

# Task 4 — Book Library

完成教材庫（使用者介面顯示為「我的魔法書」）。

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

- [ ] Top Navigation（我的魔法書／Storage Usage Bar／創作魔法書／Search；Desktop 橫排、Mobile 四排）
- [ ] Storage Usage Bar（UI 骨架，不接真實容量計算，不顯示 0 GB 或任何寫死數字）
- [ ] Book List
- [ ] Create Book（創作魔法書，固定入口，不論是否已有教材皆可使用）
- [ ] Rename Book
- [ ] Duplicate Book
- [ ] Move Book
- [ ] Delete Book
- [ ] Search Book
- [ ] Recently Used
- [ ] Folder
- [ ] Create Folder
- [ ] Rename Folder
- [ ] Delete Folder
- [ ] Move Folder
- [ ] Reorder Folder
- [ ] Nested Folder
- [ ] Drag & Drop Sorting
- [ ] 尚未建立教材時的提示畫面（「尚未建立魔法書」+ 創作魔法書快捷入口）
- [ ] 新書 Editor Entry（選擇先編輯圖片／文字）
- [ ] 打開魔法書（既有教材，提供「閱讀」／「編輯」兩個入口）

Placeholder（依 Task 3 BookLibraryPlaceholder 相同做法，導覽先接通、內容留給後續 Task）：

- [ ] 新書「圖片」「文字」選擇後 → Editor Placeholder（「編輯功能將於下一階段開放」）
- [ ] 既有教材「編輯」→ Editor Placeholder
- [ ] 既有教材「閱讀」→ Reading Mode Placeholder（「閱讀功能將於下一階段開放」）

不要提前實作：

- [ ] Book Editor 實際內容（Task 5）
- [ ] Reading Mode 實際內容（Task 13）
- [ ] Storage 真實容量計算 / 容量上限判斷
- [ ] Storage Pricing / Additional Storage 加購
- [ ] 資料夾作為文字輸入來源的具體格式（未定義，不自行實作）
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
- [ ] Rename Lesson
- [ ] Delete Lesson
- [ ] Reorder Lesson
- [ ] Add Page
- [ ] Delete Page
- [ ] Duplicate Page
- [ ] Reorder Page
- [ ] Page Navigation
- [ ] 左右雙工作區
- [ ] Image Area
- [ ] Text Area
- [ ] HTML Overlay
- [ ] Context Toolbar

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
- [ ] Image Import
- [ ] Image Optimization
- [ ] Image Compression
- [ ] Background Processing
- [ ] Large File Warning

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
- [ ] Reorder Text
- [ ] Basic Text Input

Text Area 為文字編輯區域。

不要將 PDF 功能放入 Text Area。

第一版不要自行增加未核定的 Rich Text、AI 或其他功能。

---

# Task 8 — HTML Overlay / Hotspot / Popup

完成教材互動層（Interaction Layer）。

HTML Overlay：

- [ ] Overlay Layer
- [ ] Interactive Object Rendering
- [ ] Object Selection
- [ ] Layer Management

Hotspot：

- [ ] Add
- [ ] Edit
- [ ] Delete
- [ ] Move
- [ ] Resize
- [ ] Save

Popup：

- [ ] Popup Editor
- [ ] Popup Layout
- [ ] Popup CRUD
- [ ] Default Popup
- [ ] Chinese
- [ ] KK
- [ ] Pronunciation

HTML Overlay 不得直接修改教材底圖。

---

# Task 9 — Context Toolbar

完成全系統共用 Context Toolbar（情境工具列）。

- [ ] 預設隱藏
- [ ] 選取物件後顯示
- [ ] 完成操作後隱藏
- [ ] 可自由拖曳
- [ ] 可自由放置
- [ ] Image
- [ ] Text
- [ ] HTML Overlay
- [ ] Hotspot

---

# Task 10 — Dictionary / AI / Audio / Video

完成核心互動服務模組。

Dictionary：

- [ ] Dictionary Popup
- [ ] Word
- [ ] Chinese
- [ ] KK
- [ ] Pronunciation
- [ ] Example

AI：

- [ ] AI Panel
- [ ] Prompt Manager
- [ ] Conversation
- [ ] History
- [ ] AI Settings
- [ ] AI Provider Interface

Audio：

- [ ] Audio Player
- [ ] Audio CRUD
- [ ] Audio Settings

Video：

- [ ] Video Player
- [ ] Video Source
- [ ] Video Settings

第三方服務必須保持可替換。

---

# Task 11 — Navigation / Global Search

Navigation：

- [ ] Home
- [ ] Back
- [ ] Page Navigation
- [ ] Book Navigation
- [ ] Lesson Navigation

Global Search：

- [ ] Search Icon
- [ ] Floating Search Toolbar
- [ ] Keyword Search
- [ ] Search Scope
- [ ] Search Suggestions
- [ ] Recent Search
- [ ] Search Result Navigation
- [ ] 關閉後 Search Icon 仍保留

Search Scope 至少包含：

- [ ] All
- [ ] Folder
- [ ] Book
- [ ] Lesson
- [ ] Page
- [ ] Text
- [ ] Image
- [ ] PDF
- [ ] Hotspot
- [ ] Dictionary

---

# Task 12 — Save Book / Data Persistence

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

# Task 13 — Reading Mode

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

# Task 14 — Trial / Access

完成 MVP 的使用權流程。

Trial：

- [ ] Trial Used 狀態
- [ ] 每個 User Account 一生一次
- [ ] 一張圖片
- [ ] Trial → Purchase 後保留 Trial Content
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

# Task 15 — Billing Integration Boundary

Billing System（計費系統）與 Supabase 必須保持責任分離。

Billing System 負責：

- 個人方案
- 團體方案
- 付款
- 續約
- 到期
- 團體邀請
- 同一 User 同時間不能接受兩個團體邀請
- 換團規則：下個月再接受新的團體邀請
- User Account 永遠維持原帳號
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

# Task 16 — Billing Webhook Error Handling

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
| Project Setup | ✅ |
| User Account / Authentication | ✅ |
| Home | ✅ |
| Book Library | ⬜ |
| Book Editor | ⬜ |
| Image Area | ⬜ |
| Text Area | ⬜ |
| HTML Overlay / Hotspot / Popup | ⬜ |
| Context Toolbar | ⬜ |
| Dictionary / AI / Audio / Video | ⬜ |
| Navigation / Global Search | ⬜ |
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

| 2.4 | 2026-08-16 | 同步 01 Product Specification v3.5、02 MVP Development v3.1、08 Editor Design v1.5、09 UI Design v2.1：Task 4 改為 Top Navigation（我的魔法書／Storage Usage Bar／創作魔法書／Search）、Storage Usage Bar UI 骨架（不接真實容量、不寫死數字）、新書 Editor Entry（圖片／文字選擇）與既有教材「閱讀／編輯」雙入口；新書與既有教材編輯導向之 Editor／Reading Mode 内容一律先接 Placeholder，不提前實作 Task 5／Task 13。原「Open Book（Book Editor）」「Open Reading（Reading Mode）」用詞移除。本次同時補記 Task 1／2／3 已完成之 Checkbox 同步（先前未列入本表版本記錄）。 |

| 2.3 | 2026-08-09 | Final Cross-Document Consistency Check 修正：補齊 Folder CRUD、Move / Reorder / Nested Folder / Drag & Drop Sorting，並將已確認的團體邀請互斥、換團與 User Account 不變規則正式列入 Billing Task。僅同步既有規格，不新增產品功能。 |
| 2.2 | 2026-08-09 | 依 02_MVP_Development v3.0 進行第二次 Cross-Document Consistency Check，補齊已確認的 Lesson / Page、HTML Overlay、Hotspot、Popup、Context Toolbar、Dictionary、AI、Audio、Video、Navigation、Global Search、圖片最佳化／壓縮／背景處理／大檔提示等 MVP 任務；並補齊團體邀請互斥與換團規則。僅同步既有規格，不新增產品功能。 |
| 2.1 | 2026-08-09 | Cross-Document Consistency Check 後補齊已確認的 Rename / Duplicate / Move Book、Trial → Purchase 保留 Trial Content、團體邀請互斥與換團規則；不新增產品功能。 |
| 2.0 | 2026-08-09 | 同步 01 Product Specification v3.4、02 MVP Development v3.0、04 Development Guidelines v4.4、05 Database Design v2.0、06 API Design v2.0、09 UI Design v2.0；移除 Workspace 作為有效架構，新增 User Account、Trial、Access Status、Billing Boundary、Webhook Error Handling 與 90 天資料保留規則。 |
| Draft | 2026-08-01 | Initial MVP Task List |
