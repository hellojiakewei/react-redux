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