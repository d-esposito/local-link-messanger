FROM python:3.11

WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

EXPOSE 8081
ENV PYTHONUNBUFFERED 1
CMD ["python", "main.py"]