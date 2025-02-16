import express, { Request, Response } from 'express'

const app = express()

app.get('/',(req: Request, res: Response)=>{
    res.json({
        "message": "working ws"
    })
})

app.listen(8080,()=>{
    console.log("sever started at 8080")
})