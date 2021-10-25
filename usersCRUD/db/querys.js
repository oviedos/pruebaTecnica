  const querys = {
    getUsers:"SELECT * FROM gen_schema.users",
    addUser:"INSERT INTO gen_schema.users (user_name, email, password,latitude,longitude, language) VALUES (?,?,?,?,?,?)",
    delUser:"DELETE FROM gen_schema.users WHERE id = ?",
    updateUserById:"UPDATE Users SET email = ?, password = ?,latitude = ?,longitude =?, language=? WHERE Id = ?",
  };
  
  module.exports = querys;