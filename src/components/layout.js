import React, { useEffect, useState, useRef } from "react";
import styled from "react-emotion";
import { MDXProvider } from "@mdx-js/react";
import ThemeProvider from "./themeProvider";
import mdxComponents from "./mdxComponents";
import Sidebar from "./sidebar";
import RightSidebar from "./rightSidebar";
import { Terminal } from 'xterm';
import { useTerminal, TerminalProvider } from './terminalContext';
import { executeQuery } from './helpers/terminalHelper';

import minimizeLogo from './images/window-minimize.svg';
import maximizeLogo from './images/window-maximize.svg';
import timesLogo from './images/window-close.svg';

const INSTANCE_URL = 'http://localhost:7200';

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

const Content = styled('main')`
  display: flex;
  flex-grow: 1;
  margin: 0px 88px;
  margin-top: 3rem;

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    margin-top: 3rem;
  }
`;

const MaxWidth = styled('div')`
  width: 100%;
  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;
const LeftSideBarWidth = styled('div')`
  width: 298px;
`;
const RightSideBarWidth = styled('div')`
  width: 224px;
`;

const Theme = ({ children, location }) => {
  const [ terminalStatus, setTerminalStatus ] = useTerminal();
  const [ universes, setUniverseList ] = useState([]);
  const [ currentUniverse, setUniverse ] = useState('');
  const [ editable, setDbEditable ] = useState(false);

  const [ database, setDatabase ] = useState('yugabyte');
  const dbNameRef = useRef(database);

  const showTerminal = terminalStatus.alive && !terminalStatus.minimized;
  
  const initXterm = (initialCode) => {
    const term = new Terminal({
      rows: 20,
      cols: 160,
    });

    // Local state for terminal
    let terminalState = {
      commands: [],
      index: -1,
    };

    window.term = term;
    term.open(document.getElementById('xterm-container'));
    document.getElementById('xterm-container').classList.add('active');
    term.writeln('Hello from \x1B[1;3;33mYugabyteDB\x1B[0m! Enter your commands below.');
    term.write(`${database}=# ${initialCode.trim()}`);

    // Keyboard event handler
    term.onKey((ev) => {
      const { commands, index } = terminalState;
      const dbName = dbNameRef.current;
      if (ev.domEvent.key === 'Backspace') {
        if (term.buffer.cursorX > dbName.length + 3) {
          term.write('\b \b');
        }
      } else if (ev.domEvent.key === 'ArrowUp') {
        if (index < commands.length - 1) {
          terminalState.index += 1;
          const previousCommand = commands[index + 1];
          term.write(`\x1b[2K\r${dbName}=# ${previousCommand}`);
        }
      } else if (ev.domEvent.key === 'ArrowDown') {
        if (index > -1) {
          terminalState.index -= 1;
          const nextCommand = commands[index - 1] || '';
          term.write(`\x1b[2K\r${dbName}=# ${nextCommand}`);
        }
      } else if (ev.domEvent.key === 'Enter') {
        term.select(dbName.length + 3, term.buffer.cursorY, term.buffer.cursorX - (dbName.length + 3)); // Omit shell symbol and space
        const queryString = term.getSelection();
        terminalState.commands = [queryString, ...commands].slice(0, 50);
        if (queryString) {
          executeQuery(term, dbName, INSTANCE_URL, currentUniverse, queryString);
        } else {
          term.write(`\r\n${dbName}=# `);
        }
      } else {
        term.write(ev.key);
      }
    });
  }

  useEffect(() => {
    async function fetchTokens() {
      let universeResult = null;
      if (!localStorage.getItem('token') || !localStorage.getItem('customer')) {
        let response = await fetch(`${INSTANCE_URL}/api/v1/insecure_login`);
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        
        let data = await response.json();
        localStorage.setItem('token', data.apiToken);
        localStorage.setItem('customer', data.customerUUID);
        const authHeader = new Headers({
          'Content-Type': 'application/json',
          'X-AUTH-TOKEN': data.apiToken
        });
        
        response = await fetch(`${INSTANCE_URL}/api/v1/customers/${data.customerUUID}/universes`,
          { headers: authHeader }
        );
        universeResult = await response.json();
      } else {
        const apiToken = localStorage.getItem('token');
        const customerUUID = localStorage.getItem('customer');
        const authHeader = new Headers({
          'Content-Type': 'application/json',
          'X-AUTH-TOKEN': apiToken
        });
        
        let response = await fetch(`${INSTANCE_URL}/api/v1/customers/${customerUUID}/universes`,
          { headers: authHeader }
        );
        universeResult = await response.json();
        if (universeResult.error) {
          // Customer token or uuid could be invalid
          localStorage.removeItem('token');
          localStorage.removeItem('customer');
          fetchTokens();
          return;
        }
      }
      if (universeResult.length) {
        setUniverse(universeResult[0].universeUUID);
        setUniverseList(universeResult);
      }
    }
    fetchTokens();
  }, []);

  // Hook for updating xterm
  useEffect(() => {
    if (window.term) {
      // User has closed terminal by clicking 'X' button
      // OR User has navigated to new page without closing terminal in previous page
      if (!terminalStatus.alive || terminalStatus.counter === undefined) {
        window.term.dispose();
        window.term = null;
      } else {
        const dbName = dbNameRef.current;
        window.term.write(`\x1b[2K\r${dbName}=# ${terminalStatus.code.trim()}`);
      }
    } else {
      if (terminalStatus.alive && !terminalStatus.minimized) {
        initXterm(terminalStatus.code);
      }
    }
  }, [terminalStatus.counter]);

  
  return (
    <ThemeProvider location={location}>
      <MDXProvider components={mdxComponents}>
        <Wrapper style={{ marginBottom: terminalStatus.alive ? (
            terminalStatus.minimized ? '40px' : '400px'
          ) : 0}}>
          <LeftSideBarWidth className={'hidden-xs'}>
            <Sidebar location={location} />
          </LeftSideBarWidth>
          <Content>
            <MaxWidth>{children}</MaxWidth>
          </Content>
          <RightSideBarWidth className={'hidden-xs'}>
            <RightSidebar location={location} />
          </RightSideBarWidth>
        </Wrapper>
      </MDXProvider>
      {terminalStatus.alive &&
        <div id="shell-editor" onTouchMove={e => e.stopPropagation()}>
          <div className={terminalStatus.minimized ? "shell-toolbar minimized" : "shell-toolbar"}>
            <div className="db-toolbar-container">
              <label className="db-input-group">Target Universe:</label>              
              <select className="select-css clickable">
                {universes.map(universe => (
                  <option key={universe.universeUUID}>{universe.name}</option>
                ))}
              </select>
            </div>
            <div className="db-toolbar-container">
              <label className="db-input-group">Database:</label>
              {editable ? 
                <input
                  placeholder="Enter database name"
                  defaultValue={database}
                  onBlur={(e) => {
                      setDbEditable(false);
                      setDatabase(e.target.value);
                      dbNameRef.current = e.target.value;
                  }}/>
                :
                <div className="db-input-group clickable" onClick={() => setDbEditable(true)}>
                  {database}
                </div> 
              }
            </div>
            <div className="window-actions">
              {terminalStatus.minimized ? 
                <img className="shell-icon" onClick={() => setTerminalStatus({...terminalStatus, minimized: false, counter: terminalStatus.counter + 1})}
                  src={maximizeLogo} alt="Maximize shell editor" />
                :
                <img className="shell-icon" onClick={() => setTerminalStatus({...terminalStatus, minimized: true, counter: terminalStatus.counter + 1})}
                  src={minimizeLogo} alt="Minimize shell editor"/>
              }
              <img className="shell-icon" onClick={() => setTerminalStatus({...terminalStatus, alive: false, counter: terminalStatus.counter + 1})} src={timesLogo} alt="Close shell editor" />            
            </div>
          </div>
          <div id="xterm-container" className={showTerminal ? 'active': ''}></div>
        </div>
      }
    </ThemeProvider>    
  );
}

/* Need this component to wrap the Layout in a Context */
const Layout = props => {
  return (
    <TerminalProvider>
      <Theme {...props}></Theme>
    </TerminalProvider>
  )
}

export default Layout;
