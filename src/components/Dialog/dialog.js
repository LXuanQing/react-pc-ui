import RcDialog from 'rc-dialog';
import classnames from 'classnames';
import assign from 'object-assign';
import confirm from './confirm'
import Icon from 'uxcore-icon';
import './dialog.less'

function noop() {
}

class Dialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
        };
    }
    // 取消
    handleCancel() {
        this.props.onCancel();
    }

    // 确认
    handleOk() {
        this.props.onOk();
    }

    render() {
        const props = this.props;
        const defaultFooter = [
            <div onClick={this.handleCancel.bind(this)} className="foot-btn-cancel">取消</div>,
            <div onClick={this.handleOk.bind(this)} className="foot-btn-confirm">确认</div>
        ]
        let className;
        if (!props.title) {
            className = `${props.className} ${props.prefixCls}-noheader`;
        } else {
            className = props.className;
        }
        const footer = props.footer || defaultFooter;

        const wrapClassName = classnames({
            [props.wrapClassName]: !!props.wrapClassName
        });
        return (
            <RcDialog 
                onClose={this.handleCancel.bind(this)}
                footer={footer}
                {...props}
                className={className}
                wrapClassName={wrapClassName}
                visible={props.visible}
                ref={(c) => {
                    this.dialog = c;
                }}
            />
        )
    }
}
// 使用的时候，传过来的props.children挂载在rc-dialog-body上

Dialog.propTypes = {
    onCancel: React.PropTypes.func,
    onOk: React.PropTypes.func,
    htmlClassName: React.PropTypes.string,
    getContainer: React.PropTypes.func,
    className: React.PropTypes.string,
    iconClassName: React.PropTypes.string,
};
  
Dialog.defaultProps = {
    prefixCls: 'kuma-dlg',
    className: '',
    wrapClassName: '',
    onOk: noop,
    locale: 'zh-cn',
    onCancel: noop,
    width: '520px',
    transitionName: 'dialogSlideDown',
    maskTransitionName: 'dialogFade',
    confirmLoading: false,
    visible: false,
    closable: true,
    maskClosable: false,
    title: '',
    htmlClassName: '',
};

function adjustIcon(props, defaultIcon) {
    const icon = props.iconClassName ? <Icon name={props.iconClassName} /> : <Icon name={defaultIcon} />;
    return props.icon ? props.icon : icon;
}

Dialog.info = (props) => {
    assign(props,{})
    return confirm(props, Dialog);
}

Dialog.confirm = (props) => {
    assign(props, {
        icon: <Icon name="jinggao-full" />,
    });
    return confirm(props, Dialog);
};

export default Dialog

/**
 * Dom结构
 * <div class="rc-dialog-mask"></div>
 * <div class="rc-dialog-wrap">
 *   <div role="document" class="rc-dialog undefined undefined-noheader">
 *      <div class="rc-dialog-content">
 *          <button aria-label="Close" class="rc-dialog-close"><span class="rc-dialog-close-x"></span></button> // 默认显示
 *          <div class="kuma-dlg-header"> <div class="kuma-dlg-title" id="rcDialogTitle0">123</div> </div> // 默认没有 title属性控制
 *          <div class="rc-dialog-body"></div>
 *          <div class="rc-dialog-footer"><div>footer</div> // 默认没有footer 
 *      </div>
 *   </div>
 * </div>
 * 
 * RcDialog rc-dialog 参数
 * className 给div role="document" 加的class
 * closable 是否显示关闭按钮
 * onClose  点击关闭按钮或mask的回调函数
 * wrapClassName 自定义样式的class名称(弹窗容器)。
 * transitionName 给div role="document"加的动画样式 dialogSlideDown-enter dialogSlideDown-enter-active  dialogSlideDown-leave  dialogSlideDown-leave-active
 * maskTransitionName 给mask加的动画样式 dialogFade-enter dialogFade-enter-active
 * maskClosable 点击mask是否可关闭
 * title 标题
 * visible变为false后，mask 有个class rc-dialog-mask-hidden   rc-dialog-wrap  有个display:none内敛样式
 * footer 可以自定义
 * width 宽度
 */

// 使用 <Dialog></Dialog> 初始化就会被渲染上，只是隐藏

// 使用 Dialog.info 是个函数执行，开始不会被渲染