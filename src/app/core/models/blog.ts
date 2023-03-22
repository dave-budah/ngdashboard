export interface Blog {
  title: string,
  permalink: string,
  category: {
    categoryId: string,
    category: string
  },
  postImgPath: string,
  excerpt: string,
  content: string,
  isFeatured: boolean,
  views: number,
  status: string,
  createdOn: Date
}
