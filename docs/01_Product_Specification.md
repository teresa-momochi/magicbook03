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
4. Core Development Principles
5. System Architecture
6. Workspace Architecture
7. Book / Lesson / Page
8. Image Area
9. Text Area
10. Interactive Hotspot
11. Popup System
12. AI Integration
13. User Management
14. Editor System
15. Future Roadmap

---
---

# 1. Product Vision

## 1.1 Product Vision

MagicBook 3.0 是一套專為教育設計的互動教材平台（Interactive Teaching Platform）。

MagicBook 不負責建立教材。

MagicBook 負責讓既有教材具備互動能力。

任何教材都可以在保持原貌的前提下，快速轉換成互動教材。

它不是 PDF 閱讀器。

它不是電子書。

它不是簡報工具。

它是一套建立於教材之上的互動平台。

---

## 1.2 Mission

讓老師可以直接使用現有教材，而不是重新製作教材。

任何教材都可以直接加入互動能力。

教材保持原樣。

互動能力持續擴充。

降低備課時間。

提升教學效率。

增加課堂互動。

延長教材使用壽命。

---

## 1.3 Core Philosophy

MagicBook 3.0 的核心理念：

教材（Teaching Materials）

與

互動（Interaction）

完全分離。

教材永遠保持原樣。

所有互動皆建立於教材之上。

教材負責知識。

互動負責學習體驗。

兩者完全解耦（Decoupled）。

任何新增功能，都不得改變教材本身。

---

## 1.4 Design Goals

MagicBook 3.0 的設計目標：

- 保留教材原貌。
- 建立互動式學習體驗。
- 支援無限擴充。
- 支援 SaaS 商業化部署。
- 支援產品長期演進。
- 支援多人共同協作。

所有未來新增功能，都必須遵守本產品的核心設計理念。

---

## 1.5 Product Scope

MagicBook 3.0 的產品定位如下：

### 負責

- 教材管理
- 教材互動
- 教材展示
- AI 輔助教學
- 教學工具整合
- 教材數位化

### 不負責

- 教材內容創作
- 教材出版
- 學校行政管理
- LMS（Learning Management System）

MagicBook 的定位，是讓任何教材都能快速具備互動能力，而不是取代教材本身。

---

# 2. Product Positioning

## 2.1 Product Type

MagicBook 3.0 是一套互動教材平台（Interactive Teaching Platform）。

產品定位為可商業化的 SaaS 平台，支援個人使用者、老師、補習班及學校。

---

## 2.2 Target Users

MagicBook 3.0 的使用對象包含：

- 個人學習者
- 個人老師
- 補習班
- 學校

---

## 2.3 Product Rollout Strategy

MagicBook 採分階段推廣策略。

### Phase 1（MVP）

主要使用者：

- 個人學習者

目的：

- 快速取得使用回饋
- 驗證產品設計
- 累積真實教學案例
- 持續優化產品

### Phase 2

擴展至：

- 個人老師

### Phase 3

擴展至：

- 補習班（Workspace）

### Phase 4

擴展至：

- 學校

雖然產品採分階段推廣，但系統架構從第一天即以多人 SaaS 平台為目標設計。
---

# 3. Core Design Philosophy

## 3.1 Core Philosophy

MagicBook 3.0 建立於「教材（Teaching Materials）」與「互動（Interaction）」完全分離的設計理念。

教材永遠保持原樣。

互動永遠建立於教材之上。

任何新增功能，都不得修改教材本身。

---

## 3.2 Separation of Content and Interaction

教材負責：

- 教學內容
- 教材版面
- 教材呈現

互動負責：

- 單字互動
- Popup
- AI 功能
- 作答
- 標註
- 畫線
- 螢光筆
- 未來所有互動功能

教材與互動彼此獨立，可各自演進。

---

## 3.3 Long-term Architecture

MagicBook 3.0 採重新架構（Re-Architecture）方式設計。

不是在第一版功能上持續堆疊。

而是建立可長期維護、可長期擴充、可商業化部署的產品架構。

所有新功能皆建立於既有架構，不破壞既有設計。

---

## 3.4 SaaS First

MagicBook 3.0 從第一天即以 SaaS 平台為目標設計。

系統需支援：

- 多 Workspace
- 多使用者
- 多教材
- 多書籍
- 多課程
- 多 Page

所有資料皆需具備可商業化部署能力。

---

## 3.5 Development Principles

所有功能皆需遵守以下原則：

- 架構優先於功能。
- 教材優先於互動。
- 不為單一功能破壞整體架構。
- 新功能必須具備可擴充性。
- 優先考慮長期維護成本。
- 所有設計皆需符合商業 SaaS 架構。


-# Core Development Principles

本章節適用於 MagicBook 3.0 所有模組。

所有功能皆必須遵守以下共同開發原則。

---

## 1. Performance First

所有功能皆應優先考慮：

- 執行效率
- 使用體驗
- 系統穩定性

不得因新增功能而造成系統明顯變慢。

---

## 2. Automatic Optimization

所有可最佳化的資料皆應由系統自動處理。

例如：

- 圖片壓縮
- 圖片格式最佳化
- 背景處理
- Lazy Loading

使用者不需手動操作。

---

## 3. Cache First

所有可重複使用的資料皆應優先使用 Cache。

例如：

- 圖片
- PDF
- Background Image
- Dictionary
- AI 分析結果
- 教材資料

避免重複下載、重複運算與重複請求。

---

## 4. Background Processing

所有耗時工作皆應優先採用背景處理。

例如：

- AI 分析
- OCR
- 圖片最佳化
- PDF 處理
- AI 建立 Hotspot

背景完成後自動更新畫面。

避免使用者等待。

---

## 5. Auto Save

所有具有編輯功能的模組皆應支援：

- Auto Save（自動儲存）
- Manual Save（手動儲存）

降低資料遺失風險。

---

## 6. Standard Editor Functions

所有 Editor 第一版皆必須支援：

- 新增（Create）
- 修改（Edit）
- 刪除（Delete）
- 移動（Move）
- 複製（Copy）
- 貼上（Paste）
- Undo（回到上一步）
- Redo（恢復）
- Auto Save
- Manual Save

---

## 7. Delete Confirmation

所有刪除操作皆必須再次確認。

例如：

- Book
- Lesson
- Page
- Image
- PDF
- Hotspot
- Popup
- 教材內容

若屬永久刪除，系統必須提示：

「此操作無法復原，是否確定刪除？」

---

## 8. Unsaved Changes Protection

當使用者尚未儲存變更時，

若關閉頁面、切換頁面或離開編輯畫面，

系統必須提醒：

「您尚有未儲存的變更，是否確定離開？」

---

## 9. Reusable Components

所有新功能應優先採用可重複使用的元件（Reusable Components）。

避免重複開發相同功能。

---

## 10. Configuration First

所有可設定的功能應以設定（Configuration）方式設計。

避免將功能寫死於程式中。

例如：

- Hotspot 類型
- Popup 樣式
- AI Provider
- Dictionary Provider
- Theme

皆應可由設定控制。

---

## 11. Multi-Tenant Ready

所有功能皆需支援：

- Multi-Workspace
- Multi-User
- Commercial SaaS

不得因單一功能破壞整體架構。

---

## 12. Modular Design

所有功能皆應設計為獨立模組。

每個模組應具備：

- 明確職責（Single Responsibility）
- 可獨立維護
- 可獨立測試
- 可獨立擴充

避免模組之間高度耦合（High Coupling）。

新增功能時，應優先考慮是否可重複利用既有模組，而非重新開發相似功能。

所有模組皆應保持低耦合（Low Coupling）、高內聚（High Cohesion）的設計原則。

# 4. System Architecture

## 4.1 Overall Architecture

MagicBook 3.0 採模組化（Modular Architecture）設計。

各模組皆可獨立開發、獨立維護、獨立擴充。

任何模組皆不得直接依賴其他模組的內部實作。

---

## 4.2 Core Structure

MagicBook 3.0 的核心架構如下：

Workspace
↓
Book
↓
Lesson
↓
Page
├── Image Area
└── Text Area

Page 為教材的核心管理單位。

Image Area 與 Text Area 為平行架構，同屬於同一個 Page。

兩者彼此獨立，但共同組成一頁教材。

---

## 4.3 Image Area

Image Area 負責：

- 圖片
- PDF
- Interactive Hotspot
- 圖片相關互動

Image Area 不負責文字排版。

---

## 4.4 Text Area

Text Area 負責：

- Background Image
- HTML Overlay
- Popup
- 文字相關互動

Text Area 不負責圖片管理。

---

## 4.5 Core Principles

Image Area 與 Text Area：

- 架構獨立
- 功能獨立
- 排版獨立

但：

- 同屬於同一個 Page
- 共同組成完整教材

---

## 4.6 Future Expansion

所有未來功能：

- AI
- 語音
- OCR
- 翻譯
- 作答
- 標註
- 畫線
- 螢光筆
- 其他互動

皆建立於既有架構。

不得破壞核心架構設計。

---

# 5. Workspace Architecture

## 5.1 SaaS Architecture

MagicBook 3.0 採用 Multi-Tenant SaaS（多租戶）架構。

每一個 Workspace 代表一個獨立的教學單位。

例如：

- 補習班
- 學校
- 個人老師（未來可支援）

不同 Workspace 之間，資料完全隔離。

---

## 5.2 Workspace

Workspace 為 MagicBook 3.0 的最高管理單位。

每個 Workspace 擁有自己的：

- 使用者（Users）
- 書籍（Books）
- Lessons
- Pages
- 教材
- 教學資料

所有資料皆屬於 Workspace，而非個人。

---

## 5.3 User Roles

每個 Workspace 可建立不同角色：

- Administrator（主任）
- Teacher（老師）

未來可擴充：

- Student（學生）
- Parent（家長）

角色權限由 Workspace 管理。

---

## 5.4 Data Ownership

教材所有權屬於 Workspace。

即使老師在家備課、登入不同裝置：

教材仍屬於原 Workspace。

老師離開 Workspace 時：

教材不會跟著老師離開。

---

## 5.5 Data Isolation

不同 Workspace 之間：

- 看不到彼此教材
- 看不到彼此學生
- 看不到彼此書籍
- 看不到彼此資料

所有查詢皆須以 Workspace 為基礎。

---

## 5.6 Design Principles

Workspace 是所有資料的根。

未來所有功能：

- AI
- 教材
- 書籍
- Lesson
- Page
- 教學紀錄

皆需建立於 Workspace 架構之上。

---

# 6. Book / Lesson / Page

## 6.1 Core Hierarchy

MagicBook 3.0 採用階層式教材管理架構。

教材組織如下：

Workspace
↓
Book
↓
Lesson
↓
Page

Page 為教材的核心管理單位。

---

## 6.2 Book

Book 代表一本教材。

例如：

- G3 High Water
- Phonics Book 1
- Grammar Book

一本 Book 可包含多個 Lesson。

---

## 6.3 Lesson

Lesson 代表教材章節。

例如：

- Lesson 1
- Lesson 2
- Lesson 3

一個 Lesson 可包含多個 Page。

---

## 6.4 Page

Page 為教材管理的最小單位。

每個 Page 同時包含：

- Image Area
- Text Area

兩者屬於同一個 Page。

共同組成完整教材。

---

## 6.5 Image Area

Image Area 為教材圖片互動區。

支援：

- PNG
- JPG
- PDF
- Interactive Hotspot

Image Area 專注於圖片教材與圖片互動。

---

## 6.6 Text Area

Text Area 為教材文字互動區。

採用：

Background Image

+

HTML Overlay

+

Popup

三層架構。

Text Area 專注於教材文字互動。

---

## 6.7 Page Principles

Page 為 MagicBook 的核心管理單位。

Image Area 與 Text Area：

- 同屬於同一個 Page
- 架構獨立
- 排版獨立
- 功能獨立

但共同呈現同一頁教材。

未來所有教材功能皆建立於 Page 架構之上。

---

# 7. Image Area

# 7. Image Area

## 7.1 Module Position

Image Area 為 MagicBook 3.0 的左側教材互動區（Interactive Image Area）。

Image Area 與 Text Area 為平行架構。

兩者共同隸屬於同一個 Page。

彼此架構獨立、功能獨立、排版獨立。

共同組成一頁完整教材。

Image Area 專注於圖片教材及圖片互動。

Text Area 專注於文字教材及文字互動。

---

## 7.2 Responsibilities

Image Area 負責：

- 教材圖片管理
- PDF 管理
- 圖片教材呈現
- Interactive Hotspot 管理
- 圖片教材互動

Image Area 不負責：

- 文字排版
- HTML Overlay
- Rich Text 編輯
- 文字樣式管理

上述功能皆由 Text Area 負責。

---

## 7.3 Supported Content

Image Area 第一版正式支援：

- PNG
- JPG
- JPEG
- PDF

Image Area 支援：

- 一次匯入多張圖片
- 一次匯入多頁 PDF
- 混合圖片與 PDF

系統應自動建立教材資料。

不需逐頁建立。

系統需保留未來擴充其他教材格式的能力。

---

## 7.4 Interactive Image Area

Image Area 正式定位為：

Interactive Image Area（互動圖片區）。

Image Area 的目的不是顯示圖片。

而是讓任何圖片教材皆可建立互動能力。

教材保持原樣。

互動建立於教材之上。

兩者完全分離。

---

## 7.5 Interactive Hotspot

Image Area 支援建立：

Interactive Hotspot（互動熱點）。

Interactive Hotspot 定義為：

教材中的可互動區域（Interactive Region）。

並非圖片上的一個點。

每一個 Hotspot 都是一個獨立的互動物件（Interactive Object）。

老師可自由調整：

- 位置
- 大小
- 範圍

第一版正式支援建立於：

- 單字
- 句子
- 人物
- 圖片
- 按鈕
- 任意教材區域

Interactive Hotspot 為 MagicBook 3.0 第一版核心功能。

---

## 7.6 Hotspot Properties

每一個 Interactive Hotspot 皆具有自己的屬性（Properties）。

例如：

- 名稱
- 類型（Word／Sentence／Image／Custom）
- 中文解釋
- KK 音標
- 發音
- Cambridge Dictionary 網址
- AI 解說
- AI 翻譯
- AI 問答
- 備註

系統可支援：

- 自動取得（例如單字、KK、Cambridge）
- 手動修改
- 手動新增

所有屬性皆可獨立編輯。

---

## 7.7 Hotspot Actions

每一個 Interactive Hotspot 可指定一個或多個 Action（動作）。

例如：

- 顯示 Popup
- 播放發音
- 開啟 Cambridge Dictionary
- 顯示 AI 解說
- 顯示 AI 翻譯
- 顯示 AI 問答
- 播放音效
- 播放影片
- 顯示圖片
- 開啟練習題
- 跳轉指定教材
- 開啟網址

未來可持續新增新的 Action 類型。

---

## 7.8 Design Principles

Image Area 的核心不是圖片。

而是讓圖片教材具備互動能力。

任何圖片教材皆可建立互動。

教材永遠保持原樣。

互動永遠建立於教材之上。

Hotspot 為互動入口。

Properties 為互動資料。

Actions 為互動行為。

三者彼此獨立，可持續擴充。

---

## 7.9 Future Expansion

Image Area 保留未來擴充能力。

例如：

- Hotspot Editor
- AI 自動建立 Hotspot
- AI OCR
- AI 圖片辨識
- AI 自動產生教材互動
- 更多教材格式
- 更多 Hotspot 類型
- 更多 Properties
- 更多 Action 類型

所有未來功能皆需遵守 MagicBook 3.0 核心架構，不得破壞既有設計。

---

# 8. Text Area

(To be completed)

---

# 9. Interactive Image Area

(To be completed)

---

# 10. HTML Overlay

(To be completed)

---

# 11. Popup System

(To be completed)

---

# 12. Development Principles

(To be completed)

---

# 13. Future Expansion

(To be completed)

---

# 14. Change Log

(To be completed)
