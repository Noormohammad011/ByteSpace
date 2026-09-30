import Image from 'next/image'
import type { Course } from '@/data/types'
import CourseCard from '@/components/home/cards/CourseCard'
import HappyStudentsCard from '@/components/home/cards/HappyStudentsCard'
import { floatOffset } from '@/components/home/Ornaments'
import ScaledCanvas from '@/components/home/ScaledCanvas'

type AuthCollageProps = {
  backCourse: Course
  frontCourse: Course
  className?: string
}

// Collage canvas: origin (122, 300) in the 1440 auth frame, children in local px.
// --avail is the left column width at the start of each band, scrollbar included:
// lg 1024 − 64 padding − 440 card − 48 gap − 16; xl 1280 − 242 − 580 − 48 − 16.
// The column only fits the full 500px canvas from 1440.
const COLLAGE_CANVAS = { width: 500, height: 566 } as const

const AuthCollage = ({
  backCourse,
  frontCourse,
  className,
}: AuthCollageProps) => {
  return (
    <div aria-hidden className={className}>
      <ScaledCanvas
        width={COLLAGE_CANVAS.width}
        height={COLLAGE_CANVAS.height}
        className="lg:mx-0 lg:[--avail:456] xl:[--avail:394] xl:[--s:min(1,calc(var(--avail)/var(--cw)))] min-[1440px]:[--s:1]"
      >
        <CourseCard
          course={backCourse}
          variant="promo"
          className="absolute left-0 top-[93px] h-[384px] w-[371px]"
        />
        <CourseCard
          course={frontCourse}
          variant="promo"
          className="absolute left-[111px] top-[5px] h-[384px] w-[371px]"
        />
        <Image
          src="/assets/home/hero/torus-lime.png"
          alt=""
          width={900}
          height={824}
          style={floatOffset(0, 3)}
          className="absolute left-[50px] top-[45px] h-auto w-[101px] animate-float"
        />
        <Image
          src="/assets/home/hero/pyramid-lime.png"
          alt=""
          width={818}
          height={900}
          style={floatOffset(1, 3)}
          className="absolute left-[-1px] top-[421px] h-auto w-[126px] animate-float"
        />
        <HappyStudentsCard
          tone="lime"
          className="absolute left-[226px] top-[440px]"
        />
        <Image
          src="/assets/home/hero/spring-alt-white.png"
          alt=""
          width={686}
          height={900}
          style={floatOffset(2, 3)}
          className="absolute left-[395px] top-[356px] h-auto w-[98px] animate-float blur-[1px]"
        />
      </ScaledCanvas>
    </div>
  )
}

export default AuthCollage
