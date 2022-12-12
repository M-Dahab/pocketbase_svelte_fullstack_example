FROM node:19.2-alpine as builder

# Create app directory
RUN mkdir /apps
WORKDIR /apps

# ENV VARS
ENV VITE_PB_URL=/

# Build apps
COPY ./todos_app /apps/todos_app
RUN cd /apps/todos_app && yarn install && yarn build


# ------------------------------------------


FROM alpine:latest

ARG PB_VERSION=0.9.2

RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# Copy the built static site
COPY --from=builder /apps/todos_app/dist /pb/pb_public

EXPOSE 5001

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:5001"]