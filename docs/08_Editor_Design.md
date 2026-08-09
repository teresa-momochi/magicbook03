# MagicBook 3.0 Editor Design

Version: 1.1
Status: Draft
Document Owner: Teresa Su
Product Manager: ChatGPT
Technical Lead: 阿德
Last Update: 2026-08-09

---

# Table of Contents

0. Editor Design Purpose
1. Editor Design Principles
2. Editor Scope
3. Editor Architecture
4. Editor and Data Model
5. Editor Modes
6. Page Editor
7. Image Area
8. Text Area
9. HTML Overlay
10. Hotspot
11. Image Import
12. AI Automation Integration
13. Editor and AI Boundary
14. Editor and Reading Mode
15. Material Protection
16. Editing Operations
17. Save Behavior
18. Undo / Redo
19. Delete Behavior
20. Background Processing
21. Loading and Processing States
22. Editor Performance
23. Editor Security
24. Editor Development Boundaries
25. Reuse Before Reinvent
26. Editor Testing and Validation
27. Editor Completion Criteria
28. Editor Change Control
29. Change Log

---

# 0. Editor Design Purpose

## 0.1 Purpose

本文件定義 MagicBook 3.0 的 Editor Design（編輯器設計）。

Editor（編輯器）的責任是讓使用者管理與編輯既有教材資料。

Editor 不重新定義：

- Product Scope（產品範圍）
- Database Schema（資料庫結構）
- API Contract（API 契約）
- AI Architecture（AI 架構）

這些內容依既有正式文件執行。

---

## 0.2 Source of Truth

Editor Design 必須遵循：

1. Product Specification（產品規格）
2. MVP Development（MVP 開發規格）
3. Roadmap（開發路線圖）
4. Development Guidelines（開發規範）
5. Database Design（資料庫設計）
6. API Design（API 設計）
7. AI Design（AI 設計）
8. Editor Design（編輯器設計）

衝突處理優先順序：

> Product Specification → MVP Development → Roadmap → Development Guidelines → Database Design → API Design → AI Design → Editor Design

Editor Design 不得自行覆寫較高優先級的正式文件。

---

# 1. Editor Design Principles

## 1.1 Teaching Material First

Teaching Material（教材）是 Editor 的核心。

Editor 的工作是：

> 編輯、整理、管理教材。

Editor 不應因為編輯便利而破壞：

- Original Teaching Material（原始教材）
- Page Structure（頁面結構）
- Image Asset（圖片資產）
- Text Content（文字內容）

---

## 1.2 Same Data Model

Editor Mode（編輯模式）與 Reading Mode（閱讀模式）使用同一份教材資料。

不得建立兩套互相獨立的教材資料模型。

---

## 1.3 Clear Responsibility

Editor 中不同區域保持責任分離：

- Image Area（圖片區）負責圖片
- Text Area（文字區）負責文字
- HTML Overlay（HTML 疊加層）負責互動
- Hotspot（熱點）屬於互動內容

不得把 Image Area、Text Area、HTML Overlay 的責任混在一起。

---

## 1.4 Protect Original Material

教材原始內容必須受到保護。

Editor 的互動層資料與原始教材資料保持分離。

---

## 1.5 Reuse Before Reinvent

Editor 開發遵循：

Reuse Before Reinvent（重用優先於重新開發）。

優先順序：

1. OS / Device Existing Capability（作業系統／裝置既有能力）
2. Browser Existing Capability（瀏覽器既有能力）
3. HTML / CSS / JavaScript Native Capability（原生能力）
4. Mature Open Source Library（成熟開源函式庫）
5. Mature Third-party Tool / Service（成熟第三方工具／服務）
6. Custom Development（自行開發）

不得在沒有確認現有技術能力前，自行建立新的 Editor System（編輯器系統）。

---

# 2. Editor Scope

## 2.1 MVP Editor Scope

MVP Editor 包含目前已確認的：

- Book / Lesson / Page 管理
- Page 編輯
- Image Area
- Text Area
- HTML Overlay
- Hotspot
- Image Import
- Image Replacement
- Image Delete
- Image Optimization / Compression
- AI Automation Result Integration
- Editor / Reading Mode 共用資料
- Background Processing 狀態

---

## 2.2 Image Area Scope

Image Area 負責：

- Image Import
- Image Display（圖片顯示）
- Image Replace（圖片替換）
- Image Delete（圖片刪除）
- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）

Image Area 不負責：

- HTML Interaction（HTML 互動）
- Hotspot Interaction
- OCR
- PDF Processing
- AI Automation

---

## 2.3 Text Area Scope

Text Area 是：

Text-only Editing Area（純文字編輯區）。

Text Area 負責文字編輯。

Text Area 不負責：

- Image Processing
- PDF Processing
- OCR Processing
- Hotspot
- HTML Overlay

---

## 2.4 HTML Overlay Scope

HTML Overlay 是：

Interactive Layer（互動層）。

HTML Overlay 可以建立：

- Hotspot
- Interactive Content（互動內容）

HTML Overlay 不應直接修改 Original Teaching Material。

---

# 3. Editor Architecture

## 3.1 Core Structure

Editor 的核心結構：

Workspace
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
Content

Page 內的內容區分：

Image Area
+
Text Area
+
HTML Overlay

---

## 3.2 Editor Layer

Editor 可以視為：

Page
↓
Content Layer
↓
Image Area / Text Area
↓
Interaction Layer
↓
HTML Overlay / Hotspot

---

## 3.3 Separation

Editor 不應把：

Image
+
Text
+
Interaction

儲存成無法分離的單一資料。

各自責任依既有 Database Design（資料庫設計）執行。

---

# 4. Editor and Data Model

## 4.1 Page

Page 是 Editor 的基本編輯單位。

Editor 開啟 Page 後：

- 讀取 Page Data（頁面資料）
- 顯示 Image Area
- 顯示 Text Area
- 顯示 HTML Overlay

---

## 4.2 Image Data

Image Data（圖片資料）由 Image Area 管理。

Image 的正式資料結構依：

`05_Database_Design.md`

執行。

---

## 4.3 Text Data

Text Data（文字資料）由 Text Area 管理。

Text 的正式資料結構依 Database Design（資料庫設計）執行。

---

## 4.4 Interaction Data

Interaction Data（互動資料）由 HTML Overlay 管理。

Hotspot 屬於互動內容，不應直接成為 Image Asset。

---

# 5. Editor Modes

## 5.1 Editor Mode

Editor Mode 用於：

- 編輯教材
- 編輯圖片
- 編輯文字
- 管理互動內容

---

## 5.2 Reading Mode

Reading Mode 用於：

- 閱讀
- 播放
- 使用 Hotspot
- 使用互動內容

---

## 5.3 Same Material

Editor Mode 與 Reading Mode：

> 使用同一份教材資料。

Editor 不應建立 Reading Mode 專用教材副本。

---

## 5.4 Edit Entry

Reading Mode 已確認存在：

> 單一 Edit Button（編輯按鈕）覆蓋入口。

使用者可以從 Reading Mode 進入 Editor。

---

# 6. Page Editor

## 6.1 Page Loading

開啟 Page 時：

Page Data
↓
Load Image Area
↓
Load Text Area
↓
Load HTML Overlay
↓
Render Editor

---

## 6.2 Page Editing

Page Editor（頁面編輯器）必須讓使用者能處理目前已核定的：

- Image
- Text
- Interaction

不新增未核定的 Editor Feature（編輯器功能）。

---

## 6.3 Page Order

Page 的排序與管理依 Database Design（資料庫設計）及既有產品規格執行。

Editor Design 不重新定義排序規則。

---

# 7. Image Area

## 7.1 Responsibility

Image Area 是圖片內容區。

負責：

- Image Import
- Display
- Replace
- Delete
- Optimization
- Compression

---

## 7.2 Image Import

使用者先透過裝置既有能力取得：

- 已拍攝照片
- Screenshot（截圖）
- Device-selected Image / File（裝置選取的圖片／檔案）
- PDF

MagicBook 從：

> Image Import

開始處理。

MagicBook 不建立專用 Camera System（相機系統）。

---

## 7.3 Image Display

Image Area 顯示正式教材圖片。

顯示本身不等於互動層。

---

## 7.4 Image Replace

Replace Image（替換圖片）必須遵循既有 Image Storage Rule（圖片儲存規則）。

Editor 不應自行建立第二份永久教材圖片資產。

---

## 7.5 Image Delete

Delete Image（刪除圖片）依正式 Database / API 規則執行。

Editor 不得自行實作與資料庫規則衝突的刪除行為。

---

## 7.6 Image Optimization

圖片最佳化與壓縮屬於：

Image Processing（圖片處理）。

如果工作耗時：

應使用 Background Processing（背景處理）。

---

# 8. Text Area

## 8.1 Responsibility

Text Area 是：

Text-only Editing Area（純文字編輯區）。

---

## 8.2 Text Editing

Text Area 負責：

- Text Input（文字輸入）
- Text Editing（文字編輯）

---

## 8.3 No OCR Responsibility

OCR Result（OCR 結果）不屬於 Text Area 的處理責任。

OCR 由 AI Automation / OCR Module 負責。

---

## 8.4 No Automatic OCR Replacement

OCR Result 不得自動：

- 覆蓋 Text Area
- 覆蓋 Text Block
- 取代使用者原有文字

除非未來有新的 PM Decision（PM 決策）。

---

# 9. HTML Overlay

## 9.1 Responsibility

HTML Overlay 是：

Interactive Layer（互動層）。

---

## 9.2 Overlay Content

HTML Overlay 可承載：

- Hotspot
- Interactive Content

---

## 9.3 Material Separation

HTML Overlay 與 Original Teaching Material 分離。

Overlay 不應直接修改：

- Original Image
- Original PDF
- Original Text

---

## 9.4 Overlay and Image

HTML Overlay 可以覆蓋於：

- Image
- PDF

目前不再把 Camera 視為獨立的教材來源類型。

---

# 10. Hotspot

## 10.1 Responsibility

Hotspot 是互動內容。

Hotspot 不屬於 Image Area 本身。

---

## 10.2 Creation

Hotspot 可以由：

- AI Automation
- Manual Interaction Creation（手動互動建立）

產生。

---

## 10.3 AI Generated Hotspot

AI Automation 產生 Hotspot 前必須完成：

Quality Check
↓
必要時 Auto Correction
↓
Re-Quality Check
↓
OCR
↓
Hotspot Generator

---

## 10.4 Coordinate

如果 Auto Correction 改變圖片幾何：

Processed Coordinates
↓
Coordinate Transformation
↓
Final Display Coordinates
↓
Hotspot

---

## 10.5 Reliable Failure

不可靠的結果：

不得建立猜測性 Hotspot。

---

# 11. Image Import

## 11.1 Responsibility

Image Import 是 MagicBook Image Area 的輸入入口。

---

## 11.2 Source

輸入可以來自：

- 使用者已拍攝的照片
- Screenshot
- 裝置選取的圖片
- 裝置選取的檔案
- PDF

---

## 11.3 No Camera System

MagicBook 不建立：

- Camera Preview
- getUserMedia
- ImageCapture
- Exposure Control
- Focus Control
- HDR Control
- MagicBook Camera System

拍照由裝置既有相機完成。

---

## 11.4 Import Flow

User obtains image
↓
Image Import
↓
Image Quality Check
↓
必要時 Auto Correction
↓
Re-Quality Check
↓
Continue

---

# 12. AI Automation Integration

## 12.1 Official Flow

Editor 與 AI Automation 的整合流程：

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

---

## 12.2 AI Boundary

Editor 負責：

> 接收已完成的 AI Automation Result（AI 自動化結果）並呈現／整合。

AI Design 負責：

> AI Automation Pipeline 本身。

Editor 不重新實作 AI Pipeline。

---

## 12.3 Failure

如果 AI Automation：

- PARTIAL
- FAIL

Editor 不得把結果假裝成：

SUCCESS。

---

# 13. Editor and AI Boundary

## 13.1 Editor Does Not Become AI Engine

Editor 不負責：

- OCR Algorithm
- AI Model
- AI Provider
- Quality Algorithm
- Auto Correction Algorithm

這些由 AI Design / AI Architecture 定義。

---

## 13.2 AI Result

AI Result（AI 結果）可以提供給 Editor 使用。

但：

AI Result
≠
Original Teaching Material

---

## 13.3 User Control

需要使用者確認的內容，不得因 Editor 實作方便而自動寫入正式教材。

---

# 14. Editor and Reading Mode

## 14.1 Same Data

Editor 與 Reading Mode 使用同一份：

Teaching Material Data（教材資料）。

---

## 14.2 Editor Changes

Editor 儲存後：

Reading Mode 應讀取相同資料。

---

## 14.3 Reading Mode Does Not Create Second Material

Reading Mode 不建立另一份教材。

---

# 15. Material Protection

## 15.1 Original Material

Editor 不得因：

- AI
- Hotspot
- Overlay
- Preview
- Reading Mode

而破壞 Original Teaching Material。

---

## 15.2 Interaction Separation

Interaction Data 與 Material Data 分離。

例如：

Image
≠
Hotspot

Text
≠
Hotspot

---

## 15.3 Processed Image

Processed Image（處理後圖片）屬於處理中資料。

除非使用者確認成為教材資產，否則不得自動形成第二份正式 Image Asset。

---

# 16. Editing Operations

## 16.1 Confirmed Operations

目前 Editor 已確認需要支援：

- Image Import
- Image Replace
- Image Delete
- Text Editing
- Hotspot / Interaction Management
- Page Management

---

## 16.2 No Unapproved Editing Features

以下不因 Editor Design 自行新增：

- Advanced Image Editor（進階圖片編輯器）
- Freehand Drawing（自由繪圖）
- Crop Tool（裁切工具）
- Perspective Tool（透視工具）
- Shadow Removal Tool（陰影移除工具）
- Handwriting Recognition Editor（手寫辨識編輯器）

除非未來有正式 PM Decision。

---

# 17. Save Behavior

## 17.1 Responsibility

Editor Save（儲存）必須保存使用者已確認的教材變更。

---

## 17.2 Data Separation

儲存時必須保持：

Image Data
Text Data
Interaction Data

各自責任分離。

---

## 17.3 AI Processing Data

AI Processing Data 不應因 Editor Save 自動變成正式教材資產。

---

## 17.4 API

實際 Save API 依：

`06_API_Design.md`

執行。

Editor Design 不重新定義 API Contract。

---

# 18. Undo / Redo

## 18.1 Current Scope

Undo / Redo（復原／重做）的完整行為目前未在既有正式文件中核定。

因此：

> 不在本版本自行定義實作細節。

---

## 18.2 Future Decision

若未來需要正式定義：

Undo / Redo Scope
↓
PM Review
↓
Specification Update
↓
Editor Design Update
↓
Development

---

# 19. Delete Behavior

## 19.1 Material Delete

教材刪除行為必須遵循：

- Product Specification
- Database Design
- API Design

不得由 Editor 自行改寫資料刪除規則。

---

## 19.2 Folder Delete

Folder Delete Rule（資料夾刪除規則）由：

`05_Database_Design.md`
+
`06_API_Design.md`

正式定義。

規則：

- 空 Folder 才能刪除
- 非空 Folder 禁止刪除
- 不得 Cascade Delete
- 不得自動搬移 Book / Child Folder

Editor 只負責呈現與呼叫既有規則，不重新定義。

---

# 20. Background Processing

## 20.1 Required Background Work

Editor 相關耗時工作包括：

- Denoise
- OCR
- AI
- Image Processing
- Compression
- Optimization

應使用 Background Processing。

---

## 20.2 UI State

Editor 應能理解：

- Pending
- Processing
- Completed
- Failed

等 Processing Job 狀態。

---

## 20.3 No UI Freeze

Background Processing 不應讓 Editor 長時間 Freeze（凍結）。

---

# 21. Loading and Processing States

## 21.1 User Feedback

耗時工作需要清楚的：

Loading State（載入狀態）
Processing State（處理狀態）

---

## 21.2 AI Automation

使用者不需要看到：

- Model
- Provider
- Algorithm
- Quality Metric
- Confidence

等內部工程細節。

使用者主要看到：

Import
↓
Processing
↓
Result

---

# 22. Editor Performance

## 22.1 Performance Principle

Editor 必須遵循：

- Background Processing
- Minimum Necessary Processing
- Image Optimization
- Image Compression

---

## 22.2 No Unnecessary Processing

不要因為使用者開啟 Editor，就對所有教材重新執行：

- OCR
- AI
- Denoise
- Compression
- Optimization

只有必要時才執行。

---

## 22.3 Technical Evidence

已知：

Denoise ≈ 1360ms / image
Sharpen ≈ 16ms / image

這些數值屬於 Technical Evidence，不是 Editor SLA。

---

# 23. Editor Security

## 23.1 Workspace Isolation

Editor 只能操作目前 Workspace 已授權的教材。

---

## 23.2 Permission

Editor 的權限依：

Workspace
+
User Permission
+
API Authorization

執行。

---

## 23.3 No Cross Workspace

不得透過 Editor：

- 讀取其他 Workspace
- 修改其他 Workspace
- 建立跨 Workspace Hotspot
- 使用其他 Workspace AI Processing Data

---

# 24. Editor Development Boundaries

## 24.1 No Camera System

Editor 不建立 Camera System。

---

## 24.2 No Custom OCR

Editor 不建立 OCR Engine。

---

## 24.3 No AI Provider Lock-in

Editor 不直接綁定：

- Google Cloud Vision
- Claude
- GPT
- Gemini
- OpenRouter

Provider 由 AI / API Architecture 管理。

---

## 24.4 No New Image Editor

除非 PM Decision 明確核定：

Editor 不自行擴充為完整 Image Editor。

---

## 24.5 No Scope Expansion

Editor Design 不自行新增：

- 新功能
- 新資料模型
- 新 API
- 新 Database Schema
- 新 AI Pipeline
- 新 Camera System

---

# 25. Reuse Before Reinvent

## 25.1 Editor Rule

任何新的 Editor Capability（編輯器能力）：

先確認：

OS
↓
Browser
↓
HTML / CSS / JavaScript
↓
Open Source Library
↓
Third-party Tool
↓
Custom Development

---

## 25.2 Existing Capability

如果瀏覽器或成熟函式庫已經能完成需求：

優先使用現有能力。

---

## 25.3 No Premature Custom System

不得因「未來可能需要」而提前建立：

- Custom Editor Framework（自製編輯器框架）
- Custom Image Editor
- Custom Camera System
- Custom OCR
- Custom Interaction Engine（自製互動引擎）

---

# 26. Editor Testing and Validation

## 26.1 Testing Principle

Editor Testing（編輯器測試）必須確認：

- Data Correctness（資料正確性）
- Material Protection（教材保護）
- Image / Text Separation（圖片／文字分離）
- Interaction Separation（互動分離）
- AI Result Integration（AI 結果整合）
- Save Behavior
- Delete Behavior
- Workspace Isolation

---

## 26.2 Image Area Testing

測試：

- Image Import
- Image Replace
- Image Delete
- Image Optimization
- Image Compression

---

## 26.3 Text Area Testing

測試：

- Text Input
- Text Editing
- Save
- Reload

並確認 OCR 不會未經確認自動覆蓋 Text Area。

---

## 26.4 Hotspot Testing

測試：

- Manual Hotspot
- AI-generated Hotspot
- Coordinate Transformation
- Reading Mode display

---

## 26.5 AI Failure Testing

確認：

- PARTIAL 不被標記為 SUCCESS
- FAIL 不建立猜測性 Hotspot
- Provider Failure 不破壞教材
- Processing Image 不形成第二份教材資產

---

# 27. Editor Completion Criteria

## 27.1 Core Editor

- [ ] Book / Lesson / Page 可正常進入 Editor
- [ ] Page 可正常載入
- [ ] Image Area 可正常使用
- [ ] Text Area 可正常使用
- [ ] HTML Overlay 可正常使用
- [ ] Hotspot 可正常使用
- [ ] Editor / Reading Mode 使用同一份教材資料

---

## 27.2 Image

- [ ] Image Import
- [ ] Image Replace
- [ ] Image Delete
- [ ] Image Optimization
- [ ] Image Compression
- [ ] No Camera System

---

## 27.3 AI Integration

- [ ] Quality Check Result 可被 Editor 正確處理
- [ ] Auto Correction Result 可正確進入後續流程
- [ ] Re-Quality Check Result 可正確反映
- [ ] OCR Result 可正確提供 Text + Bounding Box
- [ ] Hotspot Generator Result 可正確建立互動
- [ ] Coordinate Transformation 正確

---

## 27.4 Protection

- [ ] Original Teaching Material 不被 AI Processing 直接覆蓋
- [ ] Processed Image 不形成第二份教材資產
- [ ] OCR 不自動覆蓋 Text Area
- [ ] Workspace Isolation 正常

---

# 28. Editor Change Control

## 28.1 PM Review

任何影響：

- Editor Scope
- Data Model
- User Flow
- Image Area
- Text Area
- HTML Overlay
- Hotspot
- AI Integration

的變更，必須先進行 PM Review。

---

## 28.2 Specification First

正式流程：

PM Decision
↓
Update Specification
↓
Update Editor Design
↓
Update API Design（必要時）
↓
Update Database Design（必要時）
↓
Development
↓
Testing

---

## 28.3 No Engineer-first Change

工程師如果發現：

「實作上需要一個新的 Editor 功能」

不得直接新增。

先：

1. 回報
2. PM Review
3. 確認 Scope
4. 更新正式文件
5. 再 Development

---

## 28.4 Consistency Review

Editor Design 更新後必須重新檢查：

- Product Specification
- MVP Development
- Roadmap
- Development Guidelines
- Database Design
- API Design
- AI Design

不得造成跨文件矛盾。

---

# 29. Change Log

## Version 1.1

Status: Draft

Last Update: 2026-08-09

同步 Hotspot Coordinate Transformation（熱點座標轉換）與既有 AI Automation / Database / API 架構的正式流程順序。

本次只修正既有流程的文件表述，不新增產品功能、不新增 API、不新增 Database Schema、不改變 Editor Scope。

正式流程由：

> Text + Bounding Box → Hotspot Generator → Coordinate Transformation（必要時）

同步為：

> Text + Bounding Box → Coordinate Transformation（必要時） → Hotspot Generator

---

## Version 1.0

Status: Draft

建立 MagicBook 3.0 Editor Design 基礎文件。

本版本整理目前已確認的：

- Editor Architecture
- Editor / Reading Mode Same Data Model
- Image Area
- Text Area
- HTML Overlay
- Hotspot
- Image Import
- No Camera System
- AI Automation Integration
- Hotspot Coordinate Transformation
- Material Protection
- Background Processing
- Processing States
- Workspace Isolation
- Reuse Before Reinvent
- Editor Development Boundaries
- Testing and Validation
- Completion Criteria
- Change Control

本版本不新增未核定產品功能。

本版本不重新定義：

- Database Schema
- API Contract
- AI Provider
- OCR Provider
- Threshold
- Undo / Redo 詳細行為
- Advanced Image Editor
- Camera System
- 新 AI Pipeline

---

END OF DOCUMENT
