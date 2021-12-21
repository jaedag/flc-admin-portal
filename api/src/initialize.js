export const initializeDatabase = (driver) => {
  const initCypher = `CALL apoc.schema.assert(
    {Member:  ["firstName","lastName"], Fellowship: ["name"], Bacenta: ["name"],  Constituency: ["name"], Sonta: ["name"], Ministry: ["name"]}, 
    {Member: ["id","whatsappNumber","email"], Fellowship: ["id"], Bacenta: ["id"], Constituency: ["id"], Sonta: ["id"], Ministry: ["id"]}
    )`

  const executeQuery = (driver) => {
    const session = driver.session()
    return session
      .writeTransaction((tx) => tx.run(initCypher))
      .then()
      .finally(() => session.close())
  }

  executeQuery(driver).catch((error) => {
    // eslint-disable-next-line
    console.error('Database initialization failed to complete\n', error.message)
  })
}
