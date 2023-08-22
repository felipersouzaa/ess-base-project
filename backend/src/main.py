from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from src.api.router import api_router
from fastapi import FastAPI, HTTPException, Depends, APIRouter
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from pymongo.errors import DuplicateKeyError
from typing import List
from pydantic import BaseModel, EmailStr, constr

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

# app = FastAPI()

router = APIRouter()

class UserCreate(BaseModel):
    nome: constr(min_length=1)
    cpf: constr(min_length=1)
    email: EmailStr
    endereco: constr(min_length=1)
    senha: constr(min_length=1)
    telefone: constr(min_length=1)

    class Config:
        anystr_strip_whitespace = True

class UserLogin(BaseModel):
    email: EmailStr
    senha: constr(min_length=1)

class User(BaseModel):
    nome: str
    cpf: str
    email: str
    endereco: str
    telefone: str

def connect_to_mongo():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["user_db"]
    return db

def close_mongo_connection(db):
    db.client.close()

def insert_user(db, user_data: UserCreate):
    user_collection = db["users"]
    try:
        user_collection.insert_one(user_data.dict())
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Email ou CPF já cadastrado")

def find_user_by_email(db, email: str):
    user_collection = db["users"]
    user_data = user_collection.find_one({"email": email})
    return user_data

def find_user_by_cpf(db, cpf: str):
    user_collection = db["users"]
    user_data = user_collection.find_one({"cpf": cpf})
    return user_data

@router.post("/cadastro/")
def cadastrar_usuario(user: UserCreate, db: AsyncIOMotorClient = Depends(connect_to_mongo)):
    if not all(user.dict().values()):
        raise HTTPException(status_code=400, detail="Campos obrigatórios não preenchidos")
    
    existing_email_user = find_user_by_email(db, user.email)
    if existing_email_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    existing_cpf_user = find_user_by_cpf(db, user.cpf)
    if existing_cpf_user:
        raise HTTPException(status_code=400, detail="CPF já cadastrado")
    
    insert_user(db, user)
    return {"message": "Usuário cadastrado com sucesso"}

@router.post("/login/")
def realizar_login(user: UserLogin, db: AsyncIOMotorClient = Depends(connect_to_mongo)):
    user_data = find_user_by_email(db, user.email)
    if user_data is None or user_data["senha"] != user.senha:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    return {"message": "Login bem-sucedido"}

app.include_router(router)