import CategoryList from "@/components/category/category-list"

interface Props {
  categoryList: string[]
}

export default function Category(props: Props) {
  return (
    <section className="flex justify-between items-center px-5 sm:px-10">
      <span className="font-medium hidden sm:block">CATEGORIES</span>
      <CategoryList categoryList={props.categoryList} />
    </section>
  )
}
