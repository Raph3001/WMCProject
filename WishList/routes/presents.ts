import {IWish} from "../public/javascripts/interfaces/IPresents";
import {IChild} from "../public/javascripts/interfaces/IChilds";
// @ts-ignore
import express, { Request, Response, Express } from 'express';
const router = express.Router();

const childs: IChild[] = require("../resources/presents.json") as IChild[];

/* GET home page. */
router.get('/children', (req, res, next) => {
    res.status(200).send(childs);
});



module.exports = router;
