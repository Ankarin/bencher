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
};
