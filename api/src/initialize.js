export const initializeDatabase = (driver) => {
  const initCypher = `CALL apoc.schema.assert(
    {Member:  ["firstName","lastName"],Bacenta: ["name"],Centre: ["name"],Campus: ["name"],Town: ["name"],Sonta: ["name"],Ministry: ["name"]}, 
    {Member: ["id","whatsappNumber","email"], Bacenta: ["id"], Centre: ["id"], Campus: ["id"], Town: ["id"],Sonta: ["id"], Ministry: ["id"]})`

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
