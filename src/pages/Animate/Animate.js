import React from 'react'
import Animate from 'components/Animate'
import './Animate.less';

class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ display: this.props.visible ? 'inline-block' : 'none' }} className="animate-area">
        动画展示区域
      </div>
    );
  }
}

class Demo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  handleClick() {
    this.setState({
      visible: !this.state.visible
    })
  }
  /*
  render() {
    return (
      <div className="page-animate">
        <Animate 
          onEnd={(key,exists) => {
            console.log(key) //  每个元素动画执行完后都会调用一次
            console.log(exists) // 是显示还是隐藏  显示 true  隐藏 false
          }}
          transitionAppear 
          className="animate-demo" 
          component="div" 
          transitionName="fade"
        >
          {this.state.show ? <div key="e3e3" className="haha">123</div> : null}
        </Animate>
        <button onClick={this.handleClick.bind(this)}>按钮</button>
      </div>
    );
  }
  */
  render() {
    return (
      <div className="page-animate">
        <Animate 
          onEnd={(key,exists) => {}}
          transitionAppear 
          className="animate-demo" 
          component="div" 
          transitionName="fade"
          showProp="visible"
        >
          <AwesomeComponent key="1" visible={this.state.visible}/>
        </Animate>
        <button onClick={this.handleClick.bind(this)}>按钮</button>
      </div>
    )
  }
}

export default Demo
/**
 * component string 渲染出来的最外层元素
 * 每个一级元素要有key
 * fade-appear fade-appear-active
 * fade-leave  fade-leave-active
 * fade-enter  fade-enter-active
 * Animate一级子元素的移除和添加增加动画
 * fade-enter 的样式是动画初始值 定义时间效果
 * fade-enter-active 是动画过程
 * showProp 指定用于控制显示/隐藏的 prop  组件可以动过display:none来显示隐藏，设置动画效果 和{用state控制，不可同时使用} 子元素是个class组件 
 */

