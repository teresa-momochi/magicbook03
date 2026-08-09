# MagicBook 3.0 MVP Development

Version: 2.6

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-09


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
13. AI Automation — Image Quality / Auto Correction / OCR
14. Change Log


# 0. Product Positioning

MagicBook 3.0 並非全新產品（New Product）。

MagicBook 2 已完成產品驗證（Product Validation），並已實際應用於教學現場。

MagicBook 3.0 為 MagicBook 2 的下一代版本（Next Generation）。

本次開發重點不是重新驗證產品，而是重新建立完整產品架構（Complete Product Architecture），提升系統的可維護性（Maintainability）、可擴充性（Scalability）、雲端能力（Cloud Capability）與 AI 整合能力（AI Integration）。

所有已於 MagicBook 2 驗證成功之核心功能，不得因 MVP 而移除。

若需重構，應改善系統架構，而非改變產品核心操作流程。


# 1. System Architecture

MagicBook 3.0 採用 Workspace（工作空間）架構。

Workspace 為整個系統最高層級（Root Entity）。

所有教材、使用者、設定、媒體、AI 使用紀錄與權限皆隸屬於 Workspace。


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
+
Text Area
+
HTML Overlay


## 1.3 Book Library

Book Library 為教材管理中心。

使用者可：

- 建立 Book
- 重新命名 Book
- 複製 Book
- 刪除 Book
- 開啟 Book Editor
- 開啟 Reading Mode
- 使用 Search
- 使用 Folder

Folder 為 Book Library 的固定分類工具。

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
- 在 Folder 之間移動

使用者可自行決定是否使用 Folder。


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


# 3. Development Philosophy

MagicBook 3.0 採用以下開發哲學。


## 3.1 Architecture First

優先建立完整產品架構（Complete Product Architecture）。

不得因 MVP 而刪除產品核心架構。

所有後續版本皆建立於相同架構之上。


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


## 3.3 CRUD Complete

所有核心模組皆須完成：

- Create
- Read
- Update
- Delete

並建立完整資料模型（Data Model）。


## 3.4 Teaching Material First

教材（Teaching Material）永遠是產品核心。

AI、Dictionary、Audio、Video、Translation、TTS 等皆屬工具（Tool）。

工具協助教材呈現與教學。

不得主導產品架構。


## 3.5 Replaceable Services

MagicBook 不應將核心產品架構綁定單一第三方服務。

第三方服務皆採：

Replaceable Service Architecture（可替換服務架構）。

適用於：

- AI
- Dictionary
- Translation
- TTS
- OCR
- Search
- Audio
- Video

任何 Provider 均可替換。

不得因更換 Provider 而影響教材資料、產品架構或使用者操作流程。


## 3.6 Previous Version Baseline

MagicBook 3.0 建立於 MagicBook 2。

MagicBook 2 已完成產品驗證（Product Validation）。

所有已驗證成功之核心功能不得因 MVP 而移除。

若需重構，應改善：

- 系統架構
- 可維護性
- 可擴充性

不得改變核心使用流程。


## 3.7 Documentation Principle

MagicBook 文件允許重要規格重複出現。

避免遺漏（Avoid Omission）

優先於

避免重複（Avoid Duplication）。

文件一致性（Consistency）

優先於

文件精簡（Conciseness）。


# 4. Architecture Principles


## 4.1 One Data Model

Editor Mode 與 Reading Mode 共用同一份教材資料。

不得建立兩套教材資料。

Editor Mode：

- Create
- Read
- Update
- Delete

Reading Mode：

- Read
- Interaction

Reading Mode 不得修改教材。


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


## 4.3 Context Toolbar

MagicBook 全系統共用 Context Toolbar。

Toolbar：

- 預設隱藏
- 選取物件後自動顯示
- 完成操作後自動隱藏
- 可自由拖曳
- 可自由放置於畫面上下左右

Image、Text、Hotspot、HTML Overlay 等可編輯物件皆使用同一套 Toolbar。


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

若需要更多功能，再透過 Context Toolbar 開啟：

- Dictionary
- AI
- Audio
- Video
- Image
- URL
- Navigation

避免影響閱讀流程。


## 4.5 Media First

Image Area 負責教材視覺內容。

MagicBook 不要求使用者理解不同媒體格式之技術差異。

Image Area 可匯入：

- PNG
- JPG
- JPEG
- PDF
- 使用者已拍攝之照片
- 使用者截圖
- 使用者從裝置選取之圖片／檔案

上述皆統一視為：

Image Import（圖片匯入）。

MagicBook 不建立專用 Camera System（相機系統）。

拍照由裝置原生相機完成。

MagicBook 的責任從 Image Import 開始。

系統須具備：

- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）
- Background Processing（背景處理）
- Large File Warning（大檔提示）

若檔案超過系統限制，應提示使用者重新調整或壓縮後再上傳。

不得直接造成系統失敗。


# 5. Development Scope

第一版 MVP 建立完整產品架構（Complete Product Architecture）。

所有核心模組（Core Modules）皆須建立。

所有核心模組皆須完成基本 CRUD（Create / Read / Update / Delete）。

第三方服務可使用 Placeholder、Mock Data 或正式 API，不得因此破壞產品架構。


## 5.1 Authentication

完成：

- Login
- Logout
- Session Management
- User Authentication
- Workspace Authentication

登入後依使用者權限進入對應 Workspace。


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


## 5.3 Book Library

完成：

- Create Book
- Rename Book
- Delete Book
- Duplicate Book
- Search Book
- Recently Used

支援：

- Folder
- Nested Folder
- Folder CRUD
- Folder Navigation
- Drag & Drop Sorting

使用者可選擇是否使用 Folder 分類教材。

Book 可以直接存在於 Book Library 根目錄，也可以放入 Folder。


## 5.4 Lesson

保留完整資料架構。

完成：

- Create Lesson
- Rename Lesson
- Delete Lesson
- Reorder Lesson

第一版可隱藏 Lesson 管理介面。

建立 Book 時，系統自動建立 Default Lesson。


## 5.5 Page

完成：

- Add Page
- Delete Page
- Duplicate Page
- Reorder Page
- Page Navigation

Page 為教材最小管理單位。


## 5.6 Image Area

Image Area 負責教材視覺內容管理。

完成：

- Add Image
- Replace Image
- Delete Image
- Reorder Image
- Image Import

支援：

- PNG
- JPG
- JPEG
- PDF
- 使用者已拍攝之照片
- 使用者截圖
- 使用者從裝置選取之圖片／檔案

MagicBook 不建立專用 Camera 功能。

系統需具備：

- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）
- Background Processing（背景處理）
- Large File Warning（大檔提示）

若檔案超過系統限制，應提示使用者重新調整或壓縮後再上傳。


## 5.7 Text Area

完成：

- Add Text Block
- Edit Text Block
- Delete Text Block
- Reorder Text Block

Text Area 只負責文字輸入與文字編輯。

OCR / AI 不得自動將辨識內容直接寫入 Text Area。

OCR / AI 自動化產生的互動內容屬於 Hotspot / HTML Overlay 流程。


## 5.8 HTML Overlay

建立完整 HTML Overlay Layer。

HTML Overlay 為教材互動層（Interaction Layer）。

可覆蓋於教材內容之上。

HTML Overlay 負責：

- Hotspot Position
- Interactive Object Management
- Layer Management
- Object Rendering
- Object Selection

不得直接修改教材內容。


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


## 5.13 Audio

建立 Audio Module。

完成：

- Audio Player
- Audio CRUD
- Audio Settings

Audio 可由正式 API 或 Placeholder 提供。


## 5.14 Video

建立 Video Module。

完成：

- Video Player
- Video Source
- Video Settings

Video 可由正式來源或 Placeholder 提供。


## 5.15 Navigation

建立 Navigation Module。

負責：

- Home
- Back
- Page Navigation
- Book Navigation
- Lesson Navigation

Navigation 可與 Context Toolbar 整合。


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


# 6. Core Modules

MagicBook 3.0 採模組化架構（Modular Architecture）。

所有模組皆須保持：

- Independent（獨立）
- Low Coupling（低耦合）
- Scalable（可擴充）


## 6.1 Authentication Module

負責：

- User Login
- User Logout
- Session Management
- Workspace Authentication
- Permission Verification


## 6.2 Workspace Module

負責：

- Workspace Management
- Workspace Settings
- User Role
- Data Ownership

Workspace 為所有教材之最高資料歸屬。


## 6.3 Book Library Module

負責：

- Folder Navigation
- Book Navigation
- Search
- Recently Used
- Book Management


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


## 6.5 Book Module

負責：

- Book CRUD
- Book Search
- Recently Used
- Book Information


## 6.6 Lesson Module

負責：

- Lesson CRUD
- Lesson Order
- Lesson Information

第一版採預設 Lesson。


## 6.7 Page Module

負責：

- Page CRUD
- Page Order
- Page Navigation

Page 為教材最小管理單位。


## 6.8 Image Area Module

Image Area 為教材視覺內容工作區。

負責：

- Image Import
- Image Management
- PDF Management
- Image Rendering
- Image Optimization
- Image Compression

Image Area 不負責互動。

教材互動由 HTML Overlay 負責。

MagicBook 不建立專用 Camera System。


## 6.9 Text Area Module

Text Area 為文字工作區。

負責：

- Text Block Management
- Text Editing
- Text Rendering

每個 Page 可建立不限數量 Text Block。


## 6.10 HTML Overlay Module

HTML Overlay 為教材互動層（Interaction Layer）。

負責：

- Overlay Layer
- Interactive Object Rendering
- Object Selection
- Layer Management

HTML Overlay 不修改教材內容。

所有互動皆建立於 Overlay Layer。


## 6.11 Hotspot Module

Hotspot 為獨立互動物件（Interactive Object）。

負責：

- Hotspot CRUD
- Position
- Resize
- Layer Order

Hotspot 建立於 HTML Overlay。


## 6.12 Context Toolbar Module

Context Toolbar 為全系統共用工具列。

負責：

- Object Editing
- Object Settings
- Interaction Settings

Toolbar：

- 平時隱藏
- 選取物件後自動顯示
- 完成操作後自動隱藏
- 可自由拖曳
- 可自由放置於畫面上下左右


## 6.13 Popup Module

Popup 為互動資訊視窗。

負責：

- Popup Editor
- Popup Layout
- Popup CRUD

點擊 Hotspot：

立即顯示 Default Popup。

預設顯示：

- Chinese
- KK
- Pronunciation


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


## 6.15 AI Module

AI 為產品工具（Tool）。

負責：

- AI Conversation
- Prompt Management
- AI Provider
- AI History

AI Provider 可替換。

不得綁定特定 AI。


## 6.16 Audio Module

負責：

- Audio Player
- Audio Source
- Audio Settings

Audio Provider 可後續替換。


## 6.17 Video Module

負責：

- Video Player
- Video Source
- Video Settings

Video Provider 可後續替換。


## 6.18 Navigation Module

負責：

- Home
- Back
- Page Navigation
- Book Navigation
- Lesson Navigation

Navigation 為共用導覽功能。


## 6.19 Global Search Module

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

屬於 Navigation（導覽）功能，不是 Search 功能。

關閉 Search Toolbar 後，

Search Icon 必須繼續顯示於畫面右上方。

提供搜尋範圍：

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

搜尋結果可導向實際相關內容。

Global Search 不直接管理資料。

僅負責：

- Search
- Index
- Search Result Navigation


## 6.20 Save Module

負責：

- Save Dialog
- Auto Validation
- Save Status
- Cloud Storage


## 6.21 Reading Module

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

使用者選擇：

- 已拍攝照片
- 截圖
- 裝置中的圖片／檔案
- PDF

↓

若使用自動建立互動內容：

Image Quality Check

↓

必要時 Auto Correction

↓

Re-Quality Check

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

使用者亦可完全不使用 AI。

Image Area 匯入教材後，可直接手動建立 Hotspot。


## 7.4 Book Library Flow

Book Library 為教材管理中心。

提供：

- Search Book
- Create Book
- Open Book
- Open Reading
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

- Open Book
- Open Reading
- Rename Book
- Duplicate Book
- Delete Book
- Move to Folder


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


## 7.9 Unsaved Changes

若教材尚未儲存，

使用者離開 Editor 時，

系統應提示：

- Continue Editing
- Leave Without Saving

避免教材內容遺失。


## 7.10 Error Handling

若發生：

- Login Failure
- Upload Failure
- Save Failure
- Network Failure
- OCR / Automation Failure

系統應：

- 顯示使用者可理解的錯誤訊息
- 保留目前教材內容
- 提供適當 Retry
- 不得直接關閉編輯畫面
- 不得遺失使用者目前編輯內容

不得向一般使用者暴露：

- AI
- OCR
- Confidence
- Model
- Provider
- Bounding Box

等技術錯誤細節。


# 8. Screen Specifications

MagicBook 3.0 所有畫面皆遵循一致設計原則：

- Consistency（一致性）
- Modular（模組化）
- Scalable（可擴充）
- Teaching Material First（教材優先）

所有畫面皆須保持一致的操作邏輯。

不得因後續功能增加而重新設計主要介面。


## 8.1 Login

MagicBook 提供兩種登入模式。

### Personal Workspace

提供：

- Email Login
- Google Login
- Password Login
- Forgot Password
- Remember Me

第一次登入：

系統自動建立 Personal Workspace。

登入成功後進入 Home。


### Organization Workspace

Workspace Administrator 建立：

- Teacher Account
- Password

教師使用：

- Account
- Password

登入。

登入成功後直接進入所屬 Organization Workspace。


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
- Open Book
- Open Reading

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


## 8.4 Book Editor

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


## 8.5 Page Manager

Page Manager 負責：

- Add Page
- Delete Page
- Duplicate Page
- Reorder Page
- Page Navigation

Page 為教材最小管理單位。


## 8.6 Image Area

Image Area 負責：

- Image Import
- Image Display
- Image Replace
- Image Delete
- PDF Display

支援：

- PNG
- JPG
- JPEG
- PDF
- 使用者已拍攝之照片
- 使用者截圖
- 使用者從裝置選取之圖片／檔案

MagicBook 不建立專用 Camera 功能。

拍照由裝置原生相機完成。

Image Area 不負責 OCR。

OCR / AI 為 Optional Automation Layer（選用自動化層）。


## 8.7 Text Area

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


## 8.8 HTML Overlay

HTML Overlay 為教材互動層。

負責：

- Hotspot
- Popup
- Interactive Object
- Object Position
- Object Resize
- Layer Management

HTML Overlay 不修改教材底圖。


## 8.9 Hotspot

Hotspot 為獨立互動物件。

支援：

- Add
- Edit
- Delete
- Move
- Resize
- Save

Hotspot 建立於 HTML Overlay。


## 8.10 Context Toolbar

Context Toolbar：

- 預設隱藏
- 選取物件後顯示
- 完成操作後隱藏
- 可自由拖曳
- 可自由放置

所有可編輯物件共用。


## 8.11 Popup

點擊 Hotspot：

立即顯示 Default Popup。

預設：

- Chinese
- KK
- Pronunciation

更多功能：

- Dictionary
- AI
- Audio
- Video
- Image
- URL
- Navigation


## 8.12 Save Dialog

點擊 Save 後：

顯示 Save Dialog。

提供：

- Book Name
- Save

儲存成功後返回 Book Library。

使用者可選擇：

- Continue Editing
- Open Reading


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


## 9.2 Workspace Module

Workspace 為系統最高管理單位。

負責：

- Workspace Information
- Workspace Settings
- User Management
- Teacher Account Management
- Permission Management
- Data Ownership


## 9.3 Book Library Module

Book Library 為教材管理中心。

負責：

- Folder Navigation
- Book Navigation
- Search
- Recently Used
- Book Management


## 9.4 Folder Module

Folder 為教材分類工具。

負責：

- Create Folder
- Rename Folder
- Delete Folder
- Move Folder
- Reorder Folder
- Nested Folder
- Drag & Drop Sorting


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


## 9.6 Lesson Module

Lesson 為教材章節管理單位。

負責：

- Create Lesson
- Rename Lesson
- Delete Lesson
- Reorder Lesson


## 9.7 Page Module

Page 為教材最小管理單位。

負責：

- Add Page
- Delete Page
- Duplicate Page
- Reorder Page
- Page Navigation


## 9.8 Image Area Module

負責：

- Image Import
- Image Management
- PDF Management
- Image Rendering
- Image Optimization
- Image Compression

MagicBook 不建立專用 Camera System。


## 9.9 Text Area Module

負責：

- Text Block Management
- Text Editing
- Text Rendering


## 9.10 HTML Overlay Module

負責：

- Overlay Layer
- Interactive Object Rendering
- Object Selection
- Layer Management


## 9.11 Hotspot Module

負責：

- Hotspot CRUD
- Position
- Resize
- Layer Order


## 9.12 Popup Module

負責：

- Popup Editor
- Popup Layout
- Popup CRUD


## 9.13 Dictionary Module

負責：

- Word Information
- Chinese
- KK
- Pronunciation
- Example


## 9.14 AI Module

負責：

- AI Conversation
- Prompt Management
- AI Provider
- AI History

採 Replaceable Provider Architecture。


## 9.15 Audio Module

負責：

- Audio Player
- Audio Source
- Audio Settings


## 9.16 Video Module

負責：

- Video Player
- Video Source
- Video Settings


## 9.17 Navigation Module

負責：

- Home
- Back
- Page Navigation
- Book Navigation
- Lesson Navigation


## 9.18 Global Search Module

Global Search 為全系統共用搜尋模組。

提供：

- Keyword Search
- Search Scope
- Search Suggestions
- Recent Search
- Search Result Navigation

Search Icon 固定於畫面右上方。

Search Toolbar 採 Floating Toolbar。


## 9.19 Save Module

負責：

- Save Dialog
- Auto Validation
- Save Status
- Cloud Storage


## 9.20 Reading Module

負責：

- Reading UI
- Hotspot Interaction
- Popup
- Dictionary
- AI
- Audio
- Video
- Navigation

Reading Mode 不修改教材。


# 10. Development Boundary

MagicBook 3.0 第一階段建立完整產品架構（Complete Product Architecture）。

所有核心模組皆須建立完整：

- Data Model
- UI
- CRUD
- User Flow

第三方服務可依實際開發進度逐步完成串接。

本階段開發遵循：

- 不變更產品架構
- 不刪除已確認功能
- 不新增未確認功能
- 不因技術限制修改使用者操作流程

若需新增功能或修改需求，應先更新：

- Product Specification
- MVP Development

完成 Specification Consistency Review 後，再更新其他相關文件。

所有新增功能皆須遵循：

- Modular Architecture
- Teaching Material First
- Replaceable Service
- Global Search
- Context Toolbar
- Reuse Before Reinvent

不得建立獨立且不一致的操作流程。


# 11. Acceptance Criteria

MagicBook 3.0 MVP 完成後，應符合以下驗收標準。

所有核心模組皆須完成：

- Data Model
- UI
- CRUD
- User Flow

第三方服務可採 Placeholder 或 Mock Data，正式 API 可於後續串接，但不得影響產品架構。


## 11.1 Authentication

必須：

- 可以登入
- 可以登出
- 可以維持 Session
- 可以辨識 Workspace
- 可以依權限進入對應 Workspace


## 11.2 Workspace

必須：

- 支援 Personal Workspace
- 支援 Organization Workspace
- 正確管理 Data Ownership
- 正確管理基本 Permission


## 11.3 Book Library

必須：

- 建立 Book
- 開啟 Book
- Rename
- Duplicate
- Delete
- Search
- Recently Used


## 11.4 Folder

必須：

- Create
- Rename
- Delete
- Move
- Reorder
- Nested Folder
- Drag & Drop


## 11.5 Lesson

必須：

- 建立 Default Lesson
- Lesson 隸屬於 Book


## 11.6 Page

必須：

- Add
- Delete
- Duplicate
- Reorder
- Navigation


## 11.7 Image Area

必須：

- Image Import
- Image Display
- Replace
- Delete
- PDF Display
- Image Optimization
- Image Compression
- Background Processing

Image Import 支援：

- PNG
- JPG
- JPEG
- PDF
- 使用者已拍攝之照片
- 使用者截圖
- 使用者從裝置選取之圖片／檔案

MagicBook 不建立專用 Camera System。


## 11.8 Text Area

必須：

- Add
- Edit
- Delete
- Reorder

Text Area 必須維持純文字編輯定位。


## 11.9 HTML Overlay

必須：

- 建立 Overlay
- 顯示 Overlay
- 管理 Layer
- 選取 Object
- 不修改教材底圖


## 11.10 Hotspot

必須：

- Create
- Read
- Update
- Delete
- Move
- Resize


## 11.11 Popup

必須：

- Popup CRUD
- Default Popup
- Context Toolbar Integration


## 11.12 Dictionary

必須提供：

- Word
- Chinese
- KK
- Pronunciation
- Example


## 11.13 AI

必須：

- AI Panel
- Prompt Manager
- Conversation
- History
- Provider Interface

Provider 必須可替換。


## 11.14 Audio

必須：

- Player
- Source
- Settings


## 11.15 Video

必須：

- Player
- Source
- Settings


## 11.16 Navigation

必須：

- Home
- Back
- Page Navigation
- Book Navigation
- Lesson Navigation


## 11.17 Global Search

必須：

- Search Icon 固定顯示
- Floating Search Toolbar
- Keyword Search
- Search Scope
- Search Result Navigation


## 11.18 Save

必須：

- Save Dialog
- Auto Validation
- Save Status
- Cloud Storage


## 11.19 Reading Mode

必須：

- Hotspot
- Popup
- Dictionary
- AI
- Audio
- Video
- Navigation

Reading Mode 不得修改教材。


## 11.20 Background Processing

Background Processing 必須：

- 不造成 UI Freeze
- 顯示 Loading Animation
- 工作完成後自動結束 Loading
- 支援大型圖片處理
- 支援圖片最佳化
- 支援圖片壓縮
- 支援 AI / OCR 等耗時工作


## 11.21 Brand Loading Animation

MagicBook 採 Brand Character Animation（品牌角色動畫）。

不使用傳統 Loading Bar 作為主要品牌工作狀態。

Loading Animation：

- 顯示於畫面中央
- 約佔畫面 15%
- 採品牌角色動作動畫
- 持續播放至工作完成
- 工作完成後自動關閉

品牌角色可依工作內容播放不同動畫。

系統可採 Random Character（隨機角色）機制。

品牌角色以動作呈現系統工作狀態，不得以大量文字取代動畫。


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

影響教材資料、產品架構或使用者操作流程。


# 12. Development Sequence

MagicBook 3.0 採模組化開發（Modular Development）。

各模組可獨立開發，

但建議依下列順序完成。


## Phase 1

System Foundation

- Authentication
- Workspace
- Database
- Book Library


## Phase 2

Book Structure

- Folder
- Book
- Lesson
- Page

完成教材基本架構。


## Phase 3

Editor

建立 Book Editor。

包含：

- Page Manager
- Image Area
- Text Area
- HTML Overlay

完成教材編輯能力。


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


## Phase 5

AI

完成：

- AI Panel
- Prompt Manager
- AI Provider Interface
- Conversation
- History

AI 自動化為可選功能。

OCR / AI 自動 Hotspot 不得破壞手動建立 Hotspot 的基本流程。


## Phase 6

Reading

完成：

- Reading Mode
- Navigation
- Reading UI

Reading Mode 與 Editor 共用同一份教材資料。


## Phase 7

System Services

完成：

- Global Search
- Save
- Background Processing
- Loading Animation

建立共用系統服務。


## Phase 8

Optimization

完成：

- Performance Optimization
- UI Optimization
- Database Optimization
- API Optimization

完成第一版 MVP。


# 13. AI Automation — Image Quality / Auto Correction / OCR

## 13.0 文件狀態

本節包含：

- Technical Evidence（技術證據）
- Benchmark（實測）
- PM Decision（產品決策）
- Production Boundary（正式實作邊界）

PM Decision 已正式核定之內容優先於舊 Benchmark 敘述。

未經 PM 核定之 Threshold 與具體實作細節，不得自行寫死。

本節不代表阿德可以自行擴大 MVP Scope。


## 13.1 Confirmed Engineering Architecture

MagicBook 不建立 Camera System。

使用者使用裝置原生相機完成拍照。

MagicBook 從 Image Import 開始。

正式流程：

使用者以裝置原生相機拍照

↓

Image Area — Image Import

↓

Image Quality Check

↓

必要時 Auto Correction

↓

Re-Quality Check

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

拍照本身不屬於 MagicBook Camera System。


## 13.2 Image Quality Check

Image Quality Check 的目的不是找出完美照片。

主要目的：

> 判斷照片是否值得進入自動化處理，避免產生錯誤 Hotspot。

正式採三層結構。


### Layer 1 — 明顯不可救

照片已明顯不適合自動化處理。

直接：

Reject Automation（拒絕自動化處理）

不得進入 OCR。


### Layer 2 — 可修正

照片存在品質問題，但可能透過成熟 Auto Correction 技術改善。

執行：

Auto Correction

↓

Re-Quality Check


### Layer 3 — 品質正常

照片可可靠進入 OCR。

直接：

OCR

↓

Hotspot Generator


精確 Threshold 數值仍不得由阿德自行寫死。


## 13.3 End-to-End Benchmark

本次已完成：

- Pipeline A — Baseline
- Pipeline B — Quality Check Only
- Pipeline C — Full Pipeline

共測試：

15 種代表性情境。


### Benchmark Result

| Pipeline | SUCCESS | PARTIAL | FAIL |
| --- | ---: | ---: | ---: |
| A：Baseline | 40.0% | 33.3% | 26.7% |
| B：Quality Check Only | 33.3% | 26.7% | 40.0% |
| C：Full Pipeline | 73.3% | 13.3% | 13.3% |


### 結論

單獨加入 Quality Check 不能改善整體結果。

Pipeline B 反而使 SUCCESS：

40.0%

下降至：

33.3%。

原因是：

Quality Check 如果只負責 Reject，

會把原本可以透過 Auto Correction 救回的照片直接擋掉。

因此：

**Quality Check 與 Auto Correction 應視為同一套自動化 Pipeline。**


## 13.4 Deskew

實測：

| 傾斜角度 | 修正前 | 修正後 |
| --- | ---: | ---: |
| 6° | 88.9% | 100% |
| 8° | 88.9% | 100% |
| 10° | 0% | 100% |
| 12° | 0% | 100% |
| 15° | 0% | 100% |

5 次使用中：

救回 4 次。

Recovery Rate：

80%。

正式流程：

Skew Detection

↓

Deskew

↓

Re-Quality Check

只有修正後仍不可靠，才 FAIL。


## 13.5 Denoise

低光源＋雜訊：

| 情境 | 原始 | Denoise 後 |
| --- | ---: | ---: |
| 亮度 55% + 雜訊 15 | 0% | 100% |
| 亮度 40% + 雜訊 15 | 0% | 100% |

Denoise 約：

1360ms / 張。

因此：

Denoise 必須使用 Background Processing。


### Denoise Trigger

Denoise 必須同時具備：

Low Quality Evidence

+

Independent Noise Evidence

才能觸發。

Contrast 偏低不得單獨觸發 Denoise。


## 13.6 Sharpen

| 模糊程度 | 修正前 | Sharpen 後 |
| --- | ---: | ---: |
| 3px | 77.8% | 100% |
| 4px | 66.7% | 77.8% |
| 5px | 55.6% | 55.6% |
| 6px | 22.2% | 33.3% |
| 8px | 0% | 0% |

Sharpen：

- 可改善輕微模糊
- 無法恢復嚴重模糊
- 約 16ms
- 成本低

不能宣稱 Sharpen 已證實能提升整體 End-to-End Success。


## 13.7 CLAHE

CLAHE（對比度增強）對本次低光源＋雜訊情境沒有實質改善。

因此：

**CLAHE 不列入目前主要 Auto Correction Pipeline。**


## 13.8 尚未解決情境

### 嚴重模糊

影像資訊已遺失。

目前視為不可救援情境。


### 中英混合

目前：

PARTIAL。

主要問題：

OCR / Layout Understanding。


### 表格＋文字

目前：

PARTIAL。

主要問題：

- 文字順序
- 版面結構


### 陰影遮擋

目前：

FAIL。

現有 Auto Correction 無法可靠救援。

不得將陰影遮擋誤判為 Skew。


## 13.9 Minimum Necessary Processing

不得對所有圖片執行：

- Deskew
- Denoise
- Sharpen

全部處理。

應只執行必要修正。

原因：

- 降低 Processing Time
- 降低 Background Processing 負擔
- 避免不必要影像處理


## 13.10 Re-Quality Check

任何 Auto Correction 完成後：

**必須重新執行 Image Quality Check。**

不得：

Correction

↓

直接假設成功

↓

OCR

必須：

Correction

↓

Re-Quality Check

↓

Pass → OCR

Fail → Reliable Failure


## 13.11 Reliable Failure

正式原則：

> Reliable Failure（可靠失敗）優於錯誤成功。

如果系統不能可靠建立互動內容：

不得：

- 猜測文字
- 猜測座標
- 建立錯誤 Hotspot
- 顯示 SUCCESS

應：

PARTIAL

或：

FAIL。


## 13.12 Brightness / Contrast

Brightness（亮度）與 Contrast（對比度）不得單獨作為 Reject 條件。

單純偏暗不代表照片一定不可用。

單純 Contrast 偏低也不代表一定需要 Denoise。


## 13.13 Processing Time

| Pipeline | Average | P95 | Maximum |
| --- | ---: | ---: | ---: |
| Baseline | 866ms | 2243ms | 2243ms |
| Quality Check | 805ms | 1471ms | 1471ms |
| Full Pipeline | 1878ms | 3290ms | 3290ms |

Full Pipeline 平均約為 Baseline 的 2.2 倍。

最慢案例：

3290ms。

Denoise：

約 1360ms / 張。

因此：

Background Processing 必須存在。


## 13.14 OCR Cost Benchmark

目前使用：

$0.0015 / OCR Call

作為成本模型假設。

不是正式 Provider 價格。

| Pipeline | OCR 呼叫比例 | 1,000 張 OCR Calls | 假設成本 |
| --- | ---: | ---: | ---: |
| Baseline | 100% | 1000 | $1.50 |
| Quality Check Only | 60% | 600 | $0.90 |
| Full Pipeline | 93.3% | 933 | $1.40 |

Quality Check 的主要價值不是節省 OCR API 成本。

真正價值是：

降低錯誤 Hotspot。

降低老師人工修正教材的時間。


## 13.15 OCR Provider

MVP 已核定：

Google Cloud Vision API

DOCUMENT_TEXT_DETECTION

正式串接必須透過：

Replaceable Provider Adapter（可替換 Provider Adapter）。

MagicBook 不得讓核心資料架構直接綁死 Google API。


## 13.16 Hotspot Coordinate Transformation

如果 Auto Correction 改變影像幾何，

例如：

Deskew

則 OCR 取得之座標屬於 Processed Image 座標系統。

Hotspot Generator 必須：

Processed Coordinates

↓

Coordinate Transform

↓

Final Display Coordinates

↓

Hotspot

確保 Hotspot 正確對應使用者實際看到的教材圖片。


## 13.17 Image Storage Rule

MagicBook 不是使用者的照片倉庫。

因此：

### 被拒絕的圖片

如果圖片被判定為明顯不可救：

不得形成教材資產。

不得因 Quality Check 失敗而永久建立另一份教材圖片。


### Processed Image

Auto Correction 所產生的 Processed Image：

僅供：

- OCR
- AI
- Hotspot Generator

使用。

不得形成第二份教材圖片資產。

不得自動建立新的 Page Image。


### 教材 Image Asset

只有真正被使用者確認為教材內容的圖片，

才成為 Page 的 Image Asset。


## 13.18 Image Adjustment / Retake / Re-select

使用者可以：

- 調整圖片
- 重新拍攝
- 重新選擇圖片

可借力使用：

- 裝置既有影像能力
- 瀏覽器既有能力
- HTML 原生能力
- 成熟影像工具
- 成熟開源函式庫

MagicBook 不自行重新發明一套 Image Editor。

使用者完成調整後：

必須重新進入完整 Image Quality Check 流程。


## 13.19 User Experience

使用者不需要知道：

- AI
- OCR
- Confidence
- Bounding Box
- Model
- Provider
- Quality Check

### 照片品質不足

顯示：

「⚠️ 照片品質不足」

「請重新拍攝清晰、光線充足的照片」

「[知道了]」


### 自動建立互動內容失敗

顯示：

「⚠️ 無法自動建立互動內容」

「你可以重新拍攝，或直接手動建立互動內容」

「[重新拍攝] [手動建立]」


## 13.20 Camera API — Not MVP

以下技術正式排除於 MagicBook 3.0 MVP：

- getUserMedia()
- ImageCapture
- Exposure Control
- Focus Control
- HDR Control
- MediaStreamTrack Camera Capability
- Camera Preview
- MagicBook 專用 Camera System

使用者拍照由裝置既有相機完成。

MagicBook 僅負責 Image Import。


## 13.21 Reuse Before Reinvent

MagicBook 所有工程開發皆必須遵守：

> Reuse Before Reinvent（先利用現有技術，再考慮自行開發）

遇到新需求時，優先順序：

1. OS / Device Existing Capability
2. Browser Existing Capability
3. HTML / CSS / JavaScript Native Capability
4. Mature Open Source Library
5. Mature Third-party Service
6. 最後才評估自行開發

工程師不得在未確認現有技術之前，

直接自行建立新的：

- Camera System
- Image Editor
- Image Processing Algorithm
- Browser Capability
- UI Interaction Mechanism

MagicBook 的工程價值不是重新發明已經存在的工具，

而是：

**把成熟技術組合成簡單的使用者體驗。**


## 13.22 Benchmark Recovery Summary

Baseline 非 SUCCESS：

9 個案例。

Full Pipeline 成功救回：

5 個。

Overall Recovery Rate：

55.6%。

Deskew：

80%。

Denoise：

100%。

Sharpen：

目前沒有單獨救回完整 End-to-End 案例。


## 13.23 Error Hotspot Principle

本次 15 個案例中：

沒有發現：

「系統產生錯誤 Hotspot，但卻宣稱 SUCCESS」

的案例。

正式工程原則：

如果系統不能可靠建立互動內容，

不得標記 SUCCESS。

不得建立猜測性 Hotspot。


## 13.24 Technical Evidence Files

End-to-End Benchmark：

end_to_end_results.json

Image Quality / Auto Correction Benchmark：

correction_results.json

上述資料屬於：

Technical Evidence（技術證據）。

不是獨立 Product Specification。


## 13.25 Production Implementation Boundary

以下項目不得由阿德自行擴大：

- Crop
- Perspective Correction
- Shadow Detection
- Handwriting Recognition
- Camera System
- 自製 Image Editor
- 未核定 OCR Provider
- 未核定新的 Quality Metric

若需要新增技術：

必須先提出 Technical Proposal（技術方案），

再由 PM Decision（產品決策）核定。


## 13.26 Threshold Status

以下精確數值仍不得由阿德自行寫死：

- Blur Threshold
- Skew Threshold
- Noise Threshold
- Contrast 參考值
- Auto Correction Trigger Condition

Benchmark 數據只能作為：

Technical Evidence（技術證據）。

正式 Production Threshold 必須經 PM 核定。


# 14. Change Log

本文件記錄 MagicBook 3.0 MVP Development 之重大版本更新。

所有需求變更皆應先更新本文件，

再同步更新相關設計文件。


## Version 2.6

### PM Decision 01 / 02 + Image Import + Reuse Before Reinvent

本版本整合：

- PM Decision 01
- PM Decision 02
- End-to-End Benchmark
- Image Import Architecture
- Camera API 排除
- Auto Correction
- Deskew
- Denoise
- Sharpen
- Re-Quality Check
- Reliable Failure
- Background Processing
- OCR Provider
- Hotspot Coordinate Transformation
- Image Storage Rule
- User Adjustment / Retake / Re-select
- Reuse Before Reinvent

正式確認：

### Image Input

MagicBook 不建立專用 Camera System。

使用者使用裝置既有相機完成拍照。

MagicBook 從 Image Import 開始。

### Image Quality

Quality Check 與 Auto Correction 為同一套自動化 Pipeline。

不得只建立單獨 Reject System。

### Auto Correction

正式保留：

- Deskew
- Denoise
- Sharpen

正式不採用：

- CLAHE

### User Control

使用者可以：

- 調整圖片
- 重新拍攝
- 重新選擇圖片

調整後必須重新進入品質檢查流程。

### Image Storage

MagicBook 不作為使用者照片倉庫。

拒絕的圖片不得形成教材資產。

Processed Image 不形成第二份教材資產。

### OCR

MVP 使用：

Google Cloud Vision API DOCUMENT_TEXT_DETECTION

並採：

Replaceable Provider Adapter。

### Engineering Principle

正式加入：

Reuse Before Reinvent。

所有新技術需求必須先確認既有：

- OS
- Device
- Browser
- Native HTML / CSS / JavaScript
- Open Source Library
- Third-party Service

最後才評估自行開發。


## Version 2.5

### PM Decision 01 / 02 Integration

正式整合：

- Image Import Architecture
- Image Quality Check
- Auto Correction
- Deskew
- Denoise
- Sharpen
- Re-Quality Check
- Reliable Failure
- Background Processing
- OCR Provider
- Hotspot Coordinate Transformation


## Version 2.4

### Image Area — Image Import

將 Camera（拍照）正式用詞統一為：

Image Import（圖片匯入）。

MagicBook 不建立專用 Camera 功能。


## Version 2.3

### Camera API Excluded

確認 Camera API 不屬於 MagicBook 3.0 MVP。

MagicBook 不建立 Camera System。


## Version 2.2

### AI Automation — Technical Validation

新增：

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
- End-to-End Benchmark

本階段定位為：

Technical Evidence（技術證據）。

未自行寫死正式 Threshold。

未自行擴大 MVP Scope。


## Version 2.1

### Exercise Removed

確認 Exercise 不屬於 MagicBook 3.0 MVP。

移除 Exercise 相關規格。

MagicBook 3.0 定位為：

Interactive Teaching Material Tool（互動教材工具）。

不包含：

Exercise / Exam Authoring System（考題／考卷製作系統）。


### Book Library

確認 Folder 為 Book Library 正式分類功能。

支援：

- Create
- Rename
- Delete
- Move
- Reorder
- Nested Folder
- Drag & Drop Sorting


### Global Search

確認：

- Search Icon 固定於畫面右上方
- Floating Search Toolbar
- Close 後 Search Icon 仍保留


### System Performance

確認：

- Background Processing
- Non-blocking UI
- Loading Animation

為共同開發要求。


# END OF DOCUMENT
