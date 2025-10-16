FROM node:23

WORKDIR /backend

COPY . /backend

RUN cp ./krb5.conf /etc/krb5.conf
RUN npm install

EXPOSE 3001

CMD ["npm", "start"]