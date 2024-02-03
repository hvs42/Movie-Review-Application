import { myAxios } from "./helper";


export const signUp = (user) => {
  return myAxios.post("/users", user).then(res => {
    return res.data;
  })
}

export const login = (loginData) => {
  return myAxios.post("/users/auth/v1/login", loginData).then(res => res.data);
}

export const logout = () => {
  return myAxios.get("/users/logout").then(res => res.data);
}

export const getUserById = (userId)=>{
  return myAxios.get("/users/"+userId).then(res=>res.data)
}

//delete user service
export const deleteUser = (userId) => {
  return myAxios.delete(`/users/${userId}`).then(res => res.data);
}

//upate user service
export const updateUser = (user, userId) => {
  return myAxios.put(`/users/${userId}`, user).then(res => res.data)
}


//upload profile image for user
export const uploadProfilePicture = (image, userId) => {
  const formData = new FormData();
  formData.append("image", image);
  return myAxios.post(`/users/image/upload/${userId}`, formData).then(res => res.data);
}

//get profile image for user
export const getProfilePicture = (userId) => {
  return myAxios.get(`/users/image/${userId}`).then(res => res.data);
}

//change password
export const changePassword = (passwordObject, userId) => {
  return myAxios.post(`/users/changePassword/${userId}`, passwordObject).then(res => res.data);
}