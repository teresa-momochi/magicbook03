# MagicBook 3.0 Product Specification

Version: 3.0

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-02

---

# Table of Contents

1. Product Vision
2. Product Positioning
3. Core Design Philosophy
4. System Architecture
5. Data Ownership
6. Workspace Architecture
7. Book Library Architecture
8. Book Structure
9. Core Modules
10. Editor System
11. Reading System
12. Global Services
13. Future Expansion
14. Change Log

---

# 1. Product Vision

## 1.1 Product Vision

MagicBook 3.0 是一套專為教育設計的互動教材工具（Interactive Teaching Material Tool）。

MagicBook 不提供教材內容（Teaching Content）。

教材內容永遠由使用者自行建立或匯入。

MagicBook 提供的是一套完整的互動工具（Interactive Tools），讓既有教材快速轉換為可閱讀、可互動、可持續使用的數位教材。

MagicBook 並非：

- PDF Reader（PDF 閱讀器）
- E-book（電子書）
- Presentation Software（簡報軟體）
- LMS（Learning Management System）

MagicBook 的核心價值，在於讓教材保持原貌（Teaching Material First），並建立互動能力（Interactive Capability）。

---

## 1.2 Mission

MagicBook 的使命（Mission）：

協助教育工作者直接使用既有教材，

而不是重新製作教材。

任何教材皆可在保持原貌的前提下，

加入互動能力，

降低備課時間，

提升教學效率，

增加課堂互動，

延長教材使用價值。

---

## 1.3 Product Position

MagicBook 不綁定任何教材格式。

使用者可直接使用自己的教材。

例如：

- PNG
- JPG
- JPEG
- PDF
- Camera（拍照）

教材保持原貌。

所有互動皆建立於教材之上。

---

## 1.4 Product Goal

MagicBook 3.0 第一版產品目標為：

建立完整產品架構（Complete Product Architecture）。

第一版即完成：

- 完整核心模組（Core Modules）
- 完整資料架構（Data Model）
- 完整使用者介面（User Interface）
- 完整操作流程（User Flow）

第三方服務（Third-party Services）可逐步完善，

但不得影響產品架構。

---

## 1.5 Core Value

MagicBook 所有產品設計皆遵循：

- Teaching Material First（教材優先）
- Architecture First（架構優先）
- Modular Architecture（模組化架構）
- Replaceable Service（服務可替換）
- Long-term Evolution（長期演進）

所有新功能皆建立於既有產品架構。

不得破壞核心設計。

---

# 2. Product Positioning

## 2.1 Product Positioning

MagicBook 3.0 為 SaaS（Software as a Service）互動教材平台。

系統提供兩種使用模式：

- Personal Workspace（個人）
- Organization Workspace（機構）

兩種模式共用相同產品架構。

差異僅在於：

- Workspace
- Data Ownership（資料歸屬）
- Permission（權限管理）

教材建立、教材編輯、教材閱讀與互動流程皆保持一致。

---

## 2.2 Target Users

MagicBook 3.0 適用於：

- Individual Learner（個人學習者）
- Individual Teacher（個人教師）
- Cram School（補習班）
- School（學校）
- Educational Organization（教育機構）

---

## 2.3 Product Architecture

MagicBook 採 Complete Product Architecture（完整產品架構）。

第一版即建立所有核心模組。

包括：

- Workspace
- Book Library
- Folder
- Book
- Lesson
- Page
- Image Area
- Text Area
- HTML Overlay
- Hotspot
- Popup
- Dictionary
- AI
- Audio
- Reading Mode
- Global Search

所有模組皆可獨立開發、

獨立測試、

獨立維護、

持續擴充。

---

## 2.4 Product Principles

MagicBook 所有產品功能皆遵循：

- Teaching Material First（教材優先）
- Complete Product Architecture（完整產品架構）
- Modular Architecture（模組化架構）
- Replaceable Service（服務可替換）
- Global Search（全域搜尋）
- Context Toolbar（共用浮動工具列）

所有產品皆採統一操作邏輯。

避免因新增功能而改變使用者操作習慣。

---

## 2.5 Replaceable Service

MagicBook 不綁定任何第三方服務。

所有服務皆應可自由替換。

包括：

- AI Provider
- Dictionary Provider
- Audio Provider
- Future Third-party Services

產品核心永遠是教材（Teaching Material）。

第三方服務僅提供輔助能力，

不得影響教材資料與產品架構。

# 3. Core Design Philosophy

## 3.1 Core Philosophy

MagicBook 3.0 採完整產品架構（Complete Product Architecture）設計。

第一版即建立所有核心模組（Core Modules）。

各模組可獨立開發、獨立測試、獨立維護，並可持續擴充。

所有新增功能皆建立於既有產品架構，

不得重新建立另一套架構。

---

## 3.2 Teaching Material First

教材（Teaching Material）永遠是產品核心。

MagicBook 提供工具，

不提供教材。

使用者使用自己的教材，

MagicBook 提供互動能力。

任何功能皆不得修改教材原始內容。

---

## 3.3 Separation of Content and Interaction

教材（Teaching Material）與互動（Interaction）完全分離。

教材負責：

- 教材內容
- 教材版面
- 教材呈現

互動負責：

- HTML Overlay
- Hotspot
- Popup
- Dictionary
- AI
- Audio

教材內容保持原貌。

所有互動皆建立於教材之上。

---

## 3.4 Modular Architecture

MagicBook 採模組化架構（Modular Architecture）。

所有功能皆應建立為獨立模組。

例如：

- Workspace
- Book Library
- Folder
- Book
- Lesson
- Page
- Image Area
- Text Area
- HTML Overlay
- Hotspot
- Popup
- Dictionary
- AI
- Audio
- Global Search

各模組之間採低耦合（Low Coupling）設計。

---

## 3.5 Replaceable Service

MagicBook 不綁定任何第三方服務。

所有第三方服務皆可自由替換。

包括：

- AI Provider
- Dictionary Provider
- Audio Provider

未來新增之第三方服務，

亦應遵循相同原則。

更換服務不得影響：

- 教材資料
- 使用者資料
- Workspace
- 系統架構

---

## 3.6 Consistent User Experience

所有模組皆應保持一致操作方式。

例如：

- Context Toolbar
- Global Search
- Popup
- CRUD
- Selection

新增功能不得建立不同操作模式。

應維持一致的使用者體驗（Consistent User Experience）。

---

## 3.7 Long-term Evolution

MagicBook 採長期演進（Long-term Evolution）策略。

第一版完成產品架構。

後續版本逐步完善：

- 功能
- 服務
- AI
- Dictionary
- Audio

產品架構保持穩定。

不得因新增功能而重新設計架構。

---

# 4. System Architecture

## 4.1 Overall Architecture

MagicBook 3.0 採模組化系統架構（Modular System Architecture）。

所有核心模組皆建立於統一產品架構。

各模組：

- 可獨立開發
- 可獨立測試
- 可獨立維護
- 可持續擴充

---

## 4.2 Core Structure

MagicBook 採以下核心架構：

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

↓

HTML Overlay

↓

Hotspot

↓

Popup

↓

Dictionary / AI / Audio

所有互動皆建立於教材之上。

教材保持原貌。

---

## 4.3 Workspace Architecture

Workspace 為系統最高管理單位。

支援：

- Personal Workspace
- Organization Workspace

Workspace 負責：

- Data Ownership
- Permission
- User Management
- Teacher Management

教材皆依 Workspace 管理。

---

## 4.4 Page Architecture

Page 為教材最小管理單位。

每個 Page 包含：

- Image Area
- Text Area
- HTML Overlay

三者彼此獨立，

共同完成教材編輯。

---

## 4.5 Interaction Architecture

HTML Overlay 為互動層（Interaction Layer）。

所有互動物件皆建立於 HTML Overlay。

包括：

- Hotspot
- Popup
- Dictionary
- AI
- Audio

教材內容保持原貌。

互動資料獨立儲存。

---

## 4.6 Shared Services

MagicBook 提供共用系統服務。

包括：

- Context Toolbar
- Global Search
- Save
- Authentication

所有模組共用同一套服務。

避免重複開發。

---

## 4.7 Data Flow

系統資料流程：

Authentication

↓

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

Teaching Material

↓

HTML Overlay

↓

Interactive Object

↓

User Interaction

所有互動皆建立於教材之上。

教材資料與互動資料彼此獨立。

---

## 4.8 Architecture Principles

MagicBook 系統架構遵循：

- Teaching Material First（教材優先）
- Complete Product Architecture（完整產品架構）
- Modular Architecture（模組化架構）
- Replaceable Service（服務可替換）
- Low Coupling（低耦合）
- High Cohesion（高內聚）
- Scalability（可持續擴充）
- Maintainability（可維護）
- Reusability（可重複利用）

所有新增功能皆須符合上述原則。

# 5. Data Ownership

## 5.1 Design Purpose

Data Ownership（資料歸屬）定義 MagicBook 3.0 中所有資料的擁有者（Owner）。

本章目的：

- 保護教材資料
- 保護使用者資料
- 保護機構教材
- 支援商業授權
- 支援多 Workspace 架構

所有資料皆須具有明確 Owner。

---

## 5.2 Ownership Principles

MagicBook 採 Workspace Ownership（工作區資料歸屬）。

所有教材皆屬於 Workspace。

Workspace 為資料管理單位。

資料不得因登入裝置、登入地點或使用者更換而改變所有權。

---

## 5.3 Personal Workspace

Personal Workspace 適用於：

- Individual Learner（個人學習者）
- Individual Teacher（個人教師）

所有教材皆由使用者本人建立與管理。

教材所有權屬於 Personal Workspace。

---

## 5.4 Organization Workspace

Organization Workspace 適用於：

- Cram School（補習班）
- School（學校）
- Educational Organization（教育機構）

所有教材皆建立於 Organization Workspace。

教材所有權屬於 Organization Workspace。

教師僅具有授權使用權。

教材不因教師離職或更換而改變所有權。

---

## 5.5 Teacher Account

Organization Workspace 由管理者建立教師帳號。

教師使用 Workspace 指派之帳號與密碼登入。

不得使用個人帳號直接加入 Organization Workspace。

教師權限由 Workspace 管理。

---

## 5.6 Data Isolation

MagicBook 採 Multi-Tenant SaaS Architecture。

每個 Workspace 為獨立資料空間。

不同 Workspace：

- 不共享教材
- 不共享使用者
- 不共享權限
- 不共享設定

所有資料皆完全隔離（Data Isolation）。

---

## 5.7 Design Principles

所有資料皆應遵循：

- Workspace Ownership（工作區資料歸屬）
- Teaching Material First（教材優先）
- Data Isolation（資料隔離）
- Permission Management（權限管理）

所有新增功能皆不得破壞資料歸屬。

---

# 6. Workspace Architecture

## 6.1 Architecture Purpose

Workspace 為 MagicBook 的最高管理架構（Root Management Architecture）。

Workspace 負責管理：

- Users
- Permissions
- Books
- Folders
- Lessons
- Pages
- Settings

Workspace 不直接管理教材內容。

Workspace 負責管理教材歸屬與權限。

---

## 6.2 Workspace Types

MagicBook 提供兩種 Workspace：

- Personal Workspace
- Organization Workspace

兩者共用相同產品架構。

差異僅為：

- Data Ownership
- Permission
- User Management

---

## 6.3 Personal Workspace

Personal Workspace 提供：

- 個人教材管理
- 個人設定
- 個人資料

所有教材由使用者自行管理。

---

## 6.4 Organization Workspace

Organization Workspace 提供：

- Teacher Management
- Permission Management
- Workspace Settings
- Book Management
- Folder Management

所有教材由 Workspace 管理。

教師依權限使用教材。

---

## 6.5 Workspace Authentication

使用者登入後，

系統依帳號判斷所屬 Workspace。

登入成功後，

自動進入對應 Workspace。

Workspace Authentication 應先於教材存取。

---

## 6.6 Permission Management

Workspace 應提供權限管理。

不同使用者可具有不同操作權限。

例如：

- Administrator
- Teacher

權限控制包含：

- 教材管理
- 教材編輯
- 教材閱讀
- Workspace 管理

---

## 6.7 Workspace Settings

Workspace 應提供基本設定。

包括：

- Workspace Name
- Workspace Information
- Workspace Logo
- Basic Preferences

第一版僅提供基本設定。

後續版本可持續擴充。

---

## 6.8 Design Principles

Workspace 為所有教材管理之基礎。

所有模組皆建立於 Workspace。

Workspace 應遵循：

- Low Coupling（低耦合）
- Scalability（可擴充）
- Maintainability（可維護）
- Replaceable Service（服務可替換）

不得因新增功能而改變 Workspace 架構。

# 7. Book Library Architecture

## 7.1 Design Purpose

Book Library 為 MagicBook 所有教材的管理中心（Teaching Material Management Center）。

所有教材皆由 Book Library 進入。

Book Library 負責：

- 教材分類
- 教材管理
- 教材搜尋
- 教材開啟
- 最近使用教材

Book Library 不負責教材編輯。

---

## 7.2 Core Structure

Book Library 採階層式架構（Hierarchical Structure）。

教材組織如下：

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

Folder 僅負責教材分類。

Book 為教材管理單位。

---

## 7.3 Folder

Folder 為教材分類工具。

Folder 支援：

- Create Folder
- Rename Folder
- Delete Folder
- Move Folder
- Reorder Folder

Folder 可包含：

- Folder
- Book

Folder 支援：

- Nested Folder（子資料夾）
- Drag & Drop Sorting（拖曳排序）

Folder 不儲存教材內容。

僅負責教材分類。

---

## 7.4 Book

Book 為教材管理單位。

Book 支援：

- Create
- Rename
- Duplicate
- Delete
- Open

Book 可移動至不同 Folder。

Book 為教材生命週期管理單位。

---

## 7.5 Search

Book Library 提供全域搜尋（Global Search）。

搜尋採 Floating Toolbar。

平時隱藏。

需要時展開。

提供 Search Scope：

- All
- Folder
- Book
- Lesson
- Page

搜尋結果可直接開啟教材。

---

## 7.6 Recently Used

Book Library 應提供：

Recently Used Books。

方便快速開啟最近使用教材。

---

## 7.7 Design Principles

Book Library 為教材管理中心。

Folder 負責分類。

Book 負責教材。

Lesson 負責章節。

Page 負責教材內容。

各模組彼此獨立，

共同完成教材管理。

---

# 8. Book Structure

## 8.1 Core Hierarchy

MagicBook 採固定教材架構。

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

Page 為教材最小管理單位。

---

## 8.2 Book

Book 代表一本完整教材。

例如：

- High Water
- Phonics Book
- Grammar Book

一本 Book 可包含多個 Lesson。

Book 為教材生命週期管理單位。

---

## 8.3 Lesson

Lesson 為教材章節管理單位。

一個 Lesson 可包含多個 Page。

建立 Book 時，

系統自動建立 Default Lesson。

Lesson 僅負責教材組織。

---

## 8.4 Page

Page 為教材最小管理單位。

每個 Page 包含：

- Image Area
- Text Area
- HTML Overlay

共同完成教材頁面。

---

## 8.5 Image Area

Image Area 負責教材圖片。

支援：

- PNG
- JPG
- JPEG
- PDF
- Camera（拍照）

教材保持原貌。

---

## 8.6 Text Area

Text Area 負責教材文字。

每個 Page 可建立不限數量 Text Block。

Text Area 專注文字內容。

---

## 8.7 HTML Overlay

HTML Overlay 為教材互動層（Interaction Layer）。

建立於教材之上。

可覆蓋：

- Image
- PDF
- Camera

教材內容保持原貌。

所有互動皆建立於 HTML Overlay。

---

## 8.8 Hotspot

Hotspot 為互動物件（Interactive Object）。

建立於 HTML Overlay。

點擊 Hotspot：

立即顯示 Default Popup。

預設內容：

- Chinese
- KK
- Pronunciation

其他功能由 Context Toolbar 開啟。

---

## 8.9 Design Principles

Book Structure 採固定階層。

教材內容與互動資料完全分離。

教材保持原貌。

所有互動建立於 HTML Overlay。

不得因新增功能改變教材架構。

# 9. Core Modules

## 9.1 Module Design

MagicBook 3.0 採模組化架構（Modular Architecture）。

所有核心模組皆可：

- 獨立開發（Independent Development）
- 獨立測試（Independent Testing）
- 獨立維護（Independent Maintenance）
- 持續擴充（Scalable）

各模組透過統一資料架構協同運作。

不得直接依賴其他模組。

---

## 9.2 Image Area Module

Image Area 為教材圖片工作區。

負責：

- 圖片管理
- PDF 管理
- Camera 拍照
- 圖片呈現

支援：

- PNG
- JPG
- JPEG
- PDF
- Camera

系統自動：

- 圖片最佳化（Image Optimization）
- 圖片壓縮（Image Compression）
- 背景處理（Background Processing）
- 大檔提示（Large File Warning）

教材內容保持原貌。

所有互動皆由 HTML Overlay 建立。

---

## 9.3 Text Area Module

Text Area 為文字工作區。

負責：

- Text Block 管理
- 文字編輯
- 文字排序

每個 Page 可建立不限數量 Text Block。

Text Area 專注文字內容。

不負責教材互動。

---

## 9.4 HTML Overlay Module

HTML Overlay 為教材互動層（Interaction Layer）。

建立於教材之上。

可覆蓋：

- Image
- PDF
- Camera

HTML Overlay 負責：

- Layer Management
- Interactive Object
- Position
- Resize

教材保持原貌。

所有互動皆建立於 HTML Overlay。

---

## 9.5 Hotspot Module

Hotspot 為互動物件（Interactive Object）。

負責：

- Add
- Edit
- Delete
- Move
- Resize
- Save

Hotspot 建立於 HTML Overlay。

每個 Hotspot 皆具有：

- Position
- Properties
- Actions

---

## 9.6 Popup Module

Popup 為互動資訊視窗。

點擊 Hotspot：

立即顯示 Default Popup。

預設內容：

- Chinese
- KK
- Pronunciation

其他功能由 Context Toolbar 開啟。

Popup 負責：

- Popup Rendering
- Popup Layout
- Popup CRUD

---

## 9.7 Dictionary Module

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

Dictionary Provider 可自由替換。

---

## 9.8 AI Module

AI 為產品工具（Tool）。

不是產品核心。

AI 提供：

- AI Panel
- Prompt Manager
- Conversation
- History
- AI Settings
- AI Provider Interface

採 Replaceable Provider Architecture。

Provider 包括：

- Claude
- GPT
- Gemini
- OpenRouter
- Future Providers

不得綁定任何特定 AI。

---

## 9.9 Audio Module

Audio 提供：

- Audio Player
- Audio Source
- Audio Settings

Audio Provider 可自由替換。

Audio 不影響教材資料。

---

## 9.10 Global Search Module

Global Search 為全系統共用搜尋服務。

搜尋採 Floating Toolbar。

平時隱藏。

點擊後展開。

提供：

- Keyword Search
- Instant Search
- Search Suggestions
- Recent Search
- Search Result Navigation

Search Scope：

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

各畫面可設定不同預設搜尋範圍。

---

## 9.11 Context Toolbar Module

Context Toolbar 為全系統共用工具列。

所有可編輯物件共用：

- Image
- Text
- HTML Overlay
- Hotspot

Toolbar 提供：

- Auto Show
- Auto Hide
- Floating
- Draggable
- Dockable

可停靠：

- 上方
- 下方
- 左側
- 右側

Toolbar 不得遮蔽教材內容。

---

## 9.12 Reading Module

Reading Mode 與 Editor Mode

共用同一份教材資料。

Reading Mode 提供：

- Hotspot
- Popup
- Dictionary
- AI
- Audio
- Navigation

Reading Mode 僅提供閱讀與互動。

不得修改教材內容。

---

## 9.13 Module Principles

所有核心模組皆應遵循：

- Teaching Material First（教材優先）
- Complete Product Architecture（完整產品架構）
- Modular Architecture（模組化架構）
- Replaceable Service（服務可替換）
- Low Coupling（低耦合）
- High Cohesion（高內聚）

所有新增功能皆須建立於既有模組。

不得重新建立新的產品架構。

---

# 10. Editor System

## 10.1 Design Purpose

Editor System 為 MagicBook 的教材編輯中心。

所有教材編輯皆於 Editor 完成。

Editor 與 Reading Mode 共用同一份教材資料。

---

## 10.2 Editor Layout

Book Editor 固定包含：

- Page Manager
- Image Area
- Text Area
- HTML Overlay

各工作區彼此獨立。

共同完成教材編輯。

---

## 10.3 Workspace Adjustment

桌機／筆電：

可拖曳分隔線，

自由調整：

- Image Area
- Text Area

工作區大小。

手機／平板：

支援雙指縮放（Pinch Zoom）。

依裝置自動調整最佳操作方式。

---

## 10.4 Selection First

Editor 採 Selection First 操作模式。

先選取物件。

再顯示 Context Toolbar。

Toolbar 自動顯示。

完成操作後自動隱藏。

---

## 10.5 Context Toolbar

所有可編輯物件共用同一套 Context Toolbar。

包括：

- Image
- Text
- HTML Overlay
- Hotspot

Toolbar：

- 可拖曳
- 可停靠
- 可自動隱藏
- 可自動顯示

保持教材畫面乾淨。

---

## 10.6 Editing Objects

Editor 可編輯：

- Image
- Text Block
- HTML Overlay
- Hotspot
- Popup

所有物件皆遵循一致操作模式。

---

## 10.7 Common Operations

所有 Editor 共用：

- Select
- Move
- Resize
- Copy
- Paste
- Delete
- Undo
- Redo
- Save

保持一致使用體驗。

---

## 10.8 Design Principles

Editor System 應遵循：

- Selection First（先選取，再操作）
- Context Toolbar（共用工具列）
- Teaching Material First（教材優先）
- Consistent User Experience（一致操作體驗）

所有新增功能皆不得建立新的操作模式。

應延續既有 Editor 架構。

# 11. Reading System

## 11.1 Design Purpose

Reading System 為 MagicBook 的教材閱讀模式（Reading Mode）。

Reading Mode 與 Editor Mode

共用同一份教材資料。

Reading Mode 專注於教材閱讀與互動。

不得修改教材內容。

---

## 11.2 Reading Flow

教材閱讀流程：

Book Library

↓

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

Dictionary

AI

Audio

↓

Continue Reading

所有互動皆建立於教材之上。

教材內容保持原貌。

---

## 11.3 Default Popup

點擊 Hotspot，

立即顯示 Default Popup。

預設內容：

- Chinese
- KK
- Pronunciation

提供最快速的教材閱讀體驗。

---

## 11.4 Context Toolbar

若需要更多功能，

使用者可由 Context Toolbar 開啟：

- Dictionary
- AI
- Audio

Toolbar：

- 自動顯示
- 自動隱藏
- 可拖曳
- 可停靠

保持教材畫面乾淨。

---

## 11.5 Dictionary

Dictionary 為 Lookup Tool。

提供：

- Word
- Chinese
- KK
- Pronunciation
- Example
- AI Assistance

Dictionary 僅提供查閱。

不提供收藏。

---

## 11.6 AI

AI 為教材閱讀輔助工具。

例如：

- Explain
- Translate
- Generate Example

AI 為 Tool。

不是教材本身。

---

## 11.7 Audio

Audio 提供教材發音。

Audio Provider 可自由替換。

教材資料不受影響。

---

## 11.8 Navigation

Reading Mode 提供：

- Previous Page
- Next Page
- Back to Lesson
- Back to Book
- Home

保持一致操作流程。

---

## 11.9 Design Principles

Reading Mode 專注：

- 閱讀
- 查閱
- 理解
- 互動

不得提供教材編輯能力。

所有教材皆與 Editor 共用同一份資料。

---

# 12. Global Services

## 12.1 Design Purpose

Global Services 為 MagicBook 全系統共用服務。

所有模組皆共用相同服務。

避免重複開發。

保持一致操作體驗。

---

## 12.2 Authentication Service

提供：

- Login
- Logout
- Session Management
- User Authentication

所有模組共用。

---

## 12.3 Global Search Service

Global Search 為全系統共用搜尋服務。

畫面右上角固定顯示 Search Icon（放大鏡）。

Search Icon 為搜尋入口，

不得隱藏，

方便使用者快速辨識搜尋功能位置。

點擊 Search Icon 後，

展開 Floating Search Toolbar。

Toolbar 提供：

- Home（首頁）
- Back（上一頁）
- Keyword Search
- Search Scope
- Search Suggestions
- Recent Search
- Search Result Navigation

Search Scope：

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

搜尋結果可直接開啟對應教材或內容。

點擊 Close（✕）後，

僅收合 Floating Search Toolbar。

Search Icon（放大鏡）仍固定顯示於畫面右上角。

Toolbar 每次皆由 Search Icon 展開。

不記錄上次位置。

所有畫面皆共用相同搜尋介面與操作流程，

保持一致的使用者體驗。

---

## 12.4 Save Service

提供：

- Save
- Auto Validation
- Save Status
- Cloud Storage（Supabase）

所有教材皆使用相同儲存流程。

---

## 12.5 Background Processing

所有耗時工作皆採 Background Processing。

例如：

- 匯入圖片
- 匯入 PDF
- Camera 拍照
- 圖片最佳化
- 圖片壓縮
- AI 處理
- 儲存教材
- 搜尋

不得造成系統凍結。

---

## 12.6 Brand Loading Animation

MagicBook 使用品牌動畫（Brand Loading Animation）。

不使用傳統 Loading Bar。

Loading Animation：

- 顯示於畫面中央
- 採持續動作動畫
- 動畫約佔畫面 15%
- 工作完成後自動消失

品牌角色例如：

- 小松鼠奔跑
- 小狐狸奔跑
- 小企鵝搬教材
- 貓頭鷹飛行

品牌角色可依節日或版本更新替換。

可採 Random Character（隨機角色）機制。

品牌角色以動作呈現系統工作狀態。

不使用大量文字提示。

---

## 12.7 Design Principles

所有共用服務皆應遵循：

- Teaching Material First
- Replaceable Service
- Consistent User Experience
- Low Coupling
- High Cohesion

所有模組共用同一套服務。

不得建立重複功能。

---

# 13. Future Expansion

MagicBook 採長期演進（Long-term Evolution）策略。

未來新增功能皆應建立於既有產品架構。

不得重新建立新的架構。

所有新增功能皆須遵循：

- Teaching Material First
- Complete Product Architecture
- Modular Architecture
- Replaceable Service

未來版本可持續增加新的模組與服務，

但不得影響既有教材資料、使用者操作流程與產品架構。

---

# 14. Change Log

## Version 3.0 Draft

重新建立 MagicBook 3.0 Product Specification。

同步 02_MVP_Development.md。

完成：

- Complete Product Architecture
- Workspace Architecture
- Book Library Architecture
- Folder Architecture
- Core Modules
- Editor System
- Reading System
- Global Services
- Replaceable Service Architecture
- Brand Loading Animation
- Global Search
- Context Toolbar

作為 MagicBook 3.0 後續開發與所有設計文件之共同規格基礎。

