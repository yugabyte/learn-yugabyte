import React, { useEffect, useState } from "react";
import styled from "react-emotion";
import { MDXProvider } from "@mdx-js/react";
import ThemeProvider from "./themeProvider";
import mdxComponents from "./mdxComponents";
import Sidebar from "./sidebar";
import RightSidebar from "./rightSidebar";
import { Terminal } from 'xterm';
import { useTerminal, TerminalProvider } from './terminalContext';

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

function sanitizeString(str){
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
  return str.trim();
}

const Theme = ({ children, location }) => {
  const [ terminalStatus, setTerminalStatus ] = useTerminal();
  const [ universes, setUniverseList ] = useState([]);
  const [ currentUniverse, setUniverse ] = useState('');

  const showTerminal = terminalStatus.alive && !terminalStatus.minimized;
  
  const initXterm = (initialCode) => {
    // If there is an existing terminal open, destroy instance
    if (window.term) {
      window.term.dispose();
    }
    const term = new Terminal({
      rows: 15,
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
        const apiToken = localStorage.getItem('token');
        const customerId = localStorage.getItem('customer');
        if (apiToken && customerId) {
          const url = `${INSTANCE_URL}/api/v1/customers/${customerId}/universes/${currentUniverse}/run_query`;
          const authHeader = new Headers({
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': apiToken,
          });
          term.select(2, term.buffer.cursorY, term.buffer.cursorX - 2); // Omit shell symbol and space
          const data = {
            query: term.getSelection(),
            "db_name": "yugabyte",
          };
          term.write('\r\n');
  
          fetch(url, {
            method: 'POST',
            headers: authHeader,
            body: JSON.stringify(data),
            mode: 'cors',
            cache: 'default',
          }).then (response => response.json())
            .then((data) => {
              if (data.error) {
                // Sanitize input
                const cleanErrorStr = sanitizeString(data.error);
                term.write(`\x1B[31m${cleanErrorStr}\x1B[0m\r\n$ `);
              } else if (data.result.length) {
                const tableColumnInfo = [];
                const firstRow = data.result[0];
                for (let colname of Object.keys(firstRow)) {
                  tableColumnInfo.push({
                    name: colname,
                    longest: colname.length 
                  });
                }
                
                // Iterate over table and find longest string
                for (let row of data.result) {
                  tableColumnInfo.forEach(c => {
                    if (row[c.name].length > c.longest) {
                      c.longest = row[c.name].length;
                    }
                  });
                }
  
                // Write header row
                term.writeln(' ' + tableColumnInfo.map(c => c.name + ' '.repeat(c.longest - c.name.length)).join(' | ') + ' ');                
                data.result.forEach((row) => {
                  term.writeln(tableColumnInfo.map(col => '-'.repeat(col.longest + 2)).join('+'));
                  term.writeln(tableColumnInfo.map(col => ` ${row[col.name]} ` + ' '.repeat(col.longest - row[col.name].length)).join('|'));
                });
                term.write(`(${data.result.length} rows)\r\n$ `);
              } else {
                term.write('(0 rows)\r\n$ ');
              }
              
          });
        } else {
          term.write('\r\n\x1B[31mYugabyteDB currently not figured. Please setup a local installation of yugabyted\x1B[0m\r\n$ ');
        }
      } else {
        term.write(ev.key)
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
    if (terminalStatus.alive && !terminalStatus.minimized) {
      initXterm(terminalStatus.code);
    }
  }, [terminalStatus.alive, terminalStatus.code]);

  return (
    <ThemeProvider location={location}>
      <MDXProvider components={mdxComponents} test={505}>
        <Wrapper>
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
        <div id="shell-editor">
          <div className={terminalStatus.minimized ? "shell-toolbar minimized" : "shell-toolbar"}>
            <span style={{margin: '8px'}}>Target Universe:</span>
            <div style={{width: '200px'}}>
              <select className="select-css">
                {universes.map(universe => (
                  <option key={universe.universeUUID}>{universe.name}</option>
                ))}
              </select>
            </div>
            <div className="window-actions">
              {terminalStatus.minimized ? 
                <img className="shell-icon" onClick={() => setTerminalStatus({...terminalStatus, minimized: false})}
                  src={maximizeLogo} alt="Maximize shell editor" />
                :
                <img className="shell-icon" onClick={() => setTerminalStatus({...terminalStatus, minimized: true})}
                  src={minimizeLogo} alt="Minimize shell editor"/>
              }
              <img className="shell-icon" onClick={() => setTerminalStatus({...terminalStatus, alive: false})} src={timesLogo} alt="Close shell editor" />            
            </div>
          </div>
          <div id="xterm-container" className={showTerminal ? 'active': ''}></div>
        </div>
      }
    </ThemeProvider>    
  );
}

const Layout = props => {
  return (
    <TerminalProvider>
      <Theme {...props}></Theme>
    </TerminalProvider>
  )
}

export default Layout;
