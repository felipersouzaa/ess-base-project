import pytest
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError
from src.main import app, connect_to_mongo, close_mongo_connection, insert_user, find_user_by_email, find_user_by_cpf, UserCreate, UserLogin

client = TestClient(app)

@pytest.fixture
async def test_db():
    db = await connect_to_mongo()
    yield db
    await close_mongo_connection(db)

def test_cadastrar_usuario_sucesso(test_db):
    user_data = {
        "nome": "Joãozin",
        "cpf": "1234567891111",
        "email": "joao1233455@example.com",
        "endereco": "Rua A, 123",
        "senha": "senha123",
        "telefone": "987654321"
    }
    response = client.post("/cadastro/", json=user_data)
    assert response.status_code == 200
    assert response.json() == {"message": "Usuário cadastrado com sucesso"}

# def test_cadastrar_usuario_campos_obrigatorios(test_db):
#     user_data = {
#         "nome": "João",
#         "cpf": "",
#         "email": "joao@example.com",
#         "endereco": "",
#         "senha": "senha123",
#         "telefone": ""
#     }
#     response = client.post("/cadastro/", json=user_data)
#     assert response.status_code == 400
#     assert "Campos obrigatórios não preenchidos" in response.text

def test_cadastrar_usuario_email_existente(test_db):
    user_data = {
        "nome": "João",
        "cpf": "1235125468",
        "email": "joao12234@example.com",
        "endereco": "Rua A, 123",
        "senha": "senha123",
        "telefone": "987654321"
    }
    insert_user(test_db, UserCreate(**user_data))

    new_user_data = {
        "nome": "Maria",
        "cpf": "98765432109",
        "email": "joao@example.com", 
        "endereco": "Avenida B, 456",
        "senha": "senha456",
        "telefone": "123456789"
    }
    response = client.post("/cadastro/", json=new_user_data)
    assert response.status_code == 400
    assert "Email já cadastrado" in response.text

def test_realizar_login_sucesso(test_db):
    user_data = {
        "nome": "João",
        "cpf": "12345678901",
        "email": "joao@example.com",
        "endereco": "Rua A, 123",
        "senha": "senha123",
        "telefone": "987654321"
    }
    insert_user(test_db, UserCreate(**user_data))

    login_data = {
        "email": "joao@example.com",
        "senha": "senha123"
    }
    response = client.post("/login/", json=login_data)
    assert response.status_code == 200
    assert response.json() == {"message": "Login bem-sucedido"}

def test_realizar_login_credenciais_invalidas(test_db):
    login_data = {
        "email": "nao_existe@example.com",
        "senha": "senha_incorreta"
    }
    response = client.post("/login/", json=login_data)
    assert response.status_code == 401
    assert "Credenciais inválidas" in response.text