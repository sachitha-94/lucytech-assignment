import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import ArticleCard from 'components/ArticleCard'
import CarouselComponent from 'components/Carousel'
import NavbarComponent from 'components/Navbar'
import _ from 'lodash'
import { Form } from 'react-bootstrap'
import { generateUniqueId } from 'utils'

import {
  selectProductList,
  fetchProductListAsync,
  selectSearch
} from './homeSlice'
import { Category, Article, Sort, SortOrder } from './types'

import './styles.css'

const ArticleList: FC = () => {
  const dispatch = useAppDispatch()

  const productList = useAppSelector(selectProductList)
  const searchText = useAppSelector(selectSearch)

  const [sort, setSort] = useState<number>()

  useEffect(() => {
    dispatch(fetchProductListAsync())
  }, [])

  const handleSort = (value: number): void => {
    setSort(value)
  }

  const sortCategoryArticles = useCallback(
    (articles: Article[]): Article[] => {
      switch (sort) {
        case Sort.LOWTOHIGH:
          return _.orderBy(
            articles,
            (item) => item.prices.regular.value,
            SortOrder.ASCENDING
          )
        case Sort.HIGHTOLOW:
          return _.orderBy(
            articles,
            (item) => item.prices.regular.value,
            SortOrder.DESCENDING
          )
        case Sort.ASCENDING:
          return _.orderBy(articles, (item) => item.name, [
            SortOrder.ASCENDING
          ])
        case Sort.DESCENDING:
          return _.orderBy(articles, (item) => item.name, [
            SortOrder.DESCENDING
          ])

        default:
          return articles
      }
    },
    [sort]
  )

  const articles = useMemo(() => {
    return productList?.data?.map((category: Category) => (
      <div key={generateUniqueId()} className="content">
        <div className="row">
          <h1 className="col-10">
            {category?.name}
            <small> ({category?.articleCount})</small>
          </h1>
          <Form.Select
            aria-label="sort-select"
            className="sort-dropdown col-2 text-end"
            size="sm"
            onChange={(e) => handleSort(Number(e.target.value))}
            value={sort}
          >
            <option value={Sort.LOWTOHIGH}>Price Low to High</option>
            <option value={Sort.HIGHTOLOW}>Price High to Low</option>
            <option value={Sort.ASCENDING}>Name Ascending</option>
            <option value={Sort.DESCENDING}>Name Descending</option>
          </Form.Select>
        </div>
        <div className="articles">
          {sortCategoryArticles(category?.categoryArticles?.articles)
            ?.filter((a: Article) =>
              a.name?.toUpperCase()?.includes(searchText?.toUpperCase())
            )
            ?.map((article) => {
              return <ArticleCard key={generateUniqueId()} article={article} />
            })}
        </div>
      </div>
    ))
  }, [productList, searchText, sort])

  return (
    <div className="home-container">
      <NavbarComponent />
      {productList?.data?.length > 0 && (
        <div>
          <CarouselComponent />
          {articles}
        </div>
      )}

      <div className="footer">
        Alle Preise sind in Euro (€) inkl. gesetzlicher Umsatzsteuer und
        Versandkosten.
      </div>
    </div>
  )
}

export default ArticleList
