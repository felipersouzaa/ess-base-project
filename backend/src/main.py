from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from src.api.router import api_router
from fastapi import FastAPI, HTTPException, Depends, APIRouter
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from pymongo.errors import DuplicateKeyError
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

app = FastAPI()

router = APIRouter()

class UserCreate(BaseModel):
    nome: str
    cpf: str
    email: str
    endereco: str
    senha: str
    telefone: str

class UserLogin(BaseModel):
    email: str
    senha: str

class User(BaseModel):
    nome: str
    cpf: str
    email: str
    endereco: str
    telefone: str

async def connect_to_mongo():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["user_db"]
    return db

async def close_mongo_connection(db):
    db.client.close()

async def insert_user(db, user_data: UserCreate):
    user_collection = db["users"]
    try:
        await user_collection.insert_one(user_data.dict())
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Email ou CPF já cadastrado")

async def find_user_by_email(db, email: str):
    user_collection = db["users"]
    user_data = await user_collection.find_one({"email": email})
    return user_data

async def find_user_by_cpf(db, cpf: str):
    user_collection = db["users"]
    user_data = await user_collection.find_one({"cpf": cpf})
    return user_data

@router.post("/cadastro")
async def cadastrar_usuario(user: UserCreate, db: AsyncIOMotorClient = Depends(connect_to_mongo)):
    existing_email_user = await find_user_by_email(db, user.email)
    if existing_email_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    existing_cpf_user = await find_user_by_cpf(db, user.cpf)
    if existing_cpf_user:
        raise HTTPException(status_code=400, detail="CPF já cadastrado")
    
    await insert_user(db, user)
    return {"message": "Usuário cadastrado com sucesso"}

@router.post("/login")
async def realizar_login(user: UserLogin, db: AsyncIOMotorClient = Depends(connect_to_mongo)):
    user_data = await find_user_by_email(db, user.email)
    if user_data is None or user_data["senha"] != user.senha:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    return {"message": "Login bem-sucedido"}

app.include_router(router)