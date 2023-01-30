const handleChange = (e, formValues, setFormValues) => {
  console.log(e);
  console.log(e.target);
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });

  console.log(formValues);
};
export default handleChange;
