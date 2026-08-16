# MagicBook 3.0 Editor Design - Version: 1.5

Version: 1.5

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-16

---

# Table of Contents

0. Editor Design Purpose
1. Core Editor Principles
2. Editor Scope
3. Editor Architecture
4. Data Responsibility
5. Editor Modes
6. Page Editor
7. Image Area
8. Text Area
9. HTML Overlay
10. Hotspot
11. Image Import and Processing
12. AI Integration Boundary
13. Reading Mode Integration
14. Material Protection
15. Editing Operations
16. Save Behavior
17. Delete Behavior
18. Background Processing
19. Loading and Processing States
20. Performance
21. Security and User Account Isolation
22. Development Boundaries
23. Reuse Before Reinvent
24. Testing and Validation
25. Completion Criteria
26. Change Control
27. Change Log

---

# 0. Editor Design Purpose

## 0.1 Purpose

本文件定義 MagicBook 3.0 的 Editor Design（編輯器設計）。

Editor（編輯器）的責任是：

- 開啟教材
- 編輯教材
- 管理教材
- 管理圖片
- 管理文字
- 管理互動內容
- 將已完成的 AI Processing Result（AI 處理結果）整合到教材

Editor 不重新定義：

- Product Specification（產品規格）
- MVP Development（MVP 開發規格）
- Database Design（資料庫設計）
- API Design（API 設計）
- AI Design（AI 設計）

---

## 0.2 Source of Truth

Editor Design 必須遵循既有正式文件。

優先順序：

1. Product Specification（產品規格）
2. MVP Development（MVP 開發規格）
3. Roadmap（開發路線圖）
4. Development Guidelines（開發規範）
5. Database Design（資料庫設計）
6. API Design（API 設計）
7. AI Design（AI 設計）
8. Editor Design（編輯器設計）

若本文件與較高優先級文件衝突：

> 以較高優先級文件為準。

Editor Design 不得自行改寫產品規格、資料結構、API 契約或 AI 架構。

---

# 1. Core Editor Principles

## 1.1 Teaching Material First

Teaching Material（教材）是 Editor 的核心。

Editor 的工作是：

> 編輯、整理、管理既有教材。

Editor 不應因為編輯便利而破壞：

- Original Teaching Material（原始教材）
- Page Structure（頁面結構）
- Image Asset（圖片資產）
- Text Content（文字內容）

---

## 1.2 Same Data Model

Editor Mode（編輯模式）與 Reading Mode（閱讀模式）使用同一份教材資料。

不得建立：

> Editor 專用教材 + Reading Mode 專用教材

兩套互相獨立的正式教材資料。

---

## 1.3 Responsibility Separation

Editor 必須維持清楚的責任分離：

- Image Area（圖片區）負責圖片
- Text Area（文字區）負責文字
- HTML Overlay（HTML 疊加層）負責互動
- Hotspot（熱點）屬於互動內容

不得把上述責任混合。

---

## 1.4 Original Material Protection

Original Teaching Material（原始教材）必須受到保護。

AI Processing（AI 處理）、Hotspot（熱點）、Overlay（疊加層）及 Preview（預覽）不得未經確認直接破壞原始教材。

---

## 1.5 Reuse Before Reinvent

Editor 開發遵循：

> Reuse Before Reinvent（重用優先於重新開發）

優先使用：

1. OS / Device Existing Capability（作業系統／裝置既有能力）
2. Browser Existing Capability（瀏覽器既有能力）
3. HTML / CSS / JavaScript Native Capability（原生能力）
4. Mature Open Source Library（成熟開源函式庫）
5. Mature Third-party Tool / Service（成熟第三方工具／服務）
6. Custom Development（自行開發）

沒有確認既有能力前，不自行建立新的系統。

---

## 1.6 Global Processing Principles

Editor 必須遵循系統共同原則：

- Optimization（最佳化）
- Compression（壓縮）
- Caching（快取）
- Background Processing（背景處理）

這些能力應視為系統預設架構要求，而不是每個功能重新決定一次。

---

# 2. Editor Scope

## 2.1 Confirmed Scope

目前 Editor 包含：

- Book / Lesson / Page 管理
- Page 編輯
- Image Area
- Text Area
- HTML Overlay
- Hotspot
- Image Import
- Image Replace
- Image Delete
- Image Optimization
- Image Compression
- AI Processing Result Integration
- Editor / Reading Mode 共用教材資料
- Background Processing Status

---

## 2.2 Out of Scope

除非未來正式核定，Editor 不自行增加：

- Advanced Image Editor（進階圖片編輯器）
- Freehand Drawing（自由繪圖）
- Crop Tool（裁切工具）
- Perspective Tool（透視工具）
- Shadow Removal Tool（陰影移除工具）
- Handwriting Recognition Editor（手寫辨識編輯器）
- Custom Camera System（自製相機系統）
- Custom OCR Engine（自製 OCR 引擎）
- Custom AI Model（自製 AI 模型）
- Custom AI Provider System（自製 AI 服務供應商系統）

---

# 3. Editor Architecture

## 3.1 Content Structure

MagicBook 的教材結構：

User Account（使用者帳號）
↓
Book Library（教材庫）
↓
Folder（資料夾）
↓
Book（教材）
↓
Lesson（課次）
↓
Page（頁面）
↓
Content（內容）

Editor 只負責 Book／Lesson／Page／Content 範圍內的編輯行為；Book Library 與 Folder 的管理行為（建立、搬移、刪除等）依 01_Product_Specification 與 05_Database_Design 為準，不在本文件重複定義。

Page 內：

Image Area
+
Text Area
+
HTML Overlay

---

## 3.2 Editor Layer

Editor 可視為：

Page
↓
Content Layer（內容層）
↓
Image Area / Text Area
↓
Interaction Layer（互動層）
↓
HTML Overlay
↓
Hotspot

---

## 3.3 Responsibility Boundary

Editor 負責：

> 操作與呈現教材資料。

Editor 不負責重新建立：

- Database Schema（資料庫結構）
- API Contract（API 契約）
- AI Pipeline（AI 處理流程）
- AI Model（AI 模型）
- OCR Engine（OCR 引擎）

---

# 4. Data Responsibility

## 4.1 Page Data

Page（頁面）是 Editor 的基本編輯單位。

開啟 Page 時：

1. 讀取 Page Data（頁面資料）
2. 載入 Image Area
3. 載入 Text Area
4. 載入 HTML Overlay
5. Render Editor（呈現編輯器）

---

## 4.2 Image Data

Image Data（圖片資料）由 Image Area 管理。

正式資料結構依：

`05_Database_Design.md`

執行。

---

## 4.3 Text Data

Text Data（文字資料）由 Text Area 管理。

正式資料結構依 Database Design（資料庫設計）執行。

---

## 4.4 Interaction Data

Interaction Data（互動資料）由 HTML Overlay 管理。

Hotspot 屬於 Interaction Data。

Hotspot 不應直接變成 Image Asset（圖片資產）。

---

# 5. Editor Modes

## 5.1 Editor Mode

Editor Mode 用於：

- 編輯圖片
- 編輯文字
- 管理互動內容
- 管理頁面內容

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

> 使用同一份 Teaching Material Data（教材資料）。

Reading Mode 不建立第二份正式教材。

---

依 01_Product_Specification.md §7.1–§7.3（Book Library Entry Flow）已確認，進入 Editor Mode 目前有以下入口，並存不互相取代：

1. **新教材建立**：Book Library（「我的魔法書」）頂部固定的「創作魔法書」（或空教材庫時的快捷入口）→ 選擇先編輯圖片／文字 → 直接進入 Editor Mode（新教材尚無內容，僅提供編輯，不提供閱讀）。
2. **既有教材直接編輯**：Book Library → 選擇教材 → 打開魔法書 → 「編輯」入口 → 直接進入 Editor Mode。
3. **由閱讀進入編輯**：Reading Mode 提供 Edit Button（編輯按鈕），使用者可由 Reading Mode 進入 Editor Mode。此為原有規則，予以保留，不因入口 1、2 新增而移除。

三條入口最終皆進入同一個 Editor Mode，共用同一份教材資料（見 §5.3 Same Material），不建立第二套 Editor 架構。

Book Library 本身的入口導覽（Top Navigation、教材列表、Create Book 等）依 01_Product_Specification.md 與 02_MVP_Development.md 為準，不在本文件重複定義。

---

# 6. Page Editor

## 6.1 Page Loading

Page 開啟流程：

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

Page Editor 必須支援已核定的：

- Image
- Text
- Interaction

不得因 Editor Design 自行增加其他編輯功能。

---

## 6.3 Page Order

Page 排序與管理依：

- Product Specification
- Database Design
- API Design

執行。

Editor 不重新定義排序規則。

---

# 7. Image Area

## 7.1 Responsibility

Image Area（圖片區）負責：

- Image Import（圖片匯入）
- Image Display（圖片顯示）
- Image Replace（圖片替換）
- Image Delete（圖片刪除）
- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）

---

## 7.2 Image Area Does Not Handle

Image Area 不負責：

- Text Editing（文字編輯）
- HTML Interaction（HTML 互動）
- Hotspot Management（熱點管理）
- OCR Processing（OCR 處理）
- AI Pipeline（AI 流程）

---

## 7.3 Image Display

Image Area 顯示正式教材圖片。

圖片本身：

> 不等於互動層。

Hotspot 與 HTML Overlay 不應直接寫入原始圖片。

---

## 7.4 Image Replace

Image Replace 必須遵循正式：

Image Storage Rule（圖片儲存規則）。

Editor 不自行建立第二份永久教材資產。

---

## 7.5 Image Delete

Image Delete 必須遵循：

- Database Design
- API Design
- Product Specification

Editor 不自行建立另一套刪除規則。

---

# 8. Text Area

## 8.1 Responsibility

Text Area（文字區）是：

> Text-only Editing Area（純文字編輯區）。

---

## 8.2 Text Editing

Text Area 負責：

- Text Input（文字輸入）
- Text Editing（文字編輯）
- Text Save（文字儲存）

---

## 8.3 Text Area Does Not Handle

Text Area 不負責：

- Image Processing（圖片處理）
- PDF Processing（PDF 處理）
- OCR Processing（OCR 處理）
- Hotspot
- HTML Overlay

---

## 8.4 OCR Boundary

OCR Result（OCR 結果）由 AI / OCR Processing 負責。

OCR Result 不得未經使用者確認：

- 覆蓋 Text Area
- 覆蓋 Text Block（文字區塊）
- 取代原有文字

---

# 9. HTML Overlay

## 9.1 Responsibility

HTML Overlay（HTML 疊加層）是：

> Interactive Layer（互動層）。

---

## 9.2 Overlay Content

HTML Overlay 可承載：

- Hotspot
- Interactive Content（互動內容）

---

## 9.3 Material Separation

HTML Overlay 必須與 Original Teaching Material 分離。

Overlay 不直接修改：

- Original Image（原始圖片）
- Original PDF（原始 PDF）
- Original Text（原始文字）

---

## 9.4 Overlay Position

HTML Overlay 可以依教材顯示區域覆蓋於：

- Image
- PDF

Overlay 的位置資料必須與實際顯示座標一致。

---

# 10. Hotspot

## 10.1 Responsibility

Hotspot（熱點）屬於 Interaction Data。

Hotspot 不屬於 Image Asset 本身。

---

## 10.2 Hotspot Creation

Hotspot 可以由：

- Manual Interaction Creation（手動建立互動）
- AI Automation（AI 自動化）

產生。

---

## 10.3 Hotspot Interaction

Hotspot 被使用者點擊時，可觸發已核定的互動行為。

目前已確認的核心行為：

- 顯示對應文字
- 觸發裝置／瀏覽器語音功能

語音處理使用 Device / Browser TTS（裝置／瀏覽器文字轉語音）能力。

不在 Editor 內建立自製 TTS Engine（文字轉語音引擎）。

---

## 10.4 AI Generated Hotspot

AI Automation 產生 Hotspot 的正式流程：

Image Import
↓
Image Quality Check（圖片品質檢查）
↓
必要時 Auto Correction（自動修正）
↓
Re-Quality Check（再次品質檢查）
↓
OCR
↓
Text + Bounding Box（文字＋邊界框）
↓
Coordinate Transformation（座標轉換，必要時）
↓
Hotspot Generator（熱點產生器）
↓
HTML Overlay
↓
Hotspot

---

## 10.5 Coordinate Transformation

如果 Auto Correction 改變圖片幾何：

Processed Coordinates（處理後座標）
↓
Coordinate Transformation
↓
Final Display Coordinates（最終顯示座標）
↓
Hotspot

---

## 10.6 Reliable Failure

如果 AI Processing Result 不可靠：

> 不得建立猜測性 Hotspot。

PARTIAL（部分完成）或 FAIL（失敗）不得被當成 SUCCESS（成功）。

---

# 11. Image Import and Processing

## 11.1 Input Sources

Image Import（圖片匯入）可以取得：

- 使用者已拍攝照片
- Screenshot（截圖）
- Device-selected Image（裝置選取圖片）
- Device-selected File（裝置選取檔案）
- PDF

---

## 11.2 Device Capability

拍照使用：

> Device Existing Camera Capability（裝置既有相機能力）。

MagicBook 不建立專用 Camera System。

---

## 11.3 No Custom Camera

Editor 不建立：

- Camera Preview
- getUserMedia
- ImageCapture
- Exposure Control
- Focus Control
- HDR Control
- MagicBook Camera System

---

## 11.4 Import Flow

User obtains source
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

## 11.5 Processing Separation

Image Processing（圖片處理）產生的 Processed Image（處理後圖片）屬於處理資料。

除非使用者確認：

> 不得自動成為第二份正式 Image Asset。

---

# 12. AI Integration Boundary

## 12.1 Editor Responsibility

Editor 負責：

> 接收、呈現、整合已完成的 AI Processing Result。

---

## 12.2 AI Responsibility

AI Design 負責：

- AI Pipeline
- OCR
- AI Model
- AI Provider
- Quality Check
- Auto Correction
- Processing Job

Editor 不重新實作上述系統。

---

## 12.3 AI Result Is Not Material

必須維持：

> AI Result ≠ Original Teaching Material

AI 結果可以成為：

- Processing Data（處理資料）
- Interaction Data
- 待使用者確認的結果

但不得未經確認直接覆蓋正式教材。

---

## 12.4 Failure Handling

AI Processing 狀態至少必須能區分：

- Pending（等待）
- Processing（處理中）
- Completed（完成）
- Partial（部分完成）
- Failed（失敗）

Editor 必須正確呈現結果狀態。

---

# 13. Reading Mode Integration

## 13.1 Same Data

Editor 與 Reading Mode 使用同一份：

Teaching Material Data。

---

## 13.2 After Save

Editor 儲存後：

> Reading Mode 讀取相同教材資料。

不得產生第二份正式教材。

---

## 13.3 Interaction Consistency

Editor 建立或修改的：

- HTML Overlay
- Hotspot
- Interaction Data

儲存後必須能在 Reading Mode 正確呈現。

---

# 14. Material Protection

## 14.1 Original Material

以下行為不得未經確認破壞 Original Teaching Material：

- AI Processing
- OCR
- Hotspot
- HTML Overlay
- Preview
- Reading Mode

---

## 14.2 Data Separation

必須維持：

Image Data ≠ Text Data ≠ Interaction Data

例如：

Image ≠ Hotspot

Text ≠ Hotspot

---

## 14.3 Processing Data

Processing Data（處理資料）與正式 Teaching Material Data 分離。

處理結果不得因：

> Editor Save

而自動變成正式教材。

---

# 15. Editing Operations

## 15.1 Confirmed Operations

目前確認支援：

- Image Import
- Image Replace
- Image Delete
- Text Editing
- Hotspot Management
- Interaction Management
- Page Management

---

## 15.2 No Unapproved Features

Editor 不因實作便利自行增加：

- Advanced Image Editor
- Freehand Drawing
- Crop Tool
- Perspective Tool
- Shadow Removal Tool
- Handwriting Recognition Editor

除非未來正式 PM Decision（PM 決策）核定。

---

# 16. Save Behavior

## 16.1 Save Responsibility

Editor Save（儲存）必須保存使用者已確認的教材變更。

---

## 16.2 Data Separation

儲存時保持：

- Image Data
- Text Data
- Interaction Data

各自責任分離。

---

## 16.3 AI Processing Data

AI Processing Data 不因 Save 自動成為正式教材。

---

## 16.4 Save API

實際 Save API 依：

`06_API_Design.md`

執行。

Editor 不重新定義 API Contract。

---

# 17. Delete Behavior

## 17.1 Material Delete

教材刪除遵循：

- Product Specification
- Database Design
- API Design

Editor 不自行改寫刪除規則。

---

## 17.2 Folder Delete

Folder Delete 依正式 Database / API 規則。

Editor 只負責：

> 呈現規則 + 呼叫正式 API。

---

# 18. Background Processing

## 18.1 Required Background Work

可能需要 Background Processing 的工作包括：

- Image Processing
- OCR
- AI Processing
- Compression
- Optimization
- 其他耗時處理

---

## 18.2 UI Behavior

Background Processing 不應造成 Editor 長時間 Freeze（凍結）。

使用者仍應能看到目前處理狀態。

---

## 18.3 Processing Job

Processing Job（處理工作）至少包含：

- Job Status（工作狀態）
- Source Resource（來源資源）
- Processing Type（處理類型）
- User Account Context（使用者帳戶上下文）

正式資料結構依既有 Database / API Design。

---

# 19. Loading and Processing States

## 19.1 User Feedback

耗時工作需要清楚呈現：

- Loading State（載入狀態）
- Processing State（處理狀態）
- Completed State（完成狀態）
- Failed State（失敗狀態）

---

## 19.2 User-facing Information

一般使用者不需要看到：

- AI Model
- AI Provider
- Internal Algorithm（內部演算法）
- Quality Metric（品質指標）
- Internal Confidence（內部信心值）

主要流程呈現：

Import
↓
Processing
↓
Result

---

# 20. Performance

## 20.1 Core Performance Principles

Editor 必須遵循：

- Background Processing
- Optimization
- Compression
- Caching
- Minimum Necessary Processing

---

## 20.2 Caching

Caching（快取）應避免：

- 重複載入相同資料
- 重複處理相同資源
- 不必要的重新計算

Cache 不得取代正式資料來源。

---

## 20.3 No Unnecessary Processing

使用者開啟 Editor 時，不得因為載入 Editor 就重新執行：

- OCR
- AI
- Denoise（降噪）
- Compression
- Optimization

除非該處理確實必要。

---

## 20.4 Image Processing

圖片處理應優先：

> 一次處理、必要時處理、結果可重用。

---

## 20.5 Technical Evidence

已知技術測試資料：

- Denoise 約 1360ms / image
- Sharpen 約 16ms / image

上述屬於 Technical Evidence（技術證據）。

不是 Editor SLA（服務等級承諾）。

---

# 21. Security and User Account Isolation

## 21.1 User Account Isolation

Editor 只能操作目前登入 User Account（使用者帳戶）自己所擁有的教材資料（Book Library → Folder → Book → Lesson → Page）。

User Data Isolation（使用者資料隔離）取代舊版 Workspace Isolation，作為 Editor 現行的資料隔離邊界。

---

## 21.2 Permission

Editor 權限依：

User Permission（使用者權限）
+
API Authorization（API 授權）

執行，以已驗證的 User Account Identity 與 Resource Ownership（資源所有權）為基礎，對齊 06_API_Design 的 API Authorization 規則。

---

## 21.3 No Cross Account Access

Editor 不得：

- 讀取其他 User Account 的教材資料
- 修改其他 User Account 的教材資料
- 建立跨 User Account 的 Hotspot
- 使用其他 User Account 的 AI Processing Data

---

## 21.4 User Account Boundary

User Account 不代表可以直接取得所有教材資料——僅代表可以取得**該 User Account 自己擁有**的教材資料。

所有資料存取必須經過：

> User Permission + API Authorization

---

# 22. Development Boundaries

## 22.1 No Camera System

Editor 不建立 Camera System。

---

## 22.2 No Custom OCR

Editor 不建立 OCR Engine。

---

## 22.3 No AI Provider Lock-in

Editor 不直接綁定特定 AI Provider（AI 服務供應商）。

例如：

- GPT
- Gemini
- Claude
- OpenRouter
- Google Cloud Vision

Provider 的正式管理依 AI Design / API Design。

---

## 22.4 No New Image Editor

Editor 不自行擴充成完整 Image Editor。

---

## 22.5 No Scope Expansion

Editor Design 不自行新增：

- 新產品功能
- 新資料模型
- 新 API
- 新 Database Schema
- 新 AI Pipeline
- 新 Camera System

---

# 23. Reuse Before Reinvent

## 23.1 Capability Check

新增 Editor Capability（編輯器能力）前：

OS
↓
Browser
↓
HTML / CSS / JavaScript
↓
Open Source Library
↓
Third-party Tool / Service
↓
Custom Development

---

## 23.2 Existing Capability

如果既有技術已能完成需求：

> 優先使用既有技術。

---

## 23.3 No Premature Custom System

不得因為「未來可能需要」而提前建立：

- Custom Editor Framework
- Custom Image Editor
- Custom Camera System
- Custom OCR
- Custom Interaction Engine

---

# 24. Testing and Validation

## 24.1 Core Testing

必須確認：

- Data Correctness（資料正確性）
- Material Protection（教材保護）
- Image / Text Separation（圖片／文字分離）
- Interaction Separation（互動分離）
- AI Result Integration（AI 結果整合）
- Save Behavior
- Delete Behavior
- User Account Isolation
- Caching Behavior
- Background Processing Behavior

---

## 24.2 Image Area Testing

測試：

- Image Import
- Image Replace
- Image Delete
- Image Optimization
- Image Compression

---

## 24.3 Text Area Testing

測試：

- Text Input
- Text Editing
- Save
- Reload

並確認：

> OCR 不會未經確認覆蓋 Text Area。

---

## 24.4 Hotspot Testing

測試：

- Manual Hotspot
- AI-generated Hotspot
- Coordinate Transformation
- HTML Overlay
- Reading Mode Display

---

## 24.5 AI Failure Testing

確認：

- PARTIAL 不標記為 SUCCESS
- FAIL 不建立猜測性 Hotspot
- Provider Failure 不破壞教材
- Processing Image 不形成第二份正式教材
- OCR Result 不自動覆蓋 Text Area

---

## 24.6 User Account Isolation Testing

確認：

- User Account A 無法讀取 User Account B 的教材資料
- User Account A 無法修改 User Account B 的教材資料
- AI Processing Data 不跨 User Account
- Hotspot 不跨 User Account
- API Authorization 正常運作

---

# 25. Completion Criteria

## 25.1 Core Editor

- [ ] Book / Lesson / Page 可進入 Editor
- [ ] Page 可正常載入
- [ ] Image Area 可正常使用
- [ ] Text Area 可正常使用
- [ ] HTML Overlay 可正常使用
- [ ] Hotspot 可正常使用
- [ ] Editor / Reading Mode 使用同一份教材資料

---

## 25.2 Image

- [ ] Image Import
- [ ] Image Replace
- [ ] Image Delete
- [ ] Image Optimization
- [ ] Image Compression
- [ ] Caching
- [ ] No Custom Camera System

---

## 25.3 AI Integration

- [ ] Quality Check Result 可正確處理
- [ ] Auto Correction Result 可正確進入後續流程
- [ ] Re-Quality Check Result 可正確反映
- [ ] OCR Result 可提供 Text + Bounding Box
- [ ] Coordinate Transformation 正確
- [ ] Hotspot Generator Result 可建立互動
- [ ] AI Failure 狀態正確

---

## 25.4 Protection

- [ ] Original Teaching Material 不被 AI Processing 直接覆蓋
- [ ] Processing Image 不形成第二份正式教材
- [ ] OCR 不自動覆蓋 Text Area
- [ ] User Account Isolation 正常
- [ ] User Permission 正常
- [ ] API Authorization 正常

---

## 25.5 Global Processing

- [ ] Optimization
- [ ] Compression
- [ ] Caching
- [ ] Background Processing

均不得被新 Editor 功能遺漏。

---

# 26. Change Control

## 26.1 PM Review

任何影響以下項目的變更：

- Editor Scope
- Data Responsibility
- User Flow
- Image Area
- Text Area
- HTML Overlay
- Hotspot
- AI Integration
- User Account Isolation

必須先進行 PM Review。

---

## 26.2 Specification First

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

## 26.3 Engineer-first Change Prohibited

如果工程師發現：

> 實作上需要新的 Editor 功能

不得直接新增。

必須：

1. 回報
2. PM Review
3. 確認 Scope
4. 更新正式文件
5. 再 Development

---

## 26.4 Full Consistency Review

Editor Design 更新後，必須檢查：

- Product Specification
- MVP Development
- Roadmap
- Development Guidelines
- Database Design
- API Design
- AI Design
- Editor Design

確認：

> 不得產生跨文件矛盾。

---

# 27. Change Log

## Version 1.5

Status: Draft

Last Update: 2026-08-16

同步 01_Product_Specification v3.5、02_MVP_Development v3.1 已正式確認的 Book Library Entry Flow 決策。

§5.4 Edit Entry 修正：移除「Reading Mode 的 Edit Button 為進入 Editor Mode 的單一入口」之描述，改為記錄目前已確認、並存的三條入口——新教材建立（創作魔法書 → 選擇圖片／文字）、既有教材直接編輯（打開魔法書 → 編輯）、由閱讀進入編輯（Reading Mode Edit Button，原有規則保留）。三條入口共用同一份教材資料，不建立第二套 Editor 架構，不新增 Database Schema 或 API 契約。

本版本不變更 Editor Scope（§2）、Content Structure（§3）、Data Responsibility（§4）或 Page／Image Area／Text Area 既有規則。


## Version 1.4

Status: Draft

Last Update: 2026-08-14

本版本同步 01_Product_Specification v3.4、02_MVP_Development v3.0、05_Database_Design v2.0、06_API_Design v2.0、09_UI_Design v2.0、11_MVP_Task_List v2.3 已正式確認的 Account／Billing 架構調整。

本版本僅同步已確認的跨文件規格，不新增產品功能、不新增資料模型、不擴大 Editor Scope。

正式移除：

- Workspace 作為教材資料歸屬層級
- Workspace Isolation 作為安全／權限架構

正式改為：

- §3.1 Content Structure：教材結構改為 User Account → Book Library → Folder → Book → Lesson → Page
- §18.3 Processing Job：Workspace Context 改為 User Account Context
- §21 章名改為「Security and User Account Isolation」；21.1–21.4 改以 User Account Isolation（User Permission + API Authorization）表達，原有的資料隔離／安全要求本身予以保留，僅替換基礎架構用詞
- §24.6 章名改為「User Account Isolation Testing」，測試項目改為驗證 User Account 之間的資料隔離
- §25.4、§26.1 相關檢查項目同步更新為 User Account Isolation

本次修正不影響 Editor 既有功能範圍、不新增 API、不新增 Database Schema。

Version 1.2／1.3 之 Workspace Isolation 相關內容為歷史紀錄，予以保留，不代表現行架構。

---

## Version 1.3

Status: Draft

Last Update: 2026-08-09

本版本重新整理整份 Editor Design。

本版本重點：

- 移除重複的 Image Import 定義
- 統一 Image Area 責任
- 統一 Text Area 責任
- 統一 HTML Overlay 責任
- 統一 Hotspot 流程
- 統一 AI Integration Boundary
- 統一 Material Protection
- 統一 Workspace Isolation
- 統一 User Permission 與 API Authorization 邏輯
- 統一 Background Processing
- 加入系統共同的 Caching 要求
- 統一 Optimization / Compression 要求
- 統一 Editor / Reading Mode Same Data Model
- 統一 Reuse Before Reinvent
- 移除未核定的 Editor 擴充方向
- 重新整理 Testing / Completion Criteria
- 重新整理 Change Control
- 保留既有已確認功能
- 不新增未核定產品功能
- 不新增 API
- 不新增 Database Schema
- 不重新定義 AI Provider
- 不建立 Camera System
- 不建立 Custom OCR
- 不建立 Advanced Image Editor

---

## Version 1.2

Status: Draft

原版本。

本版本包含：

- Editor Architecture
- Image Area
- Text Area
- HTML Overlay
- Hotspot
- AI Automation Integration
- Material Protection
- Background Processing
- Workspace Isolation
- Testing
- Completion Criteria

---

## Version 1.1

Status: Draft

同步 Hotspot Coordinate Transformation 與 AI Automation 流程。

---

## Version 1.0

Status: Draft

建立 MagicBook 3.0 Editor Design 基礎文件。

---

# END OF DOCUMENT
