const express = require("express");
const mongoose = require("mongoose");
const Expense = require("./models/expenses");
const app = express();
// const port = 3001;
mongoose.connect(
  "mongodb+srv://subi:subis450s@cluster0.otrwb8z.mongodb.net/newDb?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
  }
);
app.use(express.json());
app.get("/expenses", async (req, res) => {
  const expensess = await Expense.find();
  res.send(expensess);
});
// app.get("/expenses/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const expensess = await Expense.findById(id);
//     if (expensess) {
//       res.send(expensess);
//     } else {
//       res.send("no expensess");
//     }
//   } catch (err) {
//     res.send(err);
//   }

app.delete("/expenses/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const expensess = await Expense.findByIdAndDelete(id);
    if (expensess) {
      res.send(expensess);
    } else {
      res.send("no expensess");
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/expenses", async (req, res) => {
  try {
    console.log("AAAAAAAA");
    const expensess = await Expense.find();
    console.log(expensess);
    if (expensess) {
      res.send(expensess);
    } else {
      res.send("no expensess");
    }
  } catch (err) {
    res.send(err);
  }
});

app.put("/expenses/:id", async (req, res) => {
  const id = req.params.id;
  const updateObject = req.body;
  const updatedObject = await Expense.findByIdAndUpdate(
    id,
    { $set: updateObject },
    {
      new: true,
    }
  );
  res.send(updatedObject);
});
app.post("/expenses", async (req, res) => {
  console.log(req.body);
  const newExpense = req.body;
  await Expense.create(newExpense);
  res.send("created");
});
const port=process.env.PORT || 3001
app.listen(port, () => {
  console.log(`port ${port}`);
});

// app.get('/',(req,res)=>
// {
//   res.send('hello world!!!')

// })
// app.post('/',(req,res)=>
// {
//   res.send('hiii world')

// })
// app.listen(port,()=>
// {
//   console.log(`Example app listening on port ${port}`)
// })
