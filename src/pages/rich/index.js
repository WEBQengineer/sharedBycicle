import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default class RichText extends Component{
  state={
    editorState:'',
    showRichText:false
  }
  onEditorStateChange = (editorState) => {
    console.log('我是editorState：',editorState)
    this.setState({
      editorState,
    });
  };

  handleClearContent = () =>{
    this.setState({
      editorState:''
    });
  }

  handleGetText = () => {
    this.setState({
      showRichText:true
    })
  }

  onEditorChange = (contentState) =>{
    console.log(contentState)
    this.setState({
      contentState
    })
  }


  render(){
    const { editorState } = this.state;
    return(
      <div>
        <Card>
          <Button type='primary' onClick={this.handleClearContent}>清空内容</Button>
          <Button type='primary' onClick={this.handleGetText}>获取HTML文本</Button>
        </Card>
        <Card title='富文本编辑器'>
          <Editor
            editorState={editorState}
            onContentStateChange={this.onEditorChange}//把内容存到state中
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title='富文本'
          visible={this.state.showRichText}
          onCancel={()=>{
            this.setState({
              showRichText:false
            })
          }}
          footer={null}
        >
          {draftjs(this.state.contentState)}
        </Modal>
      </div>
    );
  }
}