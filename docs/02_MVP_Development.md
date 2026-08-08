# MagicBook 3.0 MVP Development

Version: 2.2

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
13. Change Log

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
- Camera（拍照）
- Video（影片）

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
- Camera（拍照）

系統需具備：

- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）
- Background Processing（背景處理）
- Large File Warning（大檔提示）

若檔案超過系統限制，

系統應提示使用者重新調整或壓縮後再上傳。

未來版本可持續支援更多教材格式。

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
- Camera

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

---

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

Import Image / PDF / Camera

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
- Camera（拍照）

系統自動：

- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）
- Background Processing（背景處理）

若檔案超過系統限制，

應提示使用者重新調整後再上傳。

教材內容保持原貌。

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
- Camera

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

支援：

- PNG
- JPG
- JPEG
- PDF
- Camera（拍照）

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
- Camera

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
- Camera 拍照

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
- Camera

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
- Camera 拍照
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

---

# 13. AI Automation — Technical Validation（Benchmark Stage）

> **文件定位：Technical Evidence（技術證據），不是正式產品規格。**
>
> 本節記錄 Image Quality Check、Auto Correction、OCR / AI 與 End-to-End Pipeline 的實測結果，供後續 PM Decision（產品決策）與工程實作參考。
>
> **在 PM 尚未正式核定 Threshold（門檻）與 OCR / AI 技術方案前，不得將本節數值直接視為 Production Rule（正式產品規則），不得進入正式 Production Implementation（正式產品實作）。**
>
> 本節不修改 DB Schema（資料庫結構），不指定正式 OCR / AI Provider（供應商），不寫死正式 Threshold。

---

## 13.1 Benchmark Status

本次已完成三條完整 Pipeline（流程）：

### Pipeline A — Baseline

```text
Original Image
    ↓
OCR
    ↓
Hotspot Generator
```

### Pipeline B — Quality Check Only

```text
Original Image
    ↓
Image Quality Check
    ↓
OCR
    ↓
Hotspot Generator
```

### Pipeline C — Full Pipeline

```text
Original Image
    ↓
Image Quality Check
    ↓
Auto Correction
    ↓
Re-Quality Check
    ↓
OCR
    ↓
Hotspot Generator
```

共測試：

**15 種代表性情境。**

---

## 13.2 End-to-End Benchmark Result

| Pipeline | SUCCESS | PARTIAL | FAIL |
| --- | ---: | ---: | ---: |
| A：Baseline | 40.0% | 33.3% | 26.7% |
| B：Quality Check Only | 33.3% | 26.7% | 40.0% |
| C：Full Pipeline | **73.3%** | 13.3% | 13.3% |

### Technical Finding

單獨加入 Quality Check 並不能改善整體結果。

Pipeline B 反而從 40.0% SUCCESS 下降至 33.3%。

原因：

Quality Check 只能拒絕，不能修正。

因此會把原本可以透過 Auto Correction（自動修正）救回的照片直接擋掉。

### Engineering Conclusion

Quality Check 不應單獨形成：

```text
Image
↓
Quality Check
↓
品質不好
↓
要求老師重拍
```

的主要自動化流程。

目前 Benchmark 支持的方向為：

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
OCR
↓
Hotspot Generator
```

Quality Check 與 Auto Correction 應視為同一套自動化 Pipeline 的不同階段。

---

## 13.3 Deskew（去歪斜）實測

| 傾斜角度 | 修正前辨識率 | 修正後辨識率 |
| --- | ---: | ---: |
| 6° | 88.9% | **100%** |
| 8° | 88.9% | **100%** |
| 10° | 0% | **100%** |
| 12° | 0% | **100%** |
| 15° | 0% | **100%** |

Deskew 已證實能救回原本因傾斜而失敗的案例。

5 次使用中救回 4 次：

**Recovery Rate：80%。**

Deskew 應保留於正式技術架構。

正式 Skew Threshold（傾斜門檻）尚未由 PM 核定。

---

## 13.4 Denoise（去噪）實測

| 情境 | 原始辨識率 | Denoise 後 |
| --- | ---: | ---: |
| 亮度 55% + 雜訊 15 | 0% | **100%** |
| 亮度 40% + 雜訊 15 | 0% | **100%** |

Denoise 是目前測試中低光源 + 雜訊情境最有效的救援技術。

單次處理約：

**1360ms / 張。**

正式使用時必須支援：

**Background Processing（背景處理）。**

不得要求使用者同步等待 Denoise 完成。

本次端到端測試中 Denoise 使用 1 次並救回 1 次：

**Recovery Rate：100%。**

---

## 13.5 Sharpen（銳化）實測

| 模糊程度 | 修正前辨識率 | Sharpen 後 |
| --- | ---: | ---: |
| 3px | 77.8% | **100%** |
| 4px | 66.7% | 77.8% |
| 5px | 55.6% | 55.6% |
| 6px | 22.2% | 33.3% |
| 8px | 0% | 0% |

Sharpen：

- 可改善輕微模糊
- 無法恢復嚴重模糊已遺失的影像資訊
- 約 16ms
- 運算成本低

目前不能宣稱 Sharpen 對 End-to-End Success 有明確提升。

可以保留為候選 Auto Correction 技術，但不得視為嚴重模糊的解決方案。

---

## 13.6 CLAHE / Contrast Enhancement 實測

CLAHE（對比度增強）對本次低光源 + 雜訊情境沒有實質改善。

因此目前不列入主要 Auto Correction Pipeline。

不要因單純亮度不足而強制執行 CLAHE。

---

## 13.7 尚未解決的情境

### 嚴重模糊

影像資訊已遺失。

Sharpen 無法真正恢復遺失資訊。

目前視為不可救援情境。

### 中英混合

目前為 PARTIAL。

主要問題不是 Image Quality（圖片品質），而是 OCR / Layout Understanding（版面理解）問題。

不能單純以 Image Quality Check 解決。

### 表格 + 文字

目前為 PARTIAL。

主要問題為文字順序與版面結構。

不是單純 Blur / Brightness / Contrast 問題。

### 陰影遮擋

目前為 FAIL。

現有 Auto Correction 無法可靠救援。

本次曾出現 Deskew 誤觸發，因此目前不要嘗試使用現有 Skew Detection（傾斜偵測）處理陰影遮擋。

---

## 13.8 Auto Correction Trigger Logic — 已發現的工程問題

「中度模糊」與「密集小字」原本 Pipeline A 已經 SUCCESS，Pipeline B 也 SUCCESS，但 Pipeline C 仍觸發：

- Denoise
- Sharpen

造成額外處理時間。

這不是正確性問題，而是：

**Processing Efficiency（處理效率）問題。**

因此正式實作前必須改善：

**Auto Correction Trigger Logic（自動修正觸發邏輯）。**

不得對已可可靠進入 OCR 的照片進行不必要的修正。

---

## 13.9 Threshold — PM Decision Required

目前以下數值僅為 Benchmark Evidence（實測證據），不得直接寫死：

- Blur Threshold
- Contrast Threshold
- Skew Threshold
- Auto Correction Trigger Condition

阿德不得自行根據 Benchmark 結果將上述數值直接定義為正式 Production Threshold。

正式 Threshold 必須由 PM Decision（產品決策）核定。

---

## 13.10 Processing Time

| Pipeline | Average | P95 | Maximum |
| --- | ---: | ---: | ---: |
| Baseline | 866ms | 2243ms | 2243ms |
| Quality Check | 805ms | 1471ms | 1471ms |
| Full Pipeline | **1878ms** | **3290ms** | **3290ms** |

Full Pipeline 平均耗時為 Baseline 約 2.2 倍。

最慢案例達 3290ms。

Denoise 約 1360ms / 張。

因此 Denoise 等較長時間的 Auto Correction 必須使用 Background Processing（背景處理）。

Background Processing 不得造成 UI 凍結。

---

## 13.11 OCR Cost Benchmark

目前僅使用：

**$0.0015 / OCR Call**

作為成本模型假設。

此數字不是正式供應商價格。

| Pipeline | OCR 呼叫比例 | 1,000 張 OCR Calls | 假設成本 |
| --- | ---: | ---: | ---: |
| Baseline | 100% | 1000 | $1.50 |
| Quality Check Only | 60% | 600 | $0.90 |
| Full Pipeline | 93.3% | 933 | $1.40 |

Quality Check 的主要價值不應定義為「節省 OCR API 成本」。

真正需要避免的是：

```text
低品質照片
↓
OCR
↓
錯誤文字
↓
錯誤 Bounding Box
↓
錯誤 Hotspot
↓
老師人工清理
```

因此更重要的產品 KPI（關鍵績效指標）是：

> 降低老師人工修正教材的時間。

---

## 13.12 Error Handling / Wrong Hotspot Principle

本次 15 個測試案例中，沒有發現：

「系統產生錯誤 Hotspot，但卻宣稱 SUCCESS」

的案例。

中英混合、表格、陰影等無法可靠處理的情境，目前會以：

- PARTIAL
- FAIL

回報。

正式工程原則：

> 如果系統不能可靠建立互動內容，不得標記 SUCCESS。

應標記 PARTIAL 或 FAIL。

不得把不可靠的文字座標直接視為正確 Hotspot。

---

## 13.13 Original Image Protection

原始照片是教材資產。

Auto Correction 不得覆寫 Original Image（原始圖片）。

概念：

```text
Original Image
      +
Processed Image
```

Processed Image（處理後圖片）僅供：

- OCR
- AI
- Hotspot Generator

使用。

原始教材必須保持不變。

---

## 13.14 Current Technical Architecture

```text
Image Area
    │
    ▼
Image Quality Check
    │
    ├── 明顯不可救
    │       ↓
    │     Reject
    │
    ├── 可修正
    │       ↓
    │   Auto Correction
    │       ↓
    │   Re-Quality Check
    │
    └── 品質正常
            ↓
           OCR
            ↓
    Text + Bounding Box
            ↓
    Hotspot Generator
            ↓
      HTML Overlay
            ↓
         Hotspot
```

此架構為 Technical Validation 結果，不代表所有 Threshold 與 Provider 已正式核定。

---

## 13.15 UX Technical Validation

若照片品質不足，使用者不需要知道：

- AI
- OCR
- Confidence
- Quality Check
- Model

目前驗證之 UX 方向：

> ⚠️ 照片品質不足  
> 請重新拍攝清晰、光線充足的照片  
> [知道了]

若照片品質足夠，但自動建立互動內容失敗：

> ⚠️ 無法自動建立互動內容  
> 你可以重新拍攝，或直接手動建立互動內容  
> [重新拍攝] [手動建立]

照片本身仍保留。

OCR 失敗不代表教材資產失敗。

---

## 13.16 OCR / AI 技術方案狀態

目前尚未正式選定：

- Local OCR（本地 OCR）
- Cloud OCR（雲端 OCR）
- Vision AI
- Hybrid Architecture（混合架構）
- 正式 OCR / AI Provider

因此不得在本階段：

- 串接正式 OCR / AI Provider
- 將特定 Provider 寫死於正式產品架構
- 將 Benchmark 使用工具視為正式服務選型

OCR / AI 仍維持：

**Replaceable Service Architecture（可替換服務架構）。**

---

## 13.17 Benchmark Evidence Files

End-to-End Benchmark 完整原始資料：

`end_to_end_results.json`

Image Quality / Auto Correction Benchmark 原始資料：

`correction_results.json`

上述資料屬於：

**Technical Evidence（技術證據）**

不是正式 Product Specification（產品規格）。

---

## 13.18 PM Decision Required Before Production

正式進入 Production Implementation 前，至少仍需 PM 核定：

1. Blur Threshold
2. Contrast Threshold
3. Skew Threshold
4. Auto Correction Trigger Logic
5. OCR / AI 技術方案
6. OCR / AI Provider

在上述項目完成 PM Decision 前：

**不得進入正式 Production Implementation。**

---

# 14. Change Log

本文件記錄 MagicBook 3.0 MVP Development 之重大版本更新。

所有需求變更皆應先更新本文件，

再同步更新相關設計文件。

---

## Version 2.2

### AI Automation — Technical Validation

新增第 13 節：

**AI Automation — Technical Validation（Benchmark Stage）**

本次新增內容包含：

- Image Quality Check
- Auto Correction
- Deskew
- Denoise
- Sharpen
- Re-Quality Check
- OCR / AI
- Hotspot Generator
- HTML Overlay
- Background Processing
- Error Handling
- Original Image Protection
- End-to-End Benchmark

本節定位為：

**Technical Evidence（技術證據）**

不是正式產品規格。

本次未：

- 修改 DB Schema
- 串接正式 OCR / AI Provider
- 寫入正式 Threshold
- 進入 Phase 4 Production Implementation

---



本文件記錄 MagicBook 3.0 MVP Development 之重大版本更新。

所有需求變更皆應先更新本文件，

再同步更新相關設計文件。

---

## Version 2.1

### Exercise Removed

確認 Exercise 不屬於 MagicBook 3.0 MVP。

移除所有 Exercise 相關規格，包括：

- Exercise Module
- Exercise CRUD
- Exercise Popup
- Exercise Rendering
- Exercise User Flow
- Exercise Reading Mode
- Exercise Context Toolbar Option

MagicBook 3.0 定位為互動教材工具（Interactive Teaching Material Tool），

不包含考卷或題目製作系統（Exercise / Exam Authoring System）。

---

### Book Library

確認 Folder 為 Book Library 的固定功能。

Folder 支援：

- Create Folder
- Rename Folder
- Delete Folder
- Move Folder
- Reorder Folder
- Nested Folder
- Drag & Drop Sorting

使用者可自行決定是否使用 Folder。

Book 可直接存在於 Book Library 根目錄，

也可放入 Folder。

---

### Global Search

重新確認 Global Search 採 Floating Search Toolbar。

平時固定顯示 Search Icon。

Search Icon 位於畫面右上方。

點擊後展開 Search Toolbar。

Toolbar 可整合：

- Home
- Back
- Keyword Search
- Search Scope
- Close

Home、Back 屬於 Navigation 功能。

關閉搜尋後，

Search Icon 必須繼續顯示。

---

### System Performance

確認 Performance（效能）為 MVP 驗收標準之一。

背景處理（Background Processing）不得造成 UI 凍結。

Loading Animation：

- 顯示於畫面中央
- 約佔畫面 15%
- 採品牌角色動作動畫
- 持續播放至工作完成
- 工作完成後自動關閉

---

### Development Philosophy

MagicBook 3.0

採：

Complete Product Architecture。

所有核心模組：

第一版全部建立。

所有第三方服務：

採 Replaceable Service。

所有功能：

遵循：

- Teaching Material First
- Modular Architecture
- Global Search
- Context Toolbar
- Specification Consistency Review

作為後續版本共同開發原則。
