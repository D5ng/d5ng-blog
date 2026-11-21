import { categoryLabels, type CategoryCounts } from "@/lib/category"
import { categories, type Category } from "@/lib/post-schema"
import { Chip } from "./chip"

export function CategoryChips({
  selected,
  counts,
  onSelect,
}: {
  selected: Category | null
  counts: CategoryCounts
  onSelect?: (category: Category | null) => void
}) {
  return (
    <div role="group" aria-label="분류" className="flex flex-wrap gap-8">
      <Chip pressed={selected === null} count={counts.all} onClick={onSelect && (() => onSelect(null))}>
        전체
      </Chip>
      {categories.map((category) => (
        <Chip
          key={category}
          pressed={selected === category}
          count={counts[category]}
          onClick={onSelect && (() => onSelect(category))}
        >
          {categoryLabels[category]}
        </Chip>
      ))}
    </div>
  )
}
