#### react-redux
> 作用：为了让我们更方便的使用redux
1. Provider
是一个提供器 此组件里面所有的组件都能接收store的数据
```
import {Provider} from 'react-redux'
import store from './store'
const App =(
    <Provider store={store}>
        <TodoList></TodoList>
    </Provider>
);
ReactDOM.render(App, document.getElementById('root'));

```
2. connect  让组件链接到store 里面接收两个参数
- mapStateToProps
将store的数据映射到组件的props里面 这样就可以 this.props.value  使用了
- mapDispatchToProps
将store的dispatch 方法挂载到props

示例代码：
```
import React, {Component} from 'react'
import {connect} from 'react-redux'

class TodoList extends Component {
    render() {
        return (
            <div>
                <div>
                    <input type="text" value={this.props.inputValue} onChange={this.props.changeInputValue}/>
                    <button onClick={this.props.addInputValue}>提交</button>
                </div>
                <ul>
                    {this.props.list.map((item, index) => {
                       return  <li onClick={this.props.handleDelete} key={index}>{item}</li>
                    })}
                </ul>
            </div>
        )
    }

}

/**
 * 让组件链接到store 需要定义规则
 */
const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}
//我们将store的dispatch 方法挂载到props
const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue(e) {
            const action = {
                type: 'change_input_value',
                value: e.target.value
            }
            dispatch(action)
        },
        addInputValue() {
            const action = {
                type: 'add_input_value'
            }
            dispatch(action)
        },
        handleDelete(index){
            const action ={
                type:'delete_item',
                value:index
            }
            dispatch(action)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
```
