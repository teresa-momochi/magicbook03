# MagicBook 3.0 Product Specification

Version: Draft

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-01

# Table of Contents

1. Product Vision

2. Product Positioning

3. Core Design Philosophy

4. System Architecture

5. Data Ownership

6. Workspace Architecture

7. Book / Lesson / Page

8. Image Area

9. Text Area

10. Interactive Hotspot

11. HTML Overlay

12. Popup System

13. Editor System

14. Future Expansion

15. Change Log

---

# 1. Product Vision

## 1.1 Product Vision

MagicBook 3.0 是一套專為教育設計的互動教學工具（Interactive Teaching Tool）。

MagicBook 不提供教材內容（Teaching Content）。

使用者使用自己的教材（Content）。

MagicBook 提供工具（Tool），讓教材具備互動能力（Interactive Capability），提升教材的教學價值與使用壽命。

MagicBook 並非：

- PDF Reader（PDF 閱讀器）
- E-book（電子書）
- Presentation Software（簡報軟體）

MagicBook 的定位，是建立於教材之上的互動教學工具。

---

## 1.2 Mission

MagicBook 的使命（Mission）：

協助教育工作者直接使用既有教材，而不是重新製作教材。

任何教材皆可在保持原貌的前提下加入互動能力。

降低備課時間。

提升教學效率。

增加課堂互動。

延長教材使用價值。

---

## 1.3 Core Philosophy

MagicBook 採教材（Teaching Content）與互動（Interaction）完全分離（Decoupled）的設計理念。

教材永遠保持原貌。

所有互動皆建立於教材之上。

教材負責知識。

互動負責學習體驗。

任何新增功能皆不得修改教材本身。

---

## 1.4 Design Goals

MagicBook 3.0 的設計目標：

- Preserve Original Content（保留教材原貌）
- Interactive Learning（建立互動學習）
- Modular Architecture（模組化架構）
- SaaS Architecture（SaaS 架構）
- Long-term Evolution（長期演進）
- Collaboration（多人協作）

所有新功能皆須遵守核心設計理念。

---

## 1.5 Product Scope

### In Scope（產品負責）

- 教材管理
- 教材互動
- 教材展示
- AI 教學輔助
- 教學工具整合
- 教材數位化

### Out of Scope（產品不負責）

- 教材內容創作
- 教材出版
- 學校行政管理
- LMS（Learning Management System）

MagicBook 提供的是工具（Tool）。

教材內容永遠由使用者提供。

---
# 2. Product Positioning

## 2.1 Product Positioning

MagicBook 3.0 是一套互動教學工具（Interactive Teaching Tool）。

產品採用 SaaS（Software as a Service）模式提供服務。

系統架構同時支援：

- 個人模式（Personal Mode）
- 機構模式（Organization Mode）

兩種模式共用相同核心架構（Core Architecture）。

---

## 2.2 Target Users

MagicBook 3.0 的目標使用者（Target Users）：

- 個人學習者（Individual Learner）
- 個人老師（Individual Teacher）
- 補習班（Cram School）
- 學校（School）

---

## 2.3 Product Modes

MagicBook 3.0 提供兩種產品模式（Product Modes）。

### Personal Mode（個人模式）

適用於：

- 個人學習者
- 個人老師

登入後直接管理自己的教材。

第一版（MVP）採 Personal Mode。

---

### Organization Mode（機構模式）

適用於：

- 補習班
- 學校
- 教育機構

所有教材皆建立於 Workspace（工作區）內。

老師可於任何地點登入備課。

教材所有權仍屬於原 Workspace。

---

## 2.4 Product Rollout Strategy

MagicBook 採分階段推廣策略（Product Rollout Strategy）。

### Phase 1（MVP）

主要對象：

- 個人學習者
- 個人老師

目標：

- 驗證產品設計
- 收集使用者回饋
- 建立教學案例
- 持續優化產品

---

### Phase 2

開放：

- 補習班
- 學校

啟用 Workspace（工作區）。

---

系統自第一版開始即採相同核心架構（Core Architecture）設計。

---

# 3. Core Design Philosophy

## 3.1 Core Philosophy

MagicBook 採教材（Teaching Content）與互動（Interaction）完全分離（Decoupled）的設計理念。

教材永遠保持原貌。

所有互動功能皆建立於教材之上。

任何新增功能皆不得修改教材本身。

---

## 3.2 Separation of Content and Interaction

教材（Teaching Content）負責：

- 教學內容
- 教材版面
- 教材呈現

互動（Interaction）負責：

- Interactive Hotspot
- HTML Overlay
- Popup
- AI
- Audio
- Video
- Dictionary
- 未來所有互動功能

教材與互動彼此獨立。

可各自演進。

---

## 3.3 Long-term Architecture

MagicBook 採重新架構（Re-Architecture）方式設計。

產品並非於第一版持續堆疊功能。

而是建立：

- 可長期維護
- 可長期擴充
- 可商業化部署

的核心架構（Core Architecture）。

所有新功能皆建立於既有架構。

不得破壞核心設計。

---

## 3.4 SaaS First

MagicBook 自第一天起即以 SaaS（Software as a Service）產品設計。

系統需支援：

- Multi-Workspace（多工作區）
- Multi-User（多使用者）
- Multi-Book（多教材）
- Multi-Lesson（多章節）
- Multi-Page（多頁面）

所有資料架構皆須符合商業 SaaS 部署需求。

---

## 3.5 Design Principles

MagicBook 所有產品設計皆須遵守：

- Architecture First（架構優先）
- Content First（教材優先）
- Scalability（可擴充）
- Maintainability（可維護）
- Reusability（可重複利用）

所有新增功能皆須符合核心架構。

# 4. System Architecture

## 4.1 Overall Architecture

MagicBook 3.0 採模組化架構（Modular Architecture）設計。

所有功能皆建立於統一核心架構（Core Architecture）之上。

各模組彼此獨立（Low Coupling），但可共同運作（High Cohesion）。

系統應具備高度可維護性（Maintainability）與可擴充性（Scalability）。

---

## 4.2 Architecture Layers

MagicBook 3.0 分為以下架構層（Architecture Layers）：

- Presentation Layer（展示層）
- Application Layer（應用層）
- Business Layer（商業邏輯層）
- Data Layer（資料層）
- AI Layer（人工智慧層）
- Storage Layer（儲存層）

各層皆須保持獨立。

不得直接耦合（Coupling）。

---

## 4.3 Core Structure

MagicBook 3.0 採以下核心架構：

Workspace

↓

Book

↓

Lesson

↓

Page

├── Image Area

└── Text Area

Page（頁面）為教材管理的核心單位。

Image Area（圖片區）與 Text Area（文字區）共同隸屬於同一個 Page。

兩者：

- 架構獨立
- 功能獨立
- 排版獨立

但共同組成一頁完整教材。

---

## 4.4 Modular Architecture

所有功能皆應設計為獨立模組（Module）。

例如：

- Book Module
- Lesson Module
- Page Module
- Image Module
- Text Module
- Hotspot Module
- HTML Overlay Module
- Popup Module
- Dictionary Module
- AI Module

模組之間應透過標準介面（Interface）溝通。

不得直接依賴彼此內部實作。

---

## 4.5 Data Flow

系統資料流（Data Flow）如下：

User

↓

Workspace

↓

Book

↓

Lesson

↓

Page

↓

Content

↓

Interaction

所有互動（Interaction）皆建立於教材內容（Content）之上。

不得直接修改教材內容。

---

## 4.6 Core Principles

所有系統模組皆須遵守：

- Single Responsibility（單一職責）
- Low Coupling（低耦合）
- High Cohesion（高內聚）
- Reusable（可重複利用）
- Testable（可獨立測試）
- Scalable（可持續擴充）

所有新功能皆應建立於既有架構，而非重新建立新的架構。

---

# 5. Data Ownership

## 5.1 Design Purpose

Data Ownership（資料所有權）定義 MagicBook 3.0 中所有教材與資料的歸屬方式。

本章節目的：

- 保護使用者資料
- 保護機構教材
- 支援商業授權（Commercial Licensing）
- 支援個人模式（Personal Mode）
- 支援機構模式（Organization Mode）

Data Ownership 為 Workspace 設計之前提。

---

## 5.2 Personal Mode

個人模式（Personal Mode）適用於：

- 個人學習者（Individual Learner）
- 個人老師（Individual Teacher）

個人模式下：

所有教材皆屬於使用者本人。

第一版（MVP）以個人模式為主要開發目標。

---

## 5.3 Organization Mode

機構模式（Organization Mode）適用於：

- 補習班（Cram School）
- 學校（School）
- 教育機構（Educational Organization）

所有教材皆建立於 Workspace（工作區）。

老師可於任何地點登入備課。

教材所有權不因登入裝置改變。

---

## 5.4 Design Principles

資料所有權（Data Ownership）遵守：

- 個人模式以使用者管理資料。
- 機構模式以 Workspace 管理資料。
- 所有資料皆須具有 Owner（所有者）。
- 所有資料皆須符合商業授權架構。
- Workspace 為管理架構，不改變資料建立方式。

所有新功能皆須遵守本章節定義。

---

# 6. Workspace Architecture

## 6.1 Architecture Purpose

Workspace（工作區）為 MagicBook 的管理架構（Management Architecture）。

Workspace 負責管理：

- Users（使用者）
- Books（教材）
- Lessons（章節）
- Pages（頁面）
- Teaching Content（教材）

Workspace 不定義資料所有權。

資料所有權請參閱第五章。

---

## 6.2 Product Modes

MagicBook 提供：

- Personal Mode（個人模式）
- Organization Mode（機構模式）

第一版（MVP）先完成 Personal Mode。

Organization Mode 保留完整架構。

---

## 6.3 Personal Mode

個人模式不顯示 Workspace。

登入後直接管理自己的教材。

---

## 6.4 Organization Mode

Workspace 可建立：

- Administrator（管理者）
- Teacher（老師）

所有教材皆由同一 Workspace 管理。

老師可於任何地點登入備課。

---

## 6.5 Data Isolation

MagicBook 採 Multi-Tenant SaaS（多租戶 SaaS）架構。

每個 Workspace 為獨立租戶（Tenant）。

不同 Workspace：

- 不共享教材
- 不共享使用者
- 不共享權限
- 完全資料隔離（Data Isolation）

---

## 6.6 Design Principles

Workspace 為 MagicBook 所有管理功能的核心。

包括：

- User Management（使用者管理）
- Book Management（教材管理）
- Lesson Management（章節管理）
- Page Management（頁面管理）
- Permission Management（權限管理）
```
# 7. Book / Lesson / Page

## 7.1 Core Hierarchy

MagicBook 3.0 採階層式教材管理架構（Hierarchical Content Structure）。

教材組織如下：

Workspace

↓

Book

↓

Lesson

↓

Page

Page（頁面）為教材管理的核心單位。

---

## 7.2 Book

Book（教材）代表一本完整教材。

例如：

- G3 High Water
- Phonics Book 1
- Grammar Book

一本 Book 可包含多個 Lesson。

Book 為教材管理的第一層。

---

## 7.3 Lesson

Lesson（章節）代表教材中的一個單元。

例如：

- Lesson 1
- Lesson 2
- Lesson 3

一個 Lesson 可包含多個 Page。

Lesson 僅負責教材組織。

不負責教材內容。

---

## 7.4 Page

Page（頁面）為教材管理最小單位。

每個 Page 同時包含：

- Image Area（圖片區）
- Text Area（文字區）

兩者共同組成一頁教材。

---

## 7.5 Design Principles

Book、Lesson、Page 採固定階層。

Book 不可直接包含 Image Area。

Lesson 不可直接包含 Hotspot。

所有互動皆建立於 Page。

Page 為所有教材功能的核心。

---

# 8. Image Area

## 8.1 Module Position

Image Area（圖片區）為教材圖片管理模組。

Image Area 與 Text Area 為平行架構。

共同隸屬於同一個 Page。

彼此：

- 架構獨立
- 功能獨立
- 排版獨立

---

## 8.2 Responsibilities

Image Area 負責：

- 圖片管理
- PDF 管理
- 教材圖片呈現
- Interactive Hotspot 管理
- 圖片互動

Image Area 不負責：

- Rich Text
- HTML Overlay
- Popup
- Dictionary

---

## 8.3 Supported Content

第一版支援：

- PNG
- JPG
- JPEG
- PDF

系統支援：

- 多圖片匯入
- PDF 匯入
- 圖片與 PDF 混合

---

## 8.4 Interactive Image

Image Area 正式定位為：

Interactive Image Area（互動圖片區）。

圖片保持原樣。

互動建立於圖片之上。

兩者完全分離。

---

## 8.5 Interactive Hotspot

Image Area 支援：

Interactive Hotspot（互動熱點）。

Hotspot 可建立於：

- 單字
- 句子
- 人物
- 圖片
- 任意區域

Hotspot 為獨立互動物件（Interactive Object）。

---

## 8.6 Hotspot Properties

每個 Hotspot 皆具有：

- Name（名稱）
- Type（類型）
- Chinese（中文）
- KK
- Pronunciation（發音）
- Dictionary
- AI
- Notes（備註）

所有 Properties 皆可獨立編輯。

---

## 8.7 Hotspot Actions

每個 Hotspot 可執行：

- Popup
- Dictionary
- AI
- Audio
- Video
- Image
- Exercise
- URL
- Navigation

未來可持續擴充。

---

## 8.8 Design Principles

教材永遠保持原貌。

Hotspot 為互動入口。

Properties 為互動資料。

Actions 為互動行為。

三者彼此獨立。

可持續擴充。

# 9. Text Area

## 9.1 Module Position

Text Area（文字區）為教材文字管理模組。

Text Area 與 Image Area 為平行架構。

共同隸屬於同一個 Page。

彼此：

- 架構獨立
- 功能獨立
- 排版獨立

Text Area 專注於文字教材及文字互動。

---

## 9.2 Responsibilities

Text Area 負責：

- 文字內容管理（Text Content）
- Rich Text 編輯（Rich Text Editing）
- HTML Overlay 管理（HTML Overlay）
- Popup 整合（Popup）
- Dictionary 整合（Dictionary）
- AI 文字互動（AI）
- 文字樣式管理（Text Styling）

Text Area 不負責：

- 圖片管理（Image）
- PDF 管理（PDF）
- Hotspot 建立（Interactive Hotspot）

---

## 9.3 Supported Content

第一版支援：

- Plain Text（純文字）
- Rich Text（富文字）
- HTML Overlay（HTML 覆蓋層）

支援內容：

- 中文
- 英文
- 數字
- 標點符號
- Emoji

保留未來支援：

- Markdown
- HTML Components
- AI Generated Content

---

## 9.4 HTML Overlay

HTML Overlay（HTML 覆蓋層）為 Text Area 的核心互動技術。

HTML Overlay 建立於教材之上。

教材保持原貌。

HTML Overlay 第一版支援：

- 單字
- 句子
- 段落
- 任意文字區域

HTML Overlay 為獨立資料。

不得直接修改教材內容。

---

## 9.5 Interactive Content

每個 HTML Overlay 可建立：

- 中文解釋
- KK 音標
- 發音
- Dictionary
- AI 解說
- AI 翻譯
- AI 問答
- 圖片
- 音效
- 影片
- 外部連結

所有互動資料皆獨立儲存。

---

## 9.6 Design Principles

Text Area 專注文字。

HTML Overlay 專注互動。

教材與互動完全分離。

所有新增功能皆不得修改教材本身。

---

# 10. Interactive Hotspot

## 10.1 Module Position

Interactive Hotspot（互動熱點）為 MagicBook 核心互動元件。

Hotspot 為獨立模組。

可由：

- Image Area
- Text Area
- HTML Overlay
- AI

建立。

所有 Hotspot 使用相同資料結構。

---

## 10.2 Responsibilities

Interactive Hotspot 負責：

- 接收互動事件（Event）
- 管理 Properties（屬性）
- 呼叫 Action（動作）

Hotspot 不負責：

- Popup
- Dictionary
- AI
- Audio
- Video

---

## 10.3 Hotspot Properties

每個 Hotspot 具有：

- Name
- Type
- Position
- Size
- Properties
- Actions

Properties 與 Actions 完全分離。

---

## 10.4 Action Module

Hotspot 可呼叫：

- Popup
- Dictionary
- AI
- Audio
- Video
- Image
- Navigation
- URL

未來可新增更多 Action。

---

## 10.5 Design Principles

Hotspot 僅作為互動入口。

不實作任何功能。

所有功能皆由 Action Module 提供。

---

# 11. HTML Overlay

## 11.1 Module Position

HTML Overlay 為文字互動層（Interactive Text Layer）。

HTML Overlay 為獨立模組。

教材內容與互動資料完全分離。

---

## 11.2 Responsibilities

HTML Overlay 負責：

- 顯示文字
- Rich Text
- HTML Components
- Popup
- Dictionary
- AI
- Audio
- Video

HTML Overlay 不負責：

- 圖片管理
- PDF 管理
- 教材管理

---

## 11.3 Supported Content

第一版支援：

- 單字
- 句子
- 段落
- 任意文字區域

未來支援：

- Markdown
- HTML Components
- AI Generated Content

---

## 11.4 Design Principles

HTML Overlay：

- 可建立
- 可修改
- 可刪除
- 可複製
- 可重複利用

教材內容永遠保持原貌。

---

# 12. Popup System

## 12.1 Module Position

Popup System（彈出視窗系統）為統一 Popup 管理模組。

所有 Popup 均由 Popup System 管理。

---

## 12.2 Responsibilities

Popup 負責：

- 建立
- 顯示
- 關閉
- Animation
- Stack
- Lifecycle

Popup 不負責：

- Dictionary
- AI
- Audio
- Video

---

## 12.3 Popup Types

第一版包含：

- Dictionary Popup
- AI Popup
- Audio Popup
- Video Popup
- Image Popup
- Information Popup

所有 Popup 共用同一 Framework。

---

## 12.4 Lifecycle

Popup 流程：

Action

↓

Create

↓

Display

↓

Interaction

↓

Close

↓

Destroy

---

## 12.5 Design Principles

所有 Popup：

- 共用 Framework
- 可重複利用
- 可獨立測試
- 不修改教材資料

---

# 13. Editor System

## 13.1 Floating Toolbar

所有 Editor 共用 Floating Toolbar（浮動工具列）。

Toolbar：

- 可拖曳
- 可隱藏
- 可記錄位置
- 所有 Editor 共用

---

## 13.2 Selection

Editor 採 Selection First。

先選取。

再操作。

---

## 13.3 Editor State

Editor 維護：

- Nothing Selected
- Single Selection
- Multiple Selection
- Editing
- Dragging
- Resizing

---

## 13.4 Common Operations

所有 Editor 共用：

- Select
- Move
- Copy
- Paste
- Delete
- Undo
- Redo

---

## 13.5 Design Principles

所有 Editor：

- 共用操作模式
- 共用 Toolbar
- 共用 Selection
- 共用 State

不同 Editor 僅實作各自專屬功能。

---

# 14. Future Expansion

(To be completed)

---

# 15. Change Log

(To be completed)


