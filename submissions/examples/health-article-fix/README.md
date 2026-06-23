# 🐛 Bug Fix: Health Article Mobile Content Overflow Container

This patch addresses and fixes Issue #1876 where long medical terms, unbroken vocabulary text runs, and explicit URL hyperlinks break out of their horizontal boundaries on small mobile screens (320px–375px viewports).

## 🧩 Cause of Bug
Text elements containing long, unbroken character sequences without explicitly declared formatting boundaries default to handling strings as unbroken inline components. This forces parent layout containers to overflow along the X-axis rather than wrapping structural elements naturally.

## 🛠️ The Solution
Adding proper text wrapping definitions directly onto the content container blocks:
```css
.article-content {
  overflow-wrap: break-word;
  word-break: break-word;
}