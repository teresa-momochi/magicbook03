# MagicBook 3.0 API Design - Version: 2.0

Version: 2.0

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-09

---

# Table of Contents

0. API Design Purpose
1. API Design Principles
2. API Architecture
3. Authentication API
4. User Account / Access API
5. Book Library API
6. Folder API
7. Book API
8. Lesson API
9. Page API
10. Image Area API
11. Text Area API
12. HTML Overlay API
13. Hotspot API
14. Popup API
15. Dictionary API
16. AI API
17. Audio API
18. Video API
19. Navigation API
20. Global Search API
21. Save API
22. Background Processing API
23. Image Quality / Auto Correction / OCR API
24. File and Storage Rules
25. API Response and Error Handling
26. Permission and Data Isolation
27. API Versioning
28. Idempotency and Retry
29. Performance and Background Processing
30. Replaceable Provider Architecture
31. API Security Rules
32. Development Boundaries
33. API Completion Criteria
34. Change Control
35. Change Log

---

# 0. API Design Purpose

## 0.1 Purpose

本文件定義 MagicBook 3.0 的 API Design（API 設計）。

API（Application Programming Interface，應用程式介面）負責讓：

- User Interface（使用者介面）
- Editor（編輯器）
- Reading Mode（閱讀模式）
- Core Modules（核心模組）
- Database（資料庫）
- Storage（儲存）
- Background Processing（背景處理）
- Replaceable Services（可替換服務）

依照統一規則交換資料與執行操作。

本文件的目的不是重新定義產品功能，而是將已確認的產品功能與資料架構整理成一致的 API 邊界。

---

## 0.2 Source of Truth

API Design 必須遵循以下正式文件：

1. Product Specification（產品規格）
2. MVP Development（MVP 開發規格）
3. Roadmap（開發路線圖）
4. Development Guidelines（開發規範）
5. Database Design（資料庫設計）

如果 API Design 與上述文件產生衝突，依以下優先順序處理：

> Product Specification → MVP Development → Roadmap → Development Guidelines → Database Design → API Design

各文件依其職責提供正式約束：

- Product Specification（產品規格）：產品功能與產品行為
- MVP Development（MVP 開發規格）：MVP 範圍與已確認開發行為
- Roadmap（開發路線圖）：開發階段、順序與依賴
- Development Guidelines（開發規範）：工程共通原則與開發規則
- Database Design（資料庫設計）：資料架構與資料關係
- API Design（API 設計）：將上述已確認內容轉換為 API Boundary（API 邊界）

API Design 不得自行覆寫任何較高優先級的正式文件。

---

## 0.3 API Scope

本文件主要定義：

- API Resource（API 資源）
- API Operation（API 操作）
- API Boundary（API 邊界）
- Request / Response（請求／回應）
- Authentication（身分驗證）
- Authorization（授權）
- Data Isolation（資料隔離）
- Error Handling（錯誤處理）
- Background Processing（背景處理）
- Provider Adapter（服務供應商介面層）
- Retry（重試）
- Versioning（版本管理）

本文件目前不提前鎖定：

- Database Field（資料庫欄位）
- Database Index（資料庫索引）
- SQL Implementation（SQL 實作）
- Provider-specific Internal Schema（服務供應商專用內部結構）
- Exact Hosting Architecture（實際部署架構）
- 未經 PM 核定的新 API 功能

---

# 1. API Design Principles

## 1.1 Teaching Material First

Teaching Material（教材）永遠是產品核心。

API 不得因為互動功能而直接破壞正式教材資料。

教材資料與：

- Interaction Data（互動資料）
- Processing Data（處理資料）
- AI Data（AI 資料）
- OCR Data（OCR 資料）

必須保持責任分離。

---

## 1.2 Complete Product Architecture

第一版 MVP（Minimum Viable Product，最小可行產品）建立完整核心 API 架構。

所有核心模組應具有清楚的 API Boundary（API 邊界）。

不得為單一功能建立另一套獨立 API 架構。

---

## 1.3 Modular API

每個核心模組應具有獨立 API Resource（API 資源）。

例如：

- User Account API
- Book API
- Lesson API
- Page API
- Image API
- Text API
- Overlay API
- Hotspot API
- Search API
- Processing API

模組之間採 Low Coupling（低耦合）。

---

## 1.4 Replaceable Service

第三方服務必須透過 Provider Adapter（服務供應商介面層）整合。

包括：

- OCR Provider（OCR 服務供應商）
- AI Provider（AI 服務供應商）
- Dictionary Provider（字典服務供應商）
- Audio Provider（音訊服務供應商）
- Video Provider（影片服務供應商）

核心 API 不得直接綁定特定 Provider（服務供應商）。

---

## 1.5 Reuse Before Reinvent

API 開發遵循：

Reuse Before Reinvent（先利用現有技術，再考慮自行開發）。

優先使用：

1. OS / Device Existing Capability（作業系統／裝置既有能力）
2. Browser Existing Capability（瀏覽器既有能力）
3. HTML / CSS / JavaScript Native Capability（原生能力）
4. Mature Open Source Library（成熟開源函式庫）
5. Mature Third-party Service（成熟第三方服務）
6. 最後才評估自行開發

API 不應重新發明已經存在的成熟能力。

---

# 2. API Architecture

## 2.1 Resource-oriented Architecture

API 以 Resource-oriented Architecture（資源導向架構）組織。

核心資源：

- User Account（使用者帳號）
- Folder（資料夾）
- Book（教材）
- Lesson（課程章節）
- Page（頁面）
- Image（圖片）
- Text Block（文字區塊）
- Overlay Object（互動覆蓋物件）
- Hotspot（互動熱點）
- Popup（彈出內容）
- Processing Job（處理工作）
- Search Result（搜尋結果）

---

## 2.2 Resource Hierarchy

核心資料階層：

User Account
↓
Book Library
↓
Folder（可選）
↓
Book
↓
Lesson
↓
Page
↓
Image Area / Text Area / HTML Overlay
↓
Hotspot / Popup / Interactive Object

API 必須尊重此資料階層。

---

## 2.3 User Account Boundary

每一個教材相關 API Request（API 請求）都必須能確認：

- User Identity（使用者身分）
- User Account Identity（使用者帳號身分）
- Permission（權限）

不得依前端傳入的任何 User ID 或 Resource ID 直接信任資料權限。

---

## 2.4 API Transport

本文件定義 Logical API Contract（邏輯 API 契約）。

實際 Transport Layer（傳輸層）可依現有系統架構實作。

目前不因 API Design 自行新增另一套 Backend Architecture（後端架構）。

---

# 3. Authentication API

## 3.1 Responsibility

Authentication API（身分驗證 API）負責：

- Login（登入）
- Logout（登出）
- Session Management（工作階段管理）
- User Identity Verification（使用者身分驗證）
- Email Verification（Email 驗證）
- Access Status（使用權狀態）

---

## 3.2 Login

Logical operation：

`POST /auth/login`

Request：

- Login Credential（登入憑證）

Response：

- Authenticated User（已驗證使用者）
- Session（工作階段）
- Access Status（使用權狀態）
- Trial Used（試用狀態）

實際 Credential Format（憑證格式）依正式 Authentication Provider（身分驗證服務）決定。

---

## 3.3 Logout

Logical operation：

`POST /auth/logout`

完成後：

- Session 終止
- 前端清除目前 Authentication State（驗證狀態）

---

## 3.4 Current Session

Logical operation：

`GET /auth/session`

Response 至少需要讓系統知道：

- User Identity
- Access Status
- Trial Used

---

# 4. User Account / Access API

## 4.1 Responsibility

User Account / Access API（使用者帳號／使用權 API）負責：

- User Identity（使用者身分）
- Email Verification（Email 驗證）
- Session（工作階段）
- Access Status（使用權狀態）
- Trial Used（試用狀態）
- User Data Ownership（使用者資料歸屬）

Billing System（計費系統）不屬於本 API 的資料模型。

Billing System 負責付款、續約、到期、團體邀請、團體人數、價格與付款週期等商業規則；MagicBook API 不建立 Group Entity、Group ID、團主或團員資料。

## 4.2 Access Status

Access Status 只使用已確認的狀態：

- Active
- Inactive

Inactive 時不得使用 MagicBook。

本 API 不建立 Read Only、Archive Mode 或 Temporary Access 等額外使用模式。

## 4.3 Trial Status

Trial Used 用於記錄每個 User Account 是否已使用一次免費試用。

- 每個 User Account 一生一次
- Trial Used 不因重新登入而重置
- 試用內容與期限遵循 Product Specification 與 MVP Development

## 4.4 User Data Isolation

所有教材相關 API 都必須依目前已驗證的 User Account Identity 執行 Data Isolation（資料隔離）。

不同 User Account：

- 不得讀取彼此教材
- 不得修改彼此教材
- 不得搜尋彼此教材
- 不得取得彼此 Processing Data（處理資料）

---

# 5. Book Library API

## 5.1 Responsibility

Book Library API（教材庫 API）負責：

- Book Navigation（教材導覽）
- Folder Navigation（資料夾導覽）
- Book Search（教材搜尋）
- Recently Used（最近使用）
- Book Management（教材管理）

Book Library 不直接負責教材內容編輯。

---

## 5.2 List Books

`GET /books`

支援：

- Root Books（根目錄教材）
- Folder-filtered Books（資料夾教材）
- Ordering（排序）

---

## 5.3 Recently Used

`GET /books/recent`

只回傳目前 User Account 可存取的最近使用教材。

---

# 6. Folder API

## 6.1 Responsibility

Folder API（資料夾 API）負責教材分類。

支援：

- Create Folder
- Rename Folder
- Delete Folder
- Move Folder
- Reorder Folder
- Nested Folder
- Drag & Drop Sorting

---

## 6.2 Create Folder

`POST /folders`

Request：

- Folder Name（資料夾名稱）
- Parent Folder（可選）

---

## 6.3 Get Folder

`GET /folders/{folderId}`

---

## 6.4 Update Folder

`PATCH /folders/{folderId}`

支援：

- Rename
- Move
- Reorder

---

## 6.5 Delete Folder

`DELETE /folders/{folderId}`

Folder Delete Behavior（資料夾刪除行為）必須遵循 Database Design 與既有 PM Decision。

### Confirmed Folder Delete Rule

- Folder 只有在完全為空時才能刪除。
- 如果 Folder 內仍有 Book 或 Child Folder，禁止刪除。
- 不得 Cascade Delete（級聯刪除）。
- 不得因刪除 Folder 自動搬移其中的 Book 或 Child Folder。
- API 必須先檢查 Folder 是否為空，再決定是否允許刪除。

因此，本 API 不得把「非空 Folder」視為可刪除資源。

UI 提示文字沿用既有 PM Decision／已確認實作內容；API Design 不重新定義 UI 文案。

---

# 7. Book API

## 7.1 Responsibility

Book API（教材 API）負責：

- Create
- Read
- Rename
- Duplicate
- Delete
- Move
- Open

---

## 7.2 Create Book

`POST /books`

建立 Book。

依 MVP 規格：

建立 Book 時可以建立 Default Lesson（預設課程章節）。

---

## 7.3 Get Book

`GET /books/{bookId}`

回傳 Book 基本資料與已授權的結構資訊。

---

## 7.4 Update Book

`PATCH /books/{bookId}`

支援已確認的 Book metadata（教材中繼資料）更新。

---

## 7.5 Duplicate Book

`POST /books/{bookId}/duplicate`

建立 Book Duplicate（教材複製品）。

Duplicate 行為必須遵循資料歸屬與 User Data Isolation。

---

## 7.6 Delete Book

`DELETE /books/{bookId}`

必須檢查：

- User Permission
- User Account Ownership
- Related Data

不得因刪除錯誤造成其他 User Account 資料受影響。

---

## 7.7 Move Book

`PATCH /books/{bookId}/location`

用於：

- Root
- Folder

Folder 為 Optional Relationship（可選關係）。

---

# 8. Lesson API

## 8.1 Responsibility

Lesson API（課程章節 API）負責：

- Create Lesson
- Rename Lesson
- Delete Lesson
- Reorder Lesson

---

## 8.2 Create Lesson

`POST /books/{bookId}/lessons`

---

## 8.3 Get Lesson

`GET /lessons/{lessonId}`

---

## 8.4 Update Lesson

`PATCH /lessons/{lessonId}`

---

## 8.5 Delete Lesson

`DELETE /lessons/{lessonId}`

---

## 8.6 Reorder Lesson

`PATCH /books/{bookId}/lessons/order`

Request 只需傳遞已確認的排序資訊。

實際排序欄位名稱於實作階段確認。

---

# 9. Page API

## 9.1 Responsibility

Page API（頁面 API）負責：

- Add Page
- Delete Page
- Duplicate Page
- Reorder Page
- Page Navigation

---

## 9.2 Create Page

`POST /lessons/{lessonId}/pages`

---

## 9.3 Get Page

`GET /pages/{pageId}`

Page 是 Editor Mode（編輯模式）與 Reading Mode（閱讀模式）共用的資料基礎。

---

## 9.4 Update Page

`PATCH /pages/{pageId}`

只更新已確認的 Page-level data（頁面層級資料）。

---

## 9.5 Duplicate Page

`POST /pages/{pageId}/duplicate`

Duplicate 必須保持：

- User Account Ownership
- Book Relationship
- Lesson Relationship

---

## 9.6 Delete Page

`DELETE /pages/{pageId}`

---

## 9.7 Reorder Page

`PATCH /lessons/{lessonId}/pages/order`

---

# 10. Image Area API

## 10.1 Responsibility

Image Area API（圖片區域 API）負責：

- Image Import（圖片匯入）
- Image Display（圖片顯示）
- Image Replace（圖片替換）
- Image Delete（圖片刪除）
- Image Reorder（圖片排序）
- PDF Management（PDF 管理）
- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）

MagicBook 不建立專用 Camera System（相機系統）。

使用者先透過裝置既有能力取得照片，再由 Image Import 開始處理。

---

## 10.2 Import Image

`POST /pages/{pageId}/images`

輸入來源可包含：

- 使用者已拍攝照片
- 使用者截圖
- 裝置選取的圖片
- 裝置選取的檔案
- PDF

API 不負責建立專用 Camera System。

---

## 10.3 Replace Image

`PUT /images/{imageId}`

用於替換 Page 上既有 Image Asset（圖片資產）。

---

## 10.4 Delete Image

`DELETE /images/{imageId}`

刪除正式教材中的 Image Asset。

Processing Image（處理圖片）不可因此自動變成第二份正式教材資產。

---

## 10.5 Reorder Image

`PATCH /pages/{pageId}/images/order`

---

## 10.6 Image Import Processing

Image Import 後可進入：

Image Import
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
Coordinate Transformation
↓
Hotspot Generator
↓
HTML Overlay
↓
Hotspot

此流程的正式行為以 MVP Development 與 PM Decision 為準。

---

# 11. Text Area API

## 11.1 Responsibility

Text Area API（文字區域 API）負責：

- Create Text Block
- Edit Text Block
- Delete Text Block
- Reorder Text Block

---

## 11.2 Create Text Block

`POST /pages/{pageId}/text-blocks`

---

## 11.3 Get Text Block

`GET /text-blocks/{textBlockId}`

---

## 11.4 Update Text Block

`PATCH /text-blocks/{textBlockId}`

---

## 11.5 Delete Text Block

`DELETE /text-blocks/{textBlockId}`

---

## 11.6 Reorder Text Block

`PATCH /pages/{pageId}/text-blocks/order`

OCR Result（OCR 結果）與 AI Result（AI 結果）不得自動直接取代正式 Text Block。

---

# 12. HTML Overlay API

## 12.1 Responsibility

HTML Overlay API（HTML 覆蓋層 API）負責：

- Overlay Layer
- Interactive Object
- Object Rendering
- Object Selection
- Layer Ordering

HTML Overlay 不得修改教材底圖。

---

## 12.2 Create Overlay Object

`POST /pages/{pageId}/overlays`

---

## 12.3 Get Overlay Object

`GET /overlays/{overlayId}`

---

## 12.4 Update Overlay Object

`PATCH /overlays/{overlayId}`

可包含已確認的：

- Position（位置）
- Size（尺寸）
- Layer Order（圖層順序）

實際欄位名稱與資料型別於實作階段確認。

---

## 12.5 Delete Overlay Object

`DELETE /overlays/{overlayId}`

---

# 13. Hotspot API

## 13.1 Responsibility

Hotspot API（互動熱點 API）負責：

- Add Hotspot
- Edit Hotspot
- Delete Hotspot
- Move Hotspot
- Resize Hotspot
- Save Hotspot
- Layer Order

---

## 13.2 Create Hotspot

`POST /overlays/{overlayId}/hotspots`

---

## 13.3 Get Hotspot

`GET /hotspots/{hotspotId}`

---

## 13.4 Update Hotspot

`PATCH /hotspots/{hotspotId}`

支援：

- Position
- Size
- Interaction Configuration（互動設定）

實際資料欄位依 Database Design 與實作階段確認。

---

## 13.5 Delete Hotspot

`DELETE /hotspots/{hotspotId}`

---

## 13.6 Hotspot Coordinate Rule

若 Image Processing（影像處理）造成教材幾何變化，例如 Deskew（校正傾斜），Hotspot Coordinate Transformation（熱點座標轉換）必須將互動座標正確對應回正式顯示座標系統。

不得產生「圖片已修正但 Hotspot 位置錯誤」的情況。

---

## 13.7 Reliable Failure

如果系統無法可靠建立 Hotspot：

- 不得建立猜測性 Hotspot
- 不得標記 SUCCESS
- 應回傳可理解的 Failure / Partial Result（失敗／部分結果）

---

# 14. Popup API

## 14.1 Responsibility

Popup API（彈出內容 API）負責：

- Popup Create
- Popup Read
- Popup Update
- Popup Delete
- Popup Layout

---

## 14.2 Popup

`POST /hotspots/{hotspotId}/popup`

Popup 應與 Hotspot 關聯。

---

## 14.3 Update Popup

`PATCH /popups/{popupId}`

---

## 14.4 Delete Popup

`DELETE /popups/{popupId}`

---

# 15. Dictionary API

## 15.1 Responsibility

Dictionary API（字典 API）為 Lookup Tool（查閱工具）。

目前確認內容：

- Word（單字）
- Chinese（中文）
- KK
- Pronunciation（發音）
- Example（例句）

第一版不提供收藏功能。

---

## 15.2 Lookup

Logical operation：

`GET /dictionary/lookup`

Request：

- Query Word（查詢單字）

Response：

- Word
- Chinese
- KK
- Pronunciation
- Example

---

## 15.3 Provider Adapter

Dictionary Provider 必須透過 Provider Adapter 整合。

核心教材資料不得直接依賴特定 Dictionary Provider。

---

# 16. AI API

## 16.1 Responsibility

AI API（AI API）負責：

- AI Panel
- Prompt Management（提示管理）
- Conversation（對話）
- History（歷史）
- AI Settings
- AI Provider Interface

AI 是產品工具，不是教材核心。

---

## 16.2 AI Conversation

Logical operation：

`POST /ai/conversations`

---

## 16.3 Get Conversation

`GET /ai/conversations/{conversationId}`

---

## 16.4 Prompt

Prompt Manager（提示管理器）應透過獨立 API 邊界管理。

---

## 16.5 Provider Adapter

AI Provider 必須透過 Provider Adapter。

目前產品規格列出的 Provider 類型包括：

- Claude
- GPT
- Gemini
- OpenRouter
- Future Providers

不得讓核心教材資料直接依賴任何單一 AI Provider。

---

# 17. Audio API

## 17.1 Responsibility

Audio API（音訊 API）負責：

- Audio Player
- Audio Source
- Audio CRUD
- Audio Settings

---

## 17.2 Audio Resource

Logical operations：

`GET /audio/{audioId}`

`POST /pages/{pageId}/audio`

`PATCH /audio/{audioId}`

`DELETE /audio/{audioId}`

---

## 17.3 Provider Independence

Audio Provider 可以替換。

Audio API 不應把核心教材資料綁定於單一 Audio Provider。

---

# 18. Video API

## 18.1 Responsibility

Video API（影片 API）負責：

- Video Player
- Video Source
- Video Settings

---

## 18.2 Video Resource

Logical operations：

`GET /video/{videoId}`

`POST /pages/{pageId}/video`

`PATCH /video/{videoId}`

`DELETE /video/{videoId}`

---

## 18.3 Provider Independence

Video Source（影片來源）可以替換。

核心教材資料不得綁定單一 Video Provider。

---

# 19. Navigation API

## 19.1 Responsibility

Navigation API（導覽 API）負責：

- Home
- Back
- Page Navigation
- Book Navigation
- Lesson Navigation

Navigation 不負責修改教材資料。

---

## 19.2 Page Navigation

Logical operation：

`GET /lessons/{lessonId}/pages/navigation`

回傳目前 Page 的：

- Previous Page（上一頁）
- Current Page（目前頁）
- Next Page（下一頁）

---

# 20. Global Search API

## 20.1 Responsibility

Global Search API（全域搜尋 API）是共用 Search Service（搜尋服務）。

搜尋範圍包括：

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

---

## 20.2 Search

`GET /search`

Request：

- Keyword（關鍵字）
- Scope（搜尋範圍）
- User Account

---

## 20.3 Search Result

Search Result（搜尋結果）應能導向實際相關內容。

Search API 不直接管理教材資料。

---

## 20.4 Search Features

已確認的功能：

- Keyword Search
- Instant Search
- Search Suggestions
- Recent Search
- Search Result Navigation

---

# 21. Save API

## 21.1 Responsibility

Save API（儲存 API）負責：

- Save Dialog
- Auto Validation（自動驗證）
- Save Status
- Cloud Storage（雲端儲存）

---

## 21.2 Save Book

`POST /books/{bookId}/save`

Save 前應執行：

1. Validation（驗證）
2. Permission Check（權限檢查）
3. Data Persistence（資料持久化）

---

## 21.3 Save Status

Save Status（儲存狀態）至少應讓 UI 知道：

- Saving
- Saved
- Failed

實際狀態模型於實作階段確認。

---

## 21.4 Unsaved Changes

如果 Save Failure（儲存失敗）：

- 不得直接關閉 Editor
- 不得遺失目前編輯內容
- 應提供 Retry
- 應提供可理解的錯誤訊息

---

# 22. Background Processing API

## 22.1 Responsibility

Background Processing API（背景處理 API）負責耗時工作。

包括：

- Image Processing
- Denoise
- OCR
- AI
- Compression
- Optimization

---

## 22.2 Processing Job

Logical resource：

`Processing Job（處理工作）`

Status：

- Pending
- Processing
- Completed
- Failed

---

## 22.3 Create Processing Job

`POST /processing/jobs`

Request 至少需要：

- Processing Type（處理類型）
- Source Resource（來源資源）
- User Account Context（工作空間上下文）

---

## 22.4 Get Processing Job

`GET /processing/jobs/{jobId}`

Response：

- Job Status
- Result Reference（結果參照）
- Error State（錯誤狀態）

---

## 22.5 Processing Data

Processing Data 是中間資料。

不得自動形成第二份正式教材資產。

---

# 23. Image Quality / Auto Correction / OCR API

## 23.1 Processing Pipeline

正式流程：

Image Import
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
Coordinate Transformation
↓
Hotspot Generator
↓
HTML Overlay
↓
Hotspot

---

## 23.2 Quality Check

Quality Check（品質檢查）可產生：

- Quality Result
- Processing Decision
- Correction Requirement
- Re-Quality Result

---

## 23.3 Auto Correction

目前正式保留：

- Deskew
- Denoise
- Sharpen

CLAHE 不列入目前主要 Auto Correction Pipeline。

---

## 23.4 Re-Quality Check

Auto Correction 完成後：

> 必須再次執行 Re-Quality Check。

不得因為「已修正」就直接判定「已合格」。

---

## 23.5 OCR

MVP 已核定：

Google Cloud Vision API

使用：

`DOCUMENT_TEXT_DETECTION`

OCR 必須透過：

`OCR Provider Adapter`

核心 API 不得直接依賴 Google-specific internal implementation（Google 特定內部實作）。

---

## 23.6 OCR Result

OCR Result（OCR 結果）主要包含：

- Text
- Bounding Box

OCR Result 不直接成為正式 Text Block。

---

## 23.7 Hotspot Generator

Hotspot Generator（熱點產生器）使用：

- OCR Text
- Bounding Box
- Page / Image Context

產生 Hotspot。

如果結果不可靠：

- 不建立猜測性 Hotspot
- 回傳 Failure / Partial Result
- 不標記 SUCCESS

---

## 23.8 Threshold Boundary

以下 Threshold（門檻）不得在 API Layer（API 層）自行寫死：

- Blur Threshold
- Skew Threshold
- Noise Threshold
- Contrast Reference
- Auto Correction Trigger Condition

正式 Threshold 必須經 PM Decision 核定。

---

# 24. File and Storage Rules

## 24.1 File Responsibility

File Storage（檔案儲存）負責正式教材檔案與必要的處理資料。

---

## 24.2 Teaching Material Asset

正式進入教材的圖片才是：

Teaching Material Asset（教材資產）。

---

## 24.3 Processing Image

Processing Image（處理圖片）只是中間資料。

不得自動建立第二份正式教材資產。

---

## 24.4 Rejected Image

Quality Check 判定：

- FAIL
- 不可可靠處理

不得因為處理流程自動建立第二份正式教材資產。

MagicBook 不是使用者照片倉庫。

---

## 24.5 Storage Separation

正式教材資料與：

- AI Processing
- OCR Processing
- Image Processing

必須保持分離。

---

# 25. API Response and Error Handling

## 25.1 Response Principle

API Response（API 回應）必須保持一致。

成功與失敗格式應由共用規則管理。

不得每個模組自行建立完全不同的 Response Format（回應格式）。

---

## 25.2 Success Response

成功回應至少應包含：

- Success State（成功狀態）
- Resource Data（資源資料）

實際 Envelope Format（外層格式）於實作階段確認。

---

## 25.3 Error Response

錯誤回應至少需要：

- Error Code（錯誤代碼）
- User Message（使用者訊息）
- Technical Context（技術上下文，僅供系統使用）

---

## 25.4 User-facing Error

一般使用者不應直接看到：

- Provider Name
- Model Name
- Confidence
- Bounding Box
- Internal Stack Trace
- Internal Database Error
- Internal API Detail

使用者看到的應是可理解的錯誤訊息。

---

## 25.5 Error Categories

至少需要區分：

- Authentication Failure
- Authorization Failure
- Validation Failure
- Upload Failure
- Save Failure
- Network Failure
- Processing Failure
- OCR Failure
- AI Failure
- Not Found
- Conflict
- Internal Error

實際 Error Code（錯誤代碼）於實作階段統一。

---

# 26. Permission and Data Isolation

## 26.1 Authentication Before Data Access

教材資料存取前必須完成：

Authentication
↓
User Account Resolution
↓
Permission Check
↓
Data Access

---

## 26.2 User Account Ownership

所有核心教材資料必須可追溯至 User Account。

---

## 26.3 Cross User Account Access

API 不得允許：

- User Account A 讀取 User Account B
- User Account A 修改 User Account B
- User Account A 搜尋 User Account B
- User Account A 取得 User Account B 的 Processing Data

---

## 26.4 Permission

API Authorization（API 授權）以已驗證的 User Account Identity 與 Resource Ownership（資源所有權）為基礎。

本版本不建立 Workspace Role（工作空間角色）、團主、團員或 Teacher Account（教師帳號）資料模型。

具體 Permission Matrix（權限矩陣）僅在產品規格明確核定後才可增加。

---

# 27. API Versioning

## 27.1 Version Principle

API 必須具備 Versioning（版本管理）能力。

API Version 不得與 Database Schema Version（資料庫結構版本）混為一談。

---

## 27.2 Backward Compatibility

在 API 版本升級時：

- 不得直接破壞既有核心資料
- 不得直接破壞正式教材
- 不得讓 Provider 更換導致核心資料失效

---

## 27.3 Breaking Change

Breaking Change（破壞性變更）必須：

1. PM Review
2. 更新正式 Specification
3. 更新 API Design
4. 更新相關 Database Design
5. 再進入 Development

不得工程師先修改 API，再回頭補文件。

---

# 28. Idempotency and Retry

## 28.1 Idempotency

Idempotency（冪等性）用於避免重複 Request（請求）造成重複資料。

特別適用於：

- Create Book
- Create Page
- Image Import
- Processing Job
- Save
- Duplicate

實際 Idempotency Key（冪等鍵）格式於實作階段確認。

---

## 28.2 Retry

可重試的工作包括：

- Network Failure
- Temporary Provider Failure
- Background Processing Failure

不可重試的 Validation Error（驗證錯誤）不應無限 Retry。

---

## 28.3 Duplicate Protection

重複 Request 不得造成：

- Duplicate Book
- Duplicate Page
- Duplicate Image Asset
- Duplicate Processing Job

除非使用者明確要求 Duplicate。

---

# 29. Performance and Background Processing

## 29.1 Performance First

API 不得因耗時工作阻塞主要 UI Flow（使用者流程）。

---

## 29.2 Background Work

以下工作應優先考慮 Background Processing：

- Denoise
- OCR
- AI
- Image Processing
- Compression
- Optimization

---

## 29.3 Loading State

長時間工作應回傳 Processing Status。

UI 可依：

- Pending
- Processing
- Completed
- Failed

顯示 Brand Loading Animation（品牌載入動畫）或相應狀態。

---

## 29.4 Large File

大型檔案匯入時：

- 不得造成 UI Freeze（介面凍結）
- 應提供 Large File Warning（大檔提示）
- 必要時進行 Background Processing

---

# 30. Replaceable Provider Architecture

## 30.1 Provider Adapter

第三方服務全部經由 Adapter（介面層）。

架構：

Core API
↓
Provider Adapter
↓
Provider

---

## 30.2 OCR Provider

目前核定：

Google Cloud Vision API

Adapter 必須讓未來 Provider 可替換。

---

## 30.3 AI Provider

AI Provider 不得寫死於 Core API。

目前支援的 Provider 類型：

- Claude
- GPT
- Gemini
- OpenRouter
- Future Providers

---

## 30.4 Dictionary Provider

Dictionary Provider 必須可替換。

---

## 30.5 Audio / Video Provider

Audio Provider 與 Video Provider 同樣遵循 Replaceable Service。

---

# 31. API Security Rules

## 31.1 No Trust in Client Identity

API 不得只依賴 Client-provided User ID（前端提供的使用者識別碼）。

User Identity 必須由 Authentication Layer（驗證層）確認。

---

## 31.2 No Trust in Client Resource Scope

API 不得只依賴前端提供的 User Account ID 判斷資料權限。

必須重新驗證：

- Authenticated User
- User Account
- Permission
- Resource Ownership

---

## 31.3 Provider Credentials

第三方 Provider Credential（服務憑證）不得暴露給一般使用者。

---

## 31.4 Processing Data

Processing Data 不得因 API 回應而被一般使用者任意取得。

除非該資料屬於已確認的使用者可見結果。

---

## 31.5 Error Information

API Error 不得洩漏：

- Secret
- Credential
- Internal Database Structure
- Provider Secret
- Internal Stack Trace

---

# 32. Development Boundaries

## 32.1 No Scope Expansion

API Design 不得新增未確認功能。

不得因「API 比較方便」而新增：

- 新產品功能
- 新資料模型
- 新互動流程
- 新 Provider
- 新 UI Flow

---

## 32.2 No Independent Architecture

工程師不得因單一 API 功能建立另一套：

- Authentication System
- Storage System
- Permission System
- Search System
- Processing System

應優先使用既有共用服務。

---

## 32.3 No Camera API

MagicBook 不建立：

- Camera System
- getUserMedia Camera Flow
- ImageCapture Camera Flow
- Exposure Control System
- Custom Camera Preview System

使用者拍照由裝置既有相機完成。

MagicBook 從 Image Import 開始。

---

## 32.4 No Self-invented Image Technology

工程師不得在未確認現有技術前自行建立：

- Image Editor
- Image Processing Algorithm
- Camera System
- OCR Algorithm
- UI Interaction Mechanism

應遵循 Reuse Before Reinvent。

---

## 32.5 Billing Webhook Boundary

Billing System 與 Supabase 的使用權同步透過 Webhook（網路回呼）進行。

API Design 只定義邊界，不鎖定實際 Webhook URL 或第三方 Billing Provider 的內部格式。

Webhook 處理原則：

1. Billing 通知 User ID 的使用權狀態。
2. Supabase 無回應時，第一次失敗後 10 分鐘重試。
3. 第二次仍無回應時通知管理者／PM。
4. Database Internal Error 不要求使用者重新付款。
5. 使用者看到的錯誤訊息為可理解的系統處理中提示。

Billing 的價格、付款、付款週期、團體人數與邀請規則不進入 MagicBook API 資料模型。

---

## 32.6 No Unapproved Threshold

API Layer 不得自行決定正式：

- Blur Threshold
- Skew Threshold
- Noise Threshold
- Contrast Threshold
- Auto Correction Trigger

---

## 32.7 No Direct OCR-to-Text Replacement

OCR Result 不得直接覆蓋正式 Text Block。

OCR 主要服務於：

- Text + Bounding Box
- Hotspot Generator

---

# 33. API Completion Criteria

API Design 完成與否至少檢查：

## 33.1 Core Architecture

- [ ] Authentication API
- [ ] User Account / Access API
- [ ] Book Library API
- [ ] Folder API
- [ ] Book API
- [ ] Lesson API
- [ ] Page API

## 33.2 Content

- [ ] Image Area API
- [ ] Text Area API
- [ ] HTML Overlay API
- [ ] Hotspot API
- [ ] Popup API

## 33.3 Services

- [ ] Dictionary API
- [ ] AI API
- [ ] Audio API
- [ ] Video API
- [ ] Navigation API
- [ ] Global Search API
- [ ] Save API

## 33.4 Processing

- [ ] Background Processing API
- [ ] Quality Check API boundary
- [ ] Auto Correction API boundary
- [ ] Re-Quality Check API boundary
- [ ] OCR API
- [ ] Hotspot Generator boundary

## 33.5 Engineering

- [ ] Error Handling
- [ ] Permission
- [ ] Data Isolation
- [ ] Versioning
- [ ] Retry
- [ ] Idempotency
- [ ] Performance
- [ ] Provider Adapter
- [ ] Security

---

# 34. Change Control

## 34.1 API Change Rule

任何新增或修改 API：

必須先確認是否涉及：

- Product Specification
- MVP Development
- Database Design
- Roadmap
- Development Guidelines

---

## 34.2 PM Review

如果 API Change（API 變更）會改變：

- User Flow
- Product Function
- Data Ownership
- Data Model
- Permission
- Processing Flow

必須先進行 PM Review（產品經理審查）。

---

## 34.3 Specification First

正式流程：

PM Decision
↓
Update Specification
↓
Update API Design
↓
Update Database Design（若需要）
↓
Development
↓
Testing

不得反過來：

Development
↓
再補 Specification

---

## 34.4 Consistency Review

API Design 更新後，必須進行：

Folder Delete Rule 等既有 PM Decision 已確認規則，也必須在 API Change 時保持一致，不得重新標記為「尚未核定」。


Specification Consistency Review（規格一致性檢查）。

至少檢查：

- Product Specification
- MVP Development
- Roadmap
- Development Guidelines
- Database Design

---

# 35. Change Log

## Version 2.0

### Account / Billing Architecture Synchronization

本版本同步 Product Specification v3.4、MVP Development v3.0、Development Guidelines v4.4 與 Database Design v2.0 已正式確認的 Account / Billing 架構。

正式變更：

- 移除 Workspace 作為 API 資料根層級。
- 移除 Workspace API、Workspace ID 與 Workspace Permission 模型。
- 核心教材資料改由 User Account 直接歸屬。
- Authentication API 同步 Email Verification、Access Status、Trial Used。
- Book / Folder API 不再以 Workspace ID 作為路徑層級。
- Permission 與 Data Isolation 改以已驗證的 User Account Identity 與 Resource Ownership 為基礎。
- Billing System 與 MagicBook API 分離。
- Billing → Supabase 使用 Webhook 同步 Active / Inactive。
- 不在 API 建立 Group Entity、Group ID、團主、團員、價格或付款資料。
- 不新增未經 PM 核定的產品功能或 API Scope。

本版本只做規格同步，不要求立即修改實際 API Implementation（API 實作）。

---

## Version 1.2

### Hotspot Coordinate Transformation Synchronization

本版本同步目前已確認的 AI Automation（AI 自動化）流程順序。

正式流程為：

Image Import（圖片匯入）
↓
Image Quality Check（圖片品質檢查）
↓
必要時 Auto Correction（自動修正）
↓
Re-Quality Check（重新品質檢查）
↓
OCR（光學字元辨識）
↓
Text + Bounding Box（文字＋邊界框）
↓
Coordinate Transformation（座標轉換）
↓
Hotspot Generator（Hotspot 產生器）
↓
HTML Overlay（HTML 疊加層）
↓
Hotspot（熱點）

Coordinate Transformation（座標轉換）必須在 Hotspot Generator（Hotspot 產生器）建立最終 Hotspot（熱點）之前完成。

本次只同步既有已確認規則，不新增產品功能、不新增 API Scope、不新增資料模型。

---

## Version 1.1

### Specification Consistency Synchronization

本版本同步修正兩項文件一致性問題：

1. 更新 §0.2 Source of Truth 的衝突處理優先順序，納入：
   - Product Specification
   - MVP Development
   - Roadmap
   - Development Guidelines
   - Database Design
   - API Design

2. 同步既有 PM Decision 已確認的 Folder Delete Rule：
   - 空 Folder 才可刪除
   - 非空 Folder 禁止刪除
   - 不得 Cascade Delete
   - 不得自動搬移內容

本次只同步既有已確認規則，不新增產品功能，不新增 API Scope。

---

## Version 1.0

Status: Draft

本版本建立 MagicBook 3.0 API Design 基礎架構。

本版本整理：

- Authentication API
- Workspace API
- Book Library API
- Folder API
- Book API
- Lesson API
- Page API
- Image Area API
- Text Area API
- HTML Overlay API
- Hotspot API
- Popup API
- Dictionary API
- AI API
- Audio API
- Video API
- Navigation API
- Global Search API
- Save API
- Background Processing API
- Image Quality / Auto Correction / OCR API
- File and Storage Rules
- Error Handling
- Permission and Data Isolation
- API Versioning
- Idempotency and Retry
- Performance
- Provider Adapter
- Security
- Development Boundaries
- Completion Criteria
- Change Control

本版本不鎖定：

- Database Field
- SQL
- Index
- Provider-specific Schema
- 未核定 Threshold
- 未核定新功能

---

END OF DOCUMENT
