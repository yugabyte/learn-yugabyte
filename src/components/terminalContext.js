import React from 'react'

const TerminalContext = React.createContext()

function useTerminal() {
  const context = React.useContext(TerminalContext)
  if (!context) {
    throw new Error(`useTerminal must be used within a TerminalProvider`)
  }
  return context
}

function TerminalProvider(props) {
  const [terminalStatus, setTerminalStatus] = React.useState({})
 
  return <TerminalContext.Provider value={[terminalStatus, setTerminalStatus]} {...props} />
}

export { TerminalProvider, useTerminal };