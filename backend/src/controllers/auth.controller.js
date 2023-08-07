import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const userFound = await User
      .findOne({email})
      if (userFound)
    return res
      .status(400)
      .json(["the email already exists"])

    const passHash = await bcrypt.hash(password, 10); //para incriptar la contraseña

    const newUser = new User({
      //se crea el usuario nuevo
      username,
      email,
      password: passHash,
    });

    const userSaved = await newUser.save(); //se guarda el usuario creado

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username, //devuelve tipo json (id, usuario, email, fecha de acreacion y actualizacion)
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email }); //dentro del User creados buscamos un email

    if (!userFound)
      return res
        .status(400)
        .json({ message: "Usuario no se encontro en la DB" });

    const isMatch = await bcrypt.compare(password, userFound.password); //para comparar contraseña con el usuario encontrado
    if (!isMatch)
      return res
      .status(400)
      .json({ message: "incorrect password" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
      

    res.json({
      id: userFound._id,
      username: userFound.username, //devuelve tipo json (id, usuario, email, fecha de acreacion y actualizacion)
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req,res)=>{
  res.cookie('token',"",{
    expires: new Date(0)
  })
  return res.sendStatus(200);
}

export const profile = async(req,res)=>{
const userFound = await User.findById(req.user.id)

if(!userFound) return res.status(400).json({ message: "Usuario no encontrado"})

return res.json({
  id: userFound._id,
  username: userFound.username,
  email: userFound.email,
  createdAt: userFound.createdAt,
  updatedAt: userFound.updatedAt,
})


  res.send("Bienvenido Diego")
}

export const verifyToken = async (req,res)=>{
  const {token}=req.cookies

  if(!token) return res.status(401).json({message:"No autorizado"});
    jwt.verify(token,TOKEN_SECRET, async (err, user)=>{
      if(err) return res.status(401).json({message:"No autorizado"})

      const userFound = await User.findById(user.id);
      if(!userFound) return res.status(401).json({message:"No autorizado"})

      return res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email,
      })
    })
}