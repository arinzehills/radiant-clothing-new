const fetchCountries = async (setCountries) => {
  const data = await fetch("https://countriesnow.space/api/v0.1/countries")
    .then((ddd) => ddd.json())
    .then((data) => {
      const countries = [];
      var countryData = data["data"];
      countryData.forEach((item) => {
        // console.log(item.country);
        countries.push(item.country);
      });
      setCountries(countries);
      // console.log(data['data']);
    });
  //make sure to set it to false so the component is not in constant loading state
};
export default fetchCountries;
