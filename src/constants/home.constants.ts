import {
  ArmImage,
  BackImage,
  CardioImage,
  ChestImage,
  LegImage,
  NeckImage,
  ShoulderImage,
} from '@assets'

export enum RNCarouselPreset {
  Parallax = 'parallax',
  QuickSWipe = 'quickSwipe',
}

export const BODYPART_DATA = [
  { image: ArmImage, title: 'Arms' },
  { image: BackImage, title: 'Back' },
  { image: CardioImage, title: 'Cardio' },
  { image: ChestImage, title: 'Chest' },
  { image: LegImage, title: 'Leg' },
  { image: NeckImage, title: 'Neck' },
  { image: ShoulderImage, title: 'Shoulder' },
]
