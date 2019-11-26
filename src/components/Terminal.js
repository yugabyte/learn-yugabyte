import React from 'react';

const hideTerminal = () => {
    document.getElementById('xterm-container').style.height = 0;
};

class Terminal extends React.Component {
    state = {
        visible: false
    }

    componentDidUpdate() {
        const xterm = document.getElementById('xterm-container');
        if (xterm && xterm.childElementCount > 0) {
            this.setState({visible: true});
        }
    }

    render() {
        const { visible } = this.state;
        return (
        <div className="shell-editor">
            {visible &&
                <div className="shell-toolbar">
                    <img onClick={hideTerminal} src="https://cdn0.iconfinder.com/data/icons/pixel-perfect-at-24px-volume-3/24/5008-512.png" alt="Minimize shell editor"/>
                </div>
            }
            <div id="xterm-container"></div>
        </div>);
    }
}

export default Terminal;
