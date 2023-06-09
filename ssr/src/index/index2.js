const React = require('react');
import './index.less';


class App extends React.Component {
    render() {
        return (
            <div className="search-text">
                服务端渲染 SSR
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
