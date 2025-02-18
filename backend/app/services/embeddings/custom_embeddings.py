from typing import List
from langchain_core.embeddings import Embeddings
from openai import OpenAI
import time
from tenacity import retry, stop_after_attempt, wait_exponential

class CustomEmbeddings(Embeddings):
    def __init__(
        self,
        openai_api_key: str,
        openai_api_base: str,
        model: str = "BAAI/bge-large-en-v1.5",
        max_retries: int = 5
    ):
        self.client = OpenAI(api_key=openai_api_key, base_url=openai_api_base)
        self.model = model
        self.max_retries = max_retries

    @retry(
        stop=stop_after_attempt(5),
        wait=wait_exponential(multiplier=1, min=4, max=10),
        reraise=True
    )
    def _create_embeddings(self, text: str) -> List[float]:
        """Helper function to create embeddings with retry logic"""
        try:
            response = self.client.embeddings.create(
                input=text,
                model=self.model
            )
            return response.data[0].embedding
        except Exception as e:
            if "service overloaded" in str(e).lower():
                # 如果是服务器过载，等待后重试
                time.sleep(2)  # 添加短暂延迟
                raise  # 重新抛出异常以触发重试
            raise  # 其他错误直接抛出

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """Embed a list of documents using the custom model"""
        embeddings = []
        for text in texts:
            embedding = self._create_embeddings(text)
            embeddings.append(embedding)
        return embeddings

    def embed_query(self, text: str) -> List[float]:
        """Embed a query using the custom model"""
        return self._create_embeddings(text) 