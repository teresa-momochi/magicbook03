# MagicBook 3.0 Roadmap

Version: 1.1

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-09


# Table of Contents

0. Roadmap Purpose
1. Roadmap Principles
2. Overall Development Roadmap
3. Phase 1 — System Foundation
4. Phase 2 — Book Structure
5. Phase 3 — Editor
6. Phase 4 — Interaction
7. Phase 5 — AI
8. Phase 6 — Reading
9. Phase 7 — System Services
10. Phase 8 — Optimization
11. Phase Dependencies
12. Development Rules
13. Phase Completion Criteria
14. Roadmap Change Control
15. Change Log


# 0. Roadmap Purpose

本文件定義 MagicBook 3.0 的開發路線圖（Development Roadmap）。

本文件的目的不是重新定義產品功能。

產品功能以：

Product Specification（產品規格）

為準。

MVP 開發範圍以：

MVP Development（MVP 開發規格）

為準。

共同工程原則以：

Development Guidelines（開發規範）

為準。

本文件只負責整理：

- Development Sequence（開發順序）
- Phase（開發階段）
- Module Dependencies（模組依賴）
- Phase Deliverables（階段交付內容）
- Phase Completion Criteria（階段完成條件）

不得透過本文件自行新增未經確認的產品功能。


# 1. Roadmap Principles


## 1.1 Complete Product Architecture

MagicBook 3.0 採用：

Complete Product Architecture（完整產品架構）。

MVP 並不是只建立少量孤立功能。

第一版需要建立完整核心產品架構，包括：

- Core Modules（核心模組）
- Data Model（資料模型）
- CRUD（Create / Read / Update / Delete）
- User Interface（使用者介面）
- User Flow（使用者流程）

Roadmap 的目的不是自行重新設計產品，而是依照正確依賴關係逐步建立已確認的產品架構。


## 1.2 Architecture First

所有 Phase 都必須建立於既有架構。

不得因單一功能重新建立互相獨立的新架構。

若需要新增能力：

優先使用：

- Existing Module（既有模組）
- Shared Service（共用服務）
- Modular Extension（模組擴充）

不得因單一功能破壞既有模組邊界。


## 1.3 Teaching Material First

教材（Teaching Material）是 MagicBook 的核心。

開發順序應以：

教材架構

↓

教材編輯

↓

教材互動

↓

閱讀

↓

AI / System Services

為主要方向。

AI、Dictionary、Audio、Video 等皆為工具（Tool）。

不得讓工具反過來主導教材架構。


## 1.4 Modular Development

MagicBook 採：

Modular Development（模組化開發）。

每個主要模組應：

- 可獨立開發
- 可獨立測試
- 可獨立維護
- 可持續擴充

模組之間必須維持清楚的責任邊界。


## 1.5 Replaceable Service

第三方服務（Third-party Service）應採：

Replaceable Service Architecture（可替換服務架構）。

適用於：

- AI
- OCR
- Dictionary
- Audio
- Video
- 其他第三方服務

核心教材資料與產品架構不得直接綁定單一 Provider（服務供應商）。


## 1.6 Reuse Before Reinvent

所有工程需求皆必須遵循：

Reuse Before Reinvent（先利用現有技術，再考慮自行開發）。

工程實作前應依序確認：

1. OS / Device Existing Capability（作業系統／裝置既有能力）
2. Browser Existing Capability（瀏覽器既有能力）
3. HTML / CSS / JavaScript Native Capability（原生網頁能力）
4. Mature Open Source Library（成熟開源函式庫）
5. Mature Third-party Service（成熟第三方服務）
6. 最後才評估 Custom Development（自行開發）

不得在尚未確認現有技術之前，直接自行建立新的：

- Camera System（相機系統）
- Image Editor（圖片編輯器）
- Image Processing Algorithm（影像處理演算法）
- UI Interaction System（UI 互動系統）

MagicBook 應優先利用成熟、已被驗證的技術能力。


# 2. Overall Development Roadmap

MagicBook 3.0 MVP 採用以下 8 個主要開發階段：

Phase 1 — System Foundation（系統基礎）

↓

Phase 2 — Book Structure（教材結構）

↓

Phase 3 — Editor（編輯器）

↓

Phase 4 — Interaction（互動）

↓

Phase 5 — AI（AI）

↓

Phase 6 — Reading（閱讀）

↓

Phase 7 — System Services（系統服務）

↓

Phase 8 — Optimization（最佳化）


## 2.1 Phase Overview

| Phase | 名稱 | 主要目的 |
| --- | --- | --- |
| Phase 1 | System Foundation | 建立系統基礎 |
| Phase 2 | Book Structure | 建立教材資料結構 |
| Phase 3 | Editor | 建立教材編輯能力 |
| Phase 4 | Interaction | 建立教材互動能力 |
| Phase 5 | AI | 建立 AI / Automation 能力 |

# 3. Phase 1 — System Foundation


## 3.1 Purpose

建立 MagicBook 3.0 的系統基礎（System Foundation）。

本階段建立後續所有功能共同使用的基礎架構。


## 3.2 Scope

完成：

- Authentication（身分驗證）
- Workspace（工作空間）
- Database（資料庫）
- Book Library（教材庫）


## 3.3 Authentication

建立：

- Login（登入）
- Logout（登出）
- Session Management（工作階段管理）
- User Authentication（使用者驗證）

支援：

- Personal Workspace（個人工作空間）
- Organization Workspace（組織工作空間）


## 3.4 Workspace

建立：

- Personal Workspace
- Organization Workspace
- Workspace Identity（Workspace 身分）
- Basic Permission（基本權限）

Workspace 為系統資料歸屬的重要層級。


## 3.5 Database

建立：

- Core Data Model（核心資料模型）
- Workspace Relationship（Workspace 關聯）
- Basic Data Persistence（基本資料持久化）

Database Design（資料庫設計）依實際開發需求建立。

不得為尚未確認的功能提前建立資料結構。


## 3.6 Book Library

建立：

- Book Library（教材庫）
- Book Navigation（教材導覽）
- Book Management（教材管理）
- Search 基礎入口
- Recently Used（最近使用）

Folder 功能於 Phase 2 完成。


## 3.7 Deliverables

本階段交付：

- Authentication Module
- Workspace Module
- Database Foundation
- Book Library Foundation


## 3.8 Completion Criteria

本階段完成時必須可以：

1. 登入 MagicBook。
2. 維持 Session。
3. 進入正確 Workspace。
4. 開啟 Book Library。
5. 建立基本 Book。
6. 正確儲存資料。


# 4. Phase 2 — Book Structure


## 4.1 Purpose

建立完整教材資料結構（Book Structure）。

教材基本架構：

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


## 4.2 Scope

完成：

- Folder
- Book
- Lesson
- Page


## 4.3 Folder

完成：

- Create Folder
- Rename Folder
- Delete Folder
- Move Folder
- Reorder Folder
- Nested Folder
- Drag & Drop Sorting

Book 可以：

- 存在於 Book Library 根目錄
- 放入 Folder
- 在 Folder 之間移動

使用者可自行決定是否使用 Folder。


## 4.4 Book

完成：

- Create Book
- Rename Book
- Duplicate Book
- Delete Book
- Open Book


## 4.5 Lesson

完成：

- Create Lesson
- Rename Lesson
- Delete Lesson
- Reorder Lesson

第一版可使用 Default Lesson（預設 Lesson）。

建立 Book 時可自動建立 Default Lesson。


## 4.6 Page

完成：

- Add Page
- Delete Page
- Duplicate Page
- Reorder Page
- Page Navigation


## 4.7 Deliverables

本階段交付：

- Folder Module
- Book Module
- Lesson Module
- Page Module
- Complete Teaching Material Hierarchy（完整教材階層）


## 4.8 Completion Criteria

本階段完成時必須可以：

1. 建立 Folder。
2. 建立 Nested Folder。
3. 建立 Book。
4. 將 Book 放入 Folder。
5. 將 Book 移回根目錄。
6. 建立 Lesson。
7. 建立 Page。
8. 排序 Folder / Book / Lesson / Page。
9. 正確儲存資料階層。


# 5. Phase 3 — Editor


## 5.1 Purpose

建立完整 Book Editor（教材編輯器）。

本階段完成教材內容建立與編輯能力。


## 5.2 Scope

完成：

- Page Manager（頁面管理）
- Image Area（圖片區）
- Text Area（文字區）
- HTML Overlay（HTML 疊加層）


## 5.3 Page Manager

完成：

- Add Page
- Delete Page
- Duplicate Page
- Reorder Page
- Page Navigation


## 5.4 Image Area

Image Area 負責：

- Image Import（圖片匯入）
- Image Display（圖片顯示）
- Image Replace（圖片替換）
- Image Delete（圖片刪除）
- PDF Display（PDF 顯示）
- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）

Image Import 支援：

- PNG
- JPG
- JPEG
- PDF
- 使用者已拍攝之照片
- 使用者截圖
- 使用者從裝置選取之圖片／檔案

MagicBook 不建立專用 Camera System（相機系統）。

使用者拍照由裝置既有相機完成。

MagicBook 從 Image Import 開始。


## 5.5 Text Area

Text Area 為純文字編輯區。

完成：

- Add Text Block
- Edit Text Block
- Delete Text Block
- Reorder Text Block

Text Area 不負責：

- OCR
- PDF Processing
- Image Processing


## 5.6 HTML Overlay

建立：

HTML Overlay Layer（HTML 互動疊加層）。

負責：

- Interactive Object（互動物件）
- Object Rendering（物件呈現）
- Object Position（物件位置）
- Object Selection（物件選取）
- Layer Management（圖層管理）

HTML Overlay 不修改教材底圖。


## 5.7 Context Toolbar

建立共用：

Context Toolbar（情境工具列）。

Toolbar：

- 預設隱藏
- 選取物件後顯示
- 完成操作後隱藏
- 可自由拖曳
- 可自由放置


## 5.8 Deliverables

本階段交付：

- Book Editor
- Page Manager
- Image Area
- Text Area
- HTML Overlay
- Context Toolbar


## 5.9 Completion Criteria

本階段完成時必須可以：

1. 開啟 Book Editor。
2. 新增 Page。
3. 匯入圖片。
4. 顯示 PDF。
5. 編輯 Text Area。
6. 建立 HTML Overlay。
7. 選取互動物件。
8. 使用 Context Toolbar。
9. 儲存教材。
10. 重新開啟後內容保持一致。

# 6. Phase 4 — Interaction


## 6.1 Purpose

建立教材互動能力（Interaction）。

本階段讓教材從：

Static Teaching Material（靜態教材）

具備：

Interactive Teaching Material（互動教材）

能力。


## 6.2 Scope

完成：

- Hotspot
- Popup
- Dictionary
- Audio
- Video
- Navigation


## 6.3 Hotspot

完成：

- Create
- Read
- Update
- Delete
- Move
- Resize
- Save

Hotspot 建立於 HTML Overlay。


## 6.4 Popup

完成：

- Popup Editor
- Popup Layout
- Popup CRUD

Default Popup（預設 Popup）：

- Chinese
- KK
- Pronunciation


## 6.5 Dictionary

建立 Dictionary Module（字典模組）。

提供：

- Word
- Chinese
- KK
- Pronunciation
- Example

Dictionary 為 Lookup Tool（查閱工具）。


## 6.6 Audio

建立：

- Audio Player
- Audio Source
- Audio Settings


## 6.7 Video

建立：

- Video Player
- Video Source
- Video Settings


## 6.8 Navigation

完成：

- Home
- Back
- Page Navigation
- Book Navigation
- Lesson Navigation


## 6.9 Deliverables

本階段交付：

- Hotspot Module
- Popup Module
- Dictionary Module
- Audio Module
- Video Module
- Navigation Module


## 6.10 Completion Criteria

本階段完成時必須可以：

1. 建立 Hotspot。
2. 移動 Hotspot。
3. 調整 Hotspot 大小。
4. 儲存 Hotspot。
5. 點擊 Hotspot 開啟 Popup。
6. 使用 Dictionary。
7. 播放 Audio。
8. 播放 Video。
9. 使用 Navigation。


# 7. Phase 5 — AI


## 7.1 Purpose

建立 AI Module（AI 模組）與 AI Automation（AI 自動化）架構。

AI 是 MagicBook 的工具（Tool）。

AI 不是教材本身。

AI 不得破壞：

- Image Area
- Text Area
- HTML Overlay
- Hotspot
- Teaching Material

之間的架構分離。


## 7.2 AI Core Module

完成：

- AI Panel
- Prompt Manager
- AI Provider Interface
- Conversation
- History


## 7.3 Replaceable AI Provider

AI 採：

Replaceable Provider Architecture（可替換 Provider 架構）。

不得將核心資料架構直接綁定單一 Provider。


## 7.4 AI Automation

AI Automation 包含：

- Image Quality Check
- Auto Correction
- Re-Quality Check
- OCR
- Hotspot Generator

完整流程：

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


## 7.5 Image Quality Check

採三層邏輯：

Layer 1

明顯不可救

↓

Reject Automation


Layer 2

可修正

↓

Auto Correction

↓

Re-Quality Check


Layer 3

品質正常

↓

OCR

正式 Threshold（門檻）必須遵循已核定的 PM Decision。

不得自行新增或改寫正式 Threshold。


## 7.6 Auto Correction

目前保留：

- Deskew
- Denoise
- Sharpen

CLAHE 不列入目前主要 Auto Correction Pipeline。

Auto Correction 完成後：

**必須 Re-Quality Check。**


## 7.7 Background Processing

Denoise 等耗時處理必須使用：

Background Processing（背景處理）。

不得造成：

- UI Freeze
- 操作阻塞

Loading Animation 應呈現工作狀態。


## 7.8 OCR

MVP 已核定：

Google Cloud Vision API

DOCUMENT_TEXT_DETECTION

正式串接必須使用：

Replaceable Provider Adapter（可替換 Provider Adapter）。


## 7.9 Hotspot Coordinate Transformation

若 Image Processing（影像處理）改變影像幾何，

例如：

Deskew

OCR 座標必須經過：

Coordinate Transformation（座標轉換）

再建立最終 Hotspot。

避免 Hotspot 與使用者實際看到的位置產生偏移。


## 7.10 Reliable Failure

如果系統無法可靠建立互動內容：

不得：

- 猜測文字
- 猜測座標
- 建立錯誤 Hotspot
- 顯示 SUCCESS

應：

- PARTIAL
- FAIL

以：

Reliable Failure（可靠失敗）

優先於：

錯誤成功。


## 7.11 User Control

使用者可以：

- 調整圖片
- 重新拍攝
- 重新選擇圖片

MagicBook 不建立專用 Camera System。

使用者拍照由裝置既有相機完成。

MagicBook 從 Image Import 開始。


## 7.12 Image Storage

MagicBook 不是使用者照片倉庫。

拒絕的圖片不得因 Quality Check 而形成新的教材資產。

Processed Image（處理後圖片）僅供：

- OCR
- AI
- Hotspot Generator

使用。

不得自動形成第二份教材圖片資產。


## 7.13 Reuse Before Reinvent

AI Automation 與 Image Processing 優先使用：

- Existing Browser Capability
- Existing OS / Device Capability
- Mature Open Source Library
- Mature Third-party Service

不得為了完成單一功能自行發明新的影像演算法或 Camera System。


## 7.14 Deliverables

本階段交付：

- AI Module
- AI Provider Interface
- AI Conversation
- Prompt Manager
- AI History
- Image Quality Check
- Auto Correction
- Re-Quality Check
- OCR Adapter
- Hotspot Generator


## 7.15 Completion Criteria

本階段完成時必須：

1. AI Module 架構完成。
2. Provider Interface 完成。
3. AI Provider 可替換。
4. Image Quality Check 可運作。
5. Auto Correction 可依正式規則觸發。
6. Auto Correction 後重新 Quality Check。
7. OCR 可透過 Adapter 串接。
8. OCR 結果經 Coordinate Transformation（必要時）後，再交給 Hotspot Generator。
9. Hotspot Generator 可建立 HTML Overlay Hotspot。
10. 失敗時不得產生猜測性 Hotspot。
11. Background Processing 不得阻塞 UI。

# 8. Phase 6 — Reading


## 8.1 Purpose

建立 Reading Mode（閱讀模式）。

Reading Mode 與 Editor Mode 共用同一份教材資料。


## 8.2 Scope

完成：

- Reading Mode
- Navigation
- Reading UI
- Single Edit Button（單一編輯按鈕）Editor Entry


## 8.3 Reading Mode

Reading Mode 提供：

- Hotspot Interaction
- Popup
- Dictionary
- AI
- Audio
- Video
- Navigation

Reading Mode 不得修改教材。

Reading Mode 提供單一 Edit Button（編輯按鈕）作為 Editor Mode（編輯模式）入口。

使用者透過 Edit Button 進入既有 Editor，不建立第二套 Editor 流程、資料模型或編輯架構。


## 8.4 Default First

點擊 Hotspot：

立即顯示：

- Chinese
- KK
- Pronunciation

進階功能：

- Dictionary
- AI
- Audio
- Video
- Image
- URL
- Navigation

依已確認的互動設計開啟。


## 8.5 Editor / Reading Separation

Editor Mode：

可修改教材。

Reading Mode：

只讀取與互動。

兩者共用：

Same Data Model（同一份資料模型）。

不得建立兩套教材資料。


## 8.6 Deliverables

本階段交付：

- Reading UI
- Reading Mode
- Reading Navigation
- Hotspot Interaction
- Single Edit Button Editor Entry


## 8.7 Completion Criteria

本階段完成時必須：

1. 可以從 Book Library 進入 Reading Mode。
2. 可以閱讀 Page。
3. 可以點擊 Hotspot。
4. 可以開啟 Popup。
5. 可以使用 Dictionary。
6. 可以使用 AI。
7. 可以播放 Audio。
8. 可以播放 Video。
9. 可以進行 Page Navigation。
10. 可以透過單一 Edit Button 進入 Editor Mode。
11. Reading Mode 不得修改教材。


# 9. Phase 7 — System Services


## 9.1 Purpose

建立全系統共用服務（System Services）。

這些服務不是單一功能專屬。

所有核心模組皆可依需要使用。


## 9.2 Scope

完成：

- Global Search
- Save
- Background Processing
- Loading Animation


## 9.3 Global Search

Global Search 為：

Shared Search Service（共用搜尋服務）。

提供：

- Keyword Search
- Search Scope
- Search Suggestions
- Recent Search
- Search Result Navigation

Search Icon：

固定顯示於畫面右上方。

點擊後：

展開 Floating Search Toolbar。


## 9.4 Save

建立：

- Save Dialog
- Auto Validation
- Save Status
- Cloud Storage


## 9.5 Background Processing

建立共用 Background Processing Service。

適用於：

- Image Optimization
- Image Compression
- Denoise
- OCR
- AI
- 其他已確認的耗時工作

不得阻塞主要使用者操作。


## 9.6 Loading Animation

採：

Brand Loading Animation（品牌 Loading 動畫）。

Loading Animation：

- 顯示於畫面中央
- 約佔畫面 15%
- 使用品牌角色動作
- 工作期間持續
- 工作完成後自動關閉

不得以大量技術文字取代品牌動畫。


## 9.7 Deliverables

本階段交付：

- Global Search
- Save Service
- Background Processing Service
- Loading Animation


## 9.8 Completion Criteria

本階段完成時必須：

1. Global Search 可使用。
2. Search Icon 固定存在。
3. Search Toolbar 可開啟。
4. Search Result 可導向實際內容。
5. Save 可正常儲存。
6. Background Processing 不阻塞 UI。
7. Loading Animation 可正確顯示與結束。


# 10. Phase 8 — Optimization


## 10.1 Purpose

完成 MagicBook 3.0 MVP 最終最佳化（Optimization）。

本階段不是新增功能。

主要工作是讓前 7 個 Phase 已建立的功能：

- 穩定
- 一致
- 可維護
- 可擴充
- 可正式驗收


## 10.2 Performance Optimization

完成：

- Performance Optimization
- Background Processing Optimization
- Image Processing Optimization
- Loading Optimization

確認：

- 不造成 UI Freeze
- 大型圖片處理不阻塞主要操作
- 耗時工作正確進入 Background Processing


## 10.3 UI Optimization

確認：

- UI Consistency
- Interaction Consistency
- Context Toolbar Consistency
- Reading / Editor Consistency
- Loading State Consistency
- Error Message Consistency


## 10.4 Database Optimization

確認：

- Data Integrity
- Query Performance
- Relationship Integrity
- Workspace Data Isolation

Database Optimization 不得自行改變已確認資料架構。


## 10.5 API Optimization

確認：

- API Performance
- Error Handling
- Retry
- Provider Adapter
- Response Consistency


## 10.6 Specification Consistency Review

完成：

Specification Consistency Review（規格一致性檢查）。

確認：

- Product Specification
- MVP Development
- Development Guidelines
- Roadmap
- Database Design
- API Design
- AI Design
- Editor Design
- UI Design

不得互相矛盾。


## 10.7 Functional Testing

完成：

- Functional Testing（功能測試）
- Integration Testing（整合測試）
- User Flow Testing（使用者流程測試）
- Error Handling Testing（錯誤處理測試）
- Performance Testing（效能測試）

所有核心模組皆須完成基本驗證。


## 10.8 Final MVP Review

確認：

- Complete Product Architecture
- Core Modules
- Data Model
- CRUD
- UI
- User Flow
- Reading Mode
- Editor Mode
- Background Processing
- Replaceable Services
- Error Handling

完成後：

MagicBook 3.0 MVP 完成。

# 11. Phase Dependencies


## 11.1 Overall Dependency

MagicBook 3.0 各 Phase 存在主要依賴關係：

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


## 11.2 Phase 2 → Phase 3

沒有：

- Book
- Lesson
- Page

就無法建立完整 Editor。


## 11.3 Phase 3 → Phase 4

沒有：

- Image Area
- Text Area
- HTML Overlay

就無法建立完整 Hotspot Interaction。


## 11.4 Phase 3 → Phase 5

AI Automation 必須建立於：

- Image Area
- HTML Overlay
- Hotspot

等既有產品架構之上。


## 11.5 Phase 4 → Phase 6

Reading Mode 必須建立於已完成的互動能力之上，包括：

- Hotspot
- Popup
- Dictionary
- Audio
- Video
- Navigation


## 11.6 Phase 5 → Phase 8

AI Automation 的：

- Processing Time
- Background Processing
- OCR
- Image Processing
- Hotspot Generation

必須於最終 Optimization 階段完成整體驗證。


# 12. Development Rules


## 12.1 Do Not Skip Architecture

不得為了快速展示功能而跳過：

- Data Model
- Module Boundary
- CRUD
- User Flow


## 12.2 Do Not Expand Scope

阿德不得自行新增：

- 未確認功能
- 未確認模組
- 未確認 User Flow
- 未確認技術方案

如有必要：

提出 Technical Proposal（技術方案）

↓

PM Decision（產品決策）

↓

更新正式文件

↓

再進入 Development（開發）。


## 12.3 Do Not Rewrite Product Flow

技術限制不得直接導致：

User Flow（使用者流程）

被修改。

若技術上確實無法完成：

先回報 PM。

不得自行改變產品行為。


## 12.4 Do Not Bind Provider

第三方服務必須透過：

Provider Adapter（Provider 介面層）

整合。

不得將核心產品資料直接綁定第三方 API。


## 12.5 Reuse Before Reinvent

任何工程問題先確認：

1. OS
2. Device
3. Browser
4. Native Web Capability
5. Open Source Library
6. Third-party Service

最後才考慮自行開發。

如果已有成熟方案：

優先使用現有方案。

不得為了「自己控制」而重複發明已有技術。


## 12.6 Background Processing

任何明顯耗時工作：

不得阻塞 UI。

必須評估：

Background Processing。


## 12.7 Original Teaching Material

教材內容與互動資料必須分離。

不得因：

- OCR
- AI
- Image Processing
- Hotspot

而破壞教材內容。


## 12.8 Reliable Failure

如果系統不能可靠完成：

不得猜測成功。

不得產生錯誤互動內容。

必須：

- PARTIAL
- FAIL

或提供適當的使用者操作選項。


# 13. Phase Completion Criteria


## 13.1 Functional Check

確認功能可以實際運作。


## 13.2 Data Check

確認資料：

- 正確儲存
- 正確讀取
- 正確更新
- 正確刪除


## 13.3 UI Check

確認：

- UI 正常
- 操作一致
- 不破壞既有畫面


## 13.4 User Flow Check

確認完整流程可以從頭到尾執行。


## 13.5 Error Check

確認錯誤情境：

- 不會讓系統崩潰
- 不會遺失使用者資料
- 可以 Retry
- 可以恢復操作


## 13.6 Specification Consistency Review

確認：

- Product Specification
- MVP Development
- Development Guidelines
- Roadmap
- 其他已建立相關文件

內容一致。


## 13.7 PM Review

重大 Phase 完成後，提供：

- Completed Items
- Not Completed Items
- Known Issues
- Technical Risks
- Testing Results

等待 PM 確認後進入下一個重大階段。


# 14. Roadmap Change Control

Roadmap 不可自行成為新增功能的入口。

如果開發過程中出現：

- New Feature（新功能）
- New Module（新模組）
- New User Flow（新流程）
- New Technical Architecture（新技術架構）

必須先：

需求提出

↓

PM Review

↓

Product Specification

↓

MVP Development

↓

相關設計文件

↓

Roadmap 更新

↓

Development


不得反過來：

工程師先開發

↓

再回頭修改規格。


Roadmap 必須永遠反映：

**已確認的產品決策。**


# 15. Change Log


## Version 1.1

### Specification Consistency Synchronization

本版本僅同步既有已確認產品規格，不新增產品功能、不新增資料模型、不擴大 MVP Scope。

同步內容：

1. Reading Mode → 單一 Edit Button → Editor Mode 入口，與 01 Product Specification v3.3、08 Editor Design v1.1 一致。
2. AI Automation 中 Coordinate Transformation（必要時）移至 Hotspot Generator 之前，與 05 Database Design、06 API Design、07 AI Design 及 08 Editor Design 的已確認流程一致。
3. Phase Completion Criteria 與上述正式流程同步。


## Version 1.0

### Initial Roadmap

建立 MagicBook 3.0 第一版開發路線圖。

本版本依據目前已確認的 MVP Development Sequence 建立 8 個主要 Phase：

### Phase 1 — System Foundation

- Authentication
- Workspace
- Database
- Book Library


### Phase 2 — Book Structure

- Folder
- Book
- Lesson
- Page


### Phase 3 — Editor

- Page Manager
- Image Area
- Text Area
- HTML Overlay
- Context Toolbar


### Phase 4 — Interaction

- Hotspot
- Popup
- Dictionary
- Audio
- Video
- Navigation


### Phase 5 — AI

- AI Module
- AI Provider Interface
- Prompt Manager
- Conversation
- History
- Image Quality Check
- Auto Correction
- Re-Quality Check
- OCR
- Hotspot Generator


### Phase 6 — Reading

- Reading Mode
- Reading Navigation
- Reading UI
- Hotspot Interaction


### Phase 7 — System Services

- Global Search
- Save
- Background Processing
- Loading Animation


### Phase 8 — Optimization

- Performance Optimization
- UI Optimization
- Database Optimization
- API Optimization
- Specification Consistency Review
- Functional Testing
- Final MVP Review


# END OF DOCUMENT
| Phase 6 | Reading | 建立閱讀模式 |
| Phase 7 | System Services | 建立共用系統服務 |
| Phase 8 | Optimization | 完成最佳化與 MVP 驗收 |
