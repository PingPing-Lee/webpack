

import React from 'react';
import ReactDOM from 'react-dom';

import largeNumber from 'large-number-ppl';
import '../../common';
import avatar from './images/avatar.png';
import './index.less';
import { a } from './tree-shaking';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            Text: null,
        };
    }

    imgClick = () => {
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default,
            });
        });
    }

    render() {
        const funA = a();
        const addRet = largeNumber('999', '1');
        const { Text } = this.state;
        return (
            <div className="search-text">
            {
                    Text ? <Text /> : null
                }
            {funA}
            {addRet}
            搜索文字的内容,改变试试
<img src={avatar} onClick={this.imgClick} />
          </div>
        );
    }
}

ReactDOM.render(
  <Search />,
    document.getElementById('root'),
);
