import express, { Application, Request, Response } from "express";
import globalErrorHandler from "../src/app/Error-Handle/globalErrorHandle";
import normalMiddleware from "../src/app/middleware/normalMiddleware";
import { productRouter } from "./app/Module/Products/Products.route";
import { OrdersRoute } from "./app/Module/Orders/Orders.route";

const app: Application = express();
normalMiddleware(app);


app.use("/api",productRouter)
app.use("/api",OrdersRoute)



app.get("/", (req: Request, res: Response) => {
  res.send("Level-2 setup ");
});

app.all("*", (req: Request, res: Response, next) => {
  const error = new Error(`Can't find ${req.url} on the server`);
  next(error);
});

// global error handle
app.use(globalErrorHandler);

export default app;
