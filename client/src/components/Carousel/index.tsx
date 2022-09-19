import React, { FC, useMemo } from 'react'

import { useAppSelector } from 'app/hooks'
import { selectProductList, splitArticleList } from 'features/home/homeSlice'
import { Article, Category } from 'features/home/types'
import { Carousel } from 'react-bootstrap'
import { generateUniqueId } from 'utils'
import './styles.css'

const CarouselComponent: FC = () => {
  const productList = useAppSelector(selectProductList)

  const renderCarouselImages = useMemo(() => {
    return productList?.data?.map((category: Category) => {
      const chunkArticleList = splitArticleList(category)

      return chunkArticleList?.map((articles: Article[], i: number) => {
        return (
          <Carousel.Item key={generateUniqueId()} className="my-5">
            <div className="d-flex">
              {articles?.map(
                (article: Article) =>
                  article?.images?.length > 0 && (
                    <div key={generateUniqueId()} className="carousal-item p-4">
                      <img
                        src={article?.images[0].path}
                        alt="First slide"
                        className="carousal-item-img"
                      />
                      <h6 className="">{article?.name}</h6>
                    </div>
                  )
              )}
            </div>
          </Carousel.Item>
        )
      })
    })
  }, [productList])

  return (
    <Carousel
      data-testid="carousel"
      interval={3000}
      className="carousal-wrapper w-100 h-25 p-3"
    >
      {renderCarouselImages}
    </Carousel>
  )
}

export default CarouselComponent
