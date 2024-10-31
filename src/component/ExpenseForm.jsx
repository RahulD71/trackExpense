import React, { useState } from "react";
import Input from "./Input";
import SelectMenu from "./SelectMenu";

const ExpenseForm = ({
  expense,
  setExpense,
  setExpenses,
  editingRowId,
  setEditingRowId,
}) => {
  // const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  // const [amount, setAmount] = useState("");

  //in above line of  code we have use seperate state variable and function
  //in below code we have use common state variable and function using object

  // const [expense, setExpense] = useState({
  //   title: "",
  //   category: "",
  //   amount: "",
  //   email: "",
  // });
  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 2, message: "Title must be at least 2 characters" },
    ],
    category: [{ required: true, message: "Please select category" }],
    amount: [
      { required: true, message: "Please enter amount" },
      {
        pattren: /^[1-9]\d*(\.\d+)?$/,
        message: "Please enter valid number",
      },
    ],
    email: [
      { required: true, message: "Please enter email" },
      {
        pattren: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Please enter valid email",
      },
    ],
  };

  const validate = (formData) => {
    const errorsData = {};
    // Object.entries return key and value of object
    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.pattren && !rule.pattren.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    /* if (!formData.title) {
      errorsData.title = "Title is required";
    }
    if (!formData.category) {
      errorsData.category = "Category is required";
    }
    if (!formData.amount) {
      errorsData.amount = "Amount is required";
    }*/

    setErrors(errorsData);
    return errorsData;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //here because of controlled input , you do not have to use formData() method of javascript to get form data
    //you will get state variable directly

    /*const expense = { title, category, amount, id: crypto.randomUUID() };
    setExpenses((prevState) => [...prevState, expense]);*/

    //Note here below code will not work here. because it will reset dom element. but here we have use state to change ui.
    //-------------- e.target.reset();
    // use below code. you need to clear each state variable

    /*setTitle("");
    setCategory("");
    setAmount("");*/
    const validateResult = validate(expense);

    //below code check if there is any key available for the object. it return array containing key
    if (Object.keys(validateResult).length) return;

    //
    //for saving data of edited row
    //
    if (editingRowId) {
      setExpenses((prevState) => {
        return prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        });
      });
      setExpense({
        title: "",
        category: "",
        amount: "",
        email: "",
      });
      setEditingRowId("");
      return;
    }

    //below code is use when common state variable is use
    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);

    setExpense({
      title: "",
      category: "",
      amount: "",
      email: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        error={errors.title}
      />
      <SelectMenu
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultOption="Select Category"
        error={errors.category}
      />

      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />

      <button className="add-btn">{editingRowId ? "Save" : "Add"} </button>
    </form>
  );
};

export default ExpenseForm;
