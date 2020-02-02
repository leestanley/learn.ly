import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Hls from 'hls.js';

import omit from 'lodash/omit'
import getPosterSrc from '../../utils/getPosterSrc';

const propTypes = {
  autoload: PropTypes.bool,
  autoplay: PropTypes.bool,
  loop: PropTypes.bool,
  showControls: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
  playbackId: PropTypes.string.isRequired,
  poster: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onClick: PropTypes.func,
  status: PropTypes.string
}

const handledPropNames = [
  'autoload',
  'autoplay',
  'muted',
  'showControls',
  'style',
  'className',
  'playbackId',
  'poster',
  'onClick',
  'children',
  'status'
]

class VideoPlayer extends Component {
  state = {
    posterUrl: null,
    source: null,
    isLoading: true,
    error: null
  }

  static defaultProps = {
    autoload: true,
    autoplay: false,
    className: '',
    height: '',
    loop: false,
    muted: false,
    showControls: true,
    style: {width: '100%', height: 'auto'},
    width: '100%',
    poster: true,
    playbackId: '',
    status: 'preparing'
  }

  videoContainer = React.createRef()
  hls = null

  static getDerivedStateFromProps(nextProps) {
    let source = null
    let posterUrl = null
    let isLoading = true
    const {playbackId, status, poster} = nextProps

    // TODO: STATUS
    if (status === 'preparing') {
      isLoading = 'MUX is processing the video'
    }
    if (status === 'ready' || status === 'active') {
      isLoading = false
    }
    if (playbackId) {
      source = `https://stream.mux.com/${playbackId}.m3u8`
      // Load video poster only if explictly requested.
      if (poster === true) {
        posterUrl = getPosterSrc(playbackId, {
          time: 1,
          fitMode: 'preserve'
        })
      }
    }
    if (typeof status === 'undefined') {
      isLoading = false
    }
    if (typeof poster === "string") {
      posterUrl = poster
    }
    return {isLoading, source, posterUrl}
  }

  componentDidMount() {
    this.video = React.createRef()
    this.setState(VideoPlayer.getDerivedStateFromProps(this.props))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.source !== null && this.video.current && !this.video.current.src) {
      this.setState({error: null})
      this.attachVideo()
    }
    if (this.state.source !== null && this.state.source !== prevState.source) {
      this.setState({error: null, showControls: false})
      if (this.hls) {
        this.hls.destroy()
      }
      this.attachVideo()
    }
  }

  getVideoElement() {
    return this.video && this.video.current
  }

  attachVideo() {
    const {autoload} = this.props
    if (Hls.isSupported()) {
      this.hls = new Hls({autoStartLoad: autoload})
      this.hls.loadSource(this.state.source)
      this.hls.attachMedia(this.video.current)
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (this.videoContainer.current) {
          this.videoContainer.current.style.display = 'block'
        }
      })
      this.hls.on(Hls.Events.ERROR, (event, data) => {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            if(this.videoContainer.current) {
              this.videoContainer.current.style.display = 'none'
            }
            this.setState({error: data})
            break
          case Hls.ErrorTypes.MEDIA_ERROR:
            // Don't output anything visible as these mostly are non-fatal
            break
          default:
            this.videoContainer.current.style.display = 'none'
            this.setState({error: data})
        }
        console.error(data) // eslint-disable-line no-console
      })
    } else if (this.video.current.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.current.src = this.state.source
      this.video.current.addEventListener('loadedmetadata', () => {
        this.videoContainer.current.style.display = 'block'
      })
      this.video.current.addEventListener('error', () => {
        this.videoContainer.current.style.display = 'none'
        this.setState({
          error: {
            type: `${this.video.current.error.constructor.name} code ${
              this.video.current.error.code
            }`
          }
        })
        console.error(this.video.current.error) // eslint-disable-line no-console
      })
    }
  }

  handleVideoClick = event => {
    const {autoload} = this.props
    if (!autoload) {
      this.setState({showControls: true})
      if (this.hls) {
        this.hls.startLoad(0)
      }
    }
    if (this.props.onClick) {
      this.props.onClick(event)
    }
  }

  // eslint-disable-next-line complexity
  render() {
    const {posterUrl, isLoading, error} = this.state
    const {status, autoload, children} = this.props

    if (!status) {
      return null
    }

    if (isLoading) {
      return (
        <div className={this.props.className} style={this.props.style}>
          <div className="SanityMuxPlayerInfoContainer">
            Please connect with a live streaming software using the code provided!
          </div>
        </div>
      )
    }

    let showControls = autoload || this.state.showControls
    if (this.props.showControls === false) {
      showControls = false
    }

    const videoProps = omit(this.props, handledPropNames)

    return (
      <div className={this.props.className} style={this.props.style}>
        <div ref={this.videoContainer}>
          <video
            style={{display: 'block'}}
            onClick={this.handleVideoClick}
            controls={showControls}
            muted={this.props.autoplay || this.props.muted}
            autoPlay={this.props.autoplay}
            ref={this.video}
            poster={posterUrl}
            {...videoProps}
          />
        </div>
      </div>
    )
  }
}

VideoPlayer.propTypes = propTypes;

export default VideoPlayer;
