import clsx from 'clsx'
import React from 'react'
import palette from '../../lib/style/palette'

interface IProps {
  error?: string
}

const CustomInput = ({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & IProps) => {
  return (
    <div className="relative transition-all">
      <input
        {...props}
        className={clsx(
          'form_field placeholder:text-transparent',
          'w-full py-1 duration-300 focus:border-redrose-light bg-inherit border-b-[1px]',
          props.className,
        )}
        style={{ borderColor: error ? palette.redrose : palette['blackberry-lightest'] }}
      />
      <label
        htmlFor={props.id}
        className={clsx(
          error && 'text-redrose font-semibold',
          'transition-all unselectable form__label block absolute',
        )}
      >
        {props.placeholder}
      </label>
      <div className="text-left text-xs text-redrose">{error}</div>
    </div>
  )
}

export default React.memo(CustomInput)
