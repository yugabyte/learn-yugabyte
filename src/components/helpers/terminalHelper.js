function sanitizeString(str){
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
  return str.trim();
}

export const executeQuery = (term, baseUrl, universeUUID, query) => {
  const apiToken = localStorage.getItem('token');
  const customerId = localStorage.getItem('customer');
  if (apiToken && customerId) {
    const url = `${baseUrl}/api/v1/customers/${customerId}/universes/${universeUUID}/run_query`;
    const authHeader = new Headers({
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': apiToken,
    });
    
    const data = {
      query,
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
        } else if (data.queryType) {
          // Writes to database show number of items changed
          term.write(`${data.queryType} ${data.count || 0}\r\n$ `);
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
          // No data found
          term.write('(0 rows)\r\n$ ');
        }
    });
  } else {
    term.write('\r\n\x1B[31mYugabyteDB currently not figured. Please setup a local installation of yugabyted\x1B[0m\r\n$ ');
  }
}
