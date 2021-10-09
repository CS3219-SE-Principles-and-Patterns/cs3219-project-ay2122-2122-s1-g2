kubectl delete deployment --all
kubectl delete services --all
kubectl delete ingress --all
docker compose build
docker compose up -d
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
