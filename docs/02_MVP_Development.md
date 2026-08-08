# MagicBook 3.0 MVP Development

Version: 2.5

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-08

---

# Table of Contents

0. Product Positioning
1. System Architecture
2. MVP Purpose
3. Development Philosophy
4. Architecture Principles
5. Development Scope
6. Core Modules
7. User Flow
8. Screen Specifications
9. Functional Modules
10. Development Boundary
11. Acceptance Criteria
12. Development Sequence
13. AI Automation — Technical Validation & PM Decision 01
14. Change Log

---

# 0. Product Positioning

MagicBook 3.0 並非全新產品（New Product）。

MagicBook 2 已完成產品驗證（Product Validation），並已實際應用於教學現場。

MagicBook 3.0 為 MagicBook 2 的下一代版本（Next Generation）。

本次開發重點不是重新驗證產品，而是重新建立完整產品架構（Complete Product Architecture），提升系統的可維護性（Maintainability）、可擴充性（Scalability）、雲端能力（Cloud Capability）與 AI 整合能力（AI Integration）。

所有已於 MagicBook 2 驗證成功之核心功能，不得因 MVP 而移除。

若需重構，應改善系統架構，而非改變產品核心操作流程。

---

# 1. System Architecture

MagicBook 3.0 採用 Workspace（工作空間）架構。

Workspace 為整個系統最高層級（Root Entity）。

所有教材、使用者、設定、媒體、AI 使用紀錄與權限皆隸屬於 Workspace。

---

## 1.1 Workspace Types

MagicBook 提供兩種 Workspace。

### Personal Workspace（個人工作空間）

適用：

- 個人教師
- 家教老師
- 自學使用者

特色：

- 一位使用者擁有一個 Workspace
- 教材歸屬個人
- 採個人訂閱（Personal Subscription）

---

### Organization Workspace（機構工作空間）

適用：

- 補習班
- 學校
- 教育機構
- 公司

特色：

- 一個 Workspace 可包含多位使用者
- 教材歸屬 Workspace
- 採 Workspace 授權（Workspace License）
- 使用者依角色（Role）取得權限

預設角色：

- Owner
- Administrator
- Teacher

保留未來擴充更多角色。

---

## 1.2 Teaching Material Hierarchy

教材固定採用以下架構：

Workspace

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

Image Area

Text Area

HTML Overlay

Folder 為 Book Library 的教材分類工具。

使用者可建立、重新命名、刪除及管理 Folder。

Folder 可包含子資料夾（Nested Folder）及 Book。

Book 也可以直接存在於 Book Library 根目錄。

此資料架構於所有版本保持一致。

不得因功能增加而改變資料階層。

---

# 2. MVP Purpose

MagicBook 3.0 採分階段（Phased Development）方式開發。

第一版 MVP 並非傳統意義上的最小功能產品（Minimal Features）。

MagicBook 2 已完成產品驗證，因此 MagicBook 3.0 MVP 的目的為：

建立完整產品架構（Complete Product Architecture）。

第一版 MVP 必須完成：

- 完整產品架構（Architecture）
- 完整核心模組（Core Modules）
- 完整資料模型（Data Model）
- 完整 CRUD（Create / Read / Update / Delete）
- 完整主要使用者介面（Core UI）
- 完整使用者操作流程（User Flow）

第三方服務可逐步完善，但所有核心模組必須於 MVP 階段建立完成。

---

# 3. Development Philosophy

MagicBook 3.0 採用以下開發哲學。

---

## 3.1 Architecture First

優先建立完整產品架構（Complete Product Architecture）。

不得因 MVP 而刪除產品核心架構。

所有後續版本皆建立於相同架構之上。

---

## 3.2 Module Complete

所有核心模組（Core Modules）皆須建立。

包括：

- Image Area
- Text Area
- HTML Overlay
- Hotspot
- Dictionary
- AI
- Popup
- Audio
- Video
- Navigation
- Global Search
- Context Toolbar

MVP 不因功能簡化而移除已確認之核心模組。

---

## 3.3 CRUD Complete

所有核心模組皆須完成：

- Create
- Read
- Update
- Delete

並建立完整資料模型（Data Model）。

---

## 3.4 Teaching Material First

教材（Teaching Material）永遠是產品核心。

AI、Dictionary、Audio、Video、Translation、TTS 等皆屬工具（Tool）。

工具協助教材呈現與教學。

不得主導產品架構。

---

## 3.5 Replaceable Services

MagicBook 不綁定任何第三方服務。

包括：

- AI
- Dictionary
- Translation
- TTS
- Search

皆採 Replaceable Service Architecture。

支援：

- Claude
- GPT
- Gemini
- OpenRouter
- Future AI Providers

任何 Provider 均可替換。

不得影響教材資料。

---

## 3.6 Previous Version Baseline

MagicBook 3.0 建立於 MagicBook 2。

MagicBook 2 已完成產品驗證（Product Validation）。

所有已驗證成功之核心功能不得因 MVP 而移除。

若需重構，

應改善：

- 系統架構
- 可維護性
- 可擴充性

不得改變核心使用流程。

---

## 3.7 Documentation Principle

MagicBook 文件允許重要規格重複出現。

避免遺漏（Avoid Omission）

優先於

避免重複（Avoid Duplication）。

文件一致性（Consistency）

優先於

文件精簡（Conciseness）。

---

## 3.8 Reuse Before Reinvent

MagicBook 3.0 全部工程開發皆應遵循：

> Reuse Before Reinvent（先利用，再重新發明）

當產品需要某項技術能力時，工程應優先確認是否已有成熟技術可以直接使用或整合。

評估順序：

1. OS（作業系統）既有能力
2. Browser（瀏覽器）既有能力
3. HTML / CSS / JavaScript 原生能力
4. 成熟 Open Source Library（開源函式庫）
5. 成熟 Third-party Tool（第三方工具）
6. 最後才評估自行開發

例如：

Camera（相機）、圖片調整、圖片處理、圖片壓縮、影像辨識等能力，不應預設由 MagicBook 自行重新發明。

MagicBook 的責任是：

- 選擇適合的現有技術
- 整合現有技術
- 建立產品流程
- 驗證結果
- 在必要時提供產品層級的操作介面

而不是重新建立已經存在的基礎技術。

此原則適用於所有後續功能，不只適用於圖片或 Camera。

如果工程認為必須自行開發新的技術能力，

應先向 PM 說明：

- 現有技術為何無法使用
- 現有技術的限制
- 自行開發的必要性

未經確認，不得因工程方便或習慣而自行建立新的技術系統。

---

# 4. Architecture Principles

## 4.1 One Data Model

Editor Mode 與 Reading Mode

共用同一份教材資料。

不得建立兩套教材資料。

Editor Mode：

- Create
- Read
- Update
- Delete

Reading Mode：

- Read
- Interaction

不得修改教材。

---

## 4.2 Independent Modules

每個 Page 包含三個平行工作區：

- Image Area
- Text Area
- HTML Overlay

三者：

- 架構獨立
- 功能獨立
- 資料獨立
- 操作獨立

共同組成教材頁面。

不得互相依賴。

共同功能應建立 Shared Module。

---

## 4.3 Context Toolbar

MagicBook 全系統共用 Context Toolbar。

Toolbar：

- 平時隱藏
- 選取物件後自動顯示
- 完成操作後自動隱藏
- 可自由拖曳
- 可自由放置於畫面上下左右

Image、Text、Hotspot、HTML Overlay 等所有可編輯物件皆使用同一套 Toolbar。

---

## 4.4 Default First

Hotspot 採：

Default First

Advanced on Demand

點擊 Hotspot：

立即顯示預設資訊。

例如：

- 中文
- KK
- Pronunciation

若需更多功能，

再透過 Context Toolbar 開啟：

- Dictionary
- AI
- Audio
- Video
- Image
- URL
- Navigation

避免影響閱讀流程。

---

## 4.5 Media First

Image Area 並不限於圖片。

凡可作為教材視覺內容（Visual Teaching Material）之媒體，

皆可加入。

支援：

- PNG
- JPG
- JPEG
- PDF
- Image Import（圖片輸入）
- Video（影片）

Image Import 可包含：

- 使用者已拍攝的照片
- 截圖
- 從裝置選取的圖片檔案

MagicBook 不建立專用 Camera System（相機系統）。

使用者拍照由裝置本身負責。

MagicBook 僅接收使用者已取得的圖片。

未來可持續擴充更多媒體格式。

系統須自動執行：

- Media Optimization（媒體最佳化）
- Image Compression（圖片壓縮）
- Background Processing（背景處理）

若檔案超過系統限制，

須提示使用者，

不得直接造成系統失敗。

---

# 5. Development Scope

第一版 MVP 建立完整產品架構（Complete Product Architecture）。

所有核心模組（Core Modules）皆須建立。

所有核心模組皆須完成基本 CRUD（Create / Read / Update / Delete）。

第三方服務（Third-party Services）可使用 Placeholder、Mock Data 或後續串接正式 API，不影響產品架構。

---

## 5.1 Authentication

完成：

- Login
- Logout
- Session Management
- User Authentication
- Workspace Authentication

登入後依使用者權限進入對應 Workspace。

---

## 5.2 Workspace

完成：

- Personal Workspace
- Organization Workspace
- Workspace Selector
- Workspace Information
- Basic Workspace Settings

第一版不包含：

- Workspace Invitation
- Workspace Billing
- Workspace Analytics

---

## 5.3 Book Library

Book Library 為教材管理中心。

完成：

- Create Book
- Rename Book
- Delete Book
- Duplicate Book
- Search Book
- Recently Used

Book Library 支援：

- Folder
- Nested Folder
- Folder CRUD
- Folder Navigation
- Drag & Drop Sorting

使用者可選擇是否使用 Folder 分類教材。

Book 可以直接存在於 Book Library 根目錄，也可以放入 Folder。

---

## 5.4 Lesson

保留完整資料架構。

完成：

- Create Lesson
- Rename Lesson
- Delete Lesson
- Reorder Lesson

第一版可隱藏 Lesson 管理介面。

建立 Book 時，

系統自動建立 Default Lesson。

---

## 5.5 Page

完成：

- Add Page
- Delete Page
- Duplicate Page
- Reorder Page
- Page Navigation

Page 為教材最小管理單位。

---

## 5.6 Image Area

Image Area 負責教材視覺內容管理。

完成：

- Add Image
- Replace Image
- Delete Image
- Reorder Image

第一版支援：

- PNG
- JPG
- JPEG
- PDF
- Image Import（圖片輸入）

Image Import 包含：

- 使用者已拍攝之照片
- 截圖
- 從裝置選取之圖片檔案

MagicBook 不建立專用 Camera System。

使用者拍照由裝置原生功能負責。

MagicBook 只接收已取得的圖片。

系統需具備：

- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）
- Background Processing（背景處理）
- Large File Warning（大檔提示）

若檔案超過系統限制，

系統應提示使用者重新調整或壓縮後再上傳。

---

## 5.7 Text Area

完成：

- Add Text Block
- Edit Text Block
- Delete Text Block
- Reorder Text Block

每個 Page 可建立不限數量 Text Block。

第一版以基本文字編輯為主。

---

## 5.8 HTML Overlay

建立完整 HTML Overlay Layer。

HTML Overlay 為教材互動層（Interaction Layer）。

可覆蓋於教材內容：

- Image
- PDF

教材內容保持原貌。

所有互動資訊皆建立於 HTML Overlay。

HTML Overlay 負責：

- Hotspot Position
- Interactive Object Management
- Layer Management
- Object Rendering
- Object Selection

不得直接修改教材內容。

---

## 5.9 Hotspot

建立完整 Hotspot Module。

完成：

- Add
- Edit
- Delete
- Move
- Resize
- Save

Hotspot 為獨立互動物件（Interactive Object）。

所有 Hotspot 建立於 HTML Overlay Layer。

---

## 5.10 Popup

建立完整 Popup Module。

完成：

- Popup Editor
- Popup Layout
- Popup CRUD

Popup 採 Context Toolbar 機制。

平時隱藏。

選取物件後自動顯示。

完成操作後自動隱藏。

---

## 5.11 Dictionary

建立完整 Dictionary Module。

Dictionary 定位為 Lookup Tool。

完成：

- Dictionary Popup
- Word
- Chinese
- KK
- Pronunciation
- Example

Dictionary 提供查閱功能。

不提供收藏功能。

資料來源可後續替換。

---

## 5.12 AI

建立完整 AI Module。

完成：

- AI Panel
- Prompt Manager
- Conversation
- History
- AI Settings
- AI Provider Interface

AI 為產品工具（Tool）。

不是產品核心。

採 AI Provider 架構。

支援：

- Claude
- GPT
- Gemini
- OpenRouter
- Future Providers

不得綁定特定 AI 服務。

---

## 5.13 Audio

建立 Audio Module。

完成：

- Audio Player
- Audio CRUD
- Audio Settings

Audio 可由正式 API 或 Placeholder 提供。

---

## 5.14 Video

建立 Video Module。

完成：

- Video Player
- Video Source
- Video Settings

Video 可由正式來源或 Placeholder 提供。

---

## 5.15 Navigation

建立 Navigation Module。

負責：

- Home
- Back
- Page Navigation
- Book Navigation
- Lesson Navigation

Navigation 可與 Context Toolbar 整合。

---

## 5.16 Reading Mode

Reading Mode 與 Editor Mode 共用同一份教材資料。

支援：

- Hotspot
- Dictionary
- AI
- Audio
- Video
- Navigation

Reading Mode 不可修改教材內容。

---

# 6. Core Modules

MagicBook 3.0 採模組化架構（Modular Architecture）。

所有模組皆須保持獨立（Independent）、低耦合（Low Coupling）及可持續擴充（Scalable）。

---

## 6.1 Authentication Module

負責：

- User Login
- User Logout
- Session Management
- Workspace Authentication
- Permission Verification

---

## 6.2 Workspace Module

負責：

- Workspace Management
- Workspace Settings
- User Role
- Data Ownership

Workspace 為所有教材之最高資料歸屬。

---

## 6.3 Book Library Module

負責：

- Folder Navigation
- Book Navigation
- Search
- Recently Used
- Book Management

---

## 6.4 Folder Module

Folder 為 Book Library 的教材分類工具。

負責：

- Create Folder
- Rename Folder
- Delete Folder
- Move Folder
- Reorder Folder

支援：

- Nested Folder（子資料夾）
- Drag & Drop Sorting（拖曳排序）

Folder 可包含：

- Folder
- Book

Folder 不儲存教材內容。

Folder 僅負責教材分類與管理。

---

## 6.5 Book Module

負責：

- Book CRUD
- Book Search
- Recently Used
- Book Information

---

## 6.6 Lesson Module

負責：

- Lesson CRUD
- Lesson Order
- Lesson Information

第一版採預設 Lesson。

後續版本開放完整 Lesson 管理。

---

## 6.7 Page Module

負責：

- Page CRUD
- Page Order
- Page Navigation

Page 為教材最小管理單位。

---

## 6.8 Image Area Module

負責：

- Image Management
- PDF Management
- Image Rendering
- Image Optimization
- Image Compression
- Image Import

Image Import 負責接收：

- 使用者已拍攝的照片
- 截圖
- 從裝置選取的圖片檔案

MagicBook 不建立專用 Camera System。

Image Area 不負責互動。

教材內容保持原貌。

---

## 6.9 Text Area Module

負責：

- Text Block Management
- Text Editing
- Text Rendering

每個 Page 可建立不限數量 Text Block。

---

## 6.10 HTML Overlay Module

HTML Overlay 為教材互動層（Interaction Layer）。

負責：

- Overlay Layer
- Interactive Object Rendering
- Object Selection
- Layer Management

HTML Overlay 不修改教材內容。

所有互動皆建立於 Overlay Layer。

---

## 6.11 Hotspot Module

Hotspot 為獨立互動物件（Interactive Object）。

負責：

- Hotspot CRUD
- Position
- Resize
- Layer Order

Hotspot 建立於 HTML Overlay。

---

## 6.12 Context Toolbar Module

Context Toolbar 為全系統共用工具列。

負責：

- Tool Switching
- Floating Toolbar
- Auto Show
- Auto Hide
- Dragging
- Docking

所有可編輯物件共用同一套 Toolbar。

包括：

- Image
- Text
- HTML Overlay
- Hotspot

---

## 6.13 Popup Module

Popup 為互動資訊容器（Interaction Container）。

負責：

- Popup Layout
- Popup CRUD
- Popup Display

Popup 由 Context Toolbar 開啟。

---

## 6.14 Dictionary Module

Dictionary 為 Lookup Tool。

負責：

- Word Information
- Chinese
- KK
- Pronunciation
- Example

Dictionary 為查閱工具。

不是收藏系統。

---

## 6.15 AI Module

AI 為產品工具（Tool）。

負責：

- AI Conversation
- Prompt Management
- AI Provider
- AI History

AI Provider 可替換。

不得綁定特定 AI。

---

## 6.16 Audio Module

負責：

- Audio Player
- Audio Source
- Audio Settings

Audio Provider 可後續替換。

---

## 6.17 Video Module

負責：

- Video Player
- Video Source
- Video Settings

Video Provider 可後續替換。

---

## 6.18 Navigation Module

負責：

- Home
- Back
- Page Navigation
- Book Navigation
- Lesson Navigation

Navigation 為共用導覽功能。

---

## 6.19 Global Search Module

Global Search 為全系統共用搜尋模組（Shared Service）。

搜尋介面採 Floating Toolbar 模式。

平時只顯示 Search Icon（搜尋圖示）。

Search Icon 固定顯示於畫面右上方。

使用者不需要猜測搜尋功能的位置。

點擊 Search Icon 後，

展開 Search Toolbar。

Toolbar 可包含：

- Home
- Back
- Keyword Search
- Search Scope
- Close

其中：

- Home
- Back

屬於 Navigation（導覽）功能，

不是 Search 功能。

關閉 Search Toolbar 後，

Search Icon 必須繼續顯示於畫面右上方。

Search Toolbar 提供搜尋範圍（Search Scope）：

- All
- Folder
- Book
- Lesson
- Page
- Text
- Image
- PDF
- Hotspot
- Dictionary

提供：

- Keyword Search（關鍵字搜尋）
- Instant Search（即時搜尋）
- Search Suggestions（搜尋建議）
- Recent Search（最近搜尋）
- Search Result Navigation（搜尋結果導覽）

Global Search 可從使用者目前所在畫面開始搜尋。

搜尋結果可導向實際對應的：

- Folder
- Book
- Lesson
- Page
- Text
- Image
- PDF
- Hotspot
- Dictionary

搜尋不限制使用者只能看到單一層級的結果。

搜尋結果應協助使用者快速返回實際相關內容。

Global Search 不直接管理資料。

僅負責：

- Search
- Index
- Search Result Navigation

---

## 6.20 Save Module

負責：

- Save Dialog
- Auto Validation
- Save Status
- Cloud Storage

---

## 6.21 Reading Module

Reading Mode 與 Editor Mode 共用同一份教材資料。

負責：

- Reading UI
- Hotspot Interaction
- Popup Display
- Dictionary
- AI
- Audio
- Video
- Navigation

Reading Mode 僅提供閱讀與互動。

不得修改教材內容。

# 7. User Flow

MagicBook 3.0 提供兩種使用模式：

- Personal Workspace（個人工作空間）
- Organization Workspace（機構工作空間）

兩種模式共用相同產品架構。

差異僅在於：

- Workspace
- Data Ownership（資料歸屬）
- Permission（權限）

教材操作流程保持一致。

---

## 7.1 Login Flow

使用者開啟 MagicBook。

↓

Login

↓

Authentication

↓

選擇 Workspace（若使用者擁有多個 Workspace）

↓

Home

---

## 7.2 Home Flow

Home 提供：

- Create Book
- Open Book Library
- Recently Used Books
- Workspace Information
- Settings

使用者可：

Home

↓

Create Book

或

↓

Book Library

---

## 7.3 Book Editing Flow

Home

↓

Create Book

↓

Book Editor

↓

Create Page

↓

Image Area

↓

Image Import

↓

Text Area

↓

Add Text Block

↓

HTML Overlay

↓

Create Hotspot

↓

Context Toolbar

↓

Popup

↓

Dictionary / AI / Audio / Video

↓

Save Book

↓

Book Library

### Image Import

Image Import 可接收：

- 使用者已拍攝的照片
- 截圖
- 從裝置選取的圖片檔案

MagicBook 不建立專用 Camera System（相機系統）。

使用者拍照由裝置本身負責。

MagicBook 僅接收使用者已取得的圖片。

---

## 7.4 Book Library Flow

Book Library 為教材管理中心。

提供：

- Search Book
- Create Book
- Open Book（Book Editor）
- Open Reading（Reading Mode）
- Rename Book
- Duplicate Book
- Delete Book
- Recently Used
- Folder Management

操作流程：

Book Library

↓

Search

↓

Select Result

↓

可執行：

- Open Book（Book Editor）
- Open Reading（Reading Mode）
- Rename Book
- Duplicate Book
- Delete Book
- Move to Folder

---

## 7.5 Reading Flow

Book Library

↓

Open Reading

↓

Reading Mode

↓

Click Hotspot

↓

Default Popup

（Chinese / KK / Pronunciation）

↓

Context Toolbar

↓

Dictionary

AI

Audio

Video

↓

Continue Reading

---

## 7.6 Editor Mode

Editor Mode 提供完整教材編輯能力。

包含：

- Book CRUD
- Lesson CRUD
- Page CRUD
- Image CRUD
- Text CRUD
- HTML Overlay CRUD
- Hotspot CRUD
- Popup CRUD

Editor Mode 可修改教材內容。

---

## 7.7 Reading Mode

Reading Mode 不可修改教材內容。

提供：

- Hotspot Interaction
- Dictionary Lookup
- AI Assistance
- Audio
- Video
- Navigation

Reading Mode 與 Editor Mode 共用同一份教材資料。

---

## 7.8 Save Flow

Book Editor

↓

Save

↓

Auto Validation

↓

Cloud Storage（Supabase）

↓

Book Library

↓

可選擇：

- Continue Editing
- Open Reading

---

## 7.9 Unsaved Changes

若教材尚未儲存，

使用者離開 Editor 時，

系統應提示：

> 尚未儲存教材，離開後資料將遺失。

提供：

- Continue Editing
- Leave Without Saving

避免教材內容遺失。

---

## 7.10 Error Handling

若發生：

- Login Failure
- Upload Failure
- Save Failure
- Network Failure

系統應：

- 顯示錯誤訊息
- 保留目前教材
- 提供 Retry
- 不得直接關閉編輯畫面
- 不得遺失使用者目前編輯內容

---

# 8. Screen Specifications

MagicBook 3.0 所有畫面皆遵循一致設計原則：

- Consistency（一致性）
- Modular（模組化）
- Scalable（可擴充）
- Teaching Material First（教材優先）

所有畫面皆須保持一致的操作邏輯。

不得因後續功能增加而重新設計主要介面。

---

## 8.1 Login

MagicBook 提供兩種登入模式。

### Personal Workspace

適用：

- 個人教師
- 家教老師
- 自學使用者

提供：

- Email Login
- Google Login
- Password Login
- Forgot Password
- Remember Me

第一次登入：

系統自動建立 Personal Workspace。

登入成功後進入 Home。

---

### Organization Workspace

適用：

- 補習班
- 學校
- 教育機構

Workspace Administrator 建立：

- Teacher Account
- Password

教師使用：

- Account
- Password

登入。

登入成功後直接進入所屬 Organization Workspace。

不得使用個人 Google Account 登入機構 Workspace。

---

## 8.2 Home

Home 為產品入口畫面。

提供：

- Create Book
- Open Book Library
- Recently Used Books
- Workspace Information
- Settings

Home 不負責教材管理。

教材管理由 Book Library 負責。

---

## 8.3 Book Library

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
- Open Book（Book Editor）
- Open Reading（Reading Mode）

Folder 支援：

- Create Folder
- Rename Folder
- Delete Folder
- Move Folder
- Reorder Folder
- Nested Folder

Book 可以：

- 直接存在於 Book Library 根目錄
- 放入 Folder
- 在 Folder 之間移動

Search Icon 固定顯示於畫面右上方。

點擊後展開 Floating Search Toolbar。

關閉搜尋後，

Search Icon 仍保留於畫面右上方。

教材可依：

- Recently Used
- Create Time

排序。

---

## 8.4 Book Editor

Book Editor 為教材編輯中心。

固定包含：

- Page Manager
- Image Area
- Text Area
- HTML Overlay

Editor 採左右雙工作區（Dual Workspace）。

提供：

- 左右工作區自由調整比例
- Image Area 可獨立放大或縮小
- Text Area 可獨立放大或縮小
- 快速恢復預設版面配置

桌機／筆電：

- 拖曳中間分隔線調整工作區大小

平板／手機／觸控裝置：

- 支援雙指縮放（Pinch Zoom）

Image Area、Text Area 與 HTML Overlay

共同隸屬於同一個 Page。

三者：

- 架構獨立
- 功能獨立
- 資料獨立
- 操作獨立

除共同隸屬於同一個 Page 外，

不得建立任何未定義的互動關係。

---

## 8.5 Page Manager

提供：

- Add Page
- Delete Page
- Duplicate Page
- Reorder Page
- Page Navigation

Page 為教材最小管理單位。

所有教材內容皆建立於 Page。

---

## 8.6 Image Area

Image Area 為教材圖片工作區。

提供：

- Add Image
- Replace Image
- Delete Image
- Reorder Image

第一版支援：

- PNG
- JPG
- JPEG
- PDF
- Image Import（圖片輸入）

Image Import 包含：

- 使用者已拍攝之照片
- 截圖
- 從裝置選取之圖片檔案

MagicBook 不建立專用 Camera System。

使用者拍照由裝置原生功能負責。

MagicBook 只接收已取得的圖片。

系統自動：

- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）
- Background Processing（背景處理）

若檔案超過系統限制，

應提示使用者重新調整後再上傳。

---

## 8.7 Text Area

Text Area 為文字工作區。

提供：

- Add Text Block
- Edit Text Block
- Delete Text Block
- Reorder Text Block

每個 Page 可建立不限數量 Text Block。

第一版提供基本文字編輯。

後續可持續擴充更多文字功能。

---

## 8.8 HTML Overlay

HTML Overlay 為教材互動層（Interaction Layer）。

可覆蓋於：

- Image
- PDF

教材內容保持原貌。

所有互動資訊皆建立於 HTML Overlay。

HTML Overlay 負責：

- Layer Management
- Interactive Object Rendering
- Object Selection
- Object Position
- Object Resize

不得直接修改教材內容。

---

## 8.9 Hotspot

Hotspot 為 HTML Overlay 上的互動物件（Interactive Object）。

提供：

- Add
- Edit
- Delete
- Move
- Resize
- Save

Hotspot 不修改教材。

僅記錄：

- Position
- Properties
- Actions

---

## 8.10 Context Toolbar

Context Toolbar 為全系統共用工具列。

Toolbar：

- 預設隱藏
- 選取物件後自動顯示
- 完成操作後自動隱藏
- 可自由拖曳
- 可停靠畫面上下左右任意位置

所有可編輯物件共用同一套 Toolbar。

包括：

- Image
- Text
- HTML Overlay
- Hotspot

---

## 8.11 Popup

Popup 為互動資訊視窗。

點擊 Hotspot：

立即顯示 Default Popup。

預設顯示：

- Chinese
- KK
- Pronunciation

若需要更多功能，

可由 Context Toolbar 開啟：

- Dictionary
- AI
- Audio
- Video
- Image
- URL
- Navigation

Popup 為所有互動功能共同入口。

---

## 8.12 Save Dialog

點擊 Save 後，

顯示 Save Dialog。

提供：

- Book Name
- Save

儲存成功後返回 Book Library。

使用者可選擇：

- Continue Editing
- Open Reading

---

## 8.13 Reading Mode

Reading Mode 與 Editor Mode 共用同一份教材資料。

閱讀模式隱藏：

- Header
- Editor Toolbar
- Management Buttons

保留：

- Hotspot
- Popup
- Dictionary
- AI
- Audio
- Video
- Navigation

Reading Mode 僅提供閱讀與互動。

不得修改教材內容。

---

## 8.14 Settings

提供：

### Workspace

- Workspace Information
- Workspace Settings

### User

- Account
- Password
- Language

### AI

- AI Provider
- AI Settings

所有第三方服務皆採 Replaceable Service Architecture。

不得綁定任何特定 AI、Dictionary、TTS 或其他第三方服務。

---

# 9. Functional Modules

MagicBook 3.0 採模組化架構（Modular Architecture）。

所有核心模組皆須：

- 可獨立開發（Independent Development）
- 可獨立測試（Independent Testing）
- 可獨立維護（Independent Maintenance）
- 可持續擴充（Scalable）

所有模組皆應遵循：

- Teaching Material First（教材優先）
- Low Coupling（低耦合）
- Replaceable Service（服務可替換）
- Reuse Before Reinvent（先利用，再重新發明）

各模組透過統一資料架構協同運作。

不得直接依賴其他模組。

---

## 9.1 Authentication Module

負責：

- Login
- Logout
- Authentication
- Session Management
- User Identity Verification

支援：

- Personal Workspace
- Organization Workspace

---

## 9.2 Workspace Module

Workspace 為系統最高管理單位（Root Entity）。

負責：

- Workspace Information
- Workspace Settings
- User Management
- Teacher Account Management
- Permission Management
- Data Ownership

支援：

- Personal Workspace
- Organization Workspace

---

## 9.3 Book Library Module

Book Library 為教材管理中心。

負責：

- Folder Navigation
- Book Navigation
- Search
- Recently Used
- Book Management

Book Library 為所有教材操作入口。

---

## 9.4 Folder Module

Folder 為教材分類工具。

負責：

- Create Folder
- Rename Folder
- Delete Folder
- Move Folder
- Reorder Folder

支援：

- Nested Folder（子資料夾）
- Drag & Drop Sorting（拖曳排序）

Folder 可包含：

- Folder
- Book

Folder 不儲存教材內容。

Folder 僅負責教材分類與管理。

---

## 9.5 Book Module

Book 為教材管理單位。

負責：

- Create Book
- Rename Book
- Duplicate Book
- Delete Book
- Open Book

Book 包含：

- Lesson
- Page

---

## 9.6 Lesson Module

Lesson 為教材章節管理單位。

負責：

- Create Lesson
- Rename Lesson
- Delete Lesson
- Reorder Lesson

Lesson 隸屬於 Book。

---

## 9.7 Page Module

Page 為教材最小管理單位。

負責：

- Add Page
- Delete Page
- Duplicate Page
- Reorder Page
- Page Navigation

每個 Page 包含：

- Image Area
- Text Area
- HTML Overlay

---

## 9.8 Image Area Module

Image Area 為教材圖片工作區。

負責：

- Add Image
- Replace Image
- Delete Image
- Reorder Image
- Image Import
- Image Optimization
- Image Compression

支援：

- PNG
- JPG
- JPEG
- PDF
- Image Import（圖片輸入）

Image Import 包含：

- 使用者已拍攝的照片
- 截圖
- 從裝置選取的圖片檔案

MagicBook 不建立專用 Camera System。

使用者拍照由裝置原生功能負責。

MagicBook 只接收已取得的圖片。

系統自動：

- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）
- Background Processing（背景處理）

若圖片超過系統限制，

應提示使用者重新調整後再上傳。

教材內容保持原貌。

所有互動由 HTML Overlay 負責。

---

## 9.9 Text Area Module

Text Area 為文字工作區。

負責：

- Add Text Block
- Edit Text Block
- Delete Text Block
- Reorder Text Block

每個 Page 可建立不限數量 Text Block。

---

## 9.10 HTML Overlay Module

HTML Overlay 為教材互動層（Interaction Layer）。

負責：

- Layer Management
- Interactive Object Rendering
- Object Selection
- Object Position
- Object Resize

HTML Overlay 可覆蓋於：

- Image
- PDF

教材內容保持原貌。

所有互動皆建立於 HTML Overlay。

---

## 9.11 Hotspot Module

Hotspot 為互動物件（Interactive Object）。

負責：

- Add
- Edit
- Delete
- Move
- Resize
- Save

Hotspot 記錄：

- Position
- Properties
- Actions

所有 Hotspot 建立於 HTML Overlay。

---

## 9.12 Context Toolbar Module

Context Toolbar 為全系統共用工具列。

負責：

- Tool Switching
- Floating Toolbar
- Auto Show
- Auto Hide
- Dragging
- Docking

所有可編輯物件共用同一套 Toolbar。

包括：

- Image
- Text
- HTML Overlay
- Hotspot

---

## 9.13 Popup Module

Popup 為互動資訊視窗。

負責：

- Default Popup
- Popup Rendering
- Popup Layout

點擊 Hotspot：

立即顯示 Default Popup。

預設內容：

- Chinese
- KK
- Pronunciation

其他功能由 Context Toolbar 開啟。

---

## 9.14 Dictionary Module

Dictionary 為 Lookup Tool。

負責：

- Word
- Chinese
- KK
- Pronunciation
- Example
- AI Assistance

Dictionary 僅提供查閱。

不提供收藏功能。

---

## 9.15 AI Module

AI 為產品工具（Tool）。

負責：

- AI Panel
- Prompt Manager
- Conversation
- History
- AI Settings
- AI Provider Interface

採 Replaceable Provider Architecture。

支援：

- Claude
- GPT
- Gemini
- OpenRouter
- Future Providers

不得綁定任何特定 AI 服務。

---

## 9.16 Audio Module

負責：

- Audio Player
- Audio Source
- Audio Settings

Audio Provider 可自由替換。

---

## 9.17 Video Module

負責：

- Video Player
- Video Source
- Video Settings

Video Provider 可自由替換。

---

## 9.18 Navigation Module

負責：

- Home
- Back
- Page Navigation
- Book Navigation
- Lesson Navigation

Navigation 為共用導覽功能。

---

## 9.19 Global Search Module

Global Search 為全系統共用搜尋模組（Shared Service）。

搜尋採 Floating Toolbar 模式。

平時只顯示 Search Icon。

Search Icon 固定顯示於畫面右上方。

點擊 Search Icon 後展開 Search Toolbar。

Search Toolbar 可包含：

- Home
- Back
- Keyword Search
- Search Scope
- Close

其中：

- Home
- Back

屬於 Navigation（導覽）功能，

不是 Search 功能。

關閉 Search Toolbar 後，

Search Icon 必須繼續顯示於畫面右上方。

提供搜尋範圍（Search Scope）：

- All
- Folder
- Book
- Lesson
- Page
- Text
- Image
- PDF
- Hotspot
- Dictionary

提供：

- Keyword Search（關鍵字搜尋）
- Instant Search（即時搜尋）
- Search Suggestions（搜尋建議）
- Recent Search（最近搜尋）
- Search Result Navigation（搜尋結果導覽）

搜尋可從使用者目前所在畫面開始。

搜尋結果可導向實際相關內容。

Global Search 不直接管理資料。

僅負責：

- Search
- Index
- Search Result Navigation

---

## 9.20 Save Module

負責：

- Save Dialog
- Auto Validation
- Save Status
- Cloud Storage

---

## 9.21 Reading Module

Reading Mode 與 Editor Mode 共用同一份教材資料。

負責：

- Reading UI
- Hotspot Interaction
- Popup
- Dictionary
- AI
- Audio
- Video
- Navigation

Reading Mode 僅提供閱讀與互動。

不得修改教材內容。

---

# 10. Development Boundary

MagicBook 3.0 第一階段建立完整產品架構（Complete Product Architecture）。

所有核心模組皆須建立完整資料架構、使用者介面（UI）與 CRUD（Create、Read、Update、Delete）能力。

第三方服務（Third-party Services）可依實際開發進度逐步完成串接。

本階段開發遵循以下原則：

- 不變更產品架構（Architecture）
- 不刪除已確認功能（Confirmed Features）
- 不新增未確認功能（Undefined Features）
- 不因技術限制修改使用者操作流程（User Flow）
- Reuse Before Reinvent（先利用，再重新發明）

若需新增功能或修改需求，

應先更新：

- Product Specification
- MVP Development

完成 Specification Consistency Review 後，

再更新其他相關文件。

所有新增功能皆須遵循：

- Modular Architecture（模組化架構）
- Teaching Material First（教材優先）
- Replaceable Service（服務可替換）
- Global Search（全域搜尋）
- Context Toolbar（共用浮動工具列）
- Reuse Before Reinvent（先利用，再重新發明）

不得建立獨立且不一致的操作流程。

---

# 11. Acceptance Criteria

MagicBook 3.0 MVP 完成後，應符合以下驗收標準（Acceptance Criteria）。

所有核心模組皆須完成資料架構（Data Model）、使用者介面（UI）、CRUD（Create、Read、Update、Delete）與完整操作流程（User Flow）。

第三方服務（Third-party Services）可採 Placeholder 或 Mock Data，正式 API 可於後續版本串接，但不得影響產品架構。

---

## 11.1 Authentication

系統應支援：

- Email Login
- Google Login
- Logout
- Remember Me
- Forgot Password
- Session Management
- User Authentication

登入後應依使用者身分進入正確 Workspace。

---

## 11.2 Workspace

Workspace 應支援：

- Personal Workspace（個人）
- Organization Workspace（機構）

Organization Workspace：

由 Workspace 管理者建立教師帳號。

教師使用 Workspace 提供之帳號與密碼登入。

不得使用個人帳號直接加入 Organization Workspace。

不同 Workspace 間資料不得互相存取。

所有教材皆應依 Workspace 正確歸屬。

---

## 11.3 Book Library

Book Library 應提供：

### Folder

- Create Folder
- Rename Folder
- Delete Folder
- Move Folder
- Reorder Folder

Folder 應支援：

- Nested Folder（子資料夾）
- Drag & Drop Sorting（拖曳排序）

Folder 可包含：

- Folder
- Book

Folder 不儲存教材內容。

Folder 僅負責教材分類與管理。

Book 應支援：

- Create Book
- Rename Book
- Duplicate Book
- Delete Book
- Open Book

Book Library 應提供：

- Search
- Recently Used

Book 應可：

- 拖曳至 Folder
- 移動至其他 Folder
- 保留於 Book Library 根目錄

Folder 應可：

- 建立子資料夾
- 拖曳返回根目錄

不得跨越不允許的資料層級拖曳。

---

## 11.4 Lesson

使用者應可：

- Create Lesson
- Rename Lesson
- Delete Lesson
- Reorder Lesson

建立 Book 時，

系統自動建立 Default Lesson。

Lesson 應正確隸屬於 Book。

---

## 11.5 Page

使用者應可：

- Add Page
- Delete Page
- Duplicate Page
- Reorder Page
- Page Navigation

Page 為教材最小管理單位。

---

## 11.6 Book Editor

Book Editor 應包含：

- Page Manager
- Image Area
- Text Area
- HTML Overlay

桌機／筆電：

- 可拖曳分隔線調整 Image Area 與 Text Area 大小。

手機／平板：

- 支援雙指縮放（Pinch Zoom）。

Image Area 與 Text Area：

可獨立放大、縮小。

可恢復預設版面。

---

## 11.7 Image Area

使用者應可：

- 匯入 PNG
- 匯入 JPG
- 匯入 JPEG
- 匯入 PDF
- Image Import（圖片輸入）

Image Import 可包含：

- 使用者已拍攝的照片
- 截圖
- 從裝置選取的圖片檔案

MagicBook 不建立專用 Camera System。

使用者拍照由裝置原生功能負責。

MagicBook 只接收已取得的圖片。

系統應：

- 自動最佳化圖片
- 自動壓縮圖片
- 背景處理
- 大檔提示

教材內容保持原貌。

所有互動由 HTML Overlay 建立。

---

## 11.8 Text Area

使用者應可：

- Add Text Block
- Edit Text Block
- Delete Text Block
- Reorder Text Block

每個 Page 可建立不限數量 Text Block。

---

## 11.9 HTML Overlay

HTML Overlay 為教材互動層。

應：

- 建立於教材之上
- 不修改教材內容
- 可建立互動物件
- 可管理 Layer
- 可儲存 Overlay 資料

HTML Overlay 可覆蓋：

- Image
- PDF

所有互動皆建立於 HTML Overlay。

---

## 11.10 Hotspot

使用者應可：

- Add
- Edit
- Delete
- Move
- Resize
- Save

Hotspot 建立於 HTML Overlay。

每個 Hotspot 應記錄：

- Position
- Properties
- Actions

點擊 Hotspot：

立即顯示 Default Popup。

---

## 11.11 Context Toolbar

Context Toolbar 為全系統共用工具列。

所有可編輯物件皆共用同一套 Context Toolbar。

包括：

- Image
- Text
- HTML Overlay
- Hotspot

Toolbar 應符合：

- Auto Show（自動顯示）
- Auto Hide（自動隱藏）
- Floating（浮動）
- Draggable（可拖曳）
- Dockable（可停靠）

Toolbar 可停靠於：

- 上方
- 下方
- 左側
- 右側

Toolbar 不得遮蔽教材主要內容。

---

## 11.12 Popup

點擊 Hotspot：

立即顯示 Default Popup。

預設顯示：

- Chinese
- KK
- Pronunciation

其他功能由 Context Toolbar 開啟。

Popup 應支援：

- Popup Layout
- Popup Rendering
- Popup CRUD

Popup 為資訊顯示容器。

不直接修改教材內容。

---

## 11.13 Dictionary

Dictionary 為 Lookup Tool（查閱工具）。

提供：

- Word
- Chinese
- KK
- Pronunciation
- Example
- AI Assistance

Dictionary 僅供查閱。

不提供收藏功能。

Dictionary 資料來源可自由替換。

不得影響教材資料。

---

## 11.14 AI

AI 為產品工具（Tool）。

應提供：

- AI Panel
- Prompt Manager
- Conversation
- History
- AI Settings
- AI Provider Interface

AI 採 Replaceable Provider Architecture。

Provider 可自由替換：

- Claude
- GPT
- Gemini
- OpenRouter
- Future Providers

不得綁定任何特定 AI。

更換 AI Provider 不得影響教材資料。

---

## 11.15 Audio

Audio 應提供：

- Audio Player
- Audio Source
- Audio Settings

Audio Provider 可自由替換。

Audio 不得影響教材資料。

---

## 11.16 Video

Video 應提供：

- Video Player
- Video Source
- Video Settings

Video Provider 可自由替換。

Video 不得影響教材資料。

---

## 11.17 Navigation

Navigation 應提供：

- Home
- Back
- Page Navigation
- Book Navigation
- Lesson Navigation

Navigation 為共用導覽功能。

---

## 11.18 Global Search

Global Search 為全系統共用搜尋模組。

Search Icon 應固定顯示於畫面右上方。

平時僅顯示 Search Icon。

點擊 Search Icon 後展開 Floating Search Toolbar。

Toolbar 可包含：

- Home
- Back
- Keyword Search
- Search Scope
- Close

其中 Home、Back 屬於 Navigation 功能。

關閉 Search Toolbar 後，

Search Icon 必須繼續顯示。

提供：

- Keyword Search
- Instant Search
- Search Suggestions
- Recent Search
- Search Result Navigation

提供 Search Scope：

- All
- Folder
- Book
- Lesson
- Page
- Text
- Image
- PDF
- Hotspot
- Dictionary

搜尋結果可導向使用者實際相關內容。

搜尋不限制使用者只能看到單一資料層級的結果。

Global Search 不直接修改資料。

僅負責搜尋、索引與搜尋結果導覽。

---

## 11.19 Save

使用者應可：

- Save Book
- Auto Validation
- Continue Editing
- Open Reading Mode

教材資料應正確儲存至 Cloud Storage（Supabase）。

不得因網路異常造成教材遺失。

---

## 11.20 Reading Mode

Reading Mode 與 Editor Mode

共用同一份教材資料。

Reading Mode 提供：

- Hotspot
- Popup
- Dictionary
- AI
- Audio
- Video
- Navigation

Reading Mode 僅提供閱讀與互動。

不得修改教材內容。

---

## 11.21 System Performance

MagicBook 執行背景工作（Background Processing）時，

系統不得凍結操作介面。

不得讓使用者誤認系統已停止運作。

所有背景工作皆應顯示 Loading Animation（品牌動畫）。

### Loading Animation

MagicBook 採 Brand Character Animation（品牌角色動畫）。

不使用傳統 Loading Bar。

Loading Animation 應符合：

- 採持續動作動畫（如奔跑、搬運、飛行等）。
- 不使用靜態圖片。
- 動畫持續播放至工作完成。
- 工作完成後自動關閉。
- 不使用大量文字說明工作狀態。

### Animation Position

Loading Animation 顯示於畫面中央。

背景工作期間，

使用者無須操作教材，

因此動畫可置於畫面中央，

提供清楚的工作狀態回饋。

### Animation Size

品牌角色動畫約佔畫面 15%。

系統應依不同裝置（桌機、筆電、平板、手機）

自動調整實際尺寸，

維持約 15% 的視覺比例，

確保動畫清楚可見。

### Supported Background Tasks

Loading Animation 適用於：

- 匯入圖片
- 匯入 PDF
- 圖片最佳化
- 圖片壓縮
- 儲存教材
- AI 處理
- 搜尋
- 其他背景工作

### Brand Character

品牌角色可依工作內容播放不同動畫，例如：

- 小松鼠奔跑
- 小狐狸奔跑
- 小企鵝搬教材
- 貓頭鷹飛行

品牌角色可依節日、活動或版本更新替換。

系統可採 Random Character（隨機角色）機制，

增加品牌辨識度與產品趣味性。

品牌角色以動作呈現系統工作狀態，

不得以大量文字取代動畫。

---

## 11.22 Architecture

MagicBook 3.0 MVP 驗收標準為：

- 完整產品架構（Complete Product Architecture）
- 完整核心模組（Core Modules）
- 完整資料模型（Data Model）
- 完整 CRUD
- 完整 User Flow
- 完整 UI

所有核心模組皆須：

- 可獨立開發
- 可獨立測試
- 可獨立維護
- 可持續擴充

所有第三方服務皆須符合：

Replaceable Service（服務可替換）原則。

不得因更換 AI、Dictionary、Audio、Video 或其他第三方服務，

影響教材資料、產品架構或使用者操作流程（User Flow）。

所有新增技術能力皆須遵循：

Reuse Before Reinvent（先利用，再重新發明）。

---

# 12. Development Sequence

MagicBook 3.0 採模組化開發（Modular Development）。

各模組可獨立開發，

但建議依下列順序完成。

---

## Phase 1

System Foundation

- Authentication
- Workspace
- Database
- Book Library

---

## Phase 2

Book Structure

- Folder
- Book
- Lesson
- Page

完成教材基本架構。

---

## Phase 3

Editor

建立 Book Editor。

包含：

- Page Manager
- Image Area
- Text Area
- HTML Overlay

完成教材編輯能力。

---

## Phase 4

Interaction

完成：

- Hotspot
- Popup
- Dictionary
- Audio
- Video
- Navigation

建立教材互動能力。

---

## Phase 5

AI

完成：

- AI Panel
- Prompt Manager
- AI Provider Interface
- Conversation
- History

正式串接 AI Provider。

---

## Phase 6

Reading

完成：

- Reading Mode
- Navigation
- Reading UI

Reading Mode 與 Editor 共用同一份教材資料。

---

## Phase 7

System Services

完成：

- Global Search
- Save
- Background Processing
- Loading Animation

建立共用系統服務。

---

## Phase 8

Optimization

完成：

- Performance Optimization
- UI Optimization
- Database Optimization
- API Optimization

完成第一版 MVP。

下面是最後一批：**第 13～14 節**。
這一批把目前已確認的 **PM Decision 01 + Image Import + Reuse Before Reinvent + Quality Check / Auto Correction / Re-Quality Check** 全部整合。

特別修正你剛才指出的原則：

* **MagicBook 不是照片倉庫**
* 不保留「Original Image」作為永久資產的規格
* 照片只是輸入教材的來源
* 如果最後無法可靠建立互動內容，**直接拒絕**
* 不產生錯誤 Hotspot
* 使用者在輸入照片後，可以利用現有成熟的圖片調整能力調整，再決定送出或重拍
* **不建立自己的 Camera System**
* 不做一套像你截圖那種「必須下載 App 才能拍照」的系統
* 優先利用裝置、瀏覽器、HTML、既有函式庫與成熟工具

直接把下面接到上一批第 12 節後面即可。

````markdown
# 13. AI Automation — Technical Validation & PM Decision 01

本章記錄 MagicBook 3.0 AI Automation（AI 自動化）相關功能之 Technical Validation（技術驗證）與 PM Decision（產品決策）。

本章內容分為：

1. Technical Evidence（技術證據）
2. Confirmed Product Behavior（已確認產品行為）
3. Pending PM Decision（尚待 PM 決策）

Technical Evidence 不等同於 Production Threshold（正式產品門檻）。

Benchmark 數據不得直接轉換為 Production Logic（正式產品邏輯），除非經 PM 正式核定。

---

## 13.1 Scope

本次 AI Automation 主要處理：

使用者將教材圖片輸入 Image Area 後，

系統協助判斷圖片是否適合建立互動內容，

必要時進行 Auto Correction（自動修正），

再進行 OCR / AI（文字辨識／人工智慧處理），

最後建立 Hotspot（互動點）。

核心流程：

```text
Image Import
      ↓
Image Quality Check
      ↓
判斷是否需要修正
      ↓
Auto Correction（必要時）
      ↓
Re-Quality Check
      ↓
OCR / AI
      ↓
Text + Bounding Box
      ↓
Hotspot Generator
      ↓
HTML Overlay
      ↓
Hotspot
````

---

# 13.2 Image Import — Product Boundary

MagicBook 不建立專用 Camera System（相機系統）。

MagicBook 不負責：

* Camera Hardware Control（相機硬體控制）
* Exposure Control（曝光控制）
* Focus Control（對焦控制）
* HDR Control
* Camera Preview System（專用相機預覽系統）
* 自行建立 Camera App

使用者拍照由裝置原生功能負責。

MagicBook 的責任是：

> 接收使用者已經取得的圖片，並將圖片轉換成教材內容。

Image Import 可包含：

* 使用者已拍攝的照片
* 截圖
* 從裝置選取的圖片檔案

MagicBook 不要求使用者為了拍照而下載另一套專用 Camera App。

---

# 13.3 Reuse Before Reinvent — Image Input

Image Input（圖片輸入）必須遵循：

> Reuse Before Reinvent（先利用，再重新發明）

MagicBook 應優先使用裝置與瀏覽器已存在的能力。

優先順序：

1. OS（作業系統）既有能力
2. Browser（瀏覽器）既有能力
3. HTML / CSS / JavaScript 原生能力
4. 成熟 Open Source Library（開源函式庫）
5. 成熟 Third-party Tool（第三方工具）
6. 最後才評估自行開發

因此：

MagicBook 不應自行重新發明 Camera System。

同樣原則適用於：

* Image Editing（圖片編輯）
* Brightness Adjustment（亮度調整）
* Contrast Adjustment（對比調整）
* Crop（裁切）
* Rotate（旋轉）
* Image Compression（圖片壓縮）
* Image Processing（影像處理）
* OCR（文字辨識）
* AI Processing（AI 處理）

工程若認為現有技術不足，

必須先說明：

* 現有技術為何無法使用
* 限制為何
* 為何需要自行開發

未經 PM 確認，

不得自行建立新的底層技術系統。

---

# 13.4 Image Adjustment — User Control

圖片輸入後，

不論圖片目前是否被判定為可用，

使用者都應有機會先進行必要的圖片調整。

可提供：

* Brightness（亮度）
* Contrast（對比）
* Color（色彩）
* Rotate（旋轉）
* Crop（裁切）

以及：

* Retake / Re-select（重新拍攝／重新選取）

這些功能應優先利用：

* 裝置既有能力
* Browser 原生能力
* HTML / CSS / JavaScript
* 成熟 Image Processing Library（影像處理函式庫）
* 成熟第三方工具

MagicBook 不需要自行發明一套新的圖片編輯技術。

---

## 13.4.1 Brightness Adjustment

若使用者取得的圖片太暗，

可以提供 Brightness Adjustment（亮度調整）。

這個操作的概念可以借力使力於使用者已熟悉的產品操作方式，

例如：

* 手機照片調整
* PowerPoint 圖片色彩工具
* 其他成熟圖片編輯工具

目的不是複製 PowerPoint，

而是使用已被驗證的操作概念降低學習成本。

MagicBook 不需要自行發明新的 Brightness Control。

---

## 13.4.2 Retake / Re-select

使用者可選擇：

* Retake（重新拍攝）
* Re-select（重新選取圖片）

MagicBook 不負責實作 Camera Hardware。

Retake 的實際拍攝動作由裝置原生相機完成。

拍攝完成後重新回到 Image Import。

---

# 13.5 Image Quality Check

Image Quality Check（圖片品質檢查）負責判斷：

> 這張圖片是否有足夠品質可靠建立互動內容？

目前 Benchmark 測試過：

* Blur（模糊）
* Brightness（亮度）
* Contrast（對比）
* Skew / Tilt（傾斜）
* Noise（雜訊）

其中：

### Blur

使用：

Laplacian Variance（拉普拉斯變異數）

作為影像銳利度參考。

### Skew

使用：

Projection Profile（投影輪廓）

偵測文字排列方向。

### Contrast

使用：

Grayscale Standard Deviation（灰階標準差）

作為對比度參考。

### Noise

目前已確認：

單純使用 Blur 指標不足以判斷 Noise。

因此 Noise Detection（雜訊偵測）不得單獨依賴 Laplacian。

---

# 13.6 Technical Benchmark Result

第一輪 Benchmark：

15 種代表性情境。

三條 Pipeline：

### Pipeline A — Baseline

```text
Original Input
↓
OCR
↓
Hotspot Generator
```

### Pipeline B — Quality Check Only

```text
Image
↓
Quality Check
↓
OCR
↓
Hotspot Generator
```

### Pipeline C — Full Pipeline

```text
Image
↓
Quality Check
↓
Auto Correction
↓
Re-Quality Check
↓
OCR
↓
Hotspot Generator
```

Benchmark 結果：

| Pipeline           |   SUCCESS | PARTIAL |  FAIL |
| ------------------ | --------: | ------: | ----: |
| Baseline           |     40.0% |   33.3% | 26.7% |
| Quality Check Only |     33.3% |   26.7% | 40.0% |
| Full Pipeline      | **73.3%** |   13.3% | 13.3% |

---

# 13.7 PM Decision 01 — Quality Check 與 Auto Correction

PM 正式確認：

> Quality Check 不應成為單純的 Reject System（拒絕系統）。

不得採用：

```text
Image
↓
Quality Check
↓
品質不好
↓
要求老師重拍
```

作為主要流程。

正式方向為：

```text
Image
↓
Quality Check
↓
判斷是否需要修正
↓
Auto Correction
↓
Re-Quality Check
↓
OCR / AI
↓
Hotspot Generator
```

因此：

> Quality Check 與 Auto Correction 視為同一套自動化 Pipeline 的不同階段。

---

# 13.8 Auto Correction

目前保留：

* Deskew（去歪斜）
* Denoise（去噪）
* Sharpen（銳化）

---

## 13.8.1 Deskew

Benchmark 實測：

| 傾斜角度 |   修正前 |  修正後 |
| ---: | ----: | ---: |
|   6° | 88.9% | 100% |
|   8° | 88.9% | 100% |
|  10° |    0% | 100% |
|  12° |    0% | 100% |
|  15° |    0% | 100% |

Deskew 應保留。

Deskew 採成熟影像處理技術。

目前 Benchmark 已驗證：

* 原始角度偵測
* 修正角度方向
* Image Rotation（圖片旋轉）
* Re-Quality Check

均可形成完整流程。

正式 Threshold 尚未由 PM 核定。

不得自行將 Benchmark 數值寫成正式 Production Threshold。

---

# 13.9 Denoise

低光源 + 雜訊 Benchmark：

| 情境             | 原始 | Denoise 後 |
| -------------- | -: | --------: |
| 亮度 55% + 雜訊 15 | 0% |      100% |
| 亮度 40% + 雜訊 15 | 0% |      100% |

Denoise 為目前低光源 + 雜訊情境最有效的救援技術。

Benchmark：

約 1360ms / 張。

因此正式使用時：

Denoise 必須支援：

Background Processing（背景處理）。

不得阻塞主要使用者操作流程。

---

# 13.10 Sharpen

Benchmark：

| 模糊程度 |   修正前 | Sharpen 後 |
| ---: | ----: | --------: |
|  3px | 77.8% |      100% |
|  4px | 66.7% |     77.8% |
|  5px | 55.6% |     55.6% |
|  6px | 22.2% |     33.3% |
|  8px |    0% |        0% |

Sharpen：

* 保留
* 定位為輔助
* 不得視為嚴重模糊修復技術

Benchmark 約：

16ms。

Sharpen 不得成為正式 Blur Threshold 的主要依據。

---

# 13.11 CLAHE

Benchmark 已測試：

Contrast Limited Adaptive Histogram Equalization（CLAHE）。

測試結果：

對：

低光源 + 雜訊

沒有實質改善。

因此：

> CLAHE 暫不列入主要 Auto Correction Pipeline。

不得為了單純 Brightness 不足而強制執行 CLAHE。

Brightness 不得單獨作為 Reject Condition（拒絕條件）。

Contrast 亦不得單獨作為 Reject Condition。

---

# 13.12 Re-Quality Check

Auto Correction 完成後：

必須重新執行：

Image Quality Check。

流程：

```text
Original Input
↓
Quality Check
↓
Auto Correction
↓
Re-Quality Check
↓
判斷是否可靠
```

不得：

```text
Auto Correction
↓
直接假設成功
↓
OCR
```

Re-Quality Check 是必要步驟。

---

# 13.13 OCR / AI

OCR / AI 負責：

> 判斷圖片中的文字內容及其位置。

輸出至少包含：

* Text
* Bounding Box
* Language / Language Hint（若可取得）
* Processing Status

OCR / AI 為獨立模組。

因此未來可以替換：

* Local OCR
* Cloud OCR
* Vision AI
* Hybrid OCR / AI

而不應影響：

* Image Area
* HTML Overlay
* Hotspot
* 教材資料結構

目前：

OCR / AI Provider 尚未由 PM 正式核定。

不得自行決定正式 Provider。

---

# 13.14 Hotspot Generator

Hotspot Generator 負責：

> 將 OCR / AI 輸出的文字與位置轉換成 HTML Overlay 上的 Hotspot。

輸入：

```text
Text
+
Bounding Box
```

輸出：

```text
Hotspot Data
```

Hotspot Position 應採：

Normalized Coordinates（正規化座標）。

不得只依賴固定：

* Pixel
* Device Resolution
* Screen Size

避免不同裝置造成位置錯誤。

---

# 13.15 HTML Overlay

HTML Overlay 為教材互動層。

架構：

```text
Image Area
     ↓
Teaching Material
     ↓
HTML Overlay
     ↓
Hotspot
```

教材圖片本身不被修改。

Hotspot、Popup、Dictionary、Audio、Video 等互動內容建立於 Overlay Layer。

---

# 13.16 Reliable Failure

正式產品原則：

> Reliable Failure（可靠失敗）優於錯誤成功。

如果系統無法可靠建立互動內容：

不得：

* 猜測文字
* 猜測座標
* 建立不可靠 Hotspot
* 標記為 SUCCESS

應回報：

* PARTIAL
* FAIL

依實際處理結果決定。

---

# 13.17 Unrecoverable Image

以下情境目前視為不可可靠救援：

### Severe Blur

嚴重模糊造成影像資訊遺失。

Sharpen 不得假裝恢復遺失資訊。

若無法可靠建立互動內容：

直接拒絕。

---

### Shadow Occlusion

陰影遮擋目前沒有可靠的 Auto Correction。

尤其 Benchmark 曾發現：

Shadow Occlusion 可能造成 Skew Detection 誤觸發。

因此：

不得將陰影問題直接當成 Skew 問題處理。

---

# 13.18 Content / Layout Problems

部分失敗不是 Image Quality 問題。

例如：

### Mixed Chinese / English

中英混合可能造成：

OCR / Language Understanding 問題。

不能單純透過：

* Blur
* Brightness
* Contrast
* Deskew
* Denoise

解決。

---

### Table + Text

表格 + 文字可能造成：

Layout Understanding（版面理解）問題。

主要問題為：

* Reading Order
* Structure
* Bounding Box Relationship

不能單純視為圖片品質問題。

---

# 13.19 Auto Correction Trigger Logic

Benchmark 發現：

部分圖片原本已可成功 OCR，

但目前 Trigger Logic 仍可能觸發：

* Denoise
* Sharpen

例如：

* 中度模糊
* 密集小字

這些案例原本已經 SUCCESS。

因此：

> Auto Correction Trigger Logic 目前仍需要最佳化。

這是：

Processing Efficiency（處理效率）問題，

不是目前已確認的 Correctness（正確性）問題。

正式 Trigger Logic 尚未由 PM 核定。

不得自行將 Benchmark 數值直接寫死。

---

# 13.20 Threshold

目前尚未正式核定：

* Blur Threshold
* Skew Threshold
* Contrast Threshold
* Noise Threshold
* Auto Correction Trigger Threshold

Benchmark 數據僅作為：

Technical Evidence（技術證據）。

不得直接轉換為：

Production Logic（正式產品邏輯）。

PM Decision 02 將另行決定正式門檻。

---

# 13.21 Processing Time

目前 Benchmark：

| Pipeline      | Average |    P95 | Maximum |
| ------------- | ------: | -----: | ------: |
| Baseline      |   866ms | 2243ms |  2243ms |
| Quality Check |   805ms | 1471ms |  1471ms |
| Full Pipeline |  1878ms | 3290ms |  3290ms |

Denoise：

約 1360ms / 張。

因此：

長時間 Auto Correction 必須使用：

Background Processing。

使用者不應被迫等待完整處理完成後才能繼續使用 MagicBook。

---

# 13.22 Original Input / Temporary Processing

MagicBook 不是使用者的照片倉庫。

Image Import 的圖片是：

> 教材建立流程的輸入資料。

系統應依教材建立流程處理圖片。

Auto Correction 產生的處理結果：

僅作為：

* OCR
* AI
* Hotspot Generator

等自動化流程的處理資料。

不得因 Auto Correction 而建立一套與教材無關的照片收藏系統。

不得自行增加：

* Photo Library
* Original Photo Archive
* Camera Roll
* 永久原始照片倉庫

等未經 PM 確認的功能。

---

# 13.23 Image Quality Failure UX

如果圖片品質不足，

但系統仍可以讓使用者重新調整或重新取得圖片，

使用者可以選擇：

* Adjust Image（調整圖片）
* Retake / Re-select（重新拍攝／重新選取）

使用者介面不得顯示技術術語：

* AI
* OCR
* Confidence
* Model
* Quality Check

---

## User Message

品質不足時：

> ⚠️ 照片品質不足
>
> 請重新拍攝清晰、光線充足的照片

提供：

```text
[重新拍攝]
[重新選取]
```

若產品流程提供圖片調整，

也可提供：

```text
[調整圖片]
```

---

# 13.24 Automation Failure UX

如果：

圖片本身可以處理，

但 OCR / AI / Hotspot Generator 無法可靠建立互動內容，

不得建立猜測性 Hotspot。

使用者看到：

> ⚠️ 無法自動建立互動內容
>
> 你可以重新拍攝，或直接手動建立互動內容。

提供：

```text
[重新拍攝]
[手動建立]
```

---

# 13.25 Product Behavior — Reject

MagicBook 的目的不是：

> 儘可能讓每一張照片都進入 AI。

MagicBook 的目的為：

> 幫助使用者快速建立可靠的教材互動內容。

因此：

如果圖片最終無法可靠建立互動內容：

應直接拒絕自動建立。

不得因「已經輸入圖片」而強迫系統產生結果。

---

# 13.26 Benchmark Recovery

Baseline 非 SUCCESS：

9 個案例。

Full Pipeline：

成功救回 5 個。

Overall Recovery Rate：

55.6%。

---

## Deskew

使用：

5 次。

救回：

4 次。

Recovery Rate：

80%。

---

## Denoise

使用：

1 次。

救回：

1 次。

Recovery Rate：

100%。

---

## Sharpen

目前沒有單獨救回完整 End-to-End SUCCESS 案例。

因此：

不能宣稱 Sharpen 已證明提升整體 End-to-End Success Rate。

目前僅能確認：

Sharpen 對部分輕微模糊 OCR Accuracy 有改善。

---

# 13.27 End-to-End Benchmark Conclusion

Benchmark 證明：

單獨：

Quality Check Only

會降低整體 SUCCESS。

Full Pipeline：

```text
Quality Check
+
Auto Correction
+
Re-Quality Check
```

能將：

40.0% SUCCESS

提升至：

73.3% SUCCESS。

因此 PM Decision 01 正式確認：

> Quality Check 與 Auto Correction 應作為同一套自動化流程設計。

---

# 13.28 PM Decision 01 — Confirmed

以下正式確認：

### 已確認

* Quality Check
* Auto Correction
* Re-Quality Check
* Deskew
* Denoise
* Sharpen
* CLAHE 暫不採用
* Reliable Failure
* Hotspot 不得猜測
* Image Import
* 不建立 MagicBook 專用 Camera System
* 使用者可重新拍攝／重新選取
* 圖片可使用成熟圖片調整能力進行調整
* Background Processing
* 原有成熟技術優先
* Reuse Before Reinvent
* Image Area 與 Text Area 分離
* Image Area 負責圖片
* Text Area 僅負責文字
* HTML Overlay 負責互動層

---

# 13.29 PM Decision 01 — Not Yet Confirmed

以下尚未正式核定：

* Blur Threshold
* Skew Threshold
* Contrast Threshold
* Noise Threshold
* Auto Correction Trigger Logic
* OCR Provider
* AI Provider
* Local OCR / Cloud OCR / Vision AI / Hybrid Strategy
* Crop
* Perspective Correction
* Shadow Detection
* Handwriting Recognition
* Complex Background Processing

以上不得自行加入正式 Production Implementation。

---

# 13.30 Engineering Boundary

阿德進行實作時：

可以：

* 驗證現有技術
* 測試成熟函式庫
* 測量效能
* 建立 Prototype
* 建立 Benchmark
* 提出技術限制

不得自行：

* 決定正式 Threshold
* 選定正式 OCR Provider
* 選定正式 AI Provider
* 增加未核定功能
* 建立專用 Camera System
* 建立新的照片倉庫
* 改變使用者核心操作流程
* 將 Benchmark 數字直接寫成 Production Logic
* 因工程方便而增加新的產品功能

如需超出本文件範圍：

先回報 PM。

---

# 13.31 Technical Evidence Status

本章 Benchmark 所使用之技術驗證包括：

* OpenCV Image Processing
* Blur Measurement
* Skew Detection
* Deskew
* Denoise
* Sharpen
* OCR
* End-to-End Pipeline

以上技術驗證結果可作為工程決策依據。

但：

Technical Evidence

不等於：

Production Specification。

正式 Production Specification 必須經 PM Decision 確認。

---

# 13.32 Current Status

目前狀態：

```text
Benchmark
    ↓
Technical Validation
    ↓
PM Decision 01
    ↓
[Current Status]
    ↓
PM Decision 02
    ↓
Production Implementation
```

目前尚未進入：

Production Implementation（正式產品實作）。

---

# 14. Change Log

## Version 2.5 — 2026-08-08

### Updated

* 整合 PM Decision 01
* 將 Image Quality Check 與 Auto Correction 正式定義為同一套自動化 Pipeline
* 正式確認 Deskew
* 正式確認 Denoise
* 正式確認 Sharpen 為輔助技術
* CLAHE 暫不採用
* 新增 Re-Quality Check 為必要流程
* 正式確認 Reliable Failure 原則
* 正式禁止產生猜測性 Hotspot
* 正式確認 Image Import
* 移除 MagicBook 專用 Camera System 方向
* 加入 Reuse Before Reinvent 工程原則
* 明確區分 Technical Evidence 與 Production Specification
* 明確保留 Threshold 為 PM Decision 02
* 明確保留 OCR / AI Provider 選型為後續 PM Decision
* 明確規定 Background Processing
* 明確規定 MagicBook 不作為使用者照片倉庫
* 明確規定 Image Area 與 Text Area 分離
* 明確規定圖片調整應優先利用既有成熟技術
* 明確規定使用者可重新拍攝／重新選取圖片
* 明確規定無法可靠建立互動內容時應拒絕自動建立

### Not Changed

* Database Schema
* API Design
* OCR Provider
* AI Provider
* Production Threshold
* Crop
* Perspective Correction
* Shadow Detection
* Handwriting Recognition
* Complex Background Processing

以上項目未因本次 PM Decision 01 自動進入 Production Implementation。

```


