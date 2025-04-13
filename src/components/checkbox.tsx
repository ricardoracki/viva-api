import { Ref, forwardRef } from 'react'

type CheckboxProps = {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
  className?: string
  label: string
}

export const Checkbox = forwardRef(
  (
    { label, inputProps, labelProps }: CheckboxProps,
    ref: Ref<HTMLInputElement>
  ) => (
    <div className="flex items-center gap-2">
      <input type="checkbox" ref={ref} {...inputProps} />
      <label className="text-text text-sm" {...labelProps}>
        {label}
      </label>
    </div>
  )
)
