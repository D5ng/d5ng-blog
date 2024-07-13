type TransformedCategory = { [key: string]: string }

export function transformedCategory(categoryPath: string) {
  const transformedCategoryObj: TransformedCategory = {
    Retrospective: "회고록",
  }

  return transformedCategoryObj[categoryPath] || categoryPath.toUpperCase()
}
