import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'uxcore-icon';
import Carousel from './Carousel';

export default class Viewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current,
            scale: 1,
        };
        this.onKeyUp = this.onKeyUp.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.setCurrent = this.setCurrent.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            current: nextProps.current,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.current !== this.state.current) {
            this.props.onSetCurrent(this.state.current);
        }
    }

    onKeyUp(e) {
        const { enableKeyBoardControl } = this.props;
        if (enableKeyBoardControl) {
            this.handleKeyboardEvent(e);
        }
    }
   
    setCurrent(i) {
        this.setState({
            current: i,
        });
    }

    handleKeyboardEvent(e) {
        switch (e.keyCode) {
            case 37:
              // left
              this.prev();
              break;
            case 39:
              // right
              this.next();
              break;
            case 27:
              // esc
              this.props.onClose(e);
              break;
            default:
              break;
        }
    }

    prev() {
        const current = this.state.current;
        if (current === 0) return;
        this.setState({
            current: current - 1,
        });
    }
    
    next() {
        const current = this.state.current;
        let { children } = this.props;
        if (!Array.isArray(children)) {
            children = [children];
        }
        if (current === children.length - 1) return;
        this.setState({
            current: current + 1,
        });
    }
    
    renderControl(type, disabled) {
        return (
            <span
                className={classnames('album-control', 'album-icon', `album-${type}`, {
                    disabled,
                })}
                onClick={this[type]}
            />
        );
    }

    renderCarousel() {
        return (
            <Carousel
                current={this.state.current}
                onPrev={this.prev}
                onNext={this.next}
                onSetCurrent={this.setCurrent}
                inView
            >
                {this.props.children}
            </Carousel>
        );
    }

    render() {
        const { current } = this.state;
        const {
            children, 
            hasControl, 
            onClose, open, showButton,
        } = this.props;
        const prevDisabled = current === 0;
        const nextDisabled = current === children.length - 1;
        return (
            <div
                className={classnames('album-overlay', {
                    'album-overlay-no-control': !hasControl,
                    'album-overlay-hide': !open,
                })}
                ref={(node) => { this.overlay = node; }}
                onKeyUp={this.onKeyUp}
                tabIndex="1"
            >
                {
                    hasControl ? this.renderControl('prev', prevDisabled) : null
                }
                {
                    hasControl ? this.renderControl('next', nextDisabled) : null
                }
                <div className="album-stage" ref={(node) => { this.stage = node; }}>
                    {
                        children[current] && React.cloneElement(children[current], {
                            ref: (c) => { this.photo = c; },
                        })
                    }
                    {showButton ? this.renderFuncButtons() : null}
                </div>
                { hasControl ? this.renderCarousel() : null}
                <span
                    className="album-close album-icon"
                    onClick={onClose}
                />
            </div>
        );
    }
}

Viewer.defaultProps = {
    hasControl: true,
    showButton: false,
    customButtons: [],
    prev() {},
    next() {},
    onClose() {},
    onSetCurrent() {},
    enableKeyBoardControl: true,
    coordinate: null,
    current: 0,
    open: true,
};

Viewer.propTypes = {
    children: PropTypes.array,
    hasControl: PropTypes.bool,
    showButton: PropTypes.bool,
    // customButtons: createCustomButtonsChecker(),
    // prevDisabled: React.PropTypes.bool,
    prev: PropTypes.func,
    // nextDisabled: React.PropTypes.bool,
    next: PropTypes.func,
    onClose: PropTypes.func,
    onSetCurrent: PropTypes.func,
    enableKeyBoardControl: PropTypes.bool,
    coordinate: PropTypes.shape({
        left: PropTypes.number,
        top: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
    }),
    current: PropTypes.number,
    open: PropTypes.bool,
};

Viewer.displayName = 'Viewer';
