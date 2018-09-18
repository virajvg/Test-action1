/*let x: number = 10;
let y: number = 20;
console.log(x + y);
//console.log("hey");*/

import Koa from "koa";
import Router from "koa-router";
import { dialogflow } from "actions-on-google";
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();
const port = 8080;
const dialogflowApp = dialogflow({ debug: true });
app.use(bodyParser());
app.use(dialogflowApp);
app.use(router.routes());

//app.use(bodyParser.json(), dialogflowApp).listen(port);

router.post("/", ctx => {
	console.log("ctx", ctx.request.body);
	console.log("before intent");
	dialogflowApp.intent(
		"projects/test-get-balance/agent/intents/e1a706c8-90e1-4016-b757-4ede260b546b",
		(conv, { balance }) => {
			console.log("balance is ", balance);
			conv.close("First intent working");
		}
	);

	ctx.body = "bye";
});

router.get("/", ctx => {
	ctx.body = "success";
});

console.log("started server");

app.listen(port);
