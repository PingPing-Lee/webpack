const React = require('react');
const largeNumber = require('large-number');
const avatar = require('./images/avatar.png');
const s = require('./index.less');

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
        const addRet = largeNumber('999', '1');
        const { Text } = this.state;
        return (
            <div className="search-text">
                {
                    Text ? <Text /> : null
                }
                {addRet}
                搜索文字的内容,改变试试
                <img src={avatar} onClick={this.imgClick} />
            </div>
        );
    }
}

module.exports = <Search />;
