import { colorForInterest } from "@/lib/types/interest"

const InterestComponent = ({
    interest,
    selected = true
}: {
    interest: string
    selected?: boolean
}) => {
    const numberOfTextElements = 11
  return (
    <div className={`w-full min-w-20 aspect-[2/3] flex flex-col items-center justify-center overflow-hidden relative border-8 ${selected ? 'border-twitch-purple' : 'border-trasparent'}`}
    style={{backgroundColor: colorForInterest(interest)}}>
        {[...Array(numberOfTextElements)].map((_, index) => (
            <p key={index} style={{ opacity: getOpacity(index)}} className="text-center text-lg tracking-widest mix-blend-luminosity">
                {interest}
            </p>
        ))}
    </div>
  )
    function getOpacity(index: number): number {
        const middleIndex = Math.floor(numberOfTextElements / 2)
        return 1 - (Math.abs(index - middleIndex) * 1.9) / middleIndex
    }
}
export default InterestComponent