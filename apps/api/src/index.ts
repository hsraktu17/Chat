import express, { Request, Response } from 'express'

const app = express();

app.get('/', (req: Request, res: Response) =>{
    res.json({
        "message" : "working"
    })
})

app.listen(5001, ()=>{
    console.log("server started at 5001")
})