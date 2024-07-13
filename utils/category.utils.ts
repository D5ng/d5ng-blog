type TransformedCategory = { [key: string]: string }

function capitalize(value: string) {
  return value
    .split("")
    .map((str, index) => (index === 0 ? str.toUpperCase() : str))
    .join("")
}

export function transformedCategory(categoryPath: string) {
  const transformedCategoryObj: TransformedCategory = {
    Retrospective: "회고록",
  }

  return transformedCategoryObj[categoryPath] || capitalize(categoryPath)
}
