# MagicBook 3.0 Roadmap

Version: Draft

Status: Draft

Document Owner: Teresa Su

Product Manager: ChatGPT

Technical Lead: 阿德

Last Update: 2026-08-01

---

# Table of Contents

1. Roadmap Purpose
2. Product Development Strategy
3. Version Planning
4. MVP Stage
5. Beta Stage
6. Version 1.0
7. Future Expansion
8. Development Principles
9. Change Log

---

# 1. Roadmap Purpose

本文件定義 MagicBook 3.0 的產品開發路線圖（Roadmap）。

Roadmap 的目的在於規劃各版本的開發目標，協助產品、設計與工程團隊了解每個階段的工作範圍與優先順序。

本文件不定義功能細節。

功能規格請參閱：

- 01_Product_Specification.md
- 02_MVP_Development.md

---

# 2. Product Development Strategy

MagicBook 採分階段（Phased Development）方式開發。

每個版本皆須建立於既有架構之上，不得因新增功能而破壞核心設計。

產品開發原則：

- Architecture First（架構優先）
- MVP First（先完成最小可行產品）
- Progressive Expansion（逐步擴充）
- Long-term Maintainability（長期維護）
- Scalability（可持續擴充）

---

# 3. Version Planning

MagicBook 3.0 規劃如下：

| Version | Goal |
|----------|------|
| MVP | 建立完整教材操作流程 |
| Beta | 完成核心互動功能 |
| Version 1.0 | 完成正式商業版本 |
| Future | 持續功能擴充 |

---

# 4. MVP Stage

## Goal

建立完整教材管理流程。

驗證產品架構與使用者操作流程。

## Scope

完成：

- Home
- Book Editor
- Image Area
- Text Area
- Save Book
- Book Library
- Reading Mode

建立：

- Book
- Lesson
- Page

完成教材建立、管理與閱讀流程。

## Not Included

MVP 不包含：

- AI
- Interactive Hotspot
- Dictionary
- Popup System
- HTML Overlay
- Workspace
- Multi-user
- Learning Analytics
- Data Synchronization

---

# 5. Beta Stage

Beta 目標為建立教材互動能力。

預計逐步加入：

- Interactive Hotspot
- Popup System
- HTML Overlay
- Dictionary
- Audio
- Video
- AI Integration

Beta 階段將開始驗證互動教材體驗。

---

# 6. Version 1.0

Version 1.0 為正式商業版本。

預計完成：

- Personal Mode
- Workspace Architecture
- Multi-user Support
- User Permission
- AI Assistant
- Cloud Storage
- Supabase Integration
- System Optimization

完成後即可提供正式商業使用。

---

# 7. Future Expansion

Future 版本保留以下方向：

- Organization Mode
- Classroom Collaboration
- Teaching Analytics
- AI Assisted Teaching
- Plugin Architecture
- Third-party Integration
- Mobile Support
- Internationalization

Future 功能將依產品發展逐步規劃。

---

# 8. Development Principles

所有版本皆須遵守：

- 不修改既有教材內容（Teaching Content）
- 教材與互動完全分離（Content / Interaction Separation）
- 模組化設計（Modular Architecture）
- 可維護（Maintainable）
- 可擴充（Scalable）

所有新功能皆須符合 Brand Philosophy 與 Product Specification。

---

# 9. Change Log

| Version | Date | Description |
|----------|------------|-----------------------------|
| Draft | 2026-08-01 | Initial Roadmap document |
