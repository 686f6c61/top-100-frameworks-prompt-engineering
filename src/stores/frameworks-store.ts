/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file stores/frameworks-store.ts
 * @description Store Zustand para filtros y búsqueda de frameworks
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import { create } from 'zustand'
import type { FrameworkCategory, FrameworkComplexity, FrameworkSortBy, SortOrder } from '@/types'

interface FrameworksState {
  // Búsqueda
  search: string
  setSearch: (search: string) => void

  // Filtro por categoría
  categoryFilter: FrameworkCategory | null
  setCategoryFilter: (category: FrameworkCategory | null) => void

  // Filtro por complejidad
  complexityFilter: FrameworkComplexity | null
  setComplexityFilter: (complexity: FrameworkComplexity | null) => void

  // Filtro por tags
  tagsFilter: string[]
  setTagsFilter: (tags: string[]) => void
  addTagFilter: (tag: string) => void
  removeTagFilter: (tag: string) => void

  // Ordenamiento
  sortBy: FrameworkSortBy
  setSortBy: (sortBy: FrameworkSortBy) => void

  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void

  // Vista (grid o lista)
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void

  // Favoritos (persistir en localStorage)
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean

  // Reset filtros
  resetFilters: () => void

  // Estado de carga
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const DEFAULT_FILTERS = {
  search: '',
  categoryFilter: null,
  complexityFilter: null,
  tagsFilter: [],
  sortBy: 'popularity' as FrameworkSortBy,
  sortOrder: 'desc' as SortOrder,
  viewMode: 'grid' as const,
}

// Cargar favoritos de localStorage
const loadFavorites = (): string[] => {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem('top100-frameworks-favorites')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// Guardar favoritos en localStorage
const saveFavorites = (favorites: string[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('top100-frameworks-favorites', JSON.stringify(favorites))
  }
}

export const useFrameworksStore = create<FrameworksState>()((set, get) => ({
  // Estado inicial
  ...DEFAULT_FILTERS,
  favorites: loadFavorites(),
  isLoading: false,

  // Búsqueda
  setSearch: (search) => set({ search }),

  // Filtros
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setComplexityFilter: (complexity) => set({ complexityFilter: complexity }),

  // Tags
  setTagsFilter: (tags) => set({ tagsFilter: tags }),
  addTagFilter: (tag) =>
    set((state) => ({
      tagsFilter: state.tagsFilter.includes(tag)
        ? state.tagsFilter
        : [...state.tagsFilter, tag],
    })),
  removeTagFilter: (tag) =>
    set((state) => ({
      tagsFilter: state.tagsFilter.filter((t) => t !== tag),
    })),

  // Ordenamiento
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),

  // Vista
  setViewMode: (mode) => set({ viewMode: mode }),

  // Favoritos
  toggleFavorite: (id) =>
    set((state) => {
      const newFavorites = state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id]
      saveFavorites(newFavorites)
      return { favorites: newFavorites }
    }),

  isFavorite: (id) => get().favorites.includes(id),

  // Reset
  resetFilters: () => set(DEFAULT_FILTERS),

  // Loading
  setIsLoading: (loading) => set({ isLoading: loading }),
}))

// Selector para verificar si hay filtros activos
export const useHasActiveFilters = () =>
  useFrameworksStore((state) => {
    return (
      state.search.length > 0 ||
      state.categoryFilter !== null ||
      state.complexityFilter !== null ||
      state.tagsFilter.length > 0
    )
  })

// Selector para contar filtros activos
export const useActiveFiltersCount = () =>
  useFrameworksStore((state) => {
    let count = 0
    if (state.search.length > 0) count++
    if (state.categoryFilter !== null) count++
    if (state.complexityFilter !== null) count++
    count += state.tagsFilter.length
    return count
  })
