import { useRouter } from "next/router"
import BadgeLink from "../ui/badge-link"
import CategoryItem from "./category-item"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

interface Props {
  categoryList: string[]
}

export default function CategoryList(props: Props) {
  const router = useRouter()
  const activeClass = router.pathname === "/" ? "bg-primary text-primary-foreground" : ""

  return (
    <Swiper
      wrapperTag="ul"
      slidesPerView="auto"
      spaceBetween={0}
      className="!ml-0 sm:!mr-0 [&_.swiper-wrapper]:!gap-x-2"
    >
      <SwiperSlide tag="li" className="flex-1">
        <BadgeLink href="/" className={activeClass}>
          ALL
        </BadgeLink>
      </SwiperSlide>
      {props.categoryList.map((category) => (
        <SwiperSlide key={category} tag="li" className="w-max flex-1">
          <CategoryItem category={category} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
