# MagicBook 3.0 MVP Task List

Version: 1.0
Status: Draft
Document Owner: Teresa Su
Product Manager: ChatGPT
Technical Lead: 阿德
Last Update: 2026-08-09

---

# 0. Document Purpose

本文件為 MagicBook 3.0 的：

**MVP Execution Task List（MVP 執行任務清單）**

本文件的責任是：

* 定義 MVP（Minimum Viable Product）開發執行順序
* 將已確認的 Product Specification（產品規格）轉換為可執行的 Development Tasks（開發任務）
* 定義每個 Task 的 Scope（範圍）
* 定義每個 Task 的 Completion Criteria（完成條件）
* 定義 Task 之間的 Dependency（依賴關係）
* 協助 Engineer（工程師）逐項開發、測試與驗收

本文件：

* 不重新定義產品功能
* 不覆寫 Product Specification（產品規格）
* 不覆寫 MVP Development（MVP 開發規格）
* 不覆寫 Roadmap（開發路線圖）
* 不重新定義 Database Schema（資料庫結構）
* 不重新定義 API（應用程式介面）
* 不重新定義 AI Automation Pipeline（AI 自動化流程）
* 不重新定義 Editor Design（編輯器設計）
* 不重新定義 UI Design（使用者介面設計）

如本文件與正式規格發生衝突：

**正式規格優先，本文件必須停止執行並進行同步。**

---

# 1. Source of Truth

MagicBook 3.0 正式文件優先順序：

1. `01_Product_Specification.md`
2. `02_MVP_Development.md`
3. `03_Roadmap.md`
4. `04_Development_Guidelines.md`
5. `05_Database_Design.md`
6. `06_API_Design.md`
7. `07_AI_Design.md`
8. `08_Editor_Design.md`
9. `09_UI_Design.md`

本文件 `11_MVP_Task_List.md` 屬於：

**Execution Layer（執行層）**

不得提高自身優先級。

如果 Task List 與以上文件任何一份產生矛盾：

1. 停止該 Task
2. 列出衝突文件
3. 列出章節
4. 說明具體衝突
5. 等待 PM Decision（產品決策）
6. 必要時先同步正式文件
7. 再恢復 Development（開發）

---

# 2. Frozen Development Baseline

目前正式開工基準：

| Document                       | Version | Commit    |
| ------------------------------ | ------: | --------- |
| `01_Product_Specification.md`  |     3.3 | `22549c4` |
| `02_MVP_Development.md`        |     2.8 | `af3040a` |
| `03_Roadmap.md`                |     1.1 | `ffa18e9` |
| `04_Development_Guidelines.md` |     4.3 | `6559003` |
| `05_Database_Design.md`        |     1.2 | `3b33a4b` |
| `06_API_Design.md`             |     1.2 | `ffbd3da` |
| `07_AI_Design.md`              |     1.2 | `6f5fe74` |
| `08_Editor_Design.md`          |     1.2 | `de7524e` |
| `09_UI_Design.md`              |     1.0 | `8b85f59` |

以上文件已完成跨文件一致性驗證，作為目前：

**Frozen Baseline（凍結開工基準）**

---

# 3. MVP Development Philosophy

MagicBook 3.0 第一版 MVP：

**不是傳統的 Minimal Features（最少功能）產品。**

MVP 的主要目的：

> 建立完整產品架構（Complete Product Architecture）。

第一版必須建立：

* Complete Product Architecture（完整產品架構）
* Core Modules（核心模組）
* Data Model（資料模型）
* Core CRUD（核心建立／讀取／更新／刪除）
* Core UI（核心使用者介面）
* User Flow（使用者流程）

第三方服務可以逐步完善，但不得破壞既有產品架構。

不得採用：

> 先建立陽春版產品 → 之後再重新建立完整架構

的方式。

---

# 4. Core Development Principles

以下原則適用於所有 Tasks。

## 4.1 Architecture First（架構優先）

不得為了快速展示功能而跳過：

* Data Model（資料模型）
* Module Boundary（模組邊界）
* CRUD（建立／讀取／更新／刪除）
* User Flow（使用者流程）

---

## 4.2 Complete Product Architecture（完整產品架構）

第一版建立所有核心產品模組。

核心架構包括：

* Authentication（身分驗證）
* Workspace（工作空間）
* Book Library（教材庫）
* Folder（資料夾）
* Book（教材）
* Lesson（課程）
* Page（頁面）
* Image Area（圖片區）
* Text Area（文字區）
* HTML Overlay（HTML 疊加層）
* Hotspot（熱點）
* Popup（彈出視窗）
* Dictionary（字典）
* AI（人工智慧）
* Audio（音訊）
* Video（影片）
* Navigation（導覽）
* Reading Mode（閱讀模式）
* Global Search（全域搜尋）
* Context Toolbar（情境工具列）
* Save（儲存）
* Background Processing（背景處理）
* Brand Loading Animation（品牌載入動畫）

各模組應保持：

* Independent Development（獨立開發）
* Independent Testing（獨立測試）
* Independent Maintenance（獨立維護）
* Scalability（可持續擴充）

---

## 4.3 Modular Architecture（模組化架構）

不同模組保持清楚責任邊界。

不得因單一功能建立第二套系統。

---

## 4.4 One Data Model（單一資料模型）

Editor Mode（編輯模式）與 Reading Mode（閱讀模式）：

**共用同一份教材資料。**

不得建立兩套互相獨立的教材資料。

Editor Mode：

* Create（建立）
* Read（讀取）
* Update（更新）
* Delete（刪除）

Reading Mode：

* Read（讀取）
* Interaction（互動）

Reading Mode 不得修改教材。

---

## 4.5 Image Area / Text Area / HTML Overlay Separation

每個 Page（頁面）包含：

* Image Area（圖片區）
* Text Area（文字區）
* HTML Overlay（HTML 疊加層）

三者：

* Architecture Independent（架構獨立）
* Function Independent（功能獨立）
* Data Independent（資料獨立）
* Operation Independent（操作獨立）

### Image Area

負責：

* Image Import（圖片匯入）
* Image Management（圖片管理）
* PDF Management（PDF 管理）
* Image Rendering（圖片呈現）
* Image Optimization（圖片最佳化）
* Image Compression（圖片壓縮）

不負責互動。

### Text Area

負責：

* Text Input（文字輸入）
* Text Editing（文字編輯）
* Text Block Management（文字區塊管理）

不負責：

* OCR
* PDF Processing（PDF 處理）
* Image Processing（圖片處理）

OCR / AI 結果不得自動寫入 Text Area。

### HTML Overlay

負責：

* Interactive Object（互動物件）
* Object Rendering（物件呈現）
* Object Position（物件位置）
* Object Selection（物件選取）
* Layer Management（圖層管理）

不得直接修改教材底圖。

---

## 4.6 Teaching Material First（教材優先）

教材永遠是產品核心。

互動建立於教材之上。

不得因：

* OCR
* AI
* Image Processing
* Hotspot
* Popup

而破壞原始教材。

---

## 4.7 Reuse Before Reinvent（先利用，再重新發明）

任何工程問題依序評估：

1. Operating System（作業系統）
2. Device Capability（裝置能力）
3. Browser（瀏覽器）
4. Native Web Capability（原生 Web 能力）
5. Mature Open Source Library（成熟開源函式庫）
6. Mature Third-party Service（成熟第三方服務）
7. Custom Development（自行開發）

只有現有技術無法滿足需求時，才進入 Custom Development。

---

## 4.8 Background Processing（背景處理）

耗時工作不得阻塞 UI（使用者介面）。

適用於已確認的耗時工作，例如：

* Image Optimization
* Image Compression
* Denoise
* OCR
* AI
* 其他已確認耗時處理

需要等待時必須提供 Loading State（載入狀態）。

---

## 4.9 Replaceable Service（可替換服務）

第三方服務不得直接綁定核心產品資料。

適用於：

* AI Provider（AI 服務供應商）
* OCR Provider（OCR 服務供應商）
* Dictionary Provider（字典服務供應商）
* Audio Provider（音訊服務供應商）
* Video Provider（影片服務供應商）

應透過 Provider Adapter（服務供應商介面層）整合。

---

## 4.10 Reliable Failure（可靠失敗）

如果系統無法可靠完成：

不得：

* 猜測文字
* 猜測座標
* 建立猜測性 Hotspot
* 顯示錯誤 SUCCESS

應回傳：

* PARTIAL
* FAIL

或提供適當的使用者操作選項。

---

# 5. Technology Decision Boundary

Frozen 01–09 文件目前沒有指定：

* Frontend Framework（前端框架）
* Build Tool（建置工具）
* Component Library（元件函式庫）

因此：

**Task List 不將 React + Vite 宣稱為 Frozen Product Requirement。**

如果實作需要選擇：

* React
* Vite
* Vanilla JavaScript
* 其他技術

應依：

**Reuse Before Reinvent → Technical Proposal → PM Decision**

流程處理。

在 PM 未核定前，不得把未確認的技術選擇當成產品規格。

---

# 6. Development Sequence

MagicBook 3.0 依 `03_Roadmap.md` 的 Phase Dependency（階段依賴）執行：

```text
Phase 1
System Foundation
        ↓
Phase 2
Book Structure
        ↓
Phase 3
Editor
        ↓
Phase 4
Interaction
        ↓
Phase 5
AI
        ↓
Phase 6
Reading
        ↓
Phase 7
System Services
        ↓
Phase 8
Optimization
```

Phase 不代表每個功能必須等到最後才「第一次存在」。

它代表：

**主要開發與驗收順序。**

不得跳過必要的架構依賴。

---

# 7. Task 1 — System Foundation

## 7.1 Purpose

建立 MagicBook 3.0 的系統基礎。

## 7.2 Scope

完成：

* Authentication（身分驗證）
* Workspace（工作空間）
* Database Foundation（資料庫基礎）
* Book Library Foundation（教材庫基礎）

## 7.3 Authentication

建立：

* Login（登入）
* Logout（登出）
* Session Management（工作階段管理）
* User Authentication（使用者驗證）

支援：

* Personal Workspace（個人工作空間）
* Organization Workspace（機構工作空間）

## 7.4 Workspace

建立：

* Personal Workspace
* Organization Workspace
* Workspace Identity（工作空間身分）
* Basic Permission（基本權限）

Workspace 為資料歸屬的重要層級。

## 7.5 Database Foundation

建立符合正式 Database Design（資料庫設計）的基礎資料架構。

不得自行建立未核定的資料表、欄位或關係。

## 7.6 Book Library Foundation

建立 Book Library 基礎入口。

至少必須能：

1. 登入 MagicBook
2. 維持 Session
3. 進入正確 Workspace
4. 開啟 Book Library
5. 建立基本 Book
6. 正確儲存資料

## 7.7 Completion Criteria

Task 1 完成後：

* Authentication 可運作
* Session 可維持
* Workspace 可正確辨識
* Book Library 可進入
* Basic Book 可建立
* 資料可以正確持久化（Persistence）

---

# 8. Task 2 — Book Structure

## 8.1 Purpose

建立完整教材資料結構。

固定架構：

```text
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
```

## 8.2 Folder

完成：

* Create Folder
* Rename Folder
* Delete Folder
* Move Folder
* Reorder Folder
* Nested Folder
* Drag & Drop Sorting

Book 可以：

* 存在於 Book Library 根目錄
* 放入 Folder
* 在 Folder 之間移動

使用者可以選擇不使用 Folder，但 Folder 模組本身必須存在。

## 8.3 Folder Delete Rule

只有完全為空的 Folder 才能刪除。

非空 Folder：

* 不得刪除
* 不得 Cascade Delete（級聯刪除）
* 不得自動搬移內容

API 必須先確認 Folder 是否為空。

正式規則以：

`05_Database_Design.md`

與：

`06_API_Design.md`

為準。

## 8.4 Book

完成：

* Create Book
* Rename Book
* Duplicate Book
* Delete Book
* Open Book
* Book Search
* Recently Used
* Book Information

## 8.5 Lesson

完成：

* Create Lesson
* Rename Lesson
* Delete Lesson
* Reorder Lesson

第一版可使用 Default Lesson（預設課程）。

建立 Book 時可自動建立 Default Lesson。

## 8.6 Page

完成：

* Add Page
* Delete Page
* Duplicate Page
* Reorder Page
* Page Navigation

Page 為教材最小管理單位。

## 8.7 Completion Criteria

Task 2 完成後必須可以：

1. 建立 Folder
2. 建立 Nested Folder
3. 建立 Book
4. 將 Book 放入 Folder
5. 將 Book 移回根目錄
6. 建立 Lesson
7. 建立 Page
8. 排序 Folder / Book / Lesson / Page
9. 正確儲存資料階層

---

# 9. Task 3 — Editor

## 9.1 Purpose

建立完整教材 Editor（編輯器）。

Phase 3 的核心為：

* Image Area
* Text Area
* HTML Overlay
* Context Toolbar

## 9.2 Editor Data Model

Editor Mode 與 Reading Mode 必須共用同一份教材資料。

不得建立第二套教材資料。

## 9.3 Image Area

完成：

* Add Image
* Replace Image
* Delete Image
* Reorder Image
* Image Import

支援：

* PNG
* JPG
* JPEG
* PDF
* User-captured Photo（使用者已拍攝照片）
* Screenshot（使用者截圖）
* Device-selected Image / File（裝置選取圖片／檔案）

MagicBook 不建立專用 Camera System。

系統需支援：

* Image Optimization
* Image Compression
* Background Processing
* Large File Warning

## 9.4 Text Area

完成：

* Add Text Block
* Edit Text Block
* Delete Text Block
* Reorder Text Block

Text Area 只負責文字。

不得負責：

* OCR
* PDF Processing
* Image Processing

OCR / AI 不得自動將辨識內容直接寫入 Text Area。

## 9.5 HTML Overlay

建立完整 HTML Overlay Layer。

負責：

* Interactive Object
* Object Rendering
* Object Position
* Object Selection
* Layer Management

不得修改教材底圖。

## 9.6 Context Toolbar

建立全系統共用 Context Toolbar。

基本行為：

* 預設隱藏
* 選取物件後顯示
* 完成操作後隱藏
* 可自由拖曳
* 可自由放置

Image、Text、Hotspot、HTML Overlay 等可編輯物件共用同一套 Toolbar。

## 9.7 Editor Completion Criteria

Task 3 完成後：

* 可以編輯 Page
* Image Area 可正常管理圖片
* Text Area 可正常管理文字
* HTML Overlay 架構存在
* Context Toolbar 可運作
* 三個工作區責任保持分離
* Editor 與 Reading Mode 使用同一份資料模型

---

# 10. Task 4 — Interaction

## 10.1 Purpose

建立教材互動能力。

## 10.2 Hotspot

建立完整 Hotspot Module。

完成：

* Create
* Read
* Update
* Delete
* Move
* Resize
* Save

Hotspot 為獨立 Interactive Object。

所有 Hotspot 建立於 HTML Overlay。

## 10.3 Popup

建立：

* Popup Editor
* Popup Layout
* Popup CRUD

Default Popup：

* Chinese
* KK
* Pronunciation

## 10.4 Dictionary

建立 Dictionary Module。

提供：

* Word
* Chinese
* KK
* Pronunciation
* Example

Dictionary 為 Lookup Tool。

不提供收藏功能。

## 10.5 Audio

建立：

* Audio Player
* Audio Source
* Audio Settings
* Audio CRUD

Audio Provider 必須保持可替換。

## 10.6 Video

建立：

* Video Player
* Video Source
* Video Settings

Video Provider 必須保持可替換。

## 10.7 Navigation

完成：

* Home
* Back
* Page Navigation
* Book Navigation
* Lesson Navigation

## 10.8 Interaction Completion Criteria

Task 4 完成後必須可以：

1. 建立 Hotspot
2. 移動 Hotspot
3. 調整 Hotspot 大小
4. 儲存 Hotspot
5. 點擊 Hotspot 開啟 Popup
6. 使用 Dictionary
7. 播放 Audio
8. 播放 Video
9. 使用 Navigation

---

# 11. Task 5 — AI

## 11.1 Purpose

建立 AI Module 與 AI Automation 架構。

AI 是工具，不是教材本身。

不得破壞：

* Image Area
* Text Area
* HTML Overlay
* Hotspot
* Teaching Material

之間的架構分離。

## 11.2 AI Core Module

完成：

* AI Panel
* Prompt Manager
* AI Provider Interface
* Conversation
* History
* AI Settings

## 11.3 Replaceable AI Provider

AI Provider 必須可替換。

目前架構支援：

* Claude
* GPT
* Gemini
* OpenRouter
* Future Providers

不得將核心資料架構綁定單一 AI Provider。

## 11.4 AI Automation

正式流程：

```text
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
Coordinate Transformation（必要時）
↓
Hotspot Generator
↓
HTML Overlay
↓
Hotspot
```

流程順序不得自行修改。

## 11.5 Image Quality Check

採三層邏輯：

### Layer 1

明顯不可救：

→ Reject Automation

### Layer 2

可修正：

→ Auto Correction

→ Re-Quality Check

### Layer 3

品質正常：

→ OCR

正式 Threshold（門檻）遵循已核定 PM Decision。

不得自行建立正式 Threshold。

## 11.6 Auto Correction

目前保留：

* Deskew
* Denoise
* Sharpen

CLAHE 不列入目前主要 Auto Correction Pipeline。

Auto Correction 完成後：

**必須 Re-Quality Check。**

## 11.7 OCR

MVP 已核定：

* Google Cloud Vision API
* DOCUMENT_TEXT_DETECTION

正式整合必須透過：

**Replaceable OCR Provider Adapter（可替換 OCR 服務供應商介面）**

核心資料不得綁定單一 Provider。

## 11.8 Coordinate Transformation

如果 Image Processing 改變影像幾何：

例如：

* Deskew

OCR Bounding Box 必須先經過：

**Coordinate Transformation（座標轉換）**

再交給：

**Hotspot Generator（熱點產生器）**

正式順序：

```text
OCR
↓
Text + Bounding Box
↓
Coordinate Transformation
↓
Hotspot Generator
```

## 11.9 Reliable Failure

無法可靠建立互動內容時：

不得：

* 猜測文字
* 猜測座標
* 建立錯誤 Hotspot
* 顯示 SUCCESS

應：

* PARTIAL
* FAIL

## 11.10 Temporary Processing Image

Processed Image（處理後圖片）僅供：

* OCR
* AI
* Hotspot Generator

使用。

不得自動形成第二份正式教材 Image Asset。

MagicBook 不是照片倉庫。

## 11.11 Background Processing

以下耗時工作不得阻塞 UI：

* Denoise
* OCR
* AI
* Image Processing
* Compression
* Optimization

必須提供 Loading State。

## 11.12 AI Completion Criteria

Task 5 完成後必須：

1. AI Module 架構完成
2. Provider Interface 完成
3. AI Provider 可替換
4. Image Quality Check 可運作
5. Auto Correction 可依正式規則觸發
6. Auto Correction 後重新 Quality Check
7. OCR 可透過 Adapter 串接
8. OCR 結果經 Coordinate Transformation 後交給 Hotspot Generator
9. Hotspot Generator 可建立 HTML Overlay Hotspot
10. 失敗時不得產生猜測性 Hotspot
11. Background Processing 不阻塞 UI

---

# 12. Task 6 — Reading Mode

## 12.1 Purpose

建立 Reading Mode（閱讀模式）。

Reading Mode 與 Editor Mode：

**共用同一份教材資料。**

## 12.2 Reading Mode Scope

完成：

* Reading Mode
* Reading UI
* Navigation
* Hotspot Interaction
* Popup
* Dictionary
* AI
* Audio
* Video
* Edit Button

## 12.3 Reading Mode Behavior

Reading Mode 提供：

* Hotspot Interaction
* Popup
* Dictionary
* AI
* Audio
* Video
* Navigation

Reading Mode：

**不得修改教材內容。**

## 12.4 Default First

點擊 Hotspot：

立即顯示：

* Chinese
* KK
* Pronunciation

進階功能可透過 Context Toolbar 使用：

* Dictionary
* AI
* Audio
* Video
* Image
* URL
* Navigation

## 12.5 Edit Button

Reading Mode 提供：

**單一 Edit Button（編輯按鈕）**

作為進入 Editor Mode 的入口。

不得建立第二套 Editor Flow。

## 12.6 Reading Completion Criteria

Task 6 完成後必須：

1. 可以從 Book Library 進入 Reading Mode
2. 可以閱讀 Page
3. 可以點擊 Hotspot
4. 可以開啟 Popup
5. 可以使用 Dictionary
6. 可以使用 AI
7. 可以播放 Audio
8. 可以播放 Video
9. 可以進行 Page Navigation
10. 可以透過單一 Edit Button 進入 Editor Mode
11. Reading Mode 不得修改教材

---

# 13. Task 7 — System Services

## 13.1 Purpose

建立全系統共用服務。

這些服務不是單一功能專屬。

## 13.2 Global Search

建立：

* Keyword Search
* Search Scope
* Search Suggestions
* Recent Search
* Search Result Navigation

Search Icon：

* 固定存在於畫面右上方

Search Scope：

* All
* Folder
* Book
* Lesson
* Page
* Text
* Image
* PDF
* Hotspot
* Dictionary

Global Search 不直接管理資料。

## 13.3 Save

建立：

* Save Dialog
* Auto Validation
* Save Status
* Cloud Storage

## 13.4 Background Processing Service

建立共用 Background Processing Service。

適用於：

* Image Optimization
* Image Compression
* Denoise
* OCR
* AI
* 其他已確認耗時工作

不得阻塞主要使用者操作。

## 13.5 Loading Animation

建立：

**Brand Loading Animation（品牌 Loading 動畫）**

Loading Animation：

* 顯示於畫面中央
* 約佔畫面 15%
* 使用品牌角色動作
* 工作期間持續
* 工作完成後自動關閉

不得以大量技術文字取代品牌動畫。

## 13.6 System Services Completion Criteria

Task 7 完成後必須：

1. Global Search 可使用
2. Search Icon 固定存在
3. Search Toolbar 可開啟
4. Search Result 可導向實際內容
5. Save 可正常儲存
6. Background Processing 不阻塞 UI
7. Loading Animation 可正確顯示與結束

---

# 14. Task 8 — Optimization & MVP Acceptance

## 14.1 Purpose

完成 MagicBook 3.0 MVP 最終最佳化與驗收。

本 Task：

**不是新增功能。**

主要確認前面已建立的功能：

* 穩定
* 一致
* 可維護
* 可擴充
* 可正式驗收

## 14.2 Performance Optimization

確認：

* Performance Optimization
* Background Processing Optimization
* Image Processing Optimization
* Loading Optimization

不得造成：

* UI Freeze
* 大型圖片處理阻塞主要操作
* 耗時工作沒有進入 Background Processing

## 14.3 UI Optimization

確認：

* UI Consistency
* Interaction Consistency
* Context Toolbar Consistency
* Reading / Editor Consistency
* Loading State Consistency
* Error Message Consistency

## 14.4 Database Optimization

確認：

* Data Integrity
* Query Performance
* Relationship Integrity
* Workspace Data Isolation

不得自行改變已確認資料架構。

## 14.5 API Optimization

確認：

* API Performance
* Error Handling
* Retry
* Provider Adapter
* Response Consistency

## 14.6 Specification Consistency Review

重新確認：

* Product Specification
* MVP Development
* Roadmap
* Development Guidelines
* Database Design
* API Design
* AI Design
* Editor Design
* UI Design

不得互相矛盾。

## 14.7 Functional Testing

完成：

* Functional Testing（功能測試）
* Integration Testing（整合測試）
* User Flow Testing（使用者流程測試）
* Error Handling Testing（錯誤處理測試）
* Performance Testing（效能測試）

所有核心模組皆須完成基本驗證。

## 14.8 Final MVP Review

最終確認：

* Complete Product Architecture
* Core Modules
* Data Model
* CRUD
* UI
* User Flow
* Reading Mode
* Editor Mode
* Background Processing
* Replaceable Services
* Error Handling

完成後：

**MagicBook 3.0 MVP Complete（MVP 完成）。**

---

# 15. Task Dependency Rules

主要依賴：

```text
Task 1
System Foundation
↓
Task 2
Book Structure
↓
Task 3
Editor
↓
Task 4
Interaction
↓
Task 5
AI
↓
Task 6
Reading
↓
Task 7
System Services
↓
Task 8
Optimization
```

## 15.1 Task 2 → Task 3

沒有：

* Book
* Lesson
* Page

就無法建立完整 Editor。

## 15.2 Task 3 → Task 4

沒有：

* Image Area
* Text Area
* HTML Overlay

就無法建立完整 Hotspot Interaction。

## 15.3 Task 3 → Task 5

AI Automation 必須建立於既有：

* Image Area
* HTML Overlay
* Hotspot

架構之上。

## 15.4 Task 4 → Task 6

Reading Mode 必須建立於：

* Hotspot
* Popup
* Dictionary
* Audio
* Video
* Navigation

等互動能力之上。

## 15.5 Task 5 → Task 8

AI Automation 的：

* Processing Time
* Background Processing
* OCR
* Image Processing
* Coordinate Transformation
* Hotspot Generation

必須於最終 Optimization 階段完成整體驗證。

---

# 16. Task Execution Rules

## 16.1 One Task at a Time

Engineer 一次以一個 Task 為主要工作單位。

完成一個 Task 後：

1. 實作
2. 測試
3. 驗收
4. 回報
5. Commit
6. 等待下一個 Task 指示

不得未經確認自行跨越多個主要 Task。

---

## 16.2 No Scope Expansion

Engineer 不得自行新增：

* 未確認功能
* 未確認模組
* 未確認 User Flow
* 未確認技術方案

如技術上確實需要：

**Technical Proposal（技術方案）**

↓

**PM Decision（產品決策）**

↓

必要時更新正式文件

↓

再進入 Development。

---

## 16.3 No Product Flow Rewrite

技術限制不得直接改變：

**User Flow（使用者流程）**

如果技術上無法完成：

1. 停止
2. 回報 PM
3. 提出 Technical Proposal
4. 等待 PM Decision

不得自行改變產品行為。

---

## 16.4 No Provider Binding

第三方服務必須透過：

**Provider Adapter（服務供應商介面層）**

整合。

不得將核心產品資料直接綁定第三方 API。

---

## 16.5 No Guessing

如果文件沒有定義：

* Threshold
* Trigger Logic
* Provider-specific implementation
* 未確認 API 行為
* 未確認資料結構
* 未確認 User Flow
* 未確認 UI 行為

不得自行猜測。

必須停止並提出問題。

---

## 16.6 Background Processing

任何明顯耗時工作：

不得阻塞 UI。

必須評估 Background Processing。

---

## 16.7 Original Teaching Material Protection

不得因：

* OCR
* AI
* Image Processing
* Hotspot
* Popup
* Editor 操作

破壞教材原始內容。

---

## 16.8 Reliable Failure

無法可靠完成時：

不得猜測成功。

必須使用：

* PARTIAL
* FAIL

或提供適當的使用者操作選項。

---

# 17. Task Completion Report

每完成一個 Task，Engineer 必須回報：

## 17.1 Implementation

* 完成哪些項目
* 尚未完成哪些項目

## 17.2 Files Changed

列出：

* 新增檔案
* 修改檔案
* 刪除檔案

## 17.3 Database

如果有 Database（資料庫）變更：

* 說明變更內容
* 提供對應 SQL
* 說明是否符合 Database Design

不得自行新增未核定 Schema。

## 17.4 API

如果有 API 變更：

* 列出 API
* 說明 Request / Response
* 說明 Error Handling
* 確認符合 API Design

## 17.5 Testing

回報：

* Functional Testing
* Integration Testing
* Error Handling Testing
* Performance Testing（若適用）

## 17.6 Git

回報：

* Commit Message
* Commit Hash
* Branch

## 17.7 Blockers

如果有：

* 規格矛盾
* 規格缺漏
* 技術限制
* 未確認決策

必須明確列出。

---

# 18. PM Decision Gate

以下事項不得由 Engineer 自行決定：

* 新產品功能
* 新核心模組
* 新 User Flow
* 新 Database Schema
* 新 API
* 新 AI Pipeline
* 正式 Threshold
* 未確認 Trigger Logic
* Provider-specific architecture
* 改變既有產品行為

處理流程：

```text
Issue Found
↓
Stop
↓
Report
↓
Technical Proposal（如需要）
↓
PM Decision
↓
Specification Update（如需要）
↓
Development
```

---

# 19. MVP Final Acceptance Checklist

## Architecture

* [ ] Complete Product Architecture
* [ ] Modular Architecture
* [ ] Clear Module Boundary
* [ ] One Data Model
* [ ] Workspace Data Isolation

## Authentication / Workspace

* [ ] Login
* [ ] Logout
* [ ] Session Management
* [ ] Personal Workspace
* [ ] Organization Workspace

## Book Structure

* [ ] Book Library
* [ ] Folder
* [ ] Nested Folder
* [ ] Book
* [ ] Lesson
* [ ] Page
* [ ] CRUD
* [ ] Sorting
* [ ] Navigation

## Editor

* [ ] Image Area
* [ ] Text Area
* [ ] HTML Overlay
* [ ] Context Toolbar
* [ ] Image Import
* [ ] Image Optimization
* [ ] Image Compression
* [ ] Text Block CRUD
* [ ] Same Data Model

## Interaction

* [ ] Hotspot
* [ ] Popup
* [ ] Dictionary
* [ ] Audio
* [ ] Video
* [ ] Navigation

## AI

* [ ] AI Module
* [ ] AI Provider Interface
* [ ] Prompt Manager
* [ ] Conversation
* [ ] History
* [ ] Image Quality Check
* [ ] Auto Correction
* [ ] Re-Quality Check
* [ ] OCR Adapter
* [ ] Coordinate Transformation
* [ ] Hotspot Generator
* [ ] Reliable Failure
* [ ] Background Processing

## Reading

* [ ] Reading Mode
* [ ] Hotspot Interaction
* [ ] Popup
* [ ] Dictionary
* [ ] AI
* [ ] Audio
* [ ] Video
* [ ] Navigation
* [ ] Edit Button
* [ ] Reading Mode cannot modify material

## System Services

* [ ] Global Search
* [ ] Search Icon
* [ ] Search Toolbar
* [ ] Save
* [ ] Save Status
* [ ] Background Processing Service
* [ ] Brand Loading Animation

## Final Validation

* [ ] Functional Testing
* [ ] Integration Testing
* [ ] User Flow Testing
* [ ] Error Handling Testing
* [ ] Performance Testing
* [ ] Specification Consistency Review
* [ ] Database Integrity
* [ ] API Consistency
* [ ] Workspace Data Isolation
* [ ] Replaceable Services
* [ ] No Scope Expansion

---

# 20. Final Development Principle

MagicBook 3.0 的 MVP 開發不是：

> 先做一個可以看的簡化版本，再重新補架構。

而是：

> **先建立正確的產品架構，再依明確的 Phase Dependency（階段依賴）逐步完成各核心模組。**

每一個 Task 都必須建立在目前正式規格之上。

如果實作遇到規格未定義的問題：

**不要猜。**

如果實作遇到規格矛盾：

**不要自行選邊。**

如果技術上需要新的方案：

**不要直接改產品。**

統一採用：

```text
發現問題
↓
停止
↓
回報
↓
Technical Proposal
↓
PM Decision
↓
必要時同步正式文件
↓
繼續 Development
```

---

# Change Log

## Version 1.0 — 2026-08-09

### Complete Task List Synchronization

本版本重新建立 `11_MVP_Task_List.md`，以目前 01–09 Frozen Baseline 為唯一產品與工程規格基礎。

本次主要修正：

1. 移除舊版「傳統漸進式 MVP」任務邏輯。
2. 改採 Complete Product Architecture。
3. 依 `03_Roadmap.md` Phase 1–8 建立執行順序。
4. 將 Folder、Book、Lesson、Page 納入正式 Book Structure Task。
5. 將 Image Area、Text Area、HTML Overlay 納入 Editor Task。
6. 將 Hotspot、Popup、Dictionary、Audio、Video、Navigation 納入 Interaction Task。
7. 將 AI Module 與 AI Automation 納入 AI Task。
8. 將 Reading Mode 與 Edit Button 納入 Reading Task。
9. 將 Global Search、Save、Background Processing、Loading Animation 納入 System Services Task。
10. 將 Optimization、Specification Consistency Review、Functional Testing 納入最終驗收。
11. 明確定義 Task List 為 Execution Layer，不得覆寫 01–09。
12. 明確建立 PM Decision Gate。
13. 明確建立 Task Completion Report。
14. 保留 Reuse Before Reinvent、Background Processing、Reliable Failure、Replaceable Service 等共通工程原則。
15. 不將未經 Frozen 01–09 核定的 Frontend Framework（前端框架）或 Build Tool（建置工具）寫成產品規格。

本次：

* 不新增產品功能
* 不新增 Database Schema
* 不新增 API Scope
* 不新增 AI Pipeline
* 不改變既有 User Flow
* 不修改 01–09 Frozen Baseline

---

# END OF DOCUMENT
