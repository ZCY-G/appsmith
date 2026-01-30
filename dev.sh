#!/bin/bash

echo "ℹ️ 启动服务器..."

cd deploy/docker || {
  echo "❌ 目录切换失败"
  exit 1
}

if ! command -v docker &>/dev/null; then
  echo "❌ Docker 未安装，请先安装 Docker"
  exit 1
fi

if ! docker info &>/dev/null; then
  echo "❌ Docker 未运行，请先启动 Docker"
  exit 1
fi

if docker compose up -d; then
  echo "✅ 服务器启动成功"
else
  echo "❌ 服务器启动失败"
  exit 1
fi

echo "ℹ️ 启动Nginx..."

cd ../../app/client || {
  echo "❌ 目录切换失败"
  exit 1
}

if ./start-https.sh http://host.docker.internal:8080 --with-docker --http; then
  echo "✅ Nginx 启动成功"
else
  echo "❌ Nginx 启动失败"
  exit 1
fi
