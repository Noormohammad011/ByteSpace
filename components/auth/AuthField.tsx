import type { ComponentProps } from 'react'
import { Input } from '@/components/ui/input'

type AuthFieldProps = Omit<ComponentProps<'input'>, 'id'> & {
  id: string
  label: string
}

const AuthField = ({ id, label, ...inputProps }: AuthFieldProps) => {
  return (
    <div className="flex flex-col gap-8">
      <label
        htmlFor={id}
        className="font-body text-label-s font-medium text-shuttle-gray-950"
      >
        {label}
      </label>
      <Input id={id} variant="field" required {...inputProps} />
    </div>
  )
}

export default AuthField
