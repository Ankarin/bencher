import { englishLevels } from '@/utils/options'

export const selectStyleObject = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? '#4f46e5 !important' : '',
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  input: (base) => ({
    ...base,
    'input:focus': {
      boxShadow: 'none',
    },
  }),
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    // Extract date components
    const year = date.getFullYear()
    const month = monthNames[date.getMonth()]
    const day = String(date.getDate()).padStart(2, '0')

    return `${month} ${day}, ${year}`
  } catch (error) {
    return 'Invalid date format'
  }
}

export const getEnglishNumber = (title: string): number => {
  englishLevels().map((level: string, index: number) => {
    if (level === title) {
      return index
    }
  })
  return 0
}
