import React, { useState } from 'react'
import { CustomClearButton } from './CustomButton'
import CustomInput from './CustomInput'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string
  initialText?: string
  error?: string
  onClickCancle?: () => void | Promise<void>
  onClickComplete: (text: string) => void | Promise<void> | string
}

const SimpleTextInput = ({
  title,
  error = '',
  initialText = '',
  onClickCancle: onClickCancleCallback,
  onClickComplete: onClickCompleteCallback,
  ...inputProps
}: IProps) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [text, setText] = useState(initialText)

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('')
    setText(e.target.value)
  }

  const onClickCancle = () => {
    if (onClickCancleCallback !== undefined) {
      onClickCancleCallback()
    }
    setErrorMsg('')
    setText('')
  }

  const onClickComplete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.length === 0) {
      setErrorMsg('내용을 입력해주세요')
      return
    }
    const res = onClickCompleteCallback(text)
    if (typeof res === 'string') {
      setErrorMsg(res)
    }
  }

  return (
    <form className="space-y-4" onSubmit={onClickComplete}>
      <div className="text-blackberry">{title}</div>
      <CustomInput error={error || errorMsg} onChange={onChangeText} {...inputProps} />
      <div className="flex gap-x-4 justify-center">
        {onClickCancleCallback !== undefined && (
          <CustomClearButton text="취소" type="secondary" onClick={onClickCancle} />
        )}
        <button type="submit">
          <CustomClearButton text="완료" type="primary" />
        </button>
      </div>
    </form>
  )
}

export default React.memo(SimpleTextInput)
