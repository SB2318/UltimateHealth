'use client'

import { useState, useMemo, useEffect } from 'react'
import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { ALL_CONTRIBUTORS, PROJECT_ADMIN } from './contributors-data'
import type { DynamicContributor } from '@/lib/github/types'
import { withBasePath } from '@/lib/basePath'

export default function OurContributorsPage() {
  const [contributors, setContributors] = useState<DynamicContributor[]>(ALL_CONTRIBUTORS)
  const [admin, setAdmin] = useState<DynamicContributor>(PROJECT_ADMIN)
  const [isLive, setIsLive] = useState(false)
  const [isSyncing, setIsSyncing] = useState(true)

  const [search, setSearch] = useState('')
  const [yearFilter, setYearFilter] = useState<'all' | 2024 | 2026>('all')
  const [areaFilter, setAreaFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'commits' | 'changes' | 'name'>('commits')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 36

  // Fetch live contributors dynamically from GitHub API
  useEffect(() => {
    let isMounted = true
    async function loadLiveContributors() {
      try {
        const res = await fetch(withBasePath('/api/contributors'))
        if (!res.ok) throw new Error('API fetch failed')
        const data = await res.json()
        if (isMounted && data.success && Array.isArray(data.contributors)) {
          setContributors(data.contributors)
          if (data.admin) setAdmin(data.admin)
          setIsLive(data.isLive)
        }
      } catch (err) {
        console.info('[Contributors Wall] Using fallback dataset:', err)
      } finally {
        if (isMounted) setIsSyncing(false)
      }
    }
    loadLiveContributors()
    return () => {
      isMounted = false
    }
  }, [])

  // Unique areas
  const areas = useMemo(() => {
    const set = new Set<string>()
    contributors.forEach(c => {
      if (c.area) set.add(c.area)
    })
    return Array.from(set).sort()
  }, [contributors])

  const handleSearchChange = (val: string) => {
    setSearch(val)
    setCurrentPage(1)
  }

  const handleYearFilterChange = (y: 'all' | 2024 | 2026) => {
    setYearFilter(y)
    setCurrentPage(1)
  }

  const handleAreaFilterChange = (a: string) => {
    setAreaFilter(a)
    setCurrentPage(1)
  }

  const handleSortChange = (s: 'commits' | 'changes' | 'name') => {
    setSortBy(s)
    setCurrentPage(1)
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    const list = contributors.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.handle.toLowerCase().includes(q) ||
        (c.area && c.area.toLowerCase().includes(q)) ||
        (c.summary && c.summary.toLowerCase().includes(q))
      const matchesYear =
        yearFilter === 'all' || c.years.includes(yearFilter as number)
      const matchesArea =
        areaFilter === 'all' || c.area === areaFilter
      return matchesSearch && matchesYear && matchesArea
    })

    return list.sort((a, b) => {
      if (sortBy === 'commits') {
        return b.commits - a.commits || b.additions - a.additions
      }
      if (sortBy === 'changes') {
        const totalA = a.additions + a.deletions
        const totalB = b.additions + b.deletions
        return totalB - totalA || b.commits - a.commits
      }
      return a.name.localeCompare(b.name)
    })
  }, [contributors, search, yearFilter, areaFilter, sortBy])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1

  const paginatedContributors = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filtered.slice(start, start + ITEMS_PER_PAGE)
  }, [filtered, currentPage])

  const goToPage = (page: number) => {
    const p = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(p)
    const el = document.getElementById('contributors-grid')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  const totalUnique = contributors.length + 1 // +1 for admin
  const totalCommits = useMemo(() => {
    return contributors.reduce((acc, c) => acc + c.commits, admin.commits)
  }, [contributors, admin])
  const totalAdditions = useMemo(() => {
    return contributors.reduce((acc, c) => acc + c.additions, admin.additions)
  }, [contributors, admin])
  const totalDeletions = useMemo(() => {
    return contributors.reduce((acc, c) => acc + c.deletions, admin.deletions)
  }, [contributors, admin])

  return (
    <>
      <style>{`
        .contrib-wall-page {
          min-height: 100vh;
          background: #f8fafc;
          color: #0f172a;
          font-family: 'Inter', system-ui, sans-serif;
          transition: background-color 0.2s, color 0.2s;
        }
        .contrib-wall-hero {
          background: linear-gradient(135deg, #ede9fe 0%, #f1f5f9 60%, #e0e7ff 100%);
          padding: 130px 24px 70px;
          text-align: center;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid #e2e8f0;
          transition: background 0.2s, border-color 0.2s;
        }
        .contrib-wall-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237c3aed' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }
        .contrib-wall-hero-inner { position: relative; z-index: 1; max-width: 820px; margin: 0 auto; }
        .contrib-hero-top-badges {
          display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;
        }
        .contrib-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.25);
          border-radius: 50px; padding: 6px 18px;
          color: #7c3aed; font-size: 0.78rem; font-weight: 800;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .contrib-live-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #ecfdf5; border: 1px solid #a7f3d0;
          border-radius: 50px; padding: 6px 14px;
          color: #059669; font-size: 0.75rem; font-weight: 700;
        }
        .contrib-live-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #10b981; box-shadow: 0 0 8px #10b981;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }

        .contrib-wall-title {
          font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 900; color: #0f172a;
          line-height: 1.15; margin: 0 0 16px;
          transition: color 0.2s;
        }
        .contrib-wall-sub {
          font-size: 1.08rem; color: #475569; line-height: 1.8;
          margin: 0 0 36px;
          transition: color 0.2s;
        }
        .contrib-stat-row {
          display: inline-flex; flex-wrap: wrap; gap: 12px; justify-content: center;
        }
        .contrib-stat-chip {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.2s;
          min-width: 140px;
        }
        .contrib-stat-num {
          font-size: 1.55rem; font-weight: 900;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .contrib-stat-label { font-size: 0.72rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }

        /* ── Admin Section ── */
        .admin-section { max-width: 1200px; margin: 40px auto 0; padding: 0 24px; }
        .admin-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 30px;
          display: flex;
          align-items: center;
          gap: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          transition: all 0.2s;
        }
        .admin-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #f59e0b, #ec4899, #7c3aed);
        }
        .admin-avatar {
          width: 84px; height: 84px; border-radius: 50%;
          border: 3px solid #f59e0b; flex-shrink: 0;
          box-shadow: 0 0 20px rgba(245,158,11,0.25);
        }
        .admin-header-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 6px; }
        .admin-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white; font-size: 0.72rem; font-weight: 800;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 50px;
        }
        .admin-area-badge {
          display: inline-flex; align-items: center;
          background: rgba(124, 58, 237, 0.1); color: #7c3aed;
          border: 1px solid rgba(124, 58, 237, 0.2);
          font-size: 0.72rem; font-weight: 700;
          padding: 3px 10px; border-radius: 50px;
        }
        .admin-name { font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 2px; }
        .admin-handle { font-size: 0.85rem; color: #7c3aed; font-weight: 600; margin-bottom: 6px; }
        .admin-desc { font-size: 0.86rem; color: #64748b; line-height: 1.6; max-width: 640px; margin: 0 0 10px; }
        .admin-metrics {
          display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
          font-size: 0.8rem; font-weight: 700; color: #475569;
        }
        .admin-link {
          margin-left: auto; flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 8px;
          background: #7c3aed; color: white; text-decoration: none;
          padding: 10px 20px; border-radius: 10px; font-size: 0.82rem; font-weight: 700;
          transition: background 0.2s, transform 0.15s;
        }
        .admin-link:hover { background: #6d28d9; transform: translateY(-1px); }

        /* ── Controls ── */
        .contrib-controls {
          max-width: 1200px; margin: 36px auto 0; padding: 0 24px;
          display: flex; gap: 14px; align-items: center; justify-content: space-between;
          flex-wrap: wrap;
        }
        .contrib-search-wrap { position: relative; flex: 1; min-width: 260px; max-width: 360px; }
        .contrib-search-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #94a3b8; pointer-events: none; display: flex;
        }
        .contrib-search {
          width: 100%;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 9px 14px 9px 40px;
          color: #0f172a;
          font-size: 0.86rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .contrib-search:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.15); }
        .contrib-search::placeholder { color: #94a3b8; }
        
        .contrib-filters-group {
          display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
        }
        .contrib-select {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 8px 12px;
          color: #334155;
          font-size: 0.82rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .contrib-select:focus { border-color: #7c3aed; }
        .contrib-year-tabs { display: flex; gap: 6px; }
        .contrib-year-tab {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 7px 14px;
          color: #64748b;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .contrib-year-tab:hover { border-color: #7c3aed; color: #7c3aed; }
        .contrib-year-tab.active { background: #7c3aed; border-color: #7c3aed; color: white; }

        /* ── Count bar ── */
        .contrib-count-bar {
          max-width: 1200px; margin: 24px auto 0; padding: 0 24px;
          display: flex; align-items: center; gap: 12px;
        }
        .contrib-count-line { flex: 1; height: 1px; background: #e2e8f0; }
        .contrib-count-text { font-size: 0.8rem; color: #94a3b8; font-weight: 600; white-space: nowrap; }
        .contrib-count-text span { color: #7c3aed; font-weight: 700; }

        /* ── Grid ── */
        .contrib-grid {
          max-width: 1200px; margin: 24px auto 0; padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 18px;
        }
        .contrib-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 22px 18px 18px;
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        .contrib-card:hover {
          transform: translateY(-4px);
          border-color: #a78bfa;
          box-shadow: 0 14px 32px rgba(124,58,237,0.12);
        }
        .contrib-card-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7c3aed, #4f46e5);
          opacity: 0; transition: opacity 0.2s;
        }
        .contrib-card:hover .contrib-card-accent { opacity: 1; }

        .contrib-card-top {
          display: flex; align-items: center; gap: 14px; margin-bottom: 12px;
        }
        .contrib-card-img {
          width: 54px; height: 54px; border-radius: 50%;
          border: 2px solid #e2e8f0; flex-shrink: 0;
          transition: border-color 0.25s;
        }
        .contrib-card:hover .contrib-card-img { border-color: #7c3aed; }
        .contrib-card-info { flex: 1; min-width: 0; }
        .contrib-card-name {
          font-size: 14px; font-weight: 700; color: #0f172a;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          line-height: 1.3;
        }
        .contrib-card-handle {
          font-size: 12px; color: #7c3aed; font-weight: 600;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .contrib-badges-row {
          display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 8px;
        }
        .contrib-area-badge {
          display: inline-block;
          font-size: 10.5px; font-weight: 700;
          padding: 3px 9px; border-radius: 50px;
          background: rgba(124, 58, 237, 0.08);
          color: #7c3aed;
          border: 1px solid rgba(124, 58, 237, 0.18);
        }
        .contrib-new-badge {
          display: inline-block;
          font-size: 10px; font-weight: 800;
          padding: 2px 7px; border-radius: 50px;
          background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0;
        }

        .contrib-card-summary {
          font-size: 12px; color: #64748b; line-height: 1.45;
          margin: 0 0 14px; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden; text-overflow: ellipsis;
          min-height: 34px;
        }

        .contrib-metrics-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 8px 12px; background: #f8fafc; border-radius: 10px;
          border: 1px solid #f1f5f9; margin-bottom: 14px;
        }
        .contrib-metric-commits {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11.5px; font-weight: 700; color: #334155;
        }
        .contrib-diff-group {
          display: inline-flex; gap: 6px; font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 11px; font-weight: 700;
        }
        .contrib-diff-add { color: #16a34a; }
        .contrib-diff-del { color: #e11d48; }

        .contrib-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 10px; border-top: 1px solid #f1f5f9;
        }
        .contrib-card-years { display: flex; gap: 4px; }
        .contrib-year-pip {
          font-size: 9.5px; font-weight: 800; letter-spacing: 0.04em;
          padding: 2px 7px; border-radius: 50px;
        }
        .pip-2024 { background: rgba(217,119,6,0.12); color: #b45309; }
        .pip-2026 { background: rgba(124,58,237,0.12); color: #7c3aed; }
        .contrib-card-gh {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 11px; font-weight: 700; color: #475569; text-decoration: none;
          padding: 4px 10px; border-radius: 50px; border: 1px solid #e2e8f0;
          transition: all 0.2s; background: #f8fafc;
        }
        .contrib-card-gh:hover { background: #7c3aed; color: white; border-color: #7c3aed; }

        /* ── Empty state ── */
        .contrib-empty { text-align: center; padding: 80px 24px; color: #64748b; }
        .contrib-empty-emoji { font-size: 3rem; margin-bottom: 12px; }
        .contrib-empty-text { font-size: 16px; font-weight: 600; color: #475569; }

        /* ── Pagination ── */
        .contrib-pagination-wrap {
          margin: 40px auto 30px;
          text-align: center;
        }
        .contrib-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .contrib-page-btn {
          min-width: 38px;
          height: 38px;
          padding: 0 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #334155;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .contrib-page-btn:hover:not(:disabled) {
          border-color: #7c3aed;
          color: #7c3aed;
          background: #f5f3ff;
        }
        .contrib-page-btn.active {
          background: #7c3aed;
          color: #ffffff;
          border-color: #7c3aed;
          box-shadow: 0 4px 12px rgba(124,58,237,0.3);
        }
        .contrib-page-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .contrib-page-dots {
          min-width: 24px;
          text-align: center;
          color: #94a3b8;
          font-weight: 700;
        }
        .contrib-pagination-info {
          margin-top: 10px;
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .admin-card { flex-direction: column; text-align: center; }
          .admin-header-row { justify-content: center; }
          .admin-metrics { justify-content: center; }
          .admin-link { margin-left: 0; width: 100%; justify-content: center; }
          .contrib-controls { flex-direction: column; align-items: stretch; }
          .contrib-search-wrap { max-width: 100%; }
          .contrib-filters-group { width: 100%; justify-content: space-between; }
        }

        /* ── Dark Mode Overrides ── */
        html.dark .contrib-wall-page { background: #0c0c14; color: #f1f5f9; }
        html.dark .contrib-wall-hero {
          background: linear-gradient(135deg, #131322 0%, #1a1a35 60%, #251830 100%);
          border-bottom-color: #252538;
        }
        html.dark .contrib-wall-hero::before {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.4;
        }
        html.dark .contrib-eyebrow {
          background: rgba(124,58,237,0.15); border-color: rgba(124,58,237,0.3);
          color: #a78bfa;
        }
        html.dark .contrib-live-badge {
          background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.3);
          color: #6ee7b7;
        }
        html.dark .contrib-wall-title { color: #f1f5f9; text-shadow: 0 2px 12px rgba(0,0,0,0.4); }
        html.dark .contrib-wall-sub { color: #94a3b8; }
        html.dark .contrib-stat-chip {
          background: rgba(255,255,255,0.05); border-color: #252538;
          box-shadow: none;
        }
        html.dark .contrib-stat-num { color: #f1f5f9; }
        html.dark .contrib-stat-label { color: #94a3b8; }
        html.dark .admin-card {
          background: #13131f;
          border-color: #252538;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        html.dark .admin-area-badge {
          background: rgba(124, 58, 237, 0.2);
          color: #c4b5fd;
          border-color: rgba(124, 58, 237, 0.4);
        }
        html.dark .admin-name { color: #f1f5f9; }
        html.dark .admin-handle { color: #a78bfa; }
        html.dark .admin-desc { color: #94a3b8; }
        html.dark .admin-metrics { color: #94a3b8; }
        html.dark .contrib-search-icon { color: #64748b; }
        html.dark .contrib-search {
          background: #13131f;
          border-color: #252538;
          color: #f1f5f9;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        html.dark .contrib-search:focus { border-color: #7c3aed; }
        html.dark .contrib-search::placeholder { color: #64748b; }
        html.dark .contrib-select {
          background: #13131f;
          border-color: #252538;
          color: #cbd5e1;
        }
        html.dark .contrib-year-tab {
          background: #13131f;
          border-color: #252538;
          color: #94a3b8;
        }
        html.dark .contrib-year-tab:hover { border-color: #7c3aed; color: #a78bfa; }
        html.dark .contrib-count-line { background: #252538; }
        html.dark .contrib-count-text { color: #64748b; }
        html.dark .contrib-count-text span { color: #a78bfa; }
        
        html.dark .contrib-card {
          background: #13131f;
          border-color: #252538;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        html.dark .contrib-card:hover { border-color: #818cf8; box-shadow: 0 14px 36px rgba(102,126,234,0.25); }
        html.dark .contrib-card-img { border-color: #252538; }
        html.dark .contrib-card:hover .contrib-card-img { border-color: #a78bfa; }
        html.dark .contrib-card-name { color: #f1f5f9; }
        html.dark .contrib-card-handle { color: #a78bfa; }
        html.dark .contrib-area-badge {
          background: rgba(124, 58, 237, 0.2);
          color: #c4b5fd;
          border-color: rgba(124, 58, 237, 0.35);
        }
        html.dark .contrib-new-badge {
          background: rgba(16, 185, 129, 0.2);
          color: #6ee7b7;
          border-color: rgba(16, 185, 129, 0.4);
        }
        html.dark .contrib-card-summary { color: #94a3b8; }
        html.dark .contrib-metrics-row {
          background: #181828;
          border-color: #252538;
        }
        html.dark .contrib-metric-commits { color: #cbd5e1; }
        html.dark .contrib-diff-add { color: #4ade80; }
        html.dark .contrib-diff-del { color: #fb7185; }
        html.dark .contrib-card-footer { border-top-color: #1f1f33; }
        html.dark .pip-2024 { background: rgba(217,119,6,0.15); color: #fbbf24; }
        html.dark .pip-2026 { background: rgba(124,58,237,0.15); color: #a78bfa; }
        html.dark .contrib-card-gh {
          background: #0c0c14;
          border-color: #252538;
          color: #94a3b8;
        }
        html.dark .contrib-card-gh:hover { background: #7c3aed; color: white; border-color: #7c3aed; }
        html.dark .contrib-empty { color: #94a3b8; }
        html.dark .contrib-empty-text { color: #94a3b8; }
        html.dark .contrib-page-btn {
          background: #13131f;
          border-color: #252538;
          color: #94a3b8;
        }
        html.dark .contrib-page-btn:hover:not(:disabled) {
          border-color: #7c3aed;
          color: #a78bfa;
          background: rgba(124,58,237,0.15);
        }
        html.dark .contrib-page-btn.active {
          background: #7c3aed;
          color: #ffffff;
          border-color: #7c3aed;
          box-shadow: 0 4px 14px rgba(124,58,237,0.4);
        }
        html.dark .contrib-page-dots { color: #64748b; }
        html.dark .contrib-pagination-info { color: #94a3b8; }
      `}</style>

      <div className="contrib-wall-page">
        <Navbar tracking_id={[]} />

        {/* ── Hero ── */}
        <div className="contrib-wall-hero">
          <div className="contrib-wall-hero-inner">
            <div className="contrib-hero-top-badges">
              <div className="contrib-eyebrow">
                ❤️ Our Contributors
              </div>
              <div className="contrib-live-badge">
                <span className="contrib-live-dot" />
                {isLive ? 'Live via GitHub API' : isSyncing ? 'Connecting to GitHub...' : 'GitHub Synced'}
              </div>
            </div>
            <h1 className="contrib-wall-title">
              The People Behind<br />UltimateHealth
            </h1>
            <p className="contrib-wall-sub">
              Every line of code, every bug fix, every idea — they all matter.
              This dynamic wall automatically syncs with GitHub APIs to celebrate all contributors who make UltimateHealth possible.
            </p>
            <div className="contrib-stat-row">
              <div className="contrib-stat-chip">
                <div className="contrib-stat-num">{totalUnique}</div>
                <div className="contrib-stat-label">Total Contributors</div>
              </div>
              <div className="contrib-stat-chip">
                <div className="contrib-stat-num">{totalCommits.toLocaleString()}</div>
                <div className="contrib-stat-label">Total Commits</div>
              </div>
              <div className="contrib-stat-chip">
                <div className="contrib-stat-num" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                  <span style={{ color: '#16a34a' }}>+{(totalAdditions / 1000).toFixed(0)}k</span> / <span style={{ color: '#e11d48' }}>-{(totalDeletions / 1000).toFixed(0)}k</span>
                </div>
                <div className="contrib-stat-label">Lines of Code</div>
              </div>
              <div className="contrib-stat-chip">
                <div className="contrib-stat-num">2</div>
                <div className="contrib-stat-label">Years Active</div>
              </div>
            </div>

            <div style={{ marginTop: '22px' }}>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-explore-platform-modal'));
                  window.dispatchEvent(new CustomEvent('open-explore-platform'));
                  window.dispatchEvent(new CustomEvent('open-uh-tour'));
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  whiteSpace: 'nowrap',
                  lineHeight: '1.2',
                }}
                className="text-teal-700 dark:text-cyan-300 bg-white/90 dark:bg-slate-900/80 border border-teal-500/30 dark:border-cyan-400/40 hover:bg-teal-600 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-black transition-all shadow-xs"
              >
                <span>🚀 Explore Platform Evolution Storyboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Project Admin ── */}
        <div className="admin-section">
          <div className="admin-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={admin.img} alt={`Avatar of ${admin.name}`} loading="lazy" className="admin-avatar" />
            <div>
              <div className="admin-header-row">
                <span className="admin-badge">👑 Project Admin</span>
                <span className="admin-area-badge">{admin.area}</span>
              </div>
              <div className="admin-name">{admin.name}</div>
              <div className="admin-handle">{admin.handle}</div>
              <p className="admin-desc">
                {admin.summary}. Founder and lead maintainer of UltimateHealth, driving accessible health knowledge for everyone.
              </p>
              <div className="admin-metrics">
                <span>📦 {admin.commits} commits</span>
                <span>•</span>
                <span className="contrib-diff-group">
                  <span className="contrib-diff-add">+{admin.additions.toLocaleString()}</span>
                  <span className="contrib-diff-del">-{admin.deletions.toLocaleString()}</span>
                </span>
                <span>•</span>
                <span>Active: 2024, 2026</span>
              </div>
            </div>
            <a href={admin.url} target="_blank" rel="noopener noreferrer" className="admin-link">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub Profile
            </a>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="contrib-controls">
          <div className="contrib-search-wrap">
            <span className="contrib-search-icon">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              className="contrib-search"
              placeholder="Search by name, handle, area, or feature..."
              value={search}
              onChange={e => handleSearchChange(e.target.value)}
            />
          </div>

          <div className="contrib-filters-group">
            {/* Area filter */}
            <select
              className="contrib-select"
              value={areaFilter}
              onChange={e => handleAreaFilterChange(e.target.value)}
              aria-label="Filter by Area"
            >
              <option value="all">All Areas ({contributors.length})</option>
              {areas.map(a => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>

            {/* Sort filter */}
            <select
              className="contrib-select"
              value={sortBy}
              onChange={e => handleSortChange(e.target.value as any)}
              aria-label="Sort by"
            >
              <option value="commits">Sort by Most Commits</option>
              <option value="changes">Sort by Most Code Changes</option>
              <option value="name">Sort by Name (A-Z)</option>
            </select>

            {/* Year tabs */}
            <div className="contrib-year-tabs">
              {(['all', 2024, 2026] as const).map(y => (
                <button
                  key={y}
                  className={`contrib-year-tab${yearFilter === y ? ' active' : ''}`}
                  onClick={() => handleYearFilterChange(y)}
                >
                  {y === 'all' ? 'All' : y}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Count bar ── */}
        <div id="contributors-grid" className="contrib-count-bar">
          <div className="contrib-count-line" />
          <span className="contrib-count-text">
            {filtered.length > 0 ? (
              <>Showing <span>{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> - <span>{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span>{filtered.length}</span> contributors</>
            ) : (
              <>Showing <span>0</span> contributors</>
            )}
          </span>
          <div className="contrib-count-line" />
        </div>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="contrib-empty">
            <div className="contrib-empty-emoji">🔍</div>
            <div className="contrib-empty-text">No contributors match your search or filter.</div>
          </div>
        ) : (
          <>
            <div className="contrib-grid">
              {paginatedContributors.map((c) => (
                <div key={c.handle} className="contrib-card">
                  <div className="contrib-card-accent" />
                  
                  {/* Top info */}
                  <div className="contrib-card-top">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt={`Avatar of ${c.name}`} loading="lazy" className="contrib-card-img" />
                    <div className="contrib-card-info">
                      <div className="contrib-card-name" title={c.name}>{c.name}</div>
                      <div className="contrib-card-handle">{c.handle}</div>
                    </div>
                  </div>

                  {/* Area Badge & New Badge */}
                  <div className="contrib-badges-row">
                    <span className="contrib-area-badge">{c.area}</span>
                    {c.isNew && <span className="contrib-new-badge">✨ New</span>}
                  </div>

                  {/* Summary */}
                  <p className="contrib-card-summary" title={c.summary}>
                    {c.summary}
                  </p>

                  {/* Metrics Row */}
                  <div className="contrib-metrics-row">
                    <span className="contrib-metric-commits" title="Total commits">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm.95 1a3.5 3.5 0 0 0-6.9 0H1.5a.75.75 0 0 0 0 1.5h2.05a3.5 3.5 0 0 0 6.9 0h4.05a.75.75 0 0 0 0-1.5h-4.05z"/>
                      </svg>
                      {c.commits} {c.commits === 1 ? 'commit' : 'commits'}
                    </span>
                    <span className="contrib-diff-group" title="Code additions and deletions">
                      <span className="contrib-diff-add">+{c.additions.toLocaleString()}</span>
                      <span className="contrib-diff-del">-{c.deletions.toLocaleString()}</span>
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="contrib-card-footer">
                    <div className="contrib-card-years">
                      {c.years.includes(2024) && <span className="contrib-year-pip pip-2024">2024</span>}
                      {c.years.includes(2026) && <span className="contrib-year-pip pip-2026">2026</span>}
                    </div>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="contrib-card-gh">
                      <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                      Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="contrib-pagination-wrap">
                <div className="contrib-pagination">
                  <button
                    className="contrib-page-btn contrib-page-nav"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    ← Prev
                  </button>
                  {getPageNumbers().map((p, idx) =>
                    typeof p === 'number' ? (
                      <button
                        key={idx}
                        className={`contrib-page-btn${currentPage === p ? ' active' : ''}`}
                        onClick={() => goToPage(p)}
                      >
                        {p}
                      </button>
                    ) : (
                      <span key={idx} className="contrib-page-dots">
                        …
                      </span>
                    )
                  )}
                  <button
                    className="contrib-page-btn contrib-page-nav"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    Next →
                  </button>
                </div>
                <div className="contrib-pagination-info">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </>
        )}

        <Footer />
      </div>
    </>
  )
}