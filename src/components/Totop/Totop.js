/**
 * 回到顶部
 * 
 */
import classnames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import debounce from 'lodash/fp/debounce';

import util from './util';
import Animate from 'components/Animate'
import './Totop.less'

class TotopBox extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                className={classnames({
                    'box gotop-box': true,
                    show: this.props.show,
                })}
            >
                <div className="box-window btn" onClick={this.props.onClick}>
                    <span className="box-text">顶部</span>
                    <span className="box-icon"><svg width="22px" height="22px" viewBox="0 0 1040 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M974.721667 146.068773 48.986691 146.068773c-27.055193 0-48.986691-21.931498-48.986691-48.986691 0-27.056216 21.931498-48.987714 48.986691-48.987714l925.734976 0c27.054169 0 48.986691 21.930475 48.986691 48.987714C1023.708358 124.138298 1001.774813 146.068773 974.721667 146.068773zM920.54579 535.681352 546.500768 161.638377c-1.144056-1.146103-2.349511-2.229784-3.603061-3.257184-0.547469-0.450255-1.124614-0.838088-1.684362-1.25969-0.716314-0.539282-1.419326-1.092891-2.164293-1.592264-0.684592-0.456395-1.394766-0.853437-2.096754-1.272993-0.668219-0.402159-1.325182-0.820692-2.01489-1.189082-0.719384-0.385786-1.461281-0.713244-2.196015-1.060145-0.712221-0.338714-1.414209-0.691755-2.145873-0.995677-0.716314-0.295735-1.450025-0.534166-2.176572-0.795109-0.780783-0.282433-1.552356-0.582261-2.349511-0.824785-0.728594-0.217964-1.469468-0.379647-2.204202-0.563842-0.812505-0.206708-1.613754-0.433882-2.442632-0.597611-0.852414-0.167822-1.713015-0.26913-2.573615-0.39295-0.721431-0.103354-1.432629-0.2415-2.164293-0.312108-3.214205-0.318248-6.450922-0.318248-9.66308 0-0.732687 0.070608-1.443885 0.209778-2.165316 0.312108-0.860601 0.12382-1.721201 0.225127-2.575662 0.39295-0.826831 0.163729-1.62808 0.391926-2.440585 0.597611-0.735757 0.184195-1.475608 0.344854-2.204202 0.563842-0.800225 0.242524-1.569752 0.542352-2.351558 0.824785-0.726547 0.260943-1.458211 0.499373-2.173502 0.795109-0.732687 0.303922-1.435699 0.661056-2.14792 0.997724-0.735757 0.344854-1.475608 0.671289-2.194992 1.058099-0.688685 0.36839-1.344624 0.786922-2.013867 1.189082-0.701988 0.419556-1.412163 0.815575-2.096754 1.272993-0.744967 0.49835-1.447978 1.051959-2.164293 1.592264-0.559748 0.421602-1.137916 0.810459-1.684362 1.25969-1.254573 1.027399-2.459005 2.111081-3.605108 3.257184L103.162568 535.681352c-19.130709 19.130709-19.130709 50.14712 0 69.27783s50.146097 19.130709 69.27783 0l290.427602-290.426579 0 609.101525c0 27.054169 21.931498 48.986691 48.986691 48.986691 27.055193 0 48.987714-21.933545 48.987714-48.986691L560.842405 314.532603l290.426579 290.426579c9.565866 9.567913 22.102391 14.347776 34.638915 14.347776 12.537548 0 25.074072-4.779863 34.639938-14.347776C939.676499 585.828472 939.676499 554.812061 920.54579 535.681352z" /></svg></span>
                </div>
            </div>
        )
    }
}

TotopBox.propTypes = {
    show: React.PropTypes.bool,
    onClick: React.PropTypes.func,
};
  
TotopBox.defaultProps = {
    show: false,
    ooClick: () => {},
};

class Totop extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            showTotop: false,
        };
    }

    componentDidMount() {
        const me = this;
        me.renderComponent(); // 添加组件
        me.scrollHandler = addEventListener(window, 'scroll', 
            debounce(300,() => {
                const y = util.getWindowScrollY(); // y轴的滚动距离
                if(y > me.props.distance && !me.state.showTotop) { // 滚动距离大于 distance 并且 没有显示
                    me.setState({
                        showTotop: true
                    })
                } else if (y <= me.props.distance && me.state.showTotop) {
                    me.setState({
                        showTotop: false
                    })
                }
            })
        )
    }

    handleGotopClick() {
        const me = this;
        me.scrollTo(
            me.props.to, me.props.duration, me.props.onTotopEnd,
        );
    }

    getContainer() {
        if (!this.container) {
            const getContainer = util.defaultGetContainer;
            this.container = getContainer();
        }
        return this.container;
    }

    scrollTo(to, duration, callback) {
        if (duration <= 0) {
            if (callback) {
                callback();
            }
            return;
        }
        const me = this;
        const y = util.getWindowScrollY();
        const difference = to - y; // 差值
        const perTick = (difference / duration) * 10; // 每10ms应滚动的距离 负值
        me.timer = setTimeout(() => {
            const targetScrollY = y + perTick; // 每次应该滚动到
            util.setWindowScrollY(targetScrollY < to ? to : targetScrollY);
            me.scrollTo(to, duration - 10, callback);
        },10)
        // 10ms执行一次
    }

    getComponent() {
        const me = this;
        return (
            <div
                className={classnames({
                    [me.props.prefixCls]: true,
                    [me.props.className]: !!me.props.className,
                    [me.props.theme]: !!me.props.theme,
                    'fn-clear': true,
                })}
            >
                <Animate showProp="show" transitionName="toTop">
                    <TotopBox 
                        show={me.state.showTotop}
                        onClick={() => {
                            this.handleGotopClick();
                        }}
                    />
                </Animate>
                {me.props.children}
            </div>
        )
    }

    renderComponent() {
        const me = this;
        ReactDOM.unstable_renderSubtreeIntoContainer(me, me.getComponent(), me.getContainer(),
            function fallback() {

            },
        );
        // 如果直接写util.defaultGetContainer() 会导致每次触发这个函数都会在页面上添加一个节点
        // 这里不要添加，只要更新
    }

    componentDidUpdate() {
        this.renderComponent()
    }

    render() {
        return null;
    }

    componentWillUnmount() {
        const me = this;
        clearTimeout(me.timer);
        if (me.scrollHandler) {
            me.scrollHandler.remove();
        }
        me.removeContainer();
    }

    removeContainer() {
        if (this.container) {
            const container = this.container;
            ReactDOM.unmountComponentAtNode(container);
            container.parentNode.removeChild(container);
            this.container = null;
        }
    }

}

export default Totop

Totop.displayName = 'Totop';

Totop.propTypes = {
    prefixCls: React.PropTypes.string,
    className: React.PropTypes.string,
    to: React.PropTypes.number,
    distance: React.PropTypes.number,
    duration: React.PropTypes.number,
    onTotopEnd: React.PropTypes.func,
    getContainer: React.PropTypes.func,
};

Totop.defaultProps = {
    prefixCls: 'kuma-totop',
    to: 0,
    duration: 600,
    distance: 30,
    onTotopEnd: () => {},
};

/**
 * ReactDOM.unstable_renderSubtreeIntoContainer(this,新节点，目标节点,callback) // callback节点更新完后的回调函数
 * ReactDOM.unmountComponentAtNode(container);   从 DOM 中移除已经挂载的 React 组件，清除相应的事件处理器和 state。删除的是子组件
 * 这里有一种算法
 * 滚动高度是600
 * 根据duration第一次计算出倍数30
 * 600/30 *10= 200 每10秒200
 * 600-200/30-10 = 200
 * 
 */

