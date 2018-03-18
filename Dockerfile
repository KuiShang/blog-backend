FROM node
COPY . /app
WORKDIR /app
# RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 9528
CMD npm run dev
