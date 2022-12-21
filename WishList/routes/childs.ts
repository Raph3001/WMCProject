import {IWish} from "../public/javascripts/interfaces/IPresents";
import {IChild} from "../public/javascripts/interfaces/IChilds";
// @ts-ignore
import express, { Request, Response, Express } from 'express';
import path from "node:path"
const router = express.Router();
import fetch from "axios";

const wishes: IChild[] = require("../resources/presents.json") as IChild[];

router.get('/:id/wishes', function(req, res, next) {
    if (wishes.find(s => s.id === +(req.params.id))) { // @ts-ignore
        let singleChild: IChild = wishes.find(s => s.id === +(req.params.id));
        res.status(200).send(singleChild.wishes);
    }
        res.status(400);
});

router.post('/', (req:Request, res:Response) => {
    const newObj:IChild = req.body as IChild;
    if (newObj.name && newObj.age) {
        if (!(wishes.find(s => s.name === newObj.name))) {
            newObj.id = wishes[wishes.length - 1].id + 1;
            wishes.push(newObj);
            console.log(wishes);
            res.status(200).send();
        }
    } else {
        res.status(400).send()
    }

});

router.post('/:id/wishes', (req:Request, res:Response) => {
    const newObj:IWish = req.body as IWish;
    const id = +req.params.id;
    if (newObj.name && newObj.url && newObj.img_url) {
        newObj.id = count()+1;
        wishes[id-1].wishes.push(newObj);
        console.log(wishes[id-1]);
        res.status(200).send();
    } else {
        res.status(400).send()
    }

});


const count = ():number => {
    let numberOfWishes:number = 0;
    for (let i = 0; i < wishes.length; i++) {
        for (let j = 0; j < wishes[i].wishes.length; j++) {
            numberOfWishes += 1;
        }
    }
    return numberOfWishes;
}

module.exports = router;