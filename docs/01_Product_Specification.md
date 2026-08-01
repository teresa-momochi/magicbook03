# MagicBook 3.0 Product Specification

Version: Draft

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-01

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

---

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

(To be completed)

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
