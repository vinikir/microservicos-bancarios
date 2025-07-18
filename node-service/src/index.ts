import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (_req, res) => {
    res.send('Node microservice funcionando!')
})

const port = process.env.PORT || 3003
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
