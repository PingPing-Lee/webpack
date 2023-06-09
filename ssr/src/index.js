const React = require('react');
const s = require('./index.less');

class App extends React.Component {
    render() {
        return (
            <div className="search-text">
                服务端渲染 SSR
            </div>
        );
    }
}

module.exports = <App />;
