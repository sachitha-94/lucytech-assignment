export interface ProductList {
  data: Category[]
  status: Status
}
export interface Category {
  name: string
  categoryArticles: CategoryArticle
  articleCount: number
  childrenCategories: ChildCategory
}

export interface Article {
  name: string
  variantName: string
  prices: Prices
  images: Image[]
}

export interface ChildCategoryList {
  name: string
  urlPath: string
}

export interface ChildCategory {
  list: ChildCategoryList[]
}

export interface Prices {
  currency: string
  regular: {
    value: number
  }
}

export interface Image {
  path: string
}

export interface CategoryArticle {
  articles: Article[]
}

export type Status = 'idle' | 'loading' | 'failed' | null

export enum Sort {
  LOWTOHIGH = 1,
  HIGHTOLOW = 2,
  ASCENDING = 3,
  DESCENDING = 4,
}

export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}
