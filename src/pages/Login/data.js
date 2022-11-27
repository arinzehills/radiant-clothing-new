export const login = async (email, password) => {
  const data = { email: email, password: password };
  // const url="https://buyenergy.herokuapp.com/public/api/login";
  const url = "http://localhost/buyenergy_api/public/api/login";

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log( data);
      // console.log('Success:', data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  // axios.post(url,{
  //     headers:{
  //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  //     },
  //     data:{email: email,password :password}
  // })
  // .then(response=>{

  //     console.log(response);

  // });
};
