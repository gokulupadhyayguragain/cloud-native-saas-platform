# Auth Service
A simple Node.js authentication microservice deployed on Kubernetes.

## Overview
This project contains the source code and Kubernetes manifests for the `auth-service`, a backend service exposing authentication functionality on port 3000. It is deployed in a Kubernetes cluster using a `ClusterIP` service for internal access within the `tenant-a` namespace.

## Features
- Built with Node.js (using `node:18-alpine` base image)
- Exposes port 3000 internally
- Kubernetes deployment and service manifests included
- Designed for multi-tenant architecture (`tenant-a` namespace)

## Kubernetes Service
The service is defined with the following spec:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: auth-service
  namespace: tenant-a
spec:
  selector:
    app: auth
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP
```

Type: ClusterIP (default, internal cluster access only)

Port: 80 (service port)

TargetPort: 3000 (container port)

## How to Build and Push Docker Image
Build your Docker image locally and push it to GitHub Container Registry (GHCR):

```
docker build -t ghcr.io/gocools/auth-service:v1 .
docker login ghcr.io
docker push ghcr.io/gocools/auth-service:v1
```
Make sure you have generated a GitHub Personal Access Token (PAT) with package permissions and use it during docker login.

## Deploying to Kubernetes
Create the namespace (if not already created):
```
kubectl create namespace tenant-a
Apply your deployment and service manifests:
```

```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```
## Verify pods and services:

```
kubectl get pods -n tenant-a
kubectl get svc -n tenant-a
```
## Accessing the Service
Since the service is ClusterIP, it is accessible only within the cluster, for example from other pods or via port forwarding:


```
kubectl port-forward svc/auth-service -n tenant-a 8080:80
```
Then access the service at:

```
http://localhost:8080
```

# Future Work
Add Ingress or LoadBalancer to expose service externally

Implement secure authentication methods (JWT, OAuth)

Add Helm chart for easier deployment

Multi-tenant support enhancements
