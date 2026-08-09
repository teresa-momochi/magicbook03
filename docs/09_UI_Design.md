# MagicBook 3.0 UI Design

Version: 1.0

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-09

---

# Table of Contents

1. UI Design Purpose
2. UI Design Principles
3. UI Architecture
4. Workspace UI
5. Book Library UI
6. Folder UI
7. Book UI
8. Lesson UI
9. Page UI
10. Editor UI
11. Image Area UI
12. Text Area UI
13. HTML Overlay UI
14. Hotspot UI
15. Context Toolbar UI
16. Reading Mode UI
17. Default Popup UI
18. Dictionary UI
19. AI UI
20. Audio UI
21. Video UI
22. Navigation UI
23. Global Search UI
24. Save UI
25. Background Processing UI
26. Loading UI
27. AI Automation Result UI
28. Workspace Isolation UI
29. Error and Failure UI
30. UI Interaction Rules
31. Performance UI Rules
32. Reuse Before Reinvent
33. MVP UI Scope
34. UI No-Scope
35. UI Consistency Checklist
36. Change Log

---

# 1. UI Design Purpose

## 1.1 Purpose

本文件定義 MagicBook 3.0 的：

UI Design（使用者介面設計）

本文件負責整理：

- UI Structure（介面結構）
- UI Components（介面元件）
- UI Interaction（介面操作）
- UI Navigation（介面導覽）
- UI State（介面狀態）
- UI Responsibility（介面責任）

本文件不重新定義產品功能。

產品功能以：

`01_Product_Specification.md`

為準。

MVP 範圍以：

`02_MVP_Development.md`

為準。

開發順序以：

`03_Roadmap.md`

為準。

工程共通規則以：

`04_Development_Guidelines.md`

為準。

資料結構以：

`05_Database_Design.md`

為準。

API 行為以：

`06_API_Design.md`

為準。

AI Automation（AI 自動化）流程以：

`07_AI_Design.md`

為準。

Editor（編輯器）行為以：

`08_Editor_Design.md`

為準。

---

# 2. UI Design Principles

## 2.1 Teaching Material First

Teaching Material（教材）永遠是 UI 的核心。

UI 不應遮蔽教材。

UI 不應破壞教材原貌。

所有互動功能皆建立於教材之上。

---

## 2.2 Consistent User Experience

所有模組應使用一致的：

- Selection（選取）
- Toolbar（工具列）
- Popup（彈窗）
- Navigation（導覽）
- Save（儲存）
- Loading（載入）
- Background Processing（背景處理）

不得因不同模組而建立完全不同的操作方式。

---

## 2.3 Clear Responsibility

UI 必須保持：

Image Area（圖片區）

與：

Text Area（文字區）

與：

HTML Overlay（HTML 疊加層）

的責任分離。

Image Area（圖片區）負責圖片。

Text Area（文字區）負責文字。

HTML Overlay（HTML 疊加層）負責互動。

---

## 2.4 Same Data Model

Editor Mode（編輯模式）與 Reading Mode（閱讀模式）使用同一份：

Teaching Material Data（教材資料）。

UI 不建立另一份 Reading Mode 專用教材資料。

---

## 2.5 Protect Original Material

UI 操作不得直接破壞：

- Original Teaching Material（原始教材）
- Image Asset（圖片資產）
- Text Content（文字內容）
- Page Structure（頁面結構）

Interaction Data（互動資料）與教材資料保持分離。

---

## 2.6 Background Processing

耗時工作使用：

Background Processing（背景處理）。

背景處理不得造成：

- UI Freeze（介面凍結）
- 操作中斷
- 使用者誤認系統停止

---

## 2.7 Reuse Before Reinvent

UI Capability（介面能力）優先使用：

1. OS / Device Existing Capability（作業系統／裝置既有能力）
2. Browser Existing Capability（瀏覽器既有能力）
3. HTML / CSS / JavaScript Native Capability（原生能力）
4. Mature Open Source Library（成熟開源函式庫）
5. Mature Third-party Tool / Service（成熟第三方工具／服務）
6. Custom Development（自行開發）

---

# 3. UI Architecture

## 3.1 Overall Structure

MagicBook UI Architecture（介面架構）：

Workspace（工作空間）

↓

Book Library（教材庫）

↓

Folder（資料夾，可選）

↓

Book（教材）

↓

Lesson（課程）

↓

Page（頁面）

↓

Image Area（圖片區）

+

Text Area（文字區）

+

HTML Overlay（HTML 疊加層）

↓

Hotspot（熱點）

↓

Popup（彈窗）

↓

Dictionary / AI / Audio / Video / Navigation

---

## 3.2 Page UI Structure

Page（頁面）是 Editor（編輯器）與 Reading Mode（閱讀模式）的核心 UI 單位。

Page UI 包含：

- Image Area（圖片區）
- Text Area（文字區）
- HTML Overlay（HTML 疊加層）

三者保持責任分離。

---

## 3.3 Interaction Layer

HTML Overlay（HTML 疊加層）為：

Interaction Layer（互動層）。

HTML Overlay 可以承載：

- Hotspot（熱點）
- Interactive Object（互動物件）
- Popup（彈窗）

互動資料不得直接修改教材底圖。

---

# 4. Workspace UI

## 4.1 Workspace Purpose

Workspace（工作空間）為最高層級的資料與權限邊界。

支援：

- Personal Workspace（個人工作空間）
- Organization Workspace（組織工作空間）

---

## 4.2 Workspace Entry

使用者登入後：

Authentication（身分驗證）

↓

Workspace（工作空間）

↓

Book Library（教材庫）

Workspace UI 必須先確認目前使用者所屬的 Workspace。

---

## 4.3 Workspace Isolation

UI 只能顯示目前使用者有權限存取的：

Workspace Data（工作空間資料）。

不同 Workspace：

- 不顯示其他 Workspace 教材
- 不顯示其他 Workspace 使用者
- 不顯示其他 Workspace 權限資料
- 不使用其他 Workspace Processing Data（處理資料）

---

# 5. Book Library UI

## 5.1 Purpose

Book Library（教材庫）為教材管理入口。

主要 UI 責任：

- Book Discovery（教材尋找）
- Book Management（教材管理）
- Folder Management（資料夾管理）
- Book Navigation（教材導覽）

---

## 5.2 Library Structure

Book Library 可以包含：

- Root Book（根目錄教材）
- Folder（資料夾）

Book 不一定需要位於 Folder。

---

## 5.3 Book Actions

Book Library 應支援目前已確認的 Book 操作：

- Create Book（建立教材）
- Rename Book（重新命名教材）
- Duplicate Book（複製教材）
- Delete Book（刪除教材）
- Open Book（開啟教材）
- Move Book（移動教材）

---

# 6. Folder UI

## 6.1 Folder Purpose

Folder（資料夾）是教材組織工具。

Folder 不是教材內容。

---

## 6.2 Folder Actions

目前已確認：

- Create Folder（建立資料夾）
- Rename Folder（重新命名資料夾）
- Delete Folder（刪除資料夾）
- Move Folder（移動資料夾）
- Reorder Folder（重新排序資料夾）
- Nested Folder（巢狀資料夾）
- Drag & Drop Sorting（拖曳排序）

---

## 6.3 Folder Delete Rule

Folder 只有在：

完全為空

時才能刪除。

如果 Folder 內仍有：

- Book（教材）
- Child Folder（子資料夾）

則：

Delete Folder（刪除資料夾）禁止執行。

不得：

- Cascade Delete（級聯刪除）
- 自動搬移 Book
- 自動搬移 Child Folder

UI 必須在刪除前確認 Folder 是否為空。

---

# 7. Book UI

## 7.1 Book Purpose

Book（教材）是主要教材單位。

Book UI 主要負責：

- 開啟教材
- 管理 Lesson（課程）
- 進入 Reading Mode（閱讀模式）
- 進入 Editor（編輯器）

---

## 7.2 Book Structure

Book：

↓

Lesson

↓

Page

---

## 7.3 Open Book

使用者開啟 Book 後進入其教材內容。

Reading Flow（閱讀流程）：

Book Library

↓

Open Book

↓

Reading Mode

---

# 8. Lesson UI

## 8.1 Lesson Purpose

Lesson（課程）為 Book 內的教學單位。

Lesson 主要用於組織 Page（頁面）。

---

## 8.2 Lesson Actions

目前已確認：

- Create Lesson（建立課程）
- Rename Lesson（重新命名課程）
- Delete Lesson（刪除課程）
- Reorder Lesson（重新排序課程）

---

## 8.3 Default Lesson

MVP 可以使用：

Default Lesson（預設課程）。

建立 Book 時可以建立 Default Lesson。

---

# 9. Page UI

## 9.1 Page Purpose

Page（頁面）是實際教材內容的主要 UI 單位。

---

## 9.2 Page Actions

目前已確認：

- Add Page（新增頁面）
- Delete Page（刪除頁面）
- Duplicate Page（複製頁面）
- Reorder Page（重新排序頁面）
- Page Navigation（頁面導覽）

---

## 9.3 Page Content

Page 可以包含：

- Image Area（圖片區）
- Text Area（文字區）
- HTML Overlay（HTML 疊加層）

---

# 10. Editor UI

## 10.1 Editor Purpose

Editor（編輯器）用於：

- 編輯教材
- 編輯圖片
- 編輯文字
- 管理互動內容

---

## 10.2 Editor Structure

Editor UI：

Page

↓

Image Area

+

Text Area

+

HTML Overlay

---

## 10.3 Editor Mode

Editor Mode（編輯模式）提供目前已確認的：

- Image Editing（圖片編輯）
- Text Editing（文字編輯）
- Interaction Management（互動管理）

不自行增加未核定的 Editor Feature（編輯器功能）。

---

## 10.4 Page Loading

開啟 Page 時：

Page Data（頁面資料）

↓

Load Image Area（載入圖片區）

↓

Load Text Area（載入文字區）

↓

Load HTML Overlay（載入 HTML 疊加層）

↓

Render Editor（呈現編輯器）

---

# 11. Image Area UI

## 11.1 Responsibility

Image Area（圖片區）負責：

- Image Import（圖片匯入）
- Image Display（圖片顯示）
- Image Replace（圖片替換）
- Image Delete（圖片刪除）
- Image Optimization（圖片最佳化）
- Image Compression（圖片壓縮）

---

## 11.2 Supported Input

目前確認的 Image Import（圖片匯入）來源：

- PNG
- JPG
- JPEG
- PDF
- Device Photo（裝置拍攝照片）
- Screenshot（截圖）
- Device File Selection（裝置檔案選取）

---

## 11.3 Camera Boundary

MagicBook 不建立：

- Camera System（相機系統）
- Camera Preview（相機預覽）
- getUserMedia
- ImageCapture
- Exposure Control（曝光控制）
- Focus Control（對焦控制）

拍照由裝置既有相機完成。

MagicBook 從：

Image Import（圖片匯入）

開始負責。

---

# 12. Text Area UI

## 12.1 Responsibility

Text Area（文字區）是：

Text-only Editing Area（純文字編輯區）。

---

## 12.2 Text Actions

目前確認：

- Add Text Block（新增文字區塊）
- Edit Text Block（編輯文字區塊）
- Delete Text Block（刪除文字區塊）
- Reorder Text Block（重新排序文字區塊）

---

## 12.3 Text Boundary

Text Area 不負責：

- OCR（光學字元辨識）
- PDF Processing（PDF 處理）
- Image Processing（影像處理）

---

## 12.4 OCR Result Boundary

OCR Result（OCR 結果）不得直接視為正式 Text Block（文字區塊）。

OCR Result 與正式教材文字資料保持責任分離。

---

# 13. HTML Overlay UI

## 13.1 Purpose

HTML Overlay（HTML 疊加層）是：

Interactive Layer（互動層）。

---

## 13.2 Overlay Content

HTML Overlay 可以承載：

- Hotspot（熱點）
- Interactive Object（互動物件）
- Popup（彈窗）

---

## 13.3 Overlay Boundary

HTML Overlay 不直接修改：

Original Teaching Material（原始教材）。

教材底圖與互動資料保持分離。

---

## 13.4 Object Selection

HTML Overlay 支援互動物件的：

Object Selection（物件選取）。

目前確認的 Hotspot（熱點）操作包括：

- Add（新增）
- Edit（編輯）
- Delete（刪除）
- Move（移動）
- Resize（調整大小）
- Save（儲存）

---

# 14. Hotspot UI

## 14.1 Purpose

Hotspot（熱點）是教材上的互動區域。

基本流程：

User Clicks Hotspot（使用者點擊熱點）

↓

Default Popup（預設彈窗）

---

## 14.2 Hotspot Properties

Hotspot 至少需要表達：

- Position（位置）
- Size（尺寸）
- Properties（屬性）
- Actions（動作）
- Interaction State（互動狀態）

---

## 14.3 Hotspot Editing

Editor Mode 中可以：

- Add Hotspot（新增熱點）
- Edit Hotspot（編輯熱點）
- Delete Hotspot（刪除熱點）
- Move Hotspot（移動熱點）
- Resize Hotspot（調整熱點大小）
- Save Hotspot（儲存熱點）

---

## 14.4 Hotspot and Material

Hotspot 屬於：

HTML Overlay（HTML 疊加層）。

Hotspot 不屬於：

Image Asset（圖片資產）。

---

# 15. Context Toolbar UI

## 15.1 Purpose

Context Toolbar（共用浮動工具列）為全系統共用操作工具。

---

## 15.2 Toolbar Behavior

目前已確認：

- 自動顯示
- 自動隱藏
- 可拖曳
- 可停靠

目的：

保持教材畫面乾淨。

---

## 15.3 Reading Mode Tools

Reading Mode（閱讀模式）中，Context Toolbar 可以開啟：

- Dictionary（字典）
- AI
- Audio（音訊）
- Video（影片）
- Image（圖片）
- URL
- Navigation（導覽）

---

## 15.4 Editor Usage

Editor（編輯器）中的操作應使用既有：

Context Toolbar（共用浮動工具列）

而不是為每個功能建立另一套完全不同的工具列。

---

# 16. Reading Mode UI

## 16.1 Purpose

Reading Mode（閱讀模式）用於：

- 閱讀
- 查閱
- 理解
- 互動
- 播放

Reading Mode 不提供教材編輯能力。

---

## 16.2 Reading Flow

Reading Mode：

Open Book

↓

Reading Mode

↓

Click Hotspot

↓

Default Popup

↓

Context Toolbar

↓

Dictionary / AI / Audio / Video

↓

Continue Reading

---

## 16.3 Edit Button

Reading Mode 已確認存在：

單一 Edit Button（編輯按鈕）。

使用者可以由 Reading Mode 進入：

Editor Mode（編輯模式）。

---

## 16.4 Same Material

Reading Mode 與 Editor Mode 使用：

Same Teaching Material Data（同一份教材資料）。

Reading Mode 不建立第二份教材。

---

# 17. Default Popup UI

## 17.1 Purpose

Default Popup（預設彈窗）為 Hotspot（熱點）的快速閱讀介面。

---

## 17.2 Trigger

User Clicks Hotspot

↓

Default Popup

---

## 17.3 Default Content

目前確認的預設內容：

- Chinese（中文）
- KK
- Pronunciation（發音）

---

## 17.4 Additional Tools

需要更多功能時：

Default Popup

↓

Context Toolbar

↓

Dictionary / AI / Audio / Video

---

# 18. Dictionary UI

## 18.1 Purpose

Dictionary（字典）是：

Lookup Tool（查閱工具）。

---

## 18.2 Dictionary Content

提供：

- Word（單字）
- Chinese（中文）
- KK
- Pronunciation（發音）
- Example（例句）
- AI Assistance（AI 輔助）

---

## 18.3 Dictionary Boundary

Dictionary 僅供查閱。

目前確認：

不提供收藏功能。

Dictionary Provider（字典服務供應商）可以替換。

---

# 19. AI UI

## 19.1 Purpose

AI 是：

Teaching Material Assistance Tool（教材輔助工具）。

AI 不是教材本身。

---

## 19.2 AI UI

目前產品規格確認的 AI UI 包括：

- AI Panel（AI 面板）
- Prompt Manager（提示管理器）
- Conversation（對話）
- History（歷史紀錄）
- AI Settings（AI 設定）

---

## 19.3 AI Provider

AI Provider（AI 服務供應商）採：

Replaceable Provider Architecture（可替換服務架構）。

UI 不應綁定特定 AI Provider。

---

## 19.4 AI Result

AI Result（AI 結果）與：

Original Teaching Material（原始教材）

保持分離。

需要使用者確認的內容，不得因 UI 實作方便而自動寫入正式教材。

---

# 20. Audio UI

## 20.1 Purpose

Audio（音訊）提供教材發音。

---

## 20.2 Audio UI

目前確認：

- Audio Player（音訊播放器）
- Audio Source（音訊來源）
- Audio Settings（音訊設定）

---

## 20.3 Provider

Audio Provider（音訊服務供應商）可以替換。

Audio 不應改變教材資料。

---

# 21. Video UI

## 21.1 Purpose

Video（影片）提供教材相關影片內容。

---

## 21.2 Video UI

目前確認：

- Video Player（影片播放器）
- Video Source（影片來源）
- Video Settings（影片設定）

---

## 21.3 Provider

Video Provider（影片服務供應商）可以替換。

Video 不應改變教材資料。

---

# 22. Navigation UI

## 22.1 Purpose

Navigation（導覽）為全系統共用導覽功能。

---

## 22.2 Reading Mode Navigation

Reading Mode 提供：

- Previous Page（上一頁）
- Next Page（下一頁）
- Back to Lesson（返回課程）
- Back to Book（返回教材）
- Home（首頁）

---

## 22.3 Navigation Principle

Navigation 應保持一致操作流程。

不同頁面不應建立完全不同的導覽邏輯。

---

# 23. Global Search UI

## 23.1 Purpose

Global Search（全域搜尋）為系統共用搜尋功能。

---

## 23.2 Search Entry

Global Search 使用：

Floating Search Toolbar（浮動搜尋工具列）。

目前產品規格確認其位置為：

右上角。

---

## 23.3 Search Boundary

Global Search 應維持全系統共用。

不同模組不應自行建立另一套搜尋入口。

---

# 24. Save UI

## 24.1 Purpose

Save（儲存）為共用系統服務。

---

## 24.2 Save Principle

Editor（編輯器）中的正式資料變更必須透過正式：

Save（儲存）

流程保存。

---

## 24.3 Same Data

Editor 儲存後：

Reading Mode

應讀取相同的：

Teaching Material Data（教材資料）。

---

## 24.4 Interaction Data

Interaction Data（互動資料）與 Material Data（教材資料）保持分離。

例如：

Image

≠

Hotspot

Text

≠

Hotspot

---

# 25. Background Processing UI

## 25.1 Purpose

Background Processing（背景處理）用於耗時工作。

---

## 25.2 UI Principle

背景工作不得造成：

- UI Freeze（介面凍結）
- 操作中斷
- 系統停止錯覺

---

## 25.3 User Experience

使用者主要看到：

Import（匯入）

↓

Processing（處理中）

↓

Result（結果）

而不是內部工程細節。

---

# 26. Loading UI

## 26.1 Brand Loading Animation

系統需要等待時使用：

Brand Loading Animation（品牌載入動畫）。

---

## 26.2 Loading Principle

Loading UI（載入介面）應讓使用者理解：

系統正在處理。

不得讓使用者誤認：

系統停止。

---

## 26.3 Internal Details

一般使用者不需要看到：

- Model（模型）
- Provider（服務供應商）
- Algorithm（演算法）
- Quality Metric（品質指標）
- Confidence（信心分數）

等內部工程細節。

---

# 27. AI Automation Result UI

## 27.1 Official Flow

AI Automation（AI 自動化）與 Editor（編輯器）的正式流程：

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

Hotspot Generator（熱點產生器）

↓

HTML Overlay（HTML 疊加層）

↓

Hotspot（熱點）

---

## 27.2 Editor Boundary

Editor 負責：

接收已完成的 AI Automation Result（AI 自動化結果）

並：

- 呈現結果
- 整合結果

Editor 不重新實作：

AI Automation Pipeline（AI 自動化流程）。

---

## 27.3 Processing State

如果 AI Automation Result 為：

- PARTIAL（部分完成）
- FAIL（失敗）

UI 不得顯示為：

SUCCESS（成功）。

---

## 27.4 User Control

需要使用者確認的內容：

不得自動寫入正式教材資料。

---

# 28. Workspace Isolation UI

## 28.1 Scope

Editor（編輯器）只能操作：

目前 Workspace 已授權的教材。

---

## 28.2 Permission

Editor UI 權限依：

Workspace（工作空間）

+

User Permission（使用者權限）

+

API Authorization（API 授權）

執行。

---

## 28.3 Cross Workspace Boundary

不得透過 UI：

- 讀取其他 Workspace
- 修改其他 Workspace
- 建立跨 Workspace Hotspot
- 使用其他 Workspace AI Processing Data

---

# 29. Error and Failure UI

## 29.1 General Principle

UI 必須如實反映實際處理狀態。

不得將：

FAIL

顯示為：

SUCCESS。

---

## 29.2 AI Failure

AI Automation 發生：

PARTIAL

或：

FAIL

時：

UI 必須保持實際狀態。

不得假裝結果完整成功。

---

## 29.3 Processing Failure

Background Processing（背景處理）失敗時：

UI 應顯示實際失敗狀態。

不得將未完成資料視為正式完成資料。

---

## 29.4 Material Protection

即使 Processing（處理）失敗：

不得因此建立第二份正式教材資產。

---

# 30. UI Interaction Rules

## 30.1 Selection First

需要操作物件時：

先：

Selection（選取）

再：

Action（操作）。

---

## 30.2 Shared Interaction Pattern

不同模組應盡可能使用：

Selection

↓

Context Toolbar

↓

Action

的共同操作邏輯。

---

## 30.3 Do Not Mix Responsibilities

不得讓：

Image Area

處理：

Text Area

的責任。

不得讓：

Text Area

處理：

Image Area

的責任。

不得讓：

HTML Overlay

直接修改：

Original Teaching Material。

---

## 30.4 Do Not Create Duplicate Material

任何 UI 操作不得因方便而建立：

Second Teaching Material Copy（第二份教材副本）。

---

## 30.5 Reading Mode Boundary

Reading Mode：

只負責：

- 閱讀
- 查閱
- 理解
- 互動
- 播放

不提供教材編輯能力。

---

# 31. Performance UI Rules

## 31.1 Background Processing

耗時工作使用：

Background Processing（背景處理）。

---

## 31.2 Minimum Necessary Processing

不要因為使用者開啟 Editor，就重新執行所有：

- OCR
- AI
- Denoise（降噪）
- Compression（壓縮）
- Optimization（最佳化）

只有必要時才執行。

---

## 31.3 Image Processing

Image Optimization（圖片最佳化）與：

Image Compression（圖片壓縮）

應避免不必要的重複處理。

---

## 31.4 UI Responsiveness

Background Processing 不得造成：

UI Freeze（介面凍結）。

---

# 32. Reuse Before Reinvent

## 32.1 UI Development Order

任何新的 UI Capability（介面能力）應先確認：

OS / Device

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

## 32.2 No Premature Custom System

不得因為「未來可能需要」而提前建立：

- Custom Editor Framework（自製編輯器框架）
- Custom Image Editor（自製圖片編輯器）
- Custom Camera System（自製相機系統）
- Custom OCR（自製 OCR）
- Custom Interaction Engine（自製互動引擎）

---

# 33. MVP UI Scope

## 33.1 Confirmed MVP UI

MVP UI 包含目前已確認的：

### Workspace

- Workspace UI
- Workspace Isolation
- Permission-aware UI

### Book Library

- Book Library UI
- Folder UI
- Book UI

### Book Structure

- Lesson UI
- Page UI

### Editor

- Editor Mode
- Image Area
- Text Area
- HTML Overlay
- Hotspot
- Context Toolbar

### Reading

- Reading Mode
- Edit Button
- Default Popup
- Context Toolbar
- Navigation

### Tools

- Dictionary
- AI
- Audio
- Video
- Global Search

### System

- Save
- Background Processing
- Brand Loading Animation
- Error / Failure State

---

# 34. UI No-Scope

## 34.1 No New Product Features

本文件不得自行新增：

- 新產品功能
- 新資料模型
- 新 API
- 新 Database Schema
- 新 AI Pipeline
- 新 Camera System

---

## 34.2 No Custom Camera

MagicBook 不建立：

Custom Camera System（自製相機系統）。

---

## 34.3 No Custom OCR

Editor 不建立：

Custom OCR Engine（自製 OCR 引擎）。

---

## 34.4 No AI Provider Lock-in

UI 不直接綁定特定：

AI Provider（AI 服務供應商）。

---

## 34.5 No Full Image Editor

除非 PM Decision（產品經理決策）明確核定：

Editor 不自行擴充成：

Full Image Editor（完整圖片編輯器）。

---

## 34.6 No Separate Reading Data

Reading Mode 不建立：

Separate Material Data（獨立教材資料）。

---

# 35. UI Consistency Checklist

## 35.1 Product Structure

- [ ] Workspace UI 與 Workspace Architecture 一致
- [ ] Book Library UI 與 Book Library Architecture 一致
- [ ] Folder UI 與 Folder Rule 一致
- [ ] Book UI 與 Book Architecture 一致
- [ ] Lesson UI 與 Lesson Architecture 一致
- [ ] Page UI 與 Page Architecture 一致

---

## 35.2 Content Boundary

- [ ] Image Area 只負責圖片
- [ ] Text Area 只負責文字
- [ ] HTML Overlay 負責互動
- [ ] Hotspot 屬於 HTML Overlay
- [ ] Original Teaching Material 受到保護
- [ ] Interaction Data 與 Material Data 分離

---

## 35.3 Editor

- [ ] Editor 使用既有資料模型
- [ ] Editor 不建立第二份教材
- [ ] Editor 不重新實作 AI Pipeline
- [ ] Editor 不建立 Camera System
- [ ] Editor 不建立 OCR Engine
- [ ] Editor 不自行擴充未核定功能

---

## 35.4 Reading Mode

- [ ] Reading Mode 使用同一份教材資料
- [ ] Reading Mode 提供 Edit Button
- [ ] Reading Mode 不提供教材編輯能力
- [ ] Hotspot 可以開啟 Default Popup
- [ ] Default Popup 提供確認的預設內容
- [ ] Context Toolbar 可以提供確認的工具

---

## 35.5 Global Services

- [ ] Global Search 使用共用搜尋機制
- [ ] Context Toolbar 為共用工具
- [ ] Save 為共用服務
- [ ] Background Processing 不造成 UI Freeze
- [ ] Loading 使用 Brand Loading Animation

---

## 35.6 Workspace Security

- [ ] UI 只顯示目前 Workspace 可存取資料
- [ ] 不跨 Workspace 讀取資料
- [ ] 不跨 Workspace 修改資料
- [ ] 不跨 Workspace 使用 Processing Data

---

## 35.7 AI Automation

- [ ] Image Import
- [ ] Image Quality Check
- [ ] Auto Correction（必要時）
- [ ] Re-Quality Check
- [ ] OCR
- [ ] Text + Bounding Box
- [ ] Coordinate Transformation（必要時）
- [ ] Hotspot Generator
- [ ] HTML Overlay
- [ ] Hotspot

---

## 35.8 Scope Control

- [ ] 不新增未核定功能
- [ ] 不新增未核定資料模型
- [ ] 不新增未核定 API
- [ ] 不新增未核定 Database Schema
- [ ] 不新增 AI Pipeline
- [ ] 不建立重複系統
- [ ] 遵守 Reuse Before Reinvent

---

# 36. Change Log

## Version 1.0

Date: 2026-08-09

建立 MagicBook 3.0 UI Design（使用者介面設計）正式基礎文件。

本版本整理目前 01～08 已確認的 UI：

- Workspace
- Book Library
- Folder
- Book
- Lesson
- Page
- Editor
- Image Area
- Text Area
- HTML Overlay
- Hotspot
- Context Toolbar
- Reading Mode
- Edit Button
- Default Popup
- Dictionary
- AI
- Audio
- Video
- Navigation
- Global Search
- Save
- Background Processing
- Brand Loading Animation
- AI Automation Result
- Workspace Isolation
- Error / Failure State

本版本：

- 不新增產品功能
- 不新增資料模型
- 不新增 API
- 不新增 Database Schema
- 不新增 AI Pipeline
- 不建立 Camera System
- 不建立 Custom OCR
- 不建立第二份教材資料

本文件僅整理既有已確認規格之 UI 表現與操作邊界。
