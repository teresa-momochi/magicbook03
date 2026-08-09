# MagicBook 3.0 Product Specification

Version: 3.4

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-09

---

# Table of Contents

1. Product Vision
2. Product Positioning
3. Core Design Philosophy
4. System Architecture
5. Data Ownership
6. Account, Access and Billing Architecture
7. Book Library Architecture
8. Book Structure
9. Core Modules
10. Editor System
11. Reading System
12. Global Services
13. Future Expansion
14. Change Log

---

# 1. Product Vision

## 1.1 Product Vision

MagicBook 3.0 是一套專為教育設計的互動教材工具（Interactive Teaching Material Tool）。

MagicBook 不提供教材內容（Teaching Content）。

教材內容永遠由使用者自行建立或匯入。

MagicBook 提供的是一套完整的互動工具（Interactive Tools），
讓使用者可以直接利用自己的教材，
快速建立可閱讀、可互動、可持續使用的數位教材。

MagicBook 並非：

- PDF Reader（PDF 閱讀器）
- E-book（電子書）
- Presentation Software（簡報軟體）
- LMS（Learning Management System）
- Exercise / Exam Authoring System（練習／考卷製作系統）

MagicBook 的核心價值，
在於讓使用者保留自己的教材，
並利用工具增加互動能力。

---

## 1.2 Mission

MagicBook 的使命（Mission）：

協助教育工作者直接使用既有教材，

而不是重新製作教材。

使用者可以將自己的教材匯入 MagicBook，

在保持教材原貌的前提下，

加入互動能力，

降低備課時間，

提升教學效率，

增加課堂互動，

延長教材使用價值。

---

## 1.3 Product Position

MagicBook 不綁定單一教材格式。

第一版支援：

- PNG
- JPG
- JPEG
- PDF

圖片來源統一透過 Image Import（圖片匯入）進入 MagicBook。

Image Import 包含：

- 使用者已拍攝之照片
- 使用者截圖
- 使用者從裝置選取之圖片／檔案

MagicBook 不建立專用 Camera System（相機系統）。

拍照由裝置原生相機完成。

MagicBook 的責任從 Image Import 開始。

教材內容保持原貌。

所有互動皆建立於教材之上。

MagicBook 提供的是工具，而不是教材內容。

---

## 1.4 Product Goal

MagicBook 3.0 第一版產品目標為：

建立完整產品架構（Complete Product Architecture）。

第一版即建立：

- 完整核心模組（Core Modules）
- 完整資料架構（Data Model）
- 完整使用者介面（User Interface）
- 完整操作流程（User Flow）
- 完整核心 CRUD（Create / Read / Update / Delete）

第三方服務（Third-party Services）可以逐步完善，

但不得影響產品架構。

---

## 1.5 Core Value

MagicBook 所有產品設計皆遵循：

- Teaching Material First（教材優先）
- Architecture First（架構優先）
- Modular Architecture（模組化架構）
- Replaceable Service（服務可替換）
- Consistent User Experience（一致使用者體驗）
- Performance（效能）
- Reuse Before Reinvent（先利用，再重新發明）

所有新功能皆建立於既有產品架構。

不得因新增功能而建立另一套產品架構。

---

# 2. Product Positioning

## 2.1 Product Positioning

MagicBook 3.0 為 SaaS（Software as a Service）互動教材工具。

MagicBook 的核心使用單位為：

User Account（使用者帳號）。

MagicBook 不使用 Workspace（工作空間）作為產品資料歸屬層級。

使用者建立的教材資料直接屬於該 User Account。

MagicBook 的付款／使用情境分為：

- Personal（個人）
- Group（團體）

Personal 與 Group 是 Billing System（收費系統）的付款／使用情境，

不是不同的 User Account 類型，

也不是不同的資料架構。

補習班、學校、教育機構或其他多人共同付款的使用情境，
統一歸入 Group（團體）。

---

## 2.2 Target Users

MagicBook 3.0 的使用者皆使用相同的 User Account（使用者帳號）架構。

使用者可能以：

- Personal（個人）
- Group（團體）

取得使用權。

Personal / Group 不建立不同帳號系統。

---

## 2.3 Product Architecture

MagicBook 採 User-Centered Architecture（以使用者為中心的產品架構）。

核心資料架構：

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

↓

Image Area / Text Area / HTML Overlay

User Account 是個人教材資料的最高歸屬單位。

不存在：

User

↓

Workspace

↓

Book

的資料架構。

---

# 3. Core Design Philosophy

## 3.1 Teaching Material First

教材（Teaching Material）是 MagicBook 的核心。

所有系統功能皆建立於教材之上。

教材內容與互動能力保持分離。

---

## 3.2 Separation of Content and Interaction

教材內容保持原貌。

所有互動皆建立於教材之上。

教材負責知識。

互動負責學習體驗。

任何新增功能皆不得直接修改教材原始內容。

---

## 3.3 Modular Architecture

所有核心功能皆採模組化架構（Modular Architecture）。

每個模組應：

- 可獨立開發
- 可獨立測試
- 可獨立維護
- 可持續擴充

---

## 3.4 Replaceable Services

第三方服務皆應採 Replaceable Service（可替換服務）架構。

包括：

- AI
- Dictionary
- Audio
- Video
- 其他第三方服務

不得因更換 Provider（服務供應商）而破壞核心資料架構。

---

## 3.5 Reuse Before Reinvent

優先使用：

- Operating System（作業系統）
- Browser（瀏覽器）
- HTML / CSS / JavaScript
- 成熟開源函式庫
- 成熟第三方服務

只有既有技術無法滿足產品需求時，
才評估 Custom Development（自行開發）。

---

# 4. System Architecture

## 4.1 Architecture Overview

MagicBook 3.0 採 User-Centered Architecture（以使用者為中心的架構）。

核心資料流程：

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

↓

Teaching Material

↓

HTML Overlay

↓

Interactive Object

↓

User Interaction

---

## 4.2 Account and Billing Separation

MagicBook 將 Account System（帳號系統）與 Billing System（收費系統）完全分離。

Account System 負責：

- User Account
- Authentication（身分驗證）
- Session（登入狀態）
- User ID
- 個人教材資料

Billing System 負責：

- Personal Billing（個人付款）
- Group Billing（團體付款）
- Payment（付款）
- Subscription（訂閱）
- Renewal（續約）
- Expiry（到期）
- Group Invitation（團體邀請）
- Group Member Management（團體成員管理）
- Pricing（價格）
- Billing Cycle（付款週期）
- 使用權來源判斷

Supabase 不負責上述商業邏輯。

---

## 4.3 User Account

MagicBook 只有一種 User Account（使用者帳號）。

不因：

- Personal
- Group
- 補習班
- 學校
- 教育機構

建立不同 User Account。

所有使用者均使用相同 User Account 架構。

---

## 4.4 Access Status

Supabase 只需要知道每一個 User Account 的使用權狀態：

- Active
- Inactive

Active：

使用者可以使用 MagicBook。

Inactive：

使用者不能使用 MagicBook。

Access Status 不代表：

- 付款方案
- 團體
- 付款金額
- 付款來源

Access Status 只代表：

「這個 User 現在是否可以使用 MagicBook。」

---

## 4.5 Billing → Supabase

Billing System 最終只需要通知 Supabase：

「這個 User 可以使用。」

例如：

Billing

↓

User ID = M001

↓

Supabase

↓

Access Status = Active

Supabase 不需要知道 M001 為什麼 Active。

---

## 4.6 Billing Does Not Own Material

Billing System 不擁有使用者教材。

使用者的：

- Book
- Lesson
- Page
- Image
- Text
- HTML Overlay
- Hotspot
- 其他教材資料

皆屬於該 User Account。

付款方式改變時：

不得改變：

- User ID
- User Account
- 個人教材資料

---

# 5. Data Ownership

## 5.1 Data Ownership Principle

MagicBook 採 User Account Ownership（使用者帳號資料歸屬）。

所有個人教材資料直接屬於 User Account。

資料架構：

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

---

## 5.2 User-Owned Material

以下資料皆屬於建立該資料的 User Account：

- Book
- Lesson
- Page
- Image
- Text
- HTML Overlay
- Hotspot
- Popup
- 其他個人教材資料

---

## 5.3 Account and Billing Separation

使用權變化不改變資料所有權。

例如：

User M001

↓

Personal Billing

或

↓

Group Billing

都不會改變：

M001 的 User Account

或

M001 的教材資料。

---

## 5.4 Account Change Responsibility

如果使用者自行使用新的 Email 重新註冊：

視為新的 User Account。

MagicBook 不提供：

- 自動帳號合併
- 自動資料搬移
- 不同 User ID 自動合併
- 自動判斷兩個 Email 是否為同一人

使用者因自行更換帳號造成的資料無法延續，
由使用者自行承擔。

---

# 6. Account, Access and Billing Architecture

## 6.1 User Account

User Account 是 MagicBook 的基本使用單位。

所有教材資料直接屬於 User Account。

---

## 6.2 First-Time User Flow

第一次開啟 MagicBook：

第一次開啟

↓

加入主畫面／桌面／書籤

↓

Email

↓

Email Verification（Email 驗證）

↓

建立 User Account

↓

完成登入

裝置對應：

手機：

→ 加入主畫面

電腦：

→ 安裝成 App／加入桌面

若環境不支援安裝：

→ 加入書籤

---

## 6.3 Session

完成第一次 Email Verification 後，

Browser / App Session（瀏覽器／App 登入狀態）維持登入狀態。

正常使用時：

不需要每次重新輸入 Email。

只有 Session 因清除瀏覽器資料等原因消失時，
才需要重新驗證。

---

## 6.4 Personal / Group Billing

MagicBook 的 Billing Scenario（收費情境）只有：

### Personal（個人）

使用者自行購買產品。

### Group（團體）

多人共同付款並取得使用權。

Personal / Group 不代表不同 User Account。

---

## 6.5 Group Boundary

Group（團體）完全由 Billing System 管理。

Supabase 不建立或管理：

- Group Entity（團體實體）
- Group ID
- 團主
- 團員
- 邀請
- 團體週期
- 團體價格
- 團體付款

Billing System 自行處理上述內容。

Billing 最後只將每一個 User 的使用權結果通知 Supabase。

---

## 6.6 Billing Cycle Changes

個人方案與團體方案之間的轉換，
屬於 Billing System 的商業規則。

Billing 自行處理：

- 原方案是否停止
- 剩餘期間
- 是否折抵
- 方案轉換

Supabase 不需要知道上述計算。

Billing 最終只通知：

User ID → Active / Inactive

---

## 6.7 Access Status

Supabase 只保存個人的最終使用權狀態。

Active：

可以使用 MagicBook。

Inactive：

不能使用 MagicBook。

沒有另外建立：

- Read Only Mode（唯讀模式）
- Archive Mode（封存模式）
- 到期後瀏覽模式

---

## 6.8 Billing Synchronization

Billing System 與 Supabase 採 Webhook（網路回呼）同步。

正常流程：

Payment Success

↓

Billing Confirmation

↓

Webhook

↓

Supabase

↓

Access Status = Active

---

## 6.9 Billing / Supabase Failure

### Case 1：Supabase 沒有回應

第一次呼叫：

Billing

↓

Supabase

↓

無回應

等待 10 分鐘。

↓

第二次呼叫

如果仍無回應：

使用者看到：

「工程忙線中

系統正在處理中，請稍候再試。」

同時通知管理者系統異常。

不得要求使用者重新付款。

---

### Case 2：User Account / Email 對應問題

如果屬於帳號對應問題：

要求使用者重新輸入購買時使用的 Email。

↓

重新確認 User Account

↓

再次嘗試啟動。

---

### Case 3：Supabase Database Internal Error

如果 Supabase Database（資料庫）本身發生 Internal Error（內部錯誤）：

視為系統異常。

不得要求使用者：

- 重新付款
- 重新輸入 Email

系統進行重試。

若仍失敗：

通知管理者。

---

## 6.10 Temporary Access

MagicBook 不建立 Temporary Access（臨時使用權）。

付款成功但使用權無法啟動時，
視為系統異常處理。

不建立另一套臨時授權系統。

---

## 6.11 Free Trial

首頁提供：

[ 🆓 免費試用一次 ]

[ ✨ 購買產品 ]

每一個 User Account 一生只有一次免費試用。

Trial（免費試用）是真實產品操作。

使用者可以：

- 使用一張圖片
- 在 Image Area（圖片區）進行互動
- 在 Text Area（文字區）輸入文字

Trial 不是靜態 Demo。

試用完成後：

trial_used = true

之後不可再次取得免費試用。

---

## 6.12 Purchase Flow

首頁：

[ 🆓 免費試用一次 ]

[ ✨ 購買產品 ]

選擇：

「購買產品」

↓

進入購買產品頁。

購買產品頁：

[ 個人使用 ]

[ 團體優惠 ]

---

## 6.13 Group Pricing Tiers

選擇「團體優惠」：

[ 2–10 人 ]

[ 11–20 人 ]

[ 21+ 人 ]

以上為 Billing Pricing Tier（收費級距）。

目前價格尚未定案。

不得將任何固定價格寫入：

- Product Specification
- Application Code
- Supabase
- Database Schema

實際價格由 Billing System 管理。

---

## 6.14 Trial Content

試用期間建立的教材資料就是使用者自己的資料。

如果使用者購買：

Trial Content

↓

正式使用權

↓

資料持續保留。

除非使用者自行刪除，
否則持續保留。

如果使用者沒有購買：

使用權到期

↓

到期日 + 90 天

↓

資料自動清除。

不建立特殊的「半正式資料」類型。

---

## 6.15 Data Retention

使用權到期後：

到期日

↓

+ 90 天

↓

清除該 User 的資料。

90 天內重新取得使用權：

↓

資料仍存在

↓

重新 Active

↓

繼續使用原本資料。

90 天後資料已清除：

不提供資料恢復。

---

# 7. Book Library Architecture

Book Library 為教材管理中心。

提供：

- Book List
- Folder
- Recently Used
- Search
- Create Book
- Rename Book
- Duplicate Book
- Delete Book
- Open Book
- Open Reading

Folder 支援：

- Create Folder
- Rename Folder
- Delete Folder
- Move Folder
- Reorder Folder
- Nested Folder
- Drag & Drop Sorting

Book 可以：

- 直接存在於 Book Library 根目錄
- 放入 Folder

Search Icon 固定顯示於畫面右上方。

點擊後展開 Floating Search Toolbar。

關閉搜尋後，
Search Icon 仍保留於畫面右上方。

---

# 8. Book Structure

## 8.1 Core Hierarchy

MagicBook 3.0 採階層式教材管理架構：

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

Page 為教材管理的核心單位。

---

## 8.2 Book

Book（教材）代表一本完整教材。

例如：

- G3 High Water
- Phonics Book 1
- Grammar Book

一本 Book 可包含多個 Lesson。

---

## 8.3 Lesson

Lesson（章節）代表教材中的一個單元。

例如：

- Lesson 1
- Lesson 2
- Lesson 3

一個 Lesson 可包含多個 Page。

Lesson 僅負責教材組織。

---

## 8.4 Page

Page（頁面）為教材管理最小單位。

每個 Page 包含：

- Image Area（圖片區）
- Text Area（文字區）
- HTML Overlay（HTML 互動層）

三者彼此獨立。

共同完成教材編輯。

---

## 8.5 Design Principles

Book、Lesson、Page 採固定階層。

Book 不可直接包含 Image Area。

Lesson 不可直接包含 Hotspot。

所有互動皆建立於 Page。

Page 為教材功能的核心。

---

# 9. Core Modules

MagicBook 3.0 核心模組包括：

- Authentication
- Book Library
- Folder
- Book
- Lesson
- Page
- Image Area
- Text Area
- HTML Overlay
- Hotspot
- Popup
- Dictionary
- AI
- Audio
- Video
- Navigation
- Reading Mode
- Global Search
- Context Toolbar
- Save
- Background Processing
- Brand Loading Animation

所有核心模組皆應：

- 可獨立開發
- 可獨立測試
- 可獨立維護
- 可持續擴充

---

# 10. Editor System

Book Editor 為主要教材編輯環境。

包含：

- Page Manager
- Image Area
- Text Area
- HTML Overlay
- Context Toolbar
- Save
- Reading Mode

Image Area、Text Area、HTML Overlay 為三個平行工作區。

---

## 10.1 Image Area

Image Area 負責：

- Image Import
- Image Display
- Image Replace
- Image Delete
- PDF Display
- Image Optimization
- Image Compression

支援：

- PNG
- JPG
- JPEG
- PDF
- 使用者已拍攝之照片
- 使用者截圖
- 使用者從裝置選取之圖片／檔案

MagicBook 不建立專用 Camera System。

拍照由裝置原生相機完成。

Image Area 不負責 OCR。

OCR / AI 為 Optional Automation Layer（選用自動化層）。

---

## 10.2 Text Area

Text Area 為純文字編輯區。

提供：

- Add Text
- Edit Text
- Delete Text
- Reorder Text

Text Area 不負責：

- OCR
- PDF Processing
- Image Processing

---

## 10.3 HTML Overlay

HTML Overlay 為教材互動層。

負責：

- Hotspot
- Popup
- Interactive Object
- Object Position
- Object Resize
- Layer Management

HTML Overlay 不修改教材底圖。

---

# 11. Reading System

Reading Mode（閱讀模式）與 Editor Mode（編輯模式）共用同一份教材資料。

Reading Mode 提供教材閱讀與互動。

使用者可透過既定的 Edit Button（編輯按鈕）進入 Editor Mode。

---

# 12. Global Services

MagicBook 提供共用系統服務：

- Authentication
- Global Search
- Save
- Background Processing
- Brand Loading Animation

所有模組共用相同 Service（服務）。

不得重複開發相同功能。

---

# 13. Future Expansion

未來可以持續擴充：

- AI
- Dictionary
- Audio
- Video
- Navigation
- 其他互動工具

所有新增功能皆須：

- 建立於既有產品架構
- 保持教材與互動分離
- 保持 User Account 資料歸屬
- 不重新建立 Workspace 架構
- 不將 Billing 商業邏輯寫入 Supabase

---

# 14. Change Log

## Version 3.4

### Account / Billing Architecture Revision

本版本為 MagicBook 3.0 帳號與商業架構重大調整。

正式移除：

- Workspace Architecture
- Personal Workspace
- Organization Workspace
- Workspace Membership
- Workspace Role
- Workspace Data Ownership
- Workspace-based Data Isolation

正式建立：

- User Account（使用者帳號）作為個人資料歸屬單位
- Access Status（使用權狀態）
- Account System / Billing System Separation
- Personal / Group Billing Scenario（個人／團體收費情境）
- Free Trial（免費試用）
- Trial Content Persistence（試用內容保存）
- 到期日後 90 天資料清除
- Billing → Supabase Webhook Synchronization
- Billing / Supabase Failure Handling
- First-time User Installation Flow（首次使用安裝流程）

Billing System 負責：

- 個人付款
- 團體付款
- 付款
- 續約
- 到期
- 團體邀請
- 團體人數
- 價格
- 付款週期

Supabase 負責：

- User Account
- Authentication
- Session
- User ID
- 個人教材資料
- Access Status

本版本不建立：

- Group Entity
- Group ID
- Workspace Entity
- Temporary Access
- 第三方登入系統
- 固定價格資料

價格由 Billing System 管理，目前不寫死。

本版本同步影響：

- MVP Development
- Development Guidelines
- Database Design
- API Design
- UI Design
- MVP Task List
