import toast from 'react-hot-toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { createPlaylist, deletePlaylist, editPlaylistTitle, getPlaylistApi } from '../../lib/api/playlist'
import { addVideo } from '../../lib/api/videos'
import {
  createPlaylistAsync,
  addVideoAsync,
  deletePlaylistAsync,
  editPlaylistTitleAsync,
  getPlaylistAsync,
  playlistActionTypes,
} from './actions'
import { IAddVideoReturn } from './types'

import * as Strings from '../../lib/strings'
import { ICreatePlaylistSuccess, IDeletePlaylistSuccess, IGetPlaylistSuccess } from '../../lib/api/types'
import handleSagaError from '../handleSagaError'

function* getPlaylistSaga() {
  try {
    const res: IGetPlaylistSuccess = yield call(getPlaylistApi)
    yield put(getPlaylistAsync.success(res.response))
  } catch (err) {
    handleSagaError(err, createPlaylistAsync.failure)
  }
}

function* createPlaylistSaga(action: ReturnType<typeof createPlaylistAsync.request>) {
  try {
    const res: ICreatePlaylistSuccess = yield call(createPlaylist, action.payload)
    yield put(createPlaylistAsync.success(res.response))
    toast.success(Strings.addPlaylistSuccess)
  } catch (err) {
    handleSagaError(err, createPlaylistAsync.failure)
  }
}

function* addVideoSaga(action: ReturnType<typeof addVideoAsync.request>) {
  try {
    const res: IAddVideoReturn = yield call(addVideo, action.payload)
    yield put(addVideoAsync.success(res))
    toast.success(Strings.addVideoSuccess)
  } catch (err) {
    handleSagaError(err, createPlaylistAsync.failure)
  }
}

function* deletePlaylistSaga(action: ReturnType<typeof deletePlaylistAsync.request>) {
  try {
    const res: IDeletePlaylistSuccess = yield call(deletePlaylist, action.payload)
    yield put(deletePlaylistAsync.success(res.id))
  } catch (err) {
    handleSagaError(err, deletePlaylistAsync.failure)
  }
}

function* editPlaylistTitleSaga(action: ReturnType<typeof editPlaylistTitleAsync.request>) {
  try {
    yield call(editPlaylistTitle, action.payload)
    yield put(editPlaylistTitleAsync.success(action.payload))
  } catch (err) {
    handleSagaError(err, editPlaylistTitleAsync.failure)
  }
}

export default function* playlistSaga() {
  yield takeLatest(playlistActionTypes.GET_PLAYLIST, getPlaylistSaga)
  yield takeLatest(playlistActionTypes.ADD_PLAYLIST, createPlaylistSaga)
  yield takeLatest(playlistActionTypes.ADD_VIDEO, addVideoSaga)
  yield takeLatest(playlistActionTypes.DELETE_PLAYLIST, deletePlaylistSaga)
  yield takeLatest(playlistActionTypes.EDIT_PLAYLIST_TITLE, editPlaylistTitleSaga)
}
