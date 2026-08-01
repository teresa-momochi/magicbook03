# MagicBook 3.0 Development Guidelines

Version: Draft

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-01

---

# Table of Contents

1. Purpose
2. Core Development Principles
3. Architecture Principles
4. Module Design
5. UI Development Guidelines
6. Data Management Guidelines
7. Feature Development Guidelines
8. Coding Principles
9. Version Control
10. Change Log

---

# 1. Purpose

本文件定義 MagicBook 3.0 的開發規範（Development Guidelines）。

所有功能開發皆應遵守本文件。

本文件目的為：

- 建立一致的系統架構
- 降低模組耦合（Low Coupling）
- 提高可維護性（Maintainability）
- 提高可擴充性（Scalability）
- 避免新增功能時破壞既有架構

所有工程實作皆應以本文件為共同準則。

---

# 2. Core Development Principles

MagicBook 所有開發皆須遵守以下核心原則：

- Architecture First（架構優先）
- Modular Design（模組化設計）
- Separation of Concerns（關注點分離）
- Single Responsibility（單一職責）
- Reusability（可重複利用）
- Maintainability（可維護）
- Scalability（可擴充）

新增功能不得破壞既有架構。

---

# 3. Architecture Principles

所有系統皆建立於統一架構：

Workspace

↓

Book

↓

Lesson

↓

Page

↓

Image Area

+

Text Area

Image Area 與 Text Area 為平行模組。

兩者：

- 不共享資料
- 不互相依賴
- 不直接呼叫彼此功能

若需共同功能，應建立共用模組（Shared Module）。

---

# 4. Module Design

所有功能皆應設計為獨立模組（Module）。

例如：

- Book Module
- Lesson Module
- Page Module
- Image Area Module
- Text Area Module
- Hotspot Module
- Popup Module
- AI Module

各模組應：

- 可獨立開發
- 可獨立測試
- 可獨立維護
- 可獨立替換

不得直接修改其他模組內部程式。

---

# 5. UI Development Guidelines

所有畫面皆應保持一致的操作模式。

共同原則：

- 固定版面配置
- 一致的按鈕樣式
- 一致的操作流程
- 一致的命名方式

所有新增畫面皆須符合既有 UI 設計。

不得因單一功能重新設計整體介面。

---

# 6. Data Management Guidelines

所有資料皆應遵守以下原則：

- 每筆資料皆具有唯一識別（Unique ID）
- 每筆資料皆具有所有者（Owner）
- 各模組資料獨立管理
- 不得跨模組直接修改資料

未來導入 Supabase 時，應保持相同資料架構。

---

# 7. Feature Development Guidelines

新增功能時必須遵守：

不得修改既有教材（Teaching Content）。

互動功能應建立於教材之上。

不得直接修改 Image Area。

不得直接修改 Text Area。

應以模組擴充方式加入功能。

例如：

Interactive Hotspot

↓

Popup

↓

Dictionary

↓

AI

皆應透過既有架構整合。

不得建立第二套流程。

---

# 8. Coding Principles

所有程式應遵守：

- 清楚命名（Clear Naming）
- 避免重複程式（Don't Repeat Yourself）
- 保持函式單一職責
- 保持元件可重複使用
- 避免硬編碼（Hard Coding）
- 保留未來擴充能力

程式應優先考慮可閱讀性，而非過度最佳化。

---

# 9. Version Control

所有功能應採逐步開發。

每次修改應：

- 保持可編譯
- 保持可執行
- 保持可測試

重大功能應分支（Branch）開發。

完成測試後再合併（Merge）。

所有重要修改皆應更新：

- Product Specification
- MVP Development
- Change Log

保持文件與程式同步。

---

# 10. Change Log

| Version | Date | Description |
|----------|------------|-----------------------------|
| Draft | 2026-08-01 | Initial Development Guidelines document |
