import * as React from "react";
import ReactDOM from "react-dom";
import Highlight, { defaultProps } from "prism-react-renderer";
import prismTheme from "prism-react-renderer/themes/vsDark";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import '../styles.css';
import Pre from "./pre";

/** Removes the last token from a code example if it's empty. */
function cleanTokens(tokens) {
  const tokensLength = tokens.length;
  if (tokensLength === 0) {
    return tokens;
  }
  const lastToken = tokens[tokensLength - 1];
  if (lastToken.length === 1 && lastToken[0].empty) {
    return tokens.slice(0, tokensLength - 1);
  }
  return tokens;
}

/* eslint-disable react/jsx-key */
class CodeBlock extends React.Component {
  state = {
    terminalAlive: false,
    terminalMinimized: false,
  }

  handleOpenTerminal = (initialCode = '') => {
    // If there is an existing terminal open, destroy instance and remove dom nodes.
    if (window.term) {
      window.term.dispose();
      document.getElementById('shell-editor').innerHTML = '';
    }

    this.setState({
      terminalAlive: true,
      terminalMinimized: false,
    }, () => {
      const term = new Terminal({
        rows: 10,
      });
      window.term = term;
      term.open(document.getElementById('xterm-container'));
      document.getElementById('xterm-container').classList.add('active');
      term.writeln('Hello from \x1B[1;3;33mYugabyteDB\x1B[0m! Enter your commands below.');
      term.write('$ ' + initialCode.trim());
      term.onKey((ev) => {
        if (ev.domEvent.key === 'Backspace') {
          if (term.buffer.cursorX > 2) {
            term.write('\b \b');
          }
        } else if (ev.domEvent.key === 'Enter') {
          term.write('\r\n\x1B[31mYugabyteDB currently not figured. Please setup a local installation of yugabyted\x1B[0m\r\n$ ');
        } else {
          term.write(ev.key)
        }
      });
    });
  }

  handleMinimizeTerminal = () => {
    this.setState({terminalMinimized: true});
  }

  handleShowTerminal = () => {
    this.setState({terminalMinimized: false});
  }

  handleCloseTerminal = () => {
    this.setState({terminalAlive: false});
  }

  render() {
    const { children: exampleCode, ...props } = this.props;
    if (props["react-live"]) {
      return (
        <LiveProvider code={exampleCode}>
          <LiveEditor />
          <LiveError />
          <LivePreview />
        </LiveProvider>
      );
    } else {
      const formattedCode = exampleCode.split('\n').join('\r\n  ');
      const shell = document.getElementById('shell-editor');
      const showTerminal = this.state.terminalAlive && !this.state.terminalMinimized;
      return (
        <div>
        <Highlight
          {...defaultProps}
          code={exampleCode}
          language="javascript"
          theme={prismTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style} p={3}>
              {cleanTokens(tokens).map((line, i) => {
                let lineClass = {};
                let isDiff = false;
                if (line[0] && line[0].content.length && line[0].content[0] === '+') {
                  lineClass = {'backgroundColor': 'rgba(76, 175, 80, 0.2)'};
                  isDiff = true;
                }
                else if (line[0] && line[0].content.length && line[0].content[0] === '-') {
                  lineClass = {'backgroundColor': 'rgba(244, 67, 54, 0.2)'};
                  isDiff = true;
                }
                else if(line[0] && line[0].content === '' && line[1] && line[1].content === '+') {
                  lineClass = {'backgroundColor': 'rgba(76, 175, 80, 0.2)'};
                  isDiff = true;
                } else if(line[0] && line[0].content === ''&& line[1] && line[1].content === '-') {
                  lineClass = {'backgroundColor': 'rgba(244, 67, 54, 0.2)'};
                  isDiff = true;
                }
                const lineProps = getLineProps({line, key: i});
                lineProps.style = lineClass;
                const diffStyle = {'userSelect': 'none', 'MozUserSelect': '-moz-none', 'WebkitUserSelect': 'none'};
                let splitToken;
                return (
                  <div {...lineProps}>
                    {line.map((token, key) => {
                      if(isDiff) {
                        if ((key === 0 || key === 1) & (token.content.charAt(0) === '+' || token.content.charAt(0) === '-')) {
                          if(token.content.length > 1) {
                            splitToken = { 'types': ['template-string','string'], 'content': token.content.slice(1)};
                            const firstChar = { 'types': ['operator'], 'content': token.content.charAt(0)};
                            return (
                              <React.Fragment>
                                <span {...getTokenProps({ token: firstChar, key })} style={diffStyle} />
                                <span {...getTokenProps({ token: splitToken, key })} />
                              </React.Fragment>
                            )
                          } else {
                            return (
                                <span {...getTokenProps({ token, key })} style={diffStyle} />
                            )

                          }
                        }
                      }
                      return (<span {...getTokenProps({ token, key })} />)
                    } )}
                  </div>
              )})}
            </Pre>
          )}
        </Highlight>
        <div className="run-code-snippet" onClick={() => this.handleOpenTerminal(formattedCode)}>Run in terminal</div>
        {this.state.terminalAlive && ReactDOM.createPortal(
          <div>
            <div className={this.state.terminalMinimized ? "shell-toolbar minimized" : "shell-toolbar"}>
              {this.state.terminalMinimized ? 
                <img onClick={this.handleShowTerminal} src="https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-maximize-thin.png" />
                :
                <img onClick={this.handleMinimizeTerminal} src="https://cdn0.iconfinder.com/data/icons/pixel-perfect-at-24px-volume-3/24/5008-512.png" alt="Minimize shell editor"/>
              }
              <img onClick={this.handleCloseTerminal} src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Font_Awesome_5_solid_times.svg/823px-Font_Awesome_5_solid_times.svg.png" alt="Close shell editor" />
            </div>
            <div id="xterm-container" className={showTerminal && "active"}></div>
          </div>,
          shell
        )}
      </div>
      );
    }
  }
}

export default CodeBlock;
