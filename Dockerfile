FROM golang:1.16.3-alpine3.13 as builder
RUN apk update && add --no-cache git
WORKDIR /server
COPY  go.mod ./
COPY go.sum ./
RUN go mod download
COPY . .
RUN go build -o /server
