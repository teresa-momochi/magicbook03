# MagicBook 3.0 Database Design

Version: 1.0

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-09


# Table of Contents

0. Database Design Purpose
1. Database Design Principles
2. Data Architecture Overview
3. Core Data Hierarchy
4. Workspace
5. Book Library
6. Folder
7. Book
8. Lesson
9. Page
10. Content Architecture
11. Image Area
12. Text Area
13. HTML Overlay
14. Hotspot
15. AI and Processing Data
16. Relationship Rules
17. Data Ownership and Isolation
18. Data Persistence Rules
19. Database Implementation Rules
20. Future Extension
21. Change Log


# 0. Database Design Purpose

本文件定義 MagicBook 3.0 的資料庫設計（Database Design）。

本文件的目的，是建立 MagicBook 3.0 的核心資料架構（Data Architecture）與資料關係（Data Relationships）。

本文件不負責重新定義產品功能。

產品功能以：

Product Specification（產品規格）

為準。

MVP 開發範圍以：

MVP Development（MVP 開發規格）

為準。

開發順序以：

Roadmap（開發路線圖）

為準。

工程共通原則以：

Development Guidelines（開發規範）

為準。


## 0.1 Database Design Scope

本文件主要定義：

- Data Hierarchy（資料階層）
- Entity Relationship（實體關係）
- Data Ownership（資料歸屬）
- Data Separation（資料分離）
- Core Data Boundaries（核心資料邊界）
- Persistence Rules（資料持久化規則）

本文件目前不提前鎖定所有：

- Database Field（資料庫欄位）
- Index（索引）
- SQL Implementation（SQL 實作）
- Performance Tuning（效能調校）
- Provider-specific Schema（特定服務供應商專用資料結構）

上述細節應依實際 MVP 開發需求與已確認規格逐步決定。


# 1. Database Design Principles


## 1.1 Teaching Material First

教材（Teaching Material）是 MagicBook 的核心資料。

資料庫設計必須以教材架構為中心。

核心教材架構：

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


## 1.2 Complete Product Architecture

MagicBook 3.0 採用：

Complete Product Architecture（完整產品架構）。

資料庫必須支援完整核心產品架構，而不是只為單一功能建立孤立資料表。


## 1.3 Modular Data Architecture

資料架構（Data Architecture）必須維持模組化。

不同模組的資料責任必須清楚分離。

例如：

- Book Data（教材資料）
- Page Data（頁面資料）
- Image Data（圖片資料）
- Text Data（文字資料）
- Interaction Data（互動資料）
- AI Processing Data（AI 處理資料）

不得因單一功能將不同責任混合成不可維護的資料結構。


## 1.4 Data Separation

教材內容與互動資料必須分離。

例如：

Image Area（圖片區）

與：

HTML Overlay（HTML 疊加層）

屬於不同資料責任。

HTML Overlay 不應直接修改教材底圖資料。


## 1.5 Workspace Data Ownership

所有使用者資料必須具有明確的：

Data Ownership（資料歸屬）。

資料必須可以判斷屬於哪一個：

Workspace（工作空間）。

不同 Workspace 的資料不得互相混用。


## 1.6 Reuse Before Reinvent

Database Design 亦遵循：

Reuse Before Reinvent（先利用現有技術，再考慮自行開發）。

資料庫實作優先使用已確認的：

- Existing Database Capability（既有資料庫能力）
- Existing Authentication（既有身分驗證）
- Existing Storage（既有儲存能力）
- Existing Security Rules（既有安全規則）

不得為了單一功能建立不必要的自訂資料系統。


# 2. Data Architecture Overview


## 2.1 Core Data Hierarchy

MagicBook 3.0 的核心教材資料關係：

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


Folder 為可選的組織層。

Book 可以：

- 位於 Book Library 根目錄
- 位於 Folder 內

使用者不需要建立 Folder 才能使用 Book。


## 2.2 Page Content Architecture

Page 是教材內容的主要容器。

Page 可以包含不同類型的內容資料。

主要包括：

- Image Area
- Text Area
- HTML Overlay


## 2.3 Interaction Architecture

HTML Overlay 負責互動資料。

互動資料可以包含：

- Hotspot
- Popup
- 其他已確認的 Interactive Object（互動物件）

互動資料必須與教材底圖資料保持分離。


## 2.4 Processing Architecture

AI 與 Image Processing（影像處理）產生的中間資料，不應直接成為第二份教材資產。

Processing Data（處理資料）主要服務於：

- OCR
- AI
- Hotspot Generator

處理完成後，只有經確認需要保存的產品資料才進入正式資料結構。


# 3. Core Data Hierarchy


## 3.1 Workspace

Workspace 是資料歸屬的最上層。

Workspace 可以包含：

- Book Library
- Folders
- Books
- Lessons
- Pages
- Related Content
- Related Interaction Data


## 3.2 Book Library

Book Library 是使用者管理教材的主要入口。

Book Library 可以包含：

- Books
- Folders


## 3.3 Folder

Folder 是教材組織工具。

Folder 可以：

- 包含 Book
- 包含其他 Folder
- 進行排序
- 移動

Folder 不應成為教材內容本身。


## 3.4 Book

Book 是主要教材單位。

Book 可以包含：

- Lessons
- Pages


## 3.5 Lesson

Lesson 是 Book 內的教學單位。

第一版可以使用：

Default Lesson（預設 Lesson）。

Book 建立時可以建立 Default Lesson。


## 3.6 Page

Page 是實際教材內容的主要單位。

Page 可以包含：

- Image Area
- Text Area
- HTML Overlay


# 4. Workspace


## 4.1 Purpose

Workspace 用於管理：

Workspace-level Data（工作空間層級資料）。

Workspace 是資料隔離與資料歸屬的核心邊界。


## 4.2 Workspace Types

目前確認：

- Personal Workspace（個人工作空間）
- Organization Workspace（組織工作空間）


## 4.3 Workspace Ownership

每一筆核心教材資料都必須能追溯至所屬 Workspace。

主要教材資料包括：

- Folder
- Book
- Lesson
- Page
- Content
- Interaction


## 4.4 Workspace Isolation

不同 Workspace 之間必須保持：

Data Isolation（資料隔離）。

使用者只能存取自己有權限使用的 Workspace 資料。


## 4.5 Workspace and Authentication

Authentication（身分驗證）負責確認：

「誰正在使用系統。」

Workspace 負責確認：

「資料屬於哪一個工作空間。」

兩者責任必須分離。


# 5. Book Library


## 5.1 Purpose

Book Library 是教材管理入口。

其主要責任為：

- Book Discovery（教材尋找）
- Book Management（教材管理）
- Folder Management（資料夾管理）
- Book Navigation（教材導覽）


## 5.2 Root Books

Book 可以直接存在於：

Book Library Root（教材庫根目錄）。

不要求每一本 Book 都必須位於 Folder。


## 5.3 Folder Relationship

Folder 與 Book 的關係必須允許：

Book 在 Root 與 Folder 之間移動。

資料結構必須能支援：

Move Book（移動教材）。

## 5.4 Book Library Data Boundary

Book Library 負責教材組織。

不負責：

- OCR Processing
- AI Processing
- Image Processing

# 6. Folder


## 6.1 Purpose

Folder 用於組織教材。

Folder 是：

Organization Structure（組織結構）。

不是教材內容。


## 6.2 Folder Capabilities

資料架構必須支援：

- Create Folder
- Rename Folder
- Delete Folder
- Move Folder
- Reorder Folder
- Nested Folder
- Drag & Drop Sorting


## 6.3 Nested Folder

Folder 可以包含其他 Folder。

因此資料關係必須支援：

Parent Folder（父 Folder）

與：

Child Folder（子 Folder）。

Nested Folder 的深度不在本文件提前限制。


## 6.4 Folder and Book

Folder 可以包含 Book。

Book 也可以不屬於任何 Folder。

因此：

Folder → Book

不是必須存在的關係。


## 6.5 Folder Deletion

Folder 與 Book 的資料責任必須分離。

刪除 Folder 不應直接等同於刪除其中的 Book。

實際 Delete Behavior（刪除行為）依 MVP 開發階段確認。


# 7. Book


## 7.1 Purpose

Book 是 MagicBook 的主要教材單位。

Book 是使用者管理與開啟教材的主要資料容器。


## 7.2 Book Structure

Book 可以包含：

Lesson

↓

Page


## 7.3 Book Capabilities

資料架構必須支援：

- Create Book
- Rename Book
- Duplicate Book
- Delete Book
- Open Book
- Move Book


## 7.4 Book and Lesson

一個 Book 可以包含一個或多個 Lesson。

第一版可以使用：

Default Lesson（預設 Lesson）。

因此 Book 建立後可以立即具有可使用的 Lesson。


## 7.5 Book and Workspace

每一個 Book 必須屬於一個 Workspace。

Book 不得跨 Workspace 共用同一筆核心資料。


## 7.6 Book and Folder

Book 可以：

- 位於 Root
- 位於 Folder

Book 的內容本身不應依賴 Folder 才能存在。


# 8. Lesson


## 8.1 Purpose

Lesson 是 Book 內的教學單位。

Lesson 用於組織 Page。


## 8.2 Lesson Structure

Lesson：

↓

Page


## 8.3 Lesson Capabilities

資料架構必須支援：

- Create Lesson
- Rename Lesson
- Delete Lesson
- Reorder Lesson


## 8.4 Default Lesson

第一版可使用：

Default Lesson（預設 Lesson）。

建立 Book 時可以自動建立 Default Lesson。


## 8.5 Lesson Ownership

每一個 Lesson 必須屬於：

- 一個 Book
- 一個 Workspace

Lesson 不應脫離 Book 獨立存在。


# 9. Page


## 9.1 Purpose

Page 是教材實際內容的核心資料單位。

Page 是 Editor（編輯器）與 Reading Mode（閱讀模式）共同使用的資料基礎。


## 9.2 Page Structure

Page 可以包含：

- Image Area
- Text Area
- HTML Overlay


## 9.3 Page Capabilities

資料架構必須支援：

- Add Page
- Delete Page
- Duplicate Page
- Reorder Page
- Page Navigation


## 9.4 Page Ownership

每一個 Page 必須屬於：

- 一個 Lesson
- 一個 Book
- 一個 Workspace

這些關係可以由資料關聯取得。


## 9.5 Page Ordering

Page 必須具有：

Ordering Information（排序資訊）。

用於支援：

Page Reorder（頁面排序）。

實際欄位名稱與資料型別不在本文件提前鎖定。


# 10. Content Architecture


## 10.1 Content Separation

Page 內的內容必須維持責任分離：

Image Area

Text Area

HTML Overlay


## 10.2 Image Area

Image Area 負責：

- Image Import
- Image Display
- Image Replace
- Image Delete
- PDF Display
- Image Optimization
- Image Compression


## 10.3 Image Input

Image Import 可以接收：

- PNG
- JPG
- JPEG
- PDF
- 使用者已拍攝之照片
- 使用者截圖
- 使用者從裝置選取之圖片／檔案

MagicBook 不建立專用：

Camera System（相機系統）。

使用者拍照由裝置既有相機完成。

MagicBook 從：

Image Import（圖片匯入）

開始處理。


## 10.4 Text Area

Text Area 是：

Text-only Editing Area（純文字編輯區）。

Text Area 負責：

- Add Text Block
- Edit Text Block
- Delete Text Block
- Reorder Text Block


## 10.5 Text Area Boundary

Text Area 不負責：

- OCR
- PDF Processing
- Image Processing

這些功能屬於其他模組。


## 10.6 HTML Overlay

HTML Overlay 是：

Interactive Layer（互動層）。

HTML Overlay 用於承載：

- Interactive Object
- Hotspot
- Popup
- 其他已確認互動資料


## 10.7 Overlay and Background

HTML Overlay 不應直接修改：

Original Teaching Material（原始教材內容）。

教材底圖與互動資料保持分離。


## 10.8 Same Data Model

Editor Mode（編輯模式）與 Reading Mode（閱讀模式）應使用：

Same Data Model（同一份資料模型）。

不得建立兩套互相獨立的教材資料。

# 11. Image Area


## 11.1 Image Area Responsibility

Image Area 負責圖片與 PDF 內容。

主要責任：

- Import
- Display
- Replace
- Delete
- Optimization
- Compression


## 11.2 Image Asset

Image Asset（圖片資產）是教材內容的一部分。

只有正式進入教材的圖片才屬於：

Teaching Material Asset（教材資產）。


## 11.3 Processing Image

Processing Image（處理圖片）是 AI / OCR / Image Processing 使用的中間資料。

Processing Image 不應自動形成第二份教材圖片資產。


## 11.4 Rejected Image

如果 Quality Check（品質檢查）判定圖片：

- FAIL
- 不可可靠處理

不得因為處理流程而自動建立第二份正式教材資產。

MagicBook 不是使用者照片倉庫。


## 11.5 Image Optimization

Image Optimization（圖片最佳化）與：

Image Compression（圖片壓縮）

屬於圖片處理服務。

不得改變使用者實際教材意圖。


## 11.6 Original Teaching Material

正式教材資料必須與：

AI Processing（AI 處理）

OCR Processing（OCR 處理）

Image Processing（影像處理）

分離。

處理流程不得直接破壞正式教材資料。


# 12. Text Area


## 12.1 Text Block

Text Block（文字區塊）是 Text Area 的主要資料單位。

Text Block 可以：

- Create
- Edit
- Delete
- Reorder


## 12.2 Text Ownership

Text Block 必須屬於特定 Page。

Text Block 不應脫離 Page 獨立存在。


## 12.3 Text and OCR

OCR（光學字元辨識）產生的文字結果，不應直接等同於使用者建立的正式 Text Block。

OCR Result（OCR 結果）與正式教材文字資料必須保持責任分離。


## 12.4 Text and AI

AI 產生的內容也不應自動取代正式教材文字。

任何正式教材資料的變更必須遵循產品已確認的使用者流程。


# 13. HTML Overlay


## 13.1 Purpose

HTML Overlay 是教材上方的：

Interactive Layer（互動層）。

它的主要目的，是讓教材可以加入互動，而不需要直接修改教材底圖。


## 13.2 Overlay Ownership

HTML Overlay 必須與特定 Page 關聯。

Overlay 不應脫離 Page 獨立存在。


## 13.3 Overlay Objects

HTML Overlay 可以承載：

- Hotspot
- Popup
- Interactive Object


## 13.4 Overlay Position

互動物件需要具有：

Position Data（位置資料）。

實際座標格式與欄位名稱於實作階段確認。


## 13.5 Overlay Size

需要支援物件尺寸資料，以支援：

Resize（調整大小）。

實際欄位名稱與資料型別於實作階段確認。


## 13.6 Overlay Layer

如果同一 Page 存在多個互動物件，資料架構需要支援：

Layer Ordering（圖層排序）。

實際實作方式於開發階段確認。


# 14. Hotspot


## 14.1 Purpose

Hotspot 是 MagicBook 最主要的互動資料之一。

Hotspot 用於：

使用者點擊教材指定區域

↓

觸發互動內容。


## 14.2 Hotspot Ownership

Hotspot 屬於：

HTML Overlay

並且最終關聯至：

Page。


## 14.3 Hotspot Data

Hotspot 至少需要能表達：

- Position（位置）
- Size（尺寸）
- Interaction Target（互動目標）
- Display / Interaction State（顯示／互動狀態）


## 14.4 Hotspot CRUD

資料架構必須支援：

- Create Hotspot
- Read Hotspot
- Update Hotspot
- Delete Hotspot


## 14.5 Hotspot and OCR

OCR 產生：

Text + Bounding Box（文字＋邊界框）。

Hotspot Generator（Hotspot 產生器）可以利用 OCR 結果建立 Hotspot。

但 OCR Result 不等於正式 Hotspot。

兩者必須保持資料責任分離。


## 14.6 Hotspot Coordinate Transformation

如果 Image Processing 改變影像幾何，例如：

Deskew（校正傾斜）

則 OCR 座標必須經過：

Coordinate Transformation（座標轉換）

再建立最終 Hotspot。

避免 Hotspot 與使用者實際看到的位置產生偏移。


## 14.7 Reliable Failure

如果系統無法可靠建立 Hotspot：

不得建立猜測性 Hotspot。

系統應回報：

- PARTIAL
- FAIL

而不是錯誤地建立 SUCCESS 狀態。


# 15. AI and Processing Data


## 15.1 Purpose

AI Processing Data（AI 處理資料）與：

Teaching Material Data（教材資料）

必須分離。


## 15.2 Processing Pipeline

目前已確認的主要處理流程：

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

Hotspot Generator

↓

HTML Overlay

↓

Hotspot


## 15.3 Quality Check Data

Quality Check（品質檢查）可以產生：

- Quality Result
- Processing Decision
- Correction Requirement
- Re-Quality Result

實際資料欄位於實作階段確認。


## 15.4 Auto Correction Data

Auto Correction（自動修正）目前保留：

- Deskew
- Denoise
- Sharpen

CLAHE 不列入目前主要 Auto Correction Pipeline。


## 15.5 Re-Quality Check

Auto Correction 完成後：

必須重新進行：

Re-Quality Check（重新品質檢查）。

資料流程不得將：

「已經修正」

直接視為：

「已經合格」。


## 15.6 OCR Data

MVP 已核定：

Google Cloud Vision API

DOCUMENT_TEXT_DETECTION

OCR Provider（OCR 服務供應商）必須透過：

Provider Adapter（服務供應商介面層）

整合。


## 15.7 Provider Independence

核心教材資料不得直接依賴特定 OCR Provider。

未來更換 Provider 時：

核心教材資料模型不應被迫重新設計。


## 15.8 Background Processing

耗時的：

- Denoise
- OCR
- AI
- Image Processing

可以使用：

Background Processing（背景處理）。

Processing Status（處理狀態）需要能讓系統知道：

- Pending
- Processing
- Completed
- Failed

實際狀態模型於實作階段確認。

# 16. Relationship Rules


## 16.1 Workspace → Folder

一個 Workspace 可以包含多個 Folder。

Folder 必須屬於一個 Workspace。


## 16.2 Workspace → Book

一個 Workspace 可以包含多個 Book。

Book 必須屬於一個 Workspace。


## 16.3 Folder → Folder

Folder 可以具有：

Parent Folder（父 Folder）

以支援：

Nested Folder（巢狀 Folder）。


## 16.4 Folder → Book

Folder 可以包含多個 Book。

Book 可以沒有 Folder。

因此 Folder 對 Book 是：

Optional Relationship（可選關係）。


## 16.5 Book → Lesson

Book 可以包含多個 Lesson。

Lesson 必須屬於 Book。


## 16.6 Lesson → Page

Lesson 可以包含多個 Page。

Page 必須屬於 Lesson。


## 16.7 Page → Content

Page 可以包含：

- Image Area
- Text Area
- HTML Overlay


## 16.8 Page → Overlay

一個 Page 可以包含多個 HTML Overlay Object。

每一個 Overlay Object 必須能追溯至其所屬 Page。


## 16.9 Overlay → Hotspot

Hotspot 屬於 HTML Overlay Layer。

Hotspot 必須能追溯至其所屬 Page。


## 16.10 Page → Text Block

Text Block 屬於 Page。

Text Block 不應脫離 Page 成為獨立教材內容。


# 17. Data Ownership and Isolation


## 17.1 Workspace Ownership

核心教材資料必須具有 Workspace Ownership（Workspace 資料歸屬）。

包括：

- Folder
- Book
- Lesson
- Page
- Content
- Interaction


## 17.2 User Access

Authentication 確認使用者身分。

Authorization（授權）確認使用者是否可以存取特定 Workspace 與其資料。


## 17.3 Data Isolation

不同 Workspace 的資料必須保持：

Data Isolation（資料隔離）。

使用者不得透過一般產品操作取得沒有權限的其他 Workspace 資料。


## 17.4 Organization Workspace

Organization Workspace 的資料歸屬於組織 Workspace。

個別使用者只是：

Workspace Member（Workspace 成員）。

資料本身不應因使用者離開而失去 Workspace Ownership。


## 17.5 Personal Workspace

Personal Workspace 的資料歸屬於個人 Workspace。

實際帳號與 Workspace 生命周期於 Authentication / Workspace 實作階段確認。


# 18. Data Persistence Rules


## 18.1 Persistent Data

正式教材資料必須：

Persistent（持久化）。

包括：

- Book
- Lesson
- Page
- Text Block
- Image Asset
- HTML Overlay
- Hotspot
- 其他已確認的正式教材資料


## 18.2 Temporary Processing Data

Temporary Processing Data（暫時處理資料）只用於：

- OCR
- AI
- Image Processing
- Quality Check
- Auto Correction

不得自動變成第二份正式教材資產。


## 18.3 Processing Failure

Processing Failure（處理失敗）不得破壞既有正式教材資料。

如果：

OCR FAIL

或：

AI FAIL

或：

Image Processing FAIL

系統應保留原有教材資料。


## 18.4 Reliable Failure

任何無法可靠完成的處理：

不得以猜測資料取代。

例如：

- 不猜測 OCR 文字
- 不猜測座標
- 不建立錯誤 Hotspot
- 不覆蓋原有教材資料


## 18.5 Save Boundary

正式資料寫入資料庫前，系統必須確認資料符合目前產品規格。

Save（儲存）行為不得因單一 AI Processing 結果而破壞既有資料。


# 19. Database Implementation Rules


## 19.1 Implementation Timing

Database Implementation（資料庫實作）應依：

Roadmap（開發路線圖）

與：

MVP Development（MVP 開發規格）

逐階段進行。

不應在尚未進入相關 Phase 前，提前建立大量未確認資料結構。


## 19.2 Schema Responsibility

Database Schema（資料庫結構）必須反映：

已確認產品需求。

不得由資料庫結構反向決定產品功能。


## 19.3 Field Naming

實際：

- Table Name（資料表名稱）
- Column Name（欄位名稱）
- Data Type（資料型別）
- Constraint（限制條件）

於實作階段確認。

命名必須遵循：

Development Guidelines（開發規範）。

不得在本文件未經 PM 確認的情況下自行擴大資料欄位。


## 19.4 Relationship Integrity

資料關係必須保持：

Relationship Integrity（關聯完整性）。

例如：

Page 不應存在於不存在的 Lesson。

Lesson 不應存在於不存在的 Book。

Book 不應存在於不存在的 Workspace。


## 19.5 Delete Behavior

不同資料層級的：

Delete Behavior（刪除行為）

必須在實作階段明確確認。

不得因資料庫預設行為，自動刪除大量教材資料而未經產品規格確認。


## 19.6 Migration

Database Migration（資料庫遷移）若會影響既有正式資料：

必須先確認：

- Data Impact（資料影響）
- Backward Compatibility（向後相容）
- Recovery Strategy（復原策略）

不得直接修改正式資料而未進行影響評估。


## 19.7 RLS

Row Level Security（資料列層級安全性）應用於需要 Workspace Data Isolation 的資料。

實際 Policy（政策）於 Database Implementation 階段依實際 Schema 確認。

不得在本文件提前寫死尚未確認的 Policy 細節。

# 20. Future Extension


## 20.1 Extension Principle

Database Architecture 必須具有：

Extensibility（可擴充性）。

未來新增功能時：

不得破壞目前核心教材架構。


## 20.2 Possible Extension Direction

未來可能增加新的：

- Content Type（內容類型）
- Interactive Object（互動物件）
- AI Service（AI 服務）
- Media Type（媒體類型）
- Learning Data（學習資料）

但這些不代表目前 MVP 已核定功能。

未經 PM Decision（產品決策）確認：

不得直接加入正式 MVP Schema（MVP 資料庫結構）。


## 20.3 Core Data Stability

未來新增功能應盡可能：

Reuse Existing Data Model（重用既有資料模型）。

只有當既有架構確實無法支援時，才評估新增資料結構。


## 20.4 Provider Replacement

第三方 Provider 更換：

不得要求重新建立核心教材資料。

Provider-specific Data（Provider 專用資料）應與核心教材資料保持分離。


# 21. Change Log


## Version 1.0

### Initial Database Design

建立 MagicBook 3.0 第一版 Database Design。

本版本確認：

### Core Hierarchy

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


### Content Architecture

Page 包含：

- Image Area
- Text Area
- HTML Overlay


### Interaction Architecture

HTML Overlay 負責：

- Hotspot
- Popup
- Interactive Object


### AI Processing Separation

AI、OCR、Image Processing 與正式教材資料保持分離。


### Image Processing

目前確認：

- Quality Check
- Auto Correction
- Re-Quality Check
- OCR
- Hotspot Generator

形成主要 AI Automation Processing Pipeline。


### Image Storage

MagicBook 不是使用者照片倉庫。

Temporary Processing Data 不應自動形成第二份正式教材資產。


### Workspace Isolation

核心教材資料必須具有 Workspace Ownership。

不同 Workspace 必須保持 Data Isolation。


### Provider Architecture

第三方 Provider 必須採：

Replaceable Provider Architecture（可替換服務供應商架構）。

核心教材資料不得直接綁定單一 Provider。


### Implementation Boundary

本版本刻意不提前鎖定所有：

- Table Name
- Column Name
- Data Type
- Index
- SQL
- RLS Policy
- Migration Strategy

上述內容於實際 MVP Development 階段，依已確認需求逐步完成。


# END OF DOCUMENT
- Reading Interaction

上述功能屬於其他資料模組。
