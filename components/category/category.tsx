import CategoryList from "@/components/category/category-list"

interface Props {
  categoryList: string[]
}

export default function Category(props: Props) {
  return (
    <section className="flex justify-between items-center px-10">
      <span className="font-medium">CATEGORIES</span>
      <CategoryList categoryList={props.categoryList} />
    </section>
  )
}
