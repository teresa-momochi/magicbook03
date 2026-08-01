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

(To be completed)

---

# 5. Workspace Architecture

(To be completed)

---

# 6. Book / Lesson / Page

(To be completed)

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
