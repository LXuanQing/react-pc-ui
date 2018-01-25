import assign from 'object-assign';

import Dialog from './dialog'
import './confirm.less'

export default function(props = {},Dialog) {

    const htmlNode = document.documentElement;
    const div = document.createElement('div');
    document.body.appendChild(div);

    const newProps = assign({
        iconClassName: 'kuma-icon-caution',
        width: 320,
        locale: 'zh-cn',
    }, props); // 这儿的和传进来的，和Dialog的属性无关

    function close() {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
    }

    function onCancel() {
        const cancelFn = newProps.onCancel; // 传进来的 和
        if (cancelFn) {
            let ret;
            // console.log(cancelFn.length,"length") // 0
            if (cancelFn.length) {
                ret = cancelFn(close);
            } else {
                ret = cancelFn();
                if (!ret) {
                    close();
                }
            }
            if (ret && ret.then) {
                ret.then(close);
            }
        } else {
            close();
        }
    }

    function onOk() {
        const okFn = newProps.onOk;
        if (okFn) {
            let ret;
            if (okFn.length) {
                ret = okFn(close);
            } else {
                ret = okFn();
                if (!ret) {
                    close();
                }
            }
            if (ret && ret.then) {
                ret.then(close);
            }
        } else {
            close();
        }
    }
    let icon = <i className={`kuma-icon ${newProps.iconClassName}`} />;
    const body = (
        <div className="kuma-confirm-body">
            {icon}
            <div className="kuma-confirm-body-main">
                <span className="kuma-confirm-title">{newProps.title}</span>
                <div className="kuma-confirm-content">{newProps.content}</div>
            </div>
        </div>
    )

    let footer;

    if (newProps.okCancel) {
        footer = (
            <div className="kuma-confirm-action">
                <span type="secondary" size={newProps.buttonSize || 'small'} onClick={onCancel}>{newProps.cancelText}</span>
                <span size={newProps.buttonSize || 'small'} onClick={onOk}>{newProps.okText }</span>
            </div>
        );
    } else {
        footer = (
            <div className="kuma-confirm-action">
            <span size={newProps.buttonSize || 'small'} onClick={onOk}>{newProps.okText}</span>
            </div>
        );
    }
    ReactDOM.render(
        <Dialog
            className={`kuma-dlg-confirm ${newProps.className}`}
            prefixCls="kuma-dlg"
            visible
            closable
            title=""
            footer=""
            onCancel={onCancel}
            transitionName={newProps.transitionName}
            maskTransitionName={newProps.maskTransitionName}
            width={newProps.width}
        >
            <div>{body} {footer}</div>
        </Dialog>,div
    )

}










