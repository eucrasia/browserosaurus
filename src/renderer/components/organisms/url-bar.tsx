import { faBackspace } from '@fortawesome/free-solid-svg-icons/faBackspace'
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog'
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH'
import { faGift } from '@fortawesome/free-solid-svg-icons/faGift'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { css } from 'emotion'
import React from 'react'
import { useDispatch } from 'react-redux'
import Url from 'url'

import { useSelector } from '../../store'
import {
  clickedCloseMenuButton,
  clickedCopyButton,
  clickedQuitButton,
  clickedReloadButton,
  clickedSetAsDefaultBrowserButton,
  clickedSettingsButton,
  clickedUpdateRestartButton,
  clickedUrlBackspaceButton,
  clickedVersionButton,
} from '../../store/actions'
import Button from '../atoms/button'

interface Props {
  className?: string
}

const UrlBar: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const url = useSelector((state) => state.ui.url)
  const isEditMode = useSelector((state) => state.ui.isEditMode)
  const isDefaultProtocolClient = useSelector(
    (state) => state.ui.isDefaultProtocolClient,
  )
  const version = useSelector((state) => state.ui.version)
  const updateStatus = 'downloaded' as 'no-update' | 'available' | 'downloaded'
  // const updateStatus = useSelector((state) => state.ui.updateStatus)

  const isEmpty = url.length === 0
  const parsedUrl = Url.parse(url)

  return (
    <div
      className={clsx(
        className,
        'flex-shrink-0',
        'w-full px-4',
        'flex items-center space-x-4',
        'bg-black bg-opacity-10',
        css({
          height: '74px',
        }),
      )}
    >
      <div
        className={clsx(
          'flex-grow h-full',
          'flex items-center justify-between',
          'overflow-hidden',
          'pr-1',
          'text-sm tracking-wider',
        )}
      >
        {isEditMode && (
          <Button
            aria-label="Version"
            onClick={() => dispatch(clickedVersionButton())}
          >
            {isEditMode && updateStatus === 'available'
              ? 'Downloading update...'
              : `Browserosaurus ${version}`}
          </Button>
        )}

        {!isDefaultProtocolClient && isEditMode && (
          <Button
            aria-label="Set as default browser"
            onClick={() => () => dispatch(clickedSetAsDefaultBrowserButton())}
          >
            Set As Default Browser
          </Button>
        )}

        {!isEditMode && (
          <div
            className="text-sm tracking-wider"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              overflowWrap: 'break-word',
              wordBreak: 'break-all',
              textOverflow: 'ellipsis',
            }}
          >
            <span className="opacity-50">{parsedUrl.protocol}</span>
            <span className="opacity-50">{parsedUrl.slashes && '//'}</span>
            <span>
              {parsedUrl.host || (
                <FontAwesomeIcon fixedWidth icon={faEllipsisH} />
              )}
            </span>
            <span className="opacity-50">
              {parsedUrl.pathname}
              {parsedUrl.search}
              {parsedUrl.hash}
            </span>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 space-x-2">
        {isEditMode && updateStatus === 'downloaded' && (
          <Button
            aria-label="Restart and update"
            className="space-x-2"
            onClick={() => dispatch(clickedUpdateRestartButton())}
          >
            <FontAwesomeIcon icon={faGift} />
            <span>Update</span>
          </Button>
        )}

        {isEditMode && updateStatus === 'no-update' && (
          <Button
            aria-label="Reload"
            onClick={() => dispatch(clickedReloadButton())}
            title="Reload Browserosaurus"
          >
            <FontAwesomeIcon fixedWidth icon={faSync} />
          </Button>
        )}

        {isEditMode && (
          <Button
            aria-label="Quit"
            onClick={() => dispatch(clickedQuitButton())}
            title="Quit"
          >
            <FontAwesomeIcon fixedWidth icon={faSignOutAlt} />
          </Button>
        )}

        {!isEditMode && (
          <Button
            disabled={isEmpty}
            onClick={() => dispatch(clickedUrlBackspaceButton())}
            title="Delete section of URL (Backspace)"
          >
            <FontAwesomeIcon fixedWidth icon={faBackspace} />
          </Button>
        )}

        {!isEditMode && (
          <Button
            disabled={isEmpty}
            onClick={() => dispatch(clickedCopyButton(url))}
            title="Copy (⌘+C)"
          >
            <FontAwesomeIcon fixedWidth icon={faCopy} />
          </Button>
        )}

        {isEditMode ? (
          <Button
            aria-label="Close menu"
            onClick={() => dispatch(clickedCloseMenuButton())}
            title="Close menu (escape)"
          >
            <FontAwesomeIcon fixedWidth icon={faTimes} />
          </Button>
        ) : (
          <Button
            aria-label="Settings menu"
            onClick={() => dispatch(clickedSettingsButton())}
            title="Settings"
          >
            <FontAwesomeIcon
              className={clsx(
                updateStatus === 'downloaded' && 'text-green-600',
              )}
              fixedWidth
              icon={faCog}
              spin={updateStatus === 'available'}
            />
          </Button>
        )}
      </div>
    </div>
  )
}

export default UrlBar
