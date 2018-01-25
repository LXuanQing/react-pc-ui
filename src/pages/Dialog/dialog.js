import Dialog from 'components/Dialog'

function info() {
    Dialog.info({
        title: '这是一条通知信息',
        content: '一些附加信息一些附加信息一些附加信息',
        onOk() {},
        onCancel() {}
    });
}
  
function success() {
    Dialog.success({
        title: '这是一条通知信息',
        content: '一些附加信息一些附加信息一些附加信息',
    });
}
  
function error() {
    Dialog.error({
        title: '这是一条通知信息',
        content: '一些附加信息一些附加信息一些附加信息',
    });
}

function showConfirm() {
    Dialog.confirm({
      title: '您是否确认要删除这项内容',
      content: '一些解释',
      onOk() {
        alert('确定');
      },
      onCancel() { },
    });
}
class Dialog_demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    show() {
        this.setState({
            visible: true
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.show.bind(this)}>显示对话框</button>
                <Dialog 
                    visible={this.state.visible}
                    title="标题"
                    onOk={() => {
                        this.setState({
                            visible: false,
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                        });
                    }}
                >
                    <p>123</p>
                </Dialog>

                <button onClick={showConfirm}>确认对话框</button>&nbsp;
                <button onClick={info}>信息提示</button>&nbsp;
                <button onClick={success}>成功提示</button>&nbsp;
                <button onClick={error}>失败提示</button>
            </div>
        )
    }
}

export default Dialog_demo