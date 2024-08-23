FROM python:3.10-slim

# Define o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependencias e instal as dependencias
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copie o restante dos arquivos do projeto
COPY . .

CMD ["gunicorn", "product_management.wsgi:application", "--bind", "0.0.0.0:8000"]