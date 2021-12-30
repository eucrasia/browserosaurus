/* eslint-disable unicorn/prefer-regexp-test */
import {
  clickedDonate,
  clickedMaybeLater,
  clickedRestorePicker,
  installedAppsRetrieved,
  urlOpened,
} from '../../../shared/state/actions'
import type { Channel } from '../../../shared/state/channels'
import type { Middleware } from '../../../shared/state/model'
import { getKeyLayout } from '../../shared/state/thunk.get-key-layout-map'
import { favAppRef } from '../refs'

/**
 * Pass actions between main and renderers
 */
export const pickerMiddleware =
  (channel: Channel): Middleware =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    // eslint-disable-next-line node/callback-return -- Move to next middleware
    const result = next(action)

    const doesActionOpenPicker =
      urlOpened.match(action) || clickedRestorePicker.match(action)

    if (
      doesActionOpenPicker ||
      installedAppsRetrieved.match(action) ||
      clickedDonate.match(action) ||
      clickedMaybeLater.match(action)
    ) {
      favAppRef.current?.focus()
    }

    if (doesActionOpenPicker) {
      dispatch(getKeyLayout(channel))
    }

    return result
  }
