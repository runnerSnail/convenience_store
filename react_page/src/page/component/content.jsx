import React from 'react';
import ReactDOM from 'react-dom';
import './content.css';
export const Content = (props) => {
    const { content } = props;
    if (content && content.content) {
        return (
            <div>
                <div className="haveContent" id="copyBtn">
                    {content.content}
                </div>
                <textarea id="contents" rows="10" cols="10" style={{height:0,width:0,opacity: 0}} defaultValue={''}>
                    
                </textarea>
            </div>
        )
    } else {
        return (
            <div className="content-align content-vertical">
                "View snippets for 'react'"
            </div>
        )
    }

}