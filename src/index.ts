import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { APP_PORT } from './config'

async function main() { 
    const app: Application = express();

    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.get('/',(req: Request, res: Response)=>{
        res.sendStatus(200)
    })

    app.get('/webhook', (req: Request, res: Response) => {
        console.log(req.query)
        res.status(200).send(req.query['hub.challenge'])
    })

    app.post('/webhook', (req: Request, res: Response) => {
        console.log(req.body)
        console.log(req.body.entry)
        res.status(200).json(req.body)
    })

    app.get('/verify', (req: Request, res: Response) => {
        console.log(req.query)
        res.status(200).json({
            status: 'ok'
        })
    })

    app.listen(APP_PORT, () => {
        console.log('Server running : '+ APP_PORT)
    })
}

main()