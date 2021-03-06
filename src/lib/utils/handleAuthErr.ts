import { testPassword } from './testRegs'

import { auth as authStrings } from '../strings'
import axios from 'axios'

export default function handleError(code: string) {
  switch (code) {
    case 'blank_id':
      return authStrings.BLANK_ID
    case 'short_id':
      return authStrings.SHORT_ID
    case 'blank_password':
      return authStrings.BLANK_PASSWORD
    case 'auth/wrong-password':
      return authStrings.WRONG_PASSWORD
    case 'auth/user-not-found':
      return authStrings.USER_NOT_EXST
    case 'auth/id-already-in-use':
      return authStrings.ID_ALREADY_EXST
    case 'not_match_password_and_check':
      return authStrings.PASSWORD_CHECK_NOT_MATCH
    case 'password_not_formmatted':
      return authStrings.PASSWORD_NOT_FORMATTED
    case 'auth/same-password':
      return authStrings.SAME_PASSWORD
    default:
      return authStrings.UNKNOWN_ERROR
  }
}

export const checkId = (id: string) => {
  if (!id) {
    return handleError('blank_id')
  } else if (id.length < 6) {
    return handleError('short_id')
  }
  return ''
}

export const checkPassword = (password: string, passwordCheck?: string) => {
  if (!password) {
    return handleError('blank_password')
  } else if (!testPassword(password)) {
    return handleError('password_not_formmatted')
  } else if (passwordCheck !== undefined && password !== passwordCheck) {
    return handleError('not_match_password_and_check')
  }
  return ''
}

export const checkPasswordCheck = (password: string, passwordCheck: string) => {
  if (password !== passwordCheck) {
    return handleError('not_match_password_and_check')
  }
  return ''
}

export const handleAuthApiError = (err: any) => {
  if (axios.isAxiosError(err)) {
    switch (err.response?.data.message) {
      case '비밀번호가 일치하지 않습니다.':
        return handleError('auth/wrong-password')
      case '존재하지 않는 회원입니다.':
        return handleError('auth/user-not-found')
      case 'ID가 중복된 회원입니다.':
        return handleError('auth/id-already-in-use')
      case '기존 비밀번호와 같은 비밀번호 입니다.':
        return handleError('auth/same-password')
      default:
        return handleError('auth/unknown-error')
    }
  } else {
    return handleError('auth/unknown-error')
  }
}

export const classifyError = (err: string): 'password' | 'id' | 'passwordCheck' => {
  switch (err) {
    case authStrings.WRONG_PASSWORD:
      return 'password'
    case authStrings.BLANK_PASSWORD:
      return 'password'
    case authStrings.USER_NOT_EXST:
      return 'id'
    case authStrings.ID_ALREADY_EXST:
      return 'id'
    case authStrings.PASSWORD_CHECK_NOT_MATCH:
      return 'passwordCheck'
    case authStrings.PASSWORD_NOT_FORMATTED:
      return 'password'
    case authStrings.SAME_PASSWORD:
      return 'password'
  }
  return 'password'
}
