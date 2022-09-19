import React, { FC } from 'react'

import { Article } from 'features/home/types'
import { Card, Button } from 'react-bootstrap'
import { formatter } from 'utils'
import './styles.css'

interface IArticleCard {
  article: Article
}
const ArticleCard: FC<IArticleCard> = ({ article }) => {
  return (
    <Card className="card-wrapper">
      <Card.Img
        variant="top"
        src={article.images[0].path}
        className="card-item-img"
      />
      <Card.Body>
        <Card.Title>{article.name}</Card.Title>
        <Card.Text>{article.variantName}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-grid">
        <Card.Title className=" mr-auto">
          {formatter.format(article?.prices?.regular?.value / 100)}
        </Card.Title>
        <Button size="sm" className="card-btn ml-auto">
          Add To Cart
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default ArticleCard
